import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHomeLinkClick } from "@/hooks/useHomeLinkClick";
import logo from "@/assets/logo.png";

const PHONE_NUMBERS = [
  { label: "Festnetz", number: "08031 92155", href: "tel:+49803192155" },
  { label: "Handy", number: "+49 15562 052989", href: "tel:+4915562052989" },
];

const PhoneDropdown = ({
  iconClassName = "w-5 h-5",
  variant = "dropdown",
}: {
  iconClassName?: string;
  variant?: "dropdown" | "compact";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || variant === "compact") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, variant]);

  if (variant === "compact") {
    return (
      <a
        href={PHONE_NUMBERS[0].href}
        className="shrink-0 min-h-11 min-w-11 flex items-center justify-center text-foreground hover:text-primary transition-colors"
        aria-label={`Anrufen: ${PHONE_NUMBERS[0].number}`}
      >
        <Phone className={iconClassName} />
      </a>
    );
  }

  return (
    <div ref={containerRef} className="ml-auto flex items-center">
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-cols-[1fr]" : "grid-cols-[0fr]",
        )}
      >
        <div className="overflow-hidden min-w-0">
          <div
            className={cn(
              "flex flex-col md:flex-row md:items-center gap-1 md:gap-3 pr-2 sm:pr-3 whitespace-nowrap w-max transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            {PHONE_NUMBERS.map((phone) => (
              <a
                key={phone.label}
                href={phone.href}
                onClick={() => setIsOpen(false)}
                className="flex flex-col rounded-sm px-1 py-0.5 hover:text-primary transition-colors"
              >
                <span className="text-xs text-muted-foreground">{phone.label}</span>
                <span className="text-sm font-medium text-foreground">{phone.number}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="shrink-0 min-h-11 min-w-11 flex items-center justify-center text-foreground hover:text-primary transition-colors"
        aria-label="Telefonnummern anzeigen"
        aria-expanded={isOpen}
      >
        <Phone className={iconClassName} />
      </button>
    </div>
  );
};

const serviceCategories = [
  {
    title: "Gebäudereinigung",
    services: [
      { name: "Fassadenreinigung", link: "/fassadenreinigung" },
      { name: "Fensterreinigung", link: "/fensterreinigung" },
      { name: "Leuchtreklamenreinigung", link: "/leuchtreklamenreinigung" },
      { name: "Apothekenreinigung", link: "/apothekenreinigung" },
      { name: "Büroreinigung", link: "/bueroreinigung" },
      { name: "Unterhaltsreinigung", link: "/unterhaltsreinigung" },
    ],
  },
  {
    title: "Werbetechnik",
    services: [
      { name: "Folientechnik", link: "/folientechnik" },
      { name: "LED-Umrüstung", link: "/led-umruestung" },
      { name: "Montage & Anfertigung", link: "/montage-anfertigung" },
    ],
  },
];

const ServicesPanel = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
      {serviceCategories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-sm font-bold text-foreground mb-3">{category.title}</h3>
          <div className="space-y-1">
            {category.services.map((service, serviceIndex) => (
              <Link
                key={serviceIndex}
                to={service.link}
                className="block text-sm text-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/50 rounded-sm min-h-11"
                onClick={onNavigate}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MegaMenu = () => {
  const { pathname } = useLocation();
  const handleHomeLinkClick = useHomeLinkClick();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenedAt = useRef(0);

  const closeServices = () => setIsServicesOpen(false);
  const closeMobile = () => setIsOpen(false);

  const openMobileMenu = () => {
    menuOpenedAt.current = Date.now();
    setIsOpen(true);
    setIsServicesOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isOpen) {
      closeMobile();
      return;
    }
    openMobileMenu();
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen((open) => {
      if (!open) {
        menuOpenedAt.current = Date.now();
      }
      return !open;
    });
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [isOpen, isServicesOpen]);

  useEffect(() => {
    closeMobile();
    closeServices();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobile();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isServicesOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServicesOpen]);

  useEffect(() => {
    if (!isServicesOpen) return;

    const handleScroll = () => {
      if (Date.now() - menuOpenedAt.current < 450) return;
      setIsServicesOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, [isServicesOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-background border-b border-border/60 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <a
              href="mailto:info@winneonlichtservice.de"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity min-h-8"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline truncate">info@winneonlichtservice.de</span>
              <span className="sm:hidden">E-Mail</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>München & Oberbayern</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4 md:gap-8 min-w-0">
            <Link
              to="/"
              className="flex items-center shrink-0"
              aria-label="Win Neonlicht-Service Startseite"
              onClick={(event) => {
                handleHomeLinkClick(event);
                closeMobile();
                closeServices();
              }}
            >
              <img
                src={logo}
                alt="Win Neonlicht-Service Logo"
                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={cn(
                  "transition-colors font-medium text-sm min-h-11 inline-flex items-center",
                  isHome ? "text-primary" : "text-foreground hover:text-primary",
                )}
                onClick={handleHomeLinkClick}
                aria-current={isHome ? "page" : undefined}
              >
                Home
              </Link>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium transition-colors min-h-11",
                  isServicesOpen ? "text-primary" : "text-foreground hover:text-primary",
                )}
                aria-expanded={isServicesOpen}
                aria-controls="services-panel"
                onClick={toggleServicesMenu}
              >
                Dienstleistungen
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isServicesOpen && "rotate-180",
                  )}
                />
              </button>
              <Link
                to="/ueber-uns"
                className="text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                Über uns
              </Link>
              <Link
                to="/kontakt"
                className="text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                Kontakt
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <PhoneDropdown />
          </div>

          <div className="flex md:hidden items-center gap-1 shrink-0">
            <PhoneDropdown iconClassName="w-5 h-5" variant="compact" />
            <button
              type="button"
              className="min-h-11 min-w-11 flex items-center justify-center text-foreground"
              onClick={toggleMobileMenu}
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu-panel"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-black/40 md:hidden"
            aria-label="Menü schließen"
            onClick={closeMobile}
          />

          <div
            id="mobile-menu-panel"
            className="fixed inset-x-0 z-[60] md:hidden overflow-y-auto overscroll-contain bg-background border-t border-border shadow-lg"
            style={{
              top: headerHeight,
              maxHeight: `calc(100dvh - ${headerHeight}px)`,
              paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="container mx-auto px-4 pb-4">
              <div className="flex flex-col gap-2 pt-3">
                <Link
                  to="/"
                  className={cn(
                    "transition-colors font-medium text-base py-2 min-h-11",
                    isHome ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                  onClick={(event) => {
                    handleHomeLinkClick(event);
                    closeMobile();
                  }}
                  aria-current={isHome ? "page" : undefined}
                >
                  Home
                </Link>

                <div className="py-2 border-y border-border">
                  <span className="text-foreground font-semibold text-base">Dienstleistungen</span>
                  <div className="mt-2 grid grid-cols-1 gap-3">
                    {serviceCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="space-y-1">
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                          {category.title}
                        </span>
                        {category.services.map((service, serviceIndex) => (
                          <Link
                            key={serviceIndex}
                            to={service.link}
                            className="block text-sm text-foreground hover:text-primary transition-colors py-2 min-h-11"
                            onClick={closeMobile}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/ueber-uns"
                  className="text-foreground hover:text-primary transition-colors font-medium text-base py-2 min-h-11"
                  onClick={closeMobile}
                >
                  Über uns
                </Link>
                <Link
                  to="/kontakt"
                  className="text-foreground hover:text-primary transition-colors font-medium text-base py-2 min-h-11"
                  onClick={closeMobile}
                >
                  Kontakt
                </Link>

                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  {PHONE_NUMBERS.map((phone) => (
                    <a
                      key={phone.label}
                      href={phone.href}
                      className="flex items-center gap-3 rounded-lg px-1 py-2 text-foreground hover:text-primary transition-colors min-h-11"
                      onClick={closeMobile}
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span>
                        <span className="block text-xs text-muted-foreground">{phone.label}</span>
                        <span className="block text-sm font-medium">{phone.number}</span>
                      </span>
                    </a>
                  ))}
                  <a
                    href="mailto:info@winneonlichtservice.de"
                    className="flex items-center gap-3 rounded-lg px-1 py-2 text-foreground hover:text-primary transition-colors min-h-11"
                    onClick={closeMobile}
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">info@winneonlichtservice.de</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Dienstleistungen – schiebt Seite nach unten, kein Overlay */}
      <div
        id="services-panel"
        className={cn(
          "hidden md:grid transition-[grid-template-rows] duration-300 ease-in-out border-t border-border bg-background",
          isServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ServicesPanel onNavigate={closeServices} />
        </div>
      </div>
    </header>
  );
};

export default MegaMenu;
