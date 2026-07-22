let cachedKey: string | null | undefined;

/** Öffentlicher Web3Forms-Key — darf im Frontend liegen (Domain-Schutz im Web3Forms-Dashboard). */
const WEB3FORMS_ACCESS_KEY = "327fd384-ad28-4830-986a-cfb7d0e809e6";

/** Build-Zeit (.env), Laufzeit-Config oder eingebauter Fallback. */
export async function resolveWeb3FormsAccessKey(): Promise<string> {
  const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (envKey) {
    return envKey;
  }

  if (cachedKey !== undefined) {
    return cachedKey || WEB3FORMS_ACCESS_KEY;
  }

  try {
    const response = await fetch("/api/public-config.php", {
      headers: { Accept: "application/json" },
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (response.ok && contentType.includes("application/json")) {
      const data = (await response.json()) as { web3formsAccessKey?: string };
      const key = data.web3formsAccessKey?.trim();
      if (key) {
        cachedKey = key;
        return key;
      }
    }
  } catch {
    // Server-Config nicht erreichbar — Fallback nutzen
  }

  cachedKey = WEB3FORMS_ACCESS_KEY;
  return WEB3FORMS_ACCESS_KEY;
}

export function hasWeb3FormsAccessKeyInBuild(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) || import.meta.env.PROD;
}
