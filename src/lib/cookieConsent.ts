export const COOKIE_CONSENT_KEY = "win-cookie-consent";

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}
