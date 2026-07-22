export type ContactMessagePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

type SendResult = { ok: true; method: "web3forms" } | { ok: false; error: string };

export function isEmailServiceConfigured(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<SendResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  if (!accessKey) {
    return {
      ok: false,
      error:
        "Das Kontaktformular ist gerade nicht verfügbar. Bitte schreiben Sie uns an info@winneonlichtservice.de oder rufen Sie uns an.",
    };
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
        subject: payload.subject,
        name: payload.name,
        email: payload.email,
        phone: payload.phone ?? "",
        message: payload.message,
        from_name: "Win Neonlicht-Service Website",
        replyto: payload.email,
        botcheck: "",
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
