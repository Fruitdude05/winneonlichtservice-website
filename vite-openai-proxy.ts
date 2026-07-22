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

export function openAiChatProxy(apiKey: string | undefined): Plugin {
  return {
    name: "openai-chat-proxy",
    configureServer(server) {
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
