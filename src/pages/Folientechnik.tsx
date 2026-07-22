import { Film, Palette, Shield, Trash2 } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroFolie from "@/assets/hero-folientechnik.jpg";
import folie1 from "@/assets/folie-1.jpg";
import folie2 from "@/assets/folie-2.jpg";

const Folientechnik = () => (
  <ServicePageLayout
    heroImage={heroFolie}
    title="Folientechnik"
    subtitle="Beschriftung und Folierung für Schaufenster, Glas und Werbeträger"
    highlights={[
      "Schaufensterbeschriftung und Sichtschutzfolien",
      "Individuelle Designs nach Ihren Vorgaben",
      "Rückstandslose Entfernung bei Mieterwechsel",
    ]}
    storyBlocks={[
      {
        badge: "Sichtbar werben",
        title: "Ihr Schaufenster als Werbefläche",
        paragraphs: [
          "Glasflächen bieten viel Platz für Werbung, Sichtschutz oder dekorative Akzente — ohne teure Umbauten. Mit Folien setzen wir Ihre Botschaft schnell und flexibel um.",
          "Ob Aktionsschild, dauerhafte Beschriftung oder Sichtschutz für Büros: Wir beraten Sie, gestalten mit und montieren blasenfrei vor Ort.",
        ],
        image: folie1,
        imageAlt: "Professionell foliertes Schaufensterschild",
        imagePosition: "right",
      },
      {
        badge: "Flexibel",
        title: "Wechseln, wenn es nötig ist",
        paragraphs: [
          "Aktionen enden, Mieter wechseln — Folien lassen sich bei Bedarf rückstandslos entfernen. So bleibt Ihre Fläche flexibel nutzbar.",
          "Wir arbeiten mit UV-beständigen Premium-Folien in brillanten Farben, die lange halten und wetterfest sind.",
        ],
        image: folie2,
        imageAlt: "Montage von Werbeschildern und Folien",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Film, title: "Premium-Folien", description: "UV-beständig, wetterfest und langlebig." },
      { icon: Palette, title: "Individuelle Gestaltung", description: "Designs nach Ihren Vorstellungen und CI-Vorgaben." },
      { icon: Shield, title: "Blasenfreie Montage", description: "Professionelle Verklebung für makellose Ergebnisse." },
      { icon: Trash2, title: "Saubere Entfernung", description: "Folien lassen sich rückstandslos wieder entfernen." },
    ]}
    forWhom={["Einzelhandel", "Apotheken", "Büros", "Gastronomie"]}
    relatedServices={[
      { name: "Montage & Anfertigung", link: "/montage-anfertigung" },
      { name: "LED-Umrüstung", link: "/led-umruestung" },
    ]}
  />
);

export default Folientechnik;
