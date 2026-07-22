import { resolveWeb3FormsAccessKey, hasWeb3FormsAccessKeyInBuild } from "./web3formsKey";

export type ContactMessagePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

type SendResult = { ok: true; method: "web3forms" | "server" } | { ok: false; error: string };

export function isEmailServiceConfigured(): boolean {
  return hasWeb3FormsAccessKeyInBuild();
}

async function sendViaServer(payload: ContactMessagePayload): Promise<boolean> {
  try {
    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 503) {
      return false;
    }

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

async function sendViaBrowser(payload: ContactMessagePayload, accessKey: string): Promise<SendResult> {
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

export async function sendContactMessage(payload: ContactMessagePayload): Promise<SendResult> {
  const browserResult = await sendViaBrowser(payload, await resolveWeb3FormsAccessKey());
  if (browserResult.ok) {
    return browserResult;
  }

  if (await sendViaServer(payload)) {
    return { ok: true, method: "server" };
  }

  return browserResult;
}
