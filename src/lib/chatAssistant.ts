import { buildSystemPrompt, type ChatPageContext } from "@/lib/companyKnowledge";

const AI_ERROR_REPLY =
  "Entschuldigung, Dave ist gerade nicht erreichbar. Bitte versuchen Sie es in Kürze erneut oder schreiben Sie uns direkt per WhatsApp (+49 15562 052989).";

const AI_NOT_CONFIGURED_REPLY =
  "Dave ist noch nicht eingerichtet. Bitte kontaktieren Sie uns direkt per WhatsApp (+49 15562 052989) oder Telefon (08031 92155).";

export type ChatRole = "user" | "assistant";

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

async function getOpenAiReply(
  history: ChatTurn[],
  userMessage: string,
  pageContext?: ChatPageContext,
): Promise<string | null> {
  try {
    const response = await fetch("/api/chat.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: buildSystemPrompt(pageContext) },
          ...history.map((turn) => ({
            role: turn.role,
            content: turn.content,
          })),
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (response.status === 503) {
      return AI_NOT_CONFIGURED_REPLY;
    }

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    const content = data.choices?.[0]?.message?.content?.trim();
    return content || null;
  } catch {
    return null;
  }
}

export async function getAssistantReply(
  history: ChatTurn[],
  userMessage: string,
  pageContext?: ChatPageContext,
): Promise<string> {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return "Bitte schreiben Sie Ihre Frage – ich helfe Ihnen gern weiter.";
  }

  const aiReply = await getOpenAiReply(history, trimmed, pageContext);
  return aiReply ?? AI_ERROR_REPLY;
}
