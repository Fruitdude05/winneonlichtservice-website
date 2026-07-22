import { Award, Users, Clock, Shield, Leaf, Zap, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContentImageBlock from "@/components/ContentImageBlock";
import RevealOnScroll from "@/components/RevealOnScroll";
import bueroReinigung from "@/assets/buero-reinigung.png";
import apotheke1 from "@/assets/apotheke-1.jpg";
import heroUnterhalt from "@/assets/hero-unterhalt.jpg";
import leuchtreklame4 from "@/assets/leuchtreklame-4.jpg";

const values = [
  { icon: Award, title: "Qualität", description: "Über 35 Jahre Erfahrung — jedes Projekt mit Anspruch." },
  { icon: Users, title: "Familienkompetenz", description: "Eingespieltes Team, kurze Wege, persönlicher Kontakt." },
  { icon: Clock, title: "Zuverlässigkeit", description: "Pünktlich und planbar — seit Jahrzehnten." },
  { icon: Shield, title: "Vertrauen", description: "Langfristige Kundenbeziehungen in der Region." },
  { icon: Leaf, title: "Nachhaltigkeit", description: "Umweltbewusst reinigen, effizient mit LED umrüsten." },
  { icon: Zap, title: "Innovation", description: "Moderne Technik und stetige Weiterentwicklung." },
];

const serviceAreas = [
  {
    category: "Gebäudereinigung",
    links: [
      { name: "Fassadenreinigung", href: "/fassadenreinigung" },
      { name: "Fensterreinigung", href: "/fensterreinigung" },
      { name: "Leuchtreklamenreinigung", href: "/leuchtreklamenreinigung" },
      { name: "Apothekenreinigung", href: "/apothekenreinigung" },
      { name: "Büroreinigung", href: "/bueroreinigung" },
      { name: "Unterhaltsreinigung", href: "/unterhaltsreinigung" },
    ],
  },
  {
    category: "Werbetechnik",
    links: [
      { name: "Folientechnik", href: "/folientechnik" },
      { name: "LED-Umrüstung", href: "/led-umruestung" },
      { name: "Montage & Anfertigung", href: "/montage-anfertigung" },
    ],
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <MegaMenu />

      <PageHero
        image={bueroReinigung}
        title="Über uns"
        subtitle="Professionell und gründlich — auch im Büro. Familienbetrieb für Gebäudereinigung und Werbetechnik seit über 35 Jahren."
        height="md"
        objectPosition="center 40%"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="max-w-3xl mx-auto text-center mb-8">
                <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold mb-6">
                  Über uns
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Wer wir sind — in Kürze
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Was als kleiner Familienbetrieb begann, ist heute ein etabliertes Unternehmen
                  von München bis Freilassing. Wir reinigen Gebäude und kümmern uns um Lichtwerbung —
                  persönlich, zuverlässig und direkt vor Ort.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="reveal-card flex flex-col items-center text-center gap-2 py-4">
                  <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="text-sm md:text-base font-medium text-foreground">35+ Jahre Erfahrung</span>
                </div>
                <div className="reveal-card flex flex-col items-center text-center gap-2 py-4">
                  <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="text-sm md:text-base font-medium text-foreground">München — Freilassing</span>
                </div>
                <div className="reveal-card flex flex-col items-center text-center gap-2 py-4">
                  <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="text-sm md:text-base font-medium text-foreground">Familienunternehmen</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            <RevealOnScroll direction="left" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
                badge="Familienunternehmen"
                title="Persönlich statt anonym"
                paragraphs={[
                  "Bei uns sprechen Sie mit Menschen, die Ihr Projekt kennen — nicht mit einer Hotline. Wir planen, reinigen und montieren selbst und übernehmen Verantwortung von Anfang bis Ende.",
                  "Faire Preise, professionelle Arbeit und wenig Stress für Sie: So arbeiten Familienbetriebe, die seit Generationen in der Region fest verwurzelt sind.",
                ]}
                image={apotheke1}
                imageAlt="Apotheke am Stadtcenter — einer unserer langjährigen Kunden in der Region"
                imagePosition="right"
                imageObjectPosition="center 35%"
              />
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
                badge="Gebäudereinigung"
                title="Professionell und gründlich — auch im Büro"
                paragraphs={[
                  "Saubere Räume wirken professionell und geben Mitarbeitern und Kunden ein gutes Gefühl. Wir reinigen Büros, Praxen und Gewerbeflächen zuverlässig und gründlich.",
                  "Mit professioneller Ausrüstung und eingespielten Abläufen sorgen wir für hygienische, gepflegte Umgebungen — termingerecht und ohne Umwege.",
                ]}
                image={heroUnterhalt}
                imageAlt="Professionelle Unterhaltsreinigung in einem modernen Bürogebäude"
                imagePosition="left"
                imageObjectPosition="center 30%"
              />
            </RevealOnScroll>

            <RevealOnScroll direction="left" className="reveal-card reveal-card--flush w-full">
              <ContentImageBlock
                badge="Werbetechnik"
                title="Reinigung und Werbetechnik — aus einer Hand"
                paragraphs={[
                  "Vom Schaufenster bis zur Leuchtreklame an der Fassade: Wir sorgen dafür, dass Ihre Immobilie und Ihre Werbung gepflegt wirken.",
                  "Dazu gehören Fassaden- und Fensterreinigung ebenso wie Folierung, LED-Umrüstung und die Anfertigung neuer Werbeanlagen.",
                ]}
                image={leuchtreklame4}
                imageAlt="Wartung und Reinigung einer Leuchtreklame vor Ort"
                imagePosition="right"
                imageObjectPosition="center 40%"
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Unsere Leistungen
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Zwei Bereiche, ein Ansprechpartner — klicken Sie direkt zur passenden Seite.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {serviceAreas.map((area, index) => (
              <RevealOnScroll
                key={area.category}
                direction={index === 0 ? "left" : "right"}
                className="reveal-card h-full flex flex-col"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">{area.category}</h3>
                <ul className="space-y-2">
                  {area.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group flex items-center justify-between text-sm md:text-base text-muted-foreground hover:text-primary transition-colors py-2"
                      >
                        {link.name}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Unsere Werte
              </h2>
              <p className="text-muted-foreground">Sauber — Einfach — Planbar</p>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <RevealOnScroll
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 80}
                  className="reveal-card text-center h-full"
                >
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-base font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
