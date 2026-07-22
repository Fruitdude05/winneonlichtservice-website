import { Lightbulb, Sparkles, Shield, Eye } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroLeucht from "@/assets/hero-leuchtreklamen.jpg";
import leuchtreklame2 from "@/assets/leuchtreklame-2.jpg";
import leuchtreklame4 from "@/assets/leuchtreklame-4.jpg";

const Leuchtreklamenreinigung = () => (
  <ServicePageLayout
    heroImage={heroLeucht}
    heroObjectPosition="center 32%"
    title="Leuchtreklamenreinigung"
    subtitle="Professionelle Reinigung von Lichtwerbeanlagen innen und außen"
    highlights={[
      "Innen- und Außenreinigung von Leuchtkästen und Buchstaben",
      "Politur von Plexiglas für maximale Leuchtkraft",
      "Sichtprüfung auf Sicherheit und Funktion",
    ]}
    storyBlocks={[
      {
        badge: "Sichtbarkeit",
        title: "Ihre Werbung soll leuchten — nicht stumpf wirken",
        paragraphs: [
          "Leuchtreklamen sind oft das Erste, was Passanten sehen. Staub, Abgase und Witterung lassen Plexiglas und Gehäuse mit der Zeit matt werden — die Leuchtkraft sinkt spürbar.",
          "Wir reinigen Leuchtkästen und 3D-Buchstaben innen und außen. Das Ergebnis: Ihre Marke wirkt wieder klar, hell und gepflegt.",
        ],
        image: leuchtreklame2,
        imageAlt: "Frisch gereinigtes Leuchtschild an einem Reisebüro",
        imagePosition: "right",
      },
      {
        badge: "Spezialwissen",
        title: "Mehr als nur abwischen",
        paragraphs: [
          "Plexiglasoberflächen behandeln wir mit Politur und Antistatikmitteln — so bleibt die Anlage länger sauber und leuchtet gleichmäßiger.",
          "Bei jeder Reinigung prüfen wir die Anlage auf Sicherheit und Funktion. Defekte erkennen wir frühzeitig, bevor sie teuer werden.",
        ],
        image: leuchtreklame4,
        imageAlt: "Wartung und Politur von Metallbuchstaben",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Lightbulb, title: "Mehr Leuchtkraft", description: "Saubere Flächen lassen Ihre Werbung wieder hell wirken." },
      { icon: Sparkles, title: "Plexiglas-Politur", description: "Sorgfältige Behandlung für langanhaltenden Glanz." },
      { icon: Shield, title: "Antistatik-Schutz", description: "Verzögert neue Verschmutzung und erleichtert die Pflege." },
      { icon: Eye, title: "Sicherheitsprüfung", description: "Kontrolle aller Bauteile während der Reinigung." },
    ]}
    forWhom={["Apotheken", "Banken", "Einzelhandel", "Gastronomie"]}
    relatedServices={[
      { name: "Fassadenreinigung", link: "/fassadenreinigung" },
      { name: "LED-Umrüstung", link: "/led-umruestung" },
    ]}
  />
);

export default Leuchtreklamenreinigung;
