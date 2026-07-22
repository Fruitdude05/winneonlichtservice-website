import { Zap, DollarSign, Leaf, Sun } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroLed from "@/assets/hero-led-umruestung.jpg";
import led1 from "@/assets/led-1.jpg";
import led3 from "@/assets/led-3.jpg";

const LEDUmruestung = () => (
  <ServicePageLayout
    heroImage={heroLed}
    title="LED-Umrüstung"
    subtitle="Bis zu 80 % weniger Stromverbrauch — ohne weniger Leuchtkraft"
    highlights={[
      "Bis zu 80 % Energieeinsparung gegenüber alter Technik",
      "Längere Lebensdauer, weniger Ausfälle",
      "Umbau oft in bestehende Gehäuse möglich",
    ]}
    storyBlocks={[
      {
        badge: "Kosten senken",
        title: "Alte Leuchtmittel fressen Strom — LEDs sparen",
        paragraphs: [
          "Leuchtstoffröhren und Neon-Systeme verbrauchen viel Energie und sind teuer im Unterhalt. Viele Betriebe zahlen jahrelang zu viel — ohne es zu merken.",
          "Mit einer LED-Umrüstung senken Sie Ihre Stromkosten deutlich. Die Anlage leuchtet gleichmäßiger, flackert nicht und hält länger.",
        ],
        image: led1,
        imageAlt: "Modernes LED-Leuchtschild nach Umrüstung",
        imagePosition: "right",
      },
      {
        badge: "Praxisnah",
        title: "Umrüsten statt komplett neu kaufen",
        paragraphs: [
          "Oft reicht es, die Leuchtmittel in bestehenden Gehäusen auszutauschen — unkompliziert und wirtschaftlich. Wir prüfen Ihre Anlage und empfehlen die passende Lösung.",
          "Das Ergebnis: gleiche oder bessere Ausleuchtung, deutlich weniger Wartung und ein Beitrag zum Klimaschutz.",
        ],
        image: led3,
        imageAlt: "LED-Verkabelung in einer Leuchtreklame",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Zap, title: "Weniger Stromverbrauch", description: "Deutlich niedrigere Energiekosten im Betrieb." },
      { icon: DollarSign, title: "Geringere Wartung", description: "Langlebige Module, weniger Reparaturen." },
      { icon: Leaf, title: "Umweltfreundlich", description: "Kein Quecksilber, weniger CO₂." },
      { icon: Sun, title: "Bessere Lichtqualität", description: "Homogene, helle Ausleuchtung ohne Flackern." },
    ]}
    forWhom={["Einzelhandel", "Apotheken", "Gastronomie", "Gewerbebetriebe"]}
    relatedServices={[
      { name: "Leuchtreklamenreinigung", link: "/leuchtreklamenreinigung" },
      { name: "Montage & Anfertigung", link: "/montage-anfertigung" },
    ]}
  />
);

export default LEDUmruestung;
