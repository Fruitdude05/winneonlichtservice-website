import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export function openAiChatProxy(apiKey: string | undefined, notifyConfig?: {
  web3FormsKey?: string;
  callMeBotKey?: string;
  whatsappNumber?: string;
}): Plugin {
  return {
    name: "openai-chat-proxy",
    configureServer(server) {
      server.middlewares.use("/api/notify.php", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        const web3FormsKey = notifyConfig?.web3FormsKey?.trim() ?? "";
        const callMeBotKey = notifyConfig?.callMeBotKey?.trim() ?? "";
        const whatsappNumber = notifyConfig?.whatsappNumber?.trim() || "4915562052989";

        if (!web3FormsKey && !callMeBotKey) {
          res.statusCode = 503;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: { message: "not_configured" }, email: false, whatsapp: false }));
          return;
        }

        try {
          const body = await readBody(req);
          const input = JSON.parse(body) as {
            event?: string;
            pageUrl?: string;
            userMessage?: string;
            transcript?: Array<{ role?: string; content?: string }>;
          };

          const allowedEvents = new Set(["chat_opened", "user_message", "whatsapp_handoff"]);
          if (!input.event || !allowedEvents.has(input.event)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: { message: "invalid_event" }, email: false, whatsapp: false }));
            return;
          }

          const subjects: Record<string, string> = {
            chat_opened: "Neuer Website-Chat gestartet",
            user_message: "Neue Chat-Nachricht auf der Website",
            whatsapp_handoff: "Chat-Besucher möchte per WhatsApp sprechen",
          };

          const intros: Record<string, string> = {
            chat_opened: "Ein Besucher hat den KI-Chat auf Ihrer Website geöffnet.",
            user_message: "Neue Nachricht im Website-Chat:",
            whatsapp_handoff: "Ein Besucher möchte nach dem KI-Chat direkt per WhatsApp mit Ihnen sprechen.",
          };

          const pageUrl = input.pageUrl ?? "";
          const userMessage = input.userMessage ?? "";
          const transcript = input.transcript ?? [];
          const subject = subjects[input.event];
          const messageParts = [
            intros[input.event],
            "",
            `Seite: ${pageUrl}`,
            `Zeitpunkt: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
          ];

          if (userMessage) {
            messageParts.push("", `Nachricht des Besuchers:\n${userMessage}`);
          }

          if (transcript.length > 0) {
            messageParts.push("", "Chat-Verlauf:");
            for (const entry of transcript) {
              const role = entry.role === "user" ? "Besucher" : "Dave";
              if (entry.content) {
                messageParts.push(`${role}: ${entry.content}`, "");
              }
            }
          }

          const emailBody = messageParts.join("\n");
          const whatsappText = [
            `Website-Chat: ${subject}`,
            userMessage ? `Besucher: ${userMessage}` : intros[input.event],
            pageUrl,
          ]
            .join("\n")
            .slice(0, 1200);

          const tasks: Promise<boolean>[] = [];

          if (web3FormsKey) {
            tasks.push(
              fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                  access_key: web3FormsKey,
                  subject: `[Website-Chat] ${subject}`,
                  name: "Website-Besucher",
                  email: "chat@winneonlichtservice.de",
                  message: emailBody,
                  from_name: "Win Neonlicht-Service Chat",
                  botcheck: "",
                }),
              })
                .then(async (response) => {
                  const result = (await response.json()) as { success?: boolean };
                  return Boolean(result.success);
                })
                .catch(() => false),
            );
          } else {
            tasks.push(Promise.resolve(false));
          }

          if (callMeBotKey) {
            const url = new URL("https://api.callmebot.com/whatsapp.php");
            url.searchParams.set("phone", whatsappNumber);
            url.searchParams.set("text", whatsappText);
            url.searchParams.set("apikey", callMeBotKey);

            tasks.push(
              fetch(url.toString())
                .then(async (response) => {
                  const text = await response.text();
                  return response.ok && !text.toLowerCase().includes("error");
                })
                .catch(() => false),
            );
          } else {
            tasks.push(Promise.resolve(false));
          }

          const [email, whatsapp] = await Promise.all(tasks);

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ email, whatsapp }));
        } catch {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: { message: "upstream_failed" }, email: false, whatsapp: false }));
        }
      });

      server.middlewares.use("/api/chat.php", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        if (!apiKey) {
          res.statusCode = 503;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: { message: "not_configured" } }));
          return;
        }

        try {
          const body = await readBody(req);
          const input = JSON.parse(body) as { messages?: unknown };

          if (!Array.isArray(input.messages)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: { message: "invalid_request" } }));
            return;
          }

          const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              temperature: 0.3,
              max_tokens: 500,
              messages: input.messages,
            }),
          });

          const responseBody = await upstream.text();
          res.statusCode = upstream.status;
          res.setHeader("Content-Type", "application/json");
          res.end(responseBody);
        } catch {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: { message: "upstream_failed" } }));
        }
      });
    },
  };
}
