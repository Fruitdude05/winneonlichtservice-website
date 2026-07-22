import { useCallback, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";

export function useHomeLinkClick() {
  const { pathname } = useLocation();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") {
        return;
      }

      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    [pathname],
  );
}
