import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Kostenloses Angebot anfordern
          </h3>
          <p className="text-muted-foreground mb-6">
            Rufen Sie uns an oder schreiben Sie uns – wir melden uns schnellstmöglich bei Ihnen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+49803192155" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto min-h-11">
                <Phone className="w-4 h-4 mr-2" />
                08031 92155
              </Button>
            </a>
            <Link to="/kontakt" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-11 group">
                Nachricht senden
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="grid sm:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Kontakt</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start">
                  <a
                    href="tel:+49803192155"
                    className="flex items-center gap-2 hover:text-primary transition-colors min-h-11"
                  >
                    <Phone className="w-4 h-4" />
                    08031 92155
                  </a>
                  <a
                    href="tel:+4915562052989"
                    className="hover:text-primary transition-colors min-h-11 inline-flex items-center"
                  >
                    +49 15562 052989
                  </a>
                </div>
                <a
                  href="mailto:info@winneonlichtservice.de"
                  className="flex items-center gap-2 hover:text-primary transition-colors justify-center md:justify-start min-h-11"
                >
                  <Mail className="w-4 h-4" />
                  info@winneonlichtservice.de
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Über uns</h4>
              <p className="text-muted-foreground mb-4">
                Win Neonlicht-Service
                <br />
                Ihr Partner für Neonlicht & Werbetechnik in München und Oberbayern.
              </p>
              <Link to="/ueber-uns" className="text-primary hover:underline font-medium">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/impressum" className="hover:text-primary transition-colors min-h-11 inline-flex items-center">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-primary transition-colors min-h-11 inline-flex items-center">
              Datenschutz
            </Link>
          </div>
          <p>&copy; 2026 Win Neonlicht-Service. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
