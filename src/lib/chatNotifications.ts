import { BUSINESS } from "@/lib/seo";

export type ChatNotificationEvent =
  | "chat_opened"
  | "user_message"
  | "assistant_reply"
  | "whatsapp_handoff";

type ChatTranscriptEntry = {
  role: "user" | "assistant";
  content: string;
};

const notifiedSessions = new Set<string>();

function getWeb3FormsKey(): string | undefined {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
}

function getCallMeBotKey(): string | undefined {
  return import.meta.env.VITE_CALLMEBOT_API_KEY as string | undefined;
}

function formatTranscript(transcript: ChatTranscriptEntry[]): string {
  return transcript
    .map((entry) => `${entry.role === "user" ? "Besucher" : "Dave"}: ${entry.content}`)
    .join("\n\n");
}

function buildNotificationBody(
  event: ChatNotificationEvent,
  options: {
    pageUrl: string;
    userMessage?: string;
    transcript?: ChatTranscriptEntry[];
  },
): { subject: string; body: string; whatsappText: string } {
  const subjects: Record<ChatNotificationEvent, string> = {
    chat_opened: "Neuer Website-Chat gestartet",
    user_message: "Neue Chat-Nachricht auf der Website",
    assistant_reply: "Dave-Antwort im Website-Chat",
    whatsapp_handoff: "Chat-Besucher möchte per WhatsApp sprechen",
  };

  const intro: Record<ChatNotificationEvent, string> = {
    chat_opened: "Ein Besucher hat den KI-Chat auf Ihrer Website geöffnet.",
    user_message: "Neue Nachricht im Website-Chat:",
    assistant_reply: "Dave hat geantwortet. Vollständiger Chat-Verlauf:",
    whatsapp_handoff: "Ein Besucher möchte nach dem KI-Chat direkt per WhatsApp mit Ihnen sprechen.",
  };

  const messageParts = [
    intro[event],
    "",
    `Seite: ${options.pageUrl}`,
    `Zeitpunkt: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
  ];

  if (options.userMessage) {
    messageParts.push("", `Nachricht des Besuchers:\n${options.userMessage}`);
  }

  if (options.transcript?.length) {
    messageParts.push("", "Chat-Verlauf:", formatTranscript(options.transcript));
  }

  const whatsappParts = [
    `Website-Chat: ${subjects[event]}`,
    options.userMessage ? `Besucher: ${options.userMessage}` : intro[event],
    options.pageUrl,
  ];

  return {
    subject: subjects[event],
    body: messageParts.join("\n"),
    whatsappText: whatsappParts.join("\n").slice(0, 1200),
  };
}

async function sendViaServerProxy(
  event: ChatNotificationEvent,
  options: {
    pageUrl: string;
    userMessage?: string;
    transcript?: ChatTranscriptEntry[];
    messageId?: string;
  },
): Promise<{ email: boolean; whatsapp: boolean } | null> {
  try {
    const response = await fetch("/api/notify.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        event,
        pageUrl: options.pageUrl,
        userMessage: options.userMessage ?? "",
        transcript: options.transcript ?? [],
        messageId: options.messageId ?? "",
      }),
    });

    if (response.status === 503) {
      return null;
    }

    if (!response.ok) {
      return { email: false, whatsapp: false };
    }

    const result = (await response.json()) as { email?: boolean; whatsapp?: boolean };
    return {
      email: Boolean(result.email),
      whatsapp: Boolean(result.whatsapp),
    };
  } catch {
    return null;
  }
}

async function sendEmailNotification(subject: string, body: string): Promise<boolean> {
  const accessKey = getWeb3FormsKey();
  if (!accessKey) {
    return false;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Website-Chat] ${subject}`,
        name: "Website-Besucher",
        email: "chat@winneonlichtservice.de",
        message: body,
        from_name: "Win Neonlicht-Service Chat",
        botcheck: "",
      }),
    });

    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

async function sendWhatsAppNotification(text: string): Promise<boolean> {
  const apiKey = getCallMeBotKey();
  if (!apiKey) {
    return false;
  }

  try {
    const url = new URL("https://api.callmebot.com/whatsapp.php");
    url.searchParams.set("phone", BUSINESS.whatsappNumber);
    url.searchParams.set("text", text);
    url.searchParams.set("apikey", apiKey);

    const response = await fetch(url.toString(), { method: "GET" });
    const result = await response.text();

    return response.ok && !result.toLowerCase().includes("error");
  } catch {
    return false;
  }
}

export function isChatNotificationConfigured(): boolean {
  return Boolean(getWeb3FormsKey() || getCallMeBotKey());
}

export function isWhatsAppNotificationConfigured(): boolean {
  return Boolean(getCallMeBotKey());
}

export async function sendChatNotification(
  event: ChatNotificationEvent,
  options: {
    sessionId: string;
    pageUrl: string;
    messageId?: string;
    userMessage?: string;
    transcript?: ChatTranscriptEntry[];
  },
): Promise<{ email: boolean; whatsapp: boolean }> {
  const dedupeKey =
    (event === "user_message" || event === "assistant_reply") && options.messageId
      ? `${options.sessionId}:${event}:${options.messageId}`
      : `${options.sessionId}:${event}`;

  if (notifiedSessions.has(dedupeKey)) {
    return { email: false, whatsapp: false };
  }

  const serverResult = await sendViaServerProxy(event, options);
  if (serverResult?.email || serverResult?.whatsapp) {
    notifiedSessions.add(dedupeKey);
    return serverResult;
  }

  // Web3Forms free plan erlaubt nur Browser-Aufrufe — Hostinger notify.php schlägt oft fehl.
  const { subject, body, whatsappText } = buildNotificationBody(event, options);

  const [email, whatsapp] = await Promise.all([
    sendEmailNotification(subject, body),
    sendWhatsAppNotification(whatsappText),
  ]);

  if (email || whatsapp) {
    notifiedSessions.add(dedupeKey);
  }

  return { email, whatsapp };
}
