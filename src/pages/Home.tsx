import { CheckCircle, MessageSquare, FileText, Calendar, Sparkles, ArrowRight, Clock, Users, MapPin, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ContentImageBlock from "@/components/ContentImageBlock";
import PromoMarquee from "@/components/PromoMarquee";
import AnimatedStats from "@/components/AnimatedStats";
import RevealOnScroll from "@/components/RevealOnScroll";
import { ASSISTANT_NAME } from "@/lib/companyKnowledge";
import { useState, useRef, useEffect, useCallback } from "react";

const OPEN_DAVE_CHAT_EVENT = "open-dave-chat";

// Service banner images
import fassade1 from "@/assets/fassade-1.jpg";
import fassade2 from "@/assets/fassade-2.jpg";
import heroFensterreinigung from "@/assets/hero-fensterreinigung.jpg";
import heroLeuchtreklamen from "@/assets/hero-leuchtreklamen.jpg";
import leuchtreklame2 from "@/assets/leuchtreklame-2.jpg";
import led1 from "@/assets/led-1.jpg";
import heroFolientechnik from "@/assets/hero-folientechnik.jpg";
import heroMontage from "@/assets/hero-montage.jpg";
import montageApotheke from "@/assets/montage-apotheke.png";
import montage3 from "@/assets/montage-3.jpg";
import apotheke2 from "@/assets/apotheke-2.jpg";

const heroSlides = [
  {
    title: "Gebäudereinigung",
    description: "Saubere Räume für produktives Arbeiten – professionelle Reinigung für Büros, Fassaden und mehr.",
    subtitle: "Umfassende Reinigungsleistungen für Ihr Unternehmen",
    image: fassade1,
    link: "/fassadenreinigung"
  },
  {
    title: "Fensterreinigung",
    description: "Klare Aussichten für Ihr Unternehmen – streifenfrei und zuverlässig.",
    subtitle: "Professionelle Fensterreinigung für strahlenden Durchblick",
    image: heroFensterreinigung,
    link: "/fensterreinigung",
    imagePosition: "center 15%"
  },
  {
    title: "Leuchtreklamenreinigung",
    description: "Maximale Strahlkraft für Ihre Werbung durch Spezialreinigung.",
    subtitle: "Ihre Werbung verdient es, gesehen zu werden",
    image: heroLeuchtreklamen,
    link: "/leuchtreklamenreinigung",
    imagePosition: "center 30%"
  },
  {
    title: "LED-Umrüstung",
    description: "Energieeffiziente Beleuchtung für moderne Werbeanlagen.",
    subtitle: "Nachhaltige Technik für Ihre Außenwerbung",
    image: led1,
    link: "/led-umruestung"
  },
  {
    title: "Folientechnik",
    description: "Kreative Foliengestaltung für Schaufenster und Fahrzeuge.",
    subtitle: "Individuelle Lösungen für Ihre Werbeflächen",
    image: heroFolientechnik,
    link: "/folientechnik"
  },
  {
    title: "Montage & Anfertigung",
    description: "Von der Planung bis zur Installation – alles aus einer Hand.",
    subtitle: "Komplettservice für Ihre Werbeanlagen",
    image: heroMontage,
    link: "/montage-anfertigung"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const didSwipe = useRef(false);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoSlideTimer = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 20000);
  }, []);

  const goToSlide = useCallback(
    (direction: 1 | -1) => {
      setCurrentSlide((prev) => (prev + direction + heroSlides.length) % heroSlides.length);
      resetAutoSlideTimer();
    },
    [resetAutoSlideTimer],
  );

  // Auto-slide nach 20 Sekunden
  useEffect(() => {
    resetAutoSlideTimer();
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [resetAutoSlideTimer]);

  // Wischen per Touch und Maus (Desktop)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const minSwipeDistance = 50;
    const directionThreshold = 12;

    const resetDragState = (event: PointerEvent) => {
      dragStartX.current = null;
      dragStartY.current = null;
      isHorizontalSwipe.current = null;
      if (hero.hasPointerCapture(event.pointerId)) {
        hero.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragStartX.current = event.clientX;
      dragStartY.current = event.clientY;
      isHorizontalSwipe.current = null;
      didSwipe.current = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (dragStartX.current === null || dragStartY.current === null) return;

      const diffX = Math.abs(event.clientX - dragStartX.current);
      const diffY = Math.abs(event.clientY - dragStartY.current);

      if (diffX < directionThreshold && diffY < directionThreshold) return;

      if (isHorizontalSwipe.current === null) {
        isHorizontalSwipe.current = diffX > diffY;
        if (isHorizontalSwipe.current) {
          hero.setPointerCapture(event.pointerId);
        }
      }

      if (isHorizontalSwipe.current) {
        event.preventDefault();
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragStartX.current === null || dragStartY.current === null) {
        resetDragState(event);
        return;
      }

      if (isHorizontalSwipe.current) {
        const diff = dragStartX.current - event.clientX;

        if (Math.abs(diff) > minSwipeDistance) {
          didSwipe.current = true;
          goToSlide(diff > 0 ? 1 : -1);
        }
      }

      resetDragState(event);
    };

    const handlePointerCancel = (event: PointerEvent) => {
      resetDragState(event);
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (!didSwipe.current) return;
      event.preventDefault();
      event.stopPropagation();
      didSwipe.current = false;
    };

    hero.addEventListener("pointerdown", handlePointerDown);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerup", handlePointerUp);
    hero.addEventListener("pointercancel", handlePointerCancel);
    hero.addEventListener("click", handleClickCapture, true);

    return () => {
      hero.removeEventListener("pointerdown", handlePointerDown);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerup", handlePointerUp);
      hero.removeEventListener("pointercancel", handlePointerCancel);
      hero.removeEventListener("click", handleClickCapture, true);
    };
  }, [goToSlide]);

  return <div className="min-h-screen bg-background">
      <MegaMenu />
      
      {/* Hero Section with Fullscreen Slideshow */}
      <section
        ref={heroRef}
        className="relative min-h-[420px] h-[52vh] sm:h-[560px] md:h-[700px] lg:h-[800px] max-h-[860px] overflow-hidden touch-pan-y select-none md:cursor-grab md:active:cursor-grabbing"
      >
        {/* Slides: image + text together */}
        {heroSlides.map((slide, index) => {
          let translateX = '100%';
          if (index === currentSlide) {
            translateX = '0%';
          } else if (index < currentSlide) {
            translateX = '-100%';
          }

          return (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translateX})` }}
              aria-hidden={index !== currentSlide}
            >
              <img
                src={slide.image}
                alt={slide.title}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
                style={{ objectPosition: slide.imagePosition || 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

              <div className="absolute inset-0 z-10 flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold mb-4">
                      {slide.title}
                    </span>
                    {index === currentSlide ? (
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        {slide.description}
                      </h1>
                    ) : (
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        {slide.description}
                      </h2>
                    )}
                    <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 select-auto">
                      <Link to={slide.link} draggable={false}>
                        <Button size="lg" className="group w-full sm:w-auto">
                          Mehr erfahren
                          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/kontakt" draggable={false}>
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                          Kontakt aufnehmen
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slide Indicators */}
        <div className="absolute bottom-3 md:bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 md:gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentSlide(index);
                resetAutoSlideTimer();
              }}
              className="flex h-8 w-8 items-center justify-center md:h-10 md:w-10"
              aria-label={`Slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "h-2 w-5 bg-primary md:h-2.5 md:w-7"
                    : "h-2 w-2 bg-white/50 hover:bg-white/80 md:h-2.5 md:w-2.5"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      <PromoMarquee />

      <section className="border-y border-border bg-gradient-to-r from-muted/50 via-background to-muted/50 py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
              <Bot className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-foreground">
                Fragen? Sprechen Sie mit {ASSISTANT_NAME} — unserem KI-Assistenten
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                Sofort Antworten zu Leistungen, Öffnungszeiten, Preisen und Ablauf — danach gern per WhatsApp an unser Team.
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              className="w-full shrink-0 bg-[#25D366] text-white hover:bg-[#20BD5A] sm:w-auto"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_DAVE_CHAT_EVENT))}
            >
              <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
              Chat starten
            </Button>
          </div>
        </div>
      </section>

      {/* Verlässlichkeit – Text mit Teamfoto */}
      <section className="bg-gradient-to-b from-background via-muted/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            <ContentImageBlock
              badge="Seit über 35 Jahren"
              title="Wo Verlässlichkeit zur Betriebsstrategie gehört"
              description="Unser familiengeführter Betrieb mit langjähriger Erfahrung betreut Kunden von München bis Freilassing – persönlich, zuverlässig und direkt vor Ort."
              image={montageApotheke}
              imageAlt="Monteur von Win Neonlicht-Service bei der Arbeit an einer Leuchtreklame"
              imagePosition="right"
              imageObjectPosition="center 20%"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Kontaktieren Sie uns
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/ueber-uns">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Mehr über uns
                  </Button>
                </Link>
              </div>
            </ContentImageBlock>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">35+ Jahre Erfahrung</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Seit über drei Jahrzehnten stehen wir für Qualität, Zuverlässigkeit und professionelle Dienstleistungen.
                </p>
              </div>

              <div className="bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Familienunternehmen</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bei uns kennt man sich noch. Persönlicher Kontakt und individuelle Lösungen für jeden Kunden.
                </p>
              </div>

              <div className="bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Regionale Präsenz</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Von München bis Freilassing – maßgeschneiderte Lösungen direkt bei Ihnen vor Ort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungsbereiche – Text mit passenden Fotos */}
      <section className="bg-gradient-to-b from-muted/30 via-background to-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            <RevealOnScroll>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold mb-6">
                  Unsere Dienstleistungen
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Unsere Leistungsbereiche
                </h2>
                <span className="reveal-heading-line" aria-hidden="true" />
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
                  Professionelle Lösungen für Gebäudereinigung und Werbetechnik – maßgeschneidert auf Ihre Anforderungen.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
              badge="Gebäudereinigung"
              title="Saubere Objekte, gepflegter Auftritt"
              description="Von der Fassade bis zum Fenster: Wir sorgen für Sauberkeit, Werterhalt und ein professionelles Erscheinungsbild Ihrer Immobilie."
              image={fassade2}
              imageAlt="Professionelle Fassadenreinigung"
              imagePosition="right"
            >
              <div className="grid grid-cols-1 gap-3">
                <Link to="/fassadenreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Fassadenreinigung</span>
                </Link>
                <Link to="/fensterreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Fensterreinigung</span>
                </Link>
                <Link to="/leuchtreklamenreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Leuchtreklamenreinigung</span>
                </Link>
                <Link to="/apothekenreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Apothekenreinigung</span>
                </Link>
                <Link to="/bueroreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Büroreinigung</span>
                </Link>
                <Link to="/unterhaltsreinigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Unterhaltsreinigung</span>
                </Link>
              </div>
            </ContentImageBlock>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
              badge="Werbetechnik"
              title="Leuchtkraft, die auffällt"
              description="Planung, Herstellung, Montage und Wartung von Werbeanlagen – von der LED-Umrüstung bis zur kompletten Neuanfertigung."
              image={leuchtreklame2}
              imageAlt="Leuchtreklame Montage und Wartung"
              imagePosition="left"
            >
              <div className="grid grid-cols-1 gap-3">
                <Link to="/folientechnik" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Folientechnik</span>
                </Link>
                <Link to="/led-umruestung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">LED-Umrüstung</span>
                </Link>
                <Link to="/montage-anfertigung" className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Montage & Anfertigung</span>
                </Link>
              </div>
            </ContentImageBlock>
            </RevealOnScroll>

            <RevealOnScroll direction="left" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
              badge="Vor Ort"
              title="Montage und Service direkt bei Ihnen"
              description="Unser Team arbeitet sicher und professionell – auch in der Höhe und bei laufendem Betrieb, wie an Apotheken, Büros und Geschäften in der Region."
              image={montage3}
              imageAlt="Montage einer Leuchtreklame auf Gerüst vor Ort"
              imagePosition="right"
              imageObjectPosition="center 35%"
            >
              <Link to="/kontakt" className="w-full sm:w-auto inline-block">
                <Button size="lg" className="group w-full sm:w-auto min-h-11">
                  Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </ContentImageBlock>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <AnimatedStats />

      {/* So einfach geht's – mit Bild */}
      <section className="bg-gradient-to-b from-background via-muted/20 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold mb-6">
                Unser Prozess
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                So einfach geht's
              </h2>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                Von der ersten Kontaktaufnahme bis zur erfolgreichen Durchführung – unser transparenter Prozess macht die Zusammenarbeit einfach und effizient.
              </p>
            </div>

            <ContentImageBlock
              badge="Schritt für Schritt"
              title="Besichtigung, Angebot, Umsetzung"
              description="Wir besichtigen Ihr Objekt vor Ort, erstellen ein faires Angebot und setzen den Auftrag termingerecht um – transparent und zuverlässig."
              image={apotheke2}
              imageAlt="Fertig montierte Leuchtreklame an einer Apotheke"
              imagePosition="left"
              imageObjectPosition="center 40%"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              {/* Step 1 */}
              <div className="relative bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="absolute -top-3 left-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    01
                  </span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mt-2 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Kontaktaufnahme</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rufen Sie uns an oder schreiben Sie uns eine E-Mail mit Ihrem Anliegen.
                </p>
                {/* Connecting line - visible on lg screens */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30"></div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="absolute -top-3 left-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    02
                  </span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mt-2 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Kostenlose Besichtigung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir besichtigen die Objekte vor Ort und analysieren Ihren Bedarf.
                </p>
                {/* Connecting line */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30"></div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="absolute -top-3 left-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    03
                  </span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mt-2 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Angebot & Termin</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sie erhalten ein verbindliches Angebot und wir vereinbaren einen passenden Termin.
                </p>
                {/* Connecting line */}
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30"></div>
              </div>

              {/* Step 4 */}
              <div className="relative bg-card border border-border p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="absolute -top-3 left-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                    04
                  </span>
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mt-2 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Professionelle Umsetzung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir führen den Auftrag zuverlässig und termingerecht durch.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto min-h-11">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;