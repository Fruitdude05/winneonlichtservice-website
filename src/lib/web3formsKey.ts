let cachedKey: string | null | undefined;

/** Build-Zeit (.env) oder Laufzeit (/api/public-config.php auf Hostinger). */
export async function resolveWeb3FormsAccessKey(): Promise<string | undefined> {
  const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (envKey) {
    return envKey;
  }

  if (cachedKey !== undefined) {
    return cachedKey ?? undefined;
  }

  try {
    const response = await fetch("/api/public-config.php", {
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = (await response.json()) as { web3formsAccessKey?: string };
      const key = data.web3formsAccessKey?.trim();
      cachedKey = key || null;
      return cachedKey ?? undefined;
    }
  } catch {
    // Browser-Fallback nicht möglich
  }

  cachedKey = null;
  return undefined;
}

export function hasWeb3FormsAccessKeyInBuild(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}
