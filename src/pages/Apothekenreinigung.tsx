import { Shield, Lightbulb, Clock, CheckCircle } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroApotheke from "@/assets/hero-apotheke.jpg";
import apotheke1 from "@/assets/apotheke-1.jpg";
import apotheke2 from "@/assets/apotheke-2.jpg";

const Apothekenreinigung = () => (
  <ServicePageLayout
    heroImage={heroApotheke}
    title="Apothekenreinigung"
    subtitle="Hygienische Reinheit für höchste Ansprüche — von der Offizin bis zum Apotheken-A"
    highlights={[
      "Reinigungskonzept für sensible pharmazeutische Bereiche",
      "Pflege von Glasflächen, Türen und Leuchtreklame",
      "Diskret außerhalb Ihrer Öffnungszeiten",
    ]}
    storyBlocks={[
      {
        badge: "Hygiene",
        title: "Vertrauen beginnt mit Sauberkeit",
        paragraphs: [
          "In Apotheken gelten besondere Anforderungen an Sauberkeit und Hygiene. Kunden erwarten ein makelloses Umfeld, das Vertrauen und Gesundheit ausstrahlt.",
          "Wir bieten ein Reinigungskonzept, das speziell auf die sensiblen Bereiche einer Apotheke abgestimmt ist — von der Offizin bis zum Labor.",
        ],
        image: apotheke1,
        imageAlt: "Apotheke am Stadtcenter — sauber und einladend",
        imagePosition: "right",
      },
      {
        badge: "Leuchtreklame",
        title: "Apotheken-A und Außenwirkung",
        paragraphs: [
          "Neben Boden- und Oberflächenreinigung kümmern wir uns um repräsentative Glasflächen, automatische Türen und das leuchtende Apotheken-A.",
          "So wirkt Ihre Apotheke innen wie außen gepflegt — professionell und vertrauenswürdig.",
        ],
        image: apotheke2,
        imageAlt: "Gepflegte Leuchtreklame an einer Apotheke",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Shield, title: "Höchste Hygiene", description: "Spezielle Konzepte für sensible pharmazeutische Bereiche." },
      { icon: Lightbulb, title: "Apotheken-A", description: "Professionelle Pflege von Leuchtreklame und Notdienst-Anzeige." },
      { icon: Clock, title: "Diskrete Zeiten", description: "Reinigung außerhalb der Öffnungszeiten für ungestörten Betrieb." },
      { icon: CheckCircle, title: "Zuverlässigkeit", description: "Eingespieltes Team mit Erfahrung im pharmazeutischen Bereich." },
    ]}
    forWhom={["Stadt-Apotheken", "Filialapotheken", "Apotheken mit Notdienst", "Gesundheitszentren"]}
    relatedServices={[
      { name: "Leuchtreklamenreinigung", link: "/leuchtreklamenreinigung" },
      { name: "Unterhaltsreinigung", link: "/unterhaltsreinigung" },
    ]}
  />
);

export default Apothekenreinigung;
