import { BUSINESS } from "@/lib/seo";

export type ContactMessagePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

type SendResult =
  | { ok: true; method: "web3forms" }
  | { ok: true; method: "mailto" }
  | { ok: false; error: string };

export function isEmailServiceConfigured(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<SendResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  if (accessKey) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: payload.subject,
          name: payload.name,
          email: payload.email,
          phone: payload.phone ?? "",
          message: payload.message,
          from_name: "Win Neonlicht-Service Website",
          replyto: payload.email,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (result.success) {
        return { ok: true, method: "web3forms" };
      }

      return {
        ok: false,
        error: result.message ?? "E-Mail konnte nicht gesendet werden.",
      };
    } catch {
      return {
        ok: false,
        error: "Netzwerkfehler. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      };
    }
  }

  const body = [
    payload.phone ? `Telefon: ${payload.phone}` : null,
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, method: "mailto" };
}
