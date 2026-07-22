import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { COOKIE_CONSENT_KEY } from "@/lib/cookieConsent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Hinweis"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
    >
      <div className="rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-xl p-5">
        <p className="text-sm text-foreground font-medium mb-2">Cookies & Datenschutz</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Wir verwenden nur technisch notwendige Speicherung (z. B. für diese Einwilligung).
          Externe Inhalte wie Google Maps laden wir erst nach Ihrer Zustimmung.
          Details in unserer{" "}
          <Link to="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={accept} className="min-h-11">
            Akzeptieren
          </Button>
          <Link to="/datenschutz" className="inline-flex">
            <Button variant="outline" className="w-full min-h-11">
              Mehr erfahren
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
