import { Building, Leaf, Shield, Sparkles } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroFassade from "@/assets/hero-fassadenreinigung.jpg";
import fassade2 from "@/assets/fassade-2.jpg";
import fassade3 from "@/assets/fassade-3.jpg";

const Fassadenreinigung = () => (
  <ServicePageLayout
    heroImage={heroFassade}
    heroObjectPosition="left center"
    title="Fassadenreinigung"
    subtitle="Schonende Reinigung für Putz, Stein, Metall und Glas"
    highlights={[
      "Algen, Moos und Ruß zuverlässig entfernen",
      "Materialgerechte Verfahren für jeden Untergrund",
      "Kombinierbar mit Fenster- und Leuchtreklamenreinigung",
    ]}
    storyBlocks={[
      {
        badge: "Vorher & nachher",
        title: "Eine saubere Fassade macht den Unterschied",
        paragraphs: [
          "Verschmutzte Außenwände wirken schnell ungepflegt — und können langfristig die Bausubstanz schädigen. Algen, Moos und Ruß setzen sich besonders an schattigen Stellen fest.",
          "Wir reinigen Fassaden gründlich und schonend. Je nach Material wählen wir das passende Verfahren, damit Putz, Stein, Metall oder Glas sauber werden, ohne beschädigt zu werden.",
        ],
        image: fassade2,
        imageAlt: "Frisch gereinigte Bäckerei-Fassade",
        imagePosition: "right",
      },
      {
        badge: "Im Detail",
        title: "Auch schwer erreichbare Flächen",
        paragraphs: [
          "Vordächer, Jalousien und Glasflächen an der Außenwand gehören oft dazu — genauso wie großflächige Glasfassaden.",
          "Gerade bei Gewerbeimmobilien lohnt sich eine regelmäßige Pflege: Die Immobilie wirkt gepflegt, und teure Sanierungen lassen sich vermeiden.",
        ],
        image: fassade3,
        imageAlt: "Glasfassade nach professioneller Reinigung",
        imagePosition: "left",
        imageObjectPosition: "center",
      },
    ]}
    features={[
      { icon: Leaf, title: "Algen & Moos", description: "Gründliche Beseitigung von Bewuchs und Umweltablagerungen." },
      { icon: Building, title: "Alle Fassadenarten", description: "Putz, Naturstein, Metall und Glas — passend gereinigt." },
      { icon: Shield, title: "Materialschonend", description: "Schonende Methoden ohne unnötige Belastung der Oberfläche." },
      { icon: Sparkles, title: "Werterhalt", description: "Gepflegte Fassaden schützen Bausubstanz und Immobilienwert." },
    ]}
    forWhom={["Einzelhandel", "Gastronomie", "Wohnanlagen", "Gewerbeimmobilien"]}
    relatedServices={[
      { name: "Fensterreinigung", link: "/fensterreinigung" },
      { name: "Leuchtreklamenreinigung", link: "/leuchtreklamenreinigung" },
    ]}
  />
);

export default Fassadenreinigung;
