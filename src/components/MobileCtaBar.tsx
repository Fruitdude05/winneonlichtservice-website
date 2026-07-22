import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileCtaBar = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)] md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-2 gap-2">
          <a href="tel:+49803192155" className="min-h-11">
            <Button size="lg" className="w-full h-11 px-2 text-xs sm:text-sm">
              <Phone className="w-4 h-4 mr-1 shrink-0" />
              Anrufen
            </Button>
          </a>
          <Link to="/kontakt" className="min-h-11">
            <Button size="lg" variant="outline" className="w-full h-11 px-2 text-xs sm:text-sm">
              <Mail className="w-4 h-4 mr-1 shrink-0" />
              Kontakt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileCtaBar;
