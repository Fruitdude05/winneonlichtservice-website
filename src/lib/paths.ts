/** Hostinger/Apache liefert Unterseiten oft mit trailing slash (/kontakt/). */
export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function isHomePath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return normalized === "" || normalized === "/";
}
