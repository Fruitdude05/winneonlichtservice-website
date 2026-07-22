import { Briefcase, Monitor, Trash2, Sparkles } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroBuero from "@/assets/hero-buero.jpg";
import bueroReinigung from "@/assets/buero-reinigung.png";

const Bueroreinigung = () => (
  <ServicePageLayout
    heroImage={heroBuero}
    title="Büroreinigung"
    subtitle="Gründliche Reinigung für produktive und gepflegte Arbeitsplätze"
    highlights={[
      "Reinigungsplan passend zu Ihrer Bürostruktur",
      "Schreibtische, Sanitär, Küche und Böden",
      "Diskret und termingerecht — auch außerhalb der Kernzeiten",
    ]}
    storyBlocks={[
      {
        badge: "Arbeitsumfeld",
        title: "Ein Büro zum Wohlfühlen",
        paragraphs: [
          "Saubere Büros motivieren Mitarbeiter und hinterlassen bei Besuchern einen professionellen Eindruck.",
          "Wir sorgen im Hintergrund für Frische und Ordnung — damit Sie sich voll auf Ihre Arbeit konzentrieren können.",
        ],
        image: bueroReinigung,
        imageAlt: "Professionelle Büroreinigung am Arbeitsplatz",
        imagePosition: "right",
        imageObjectPosition: "center 40%",
      },
      {
        badge: "Im Detail",
        title: "Individuell abgestimmt",
        paragraphs: [
          "Ob Schreibtische, Sanitäranlagen, Küchenbereiche oder Böden — wir erstellen einen Plan, der exakt auf Ihre Bürostruktur und Arbeitszeiten zugeschnitten ist.",
          "Monitore und Tastaturen reinigen wir nach Absprache — gründlich, aber materialschonend.",
        ],
        image: heroBuero,
        imageAlt: "Gepflegtes Bürogebäude nach professioneller Reinigung",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Monitor, title: "Arbeitsplätze", description: "Reinigung von Schreibtischen und Technik nach Absprache." },
      { icon: Sparkles, title: "Sanitärbereiche", description: "Hygienische Pflege von WC-Anlagen und Teeküchen." },
      { icon: Trash2, title: "Entsorgung", description: "Leeren von Papierkörben und fachgerechte Mülltrennung." },
      { icon: Briefcase, title: "Bodenpflege", description: "Gründliches Saugen und Wischen aller Bodenflächen." },
    ]}
    forWhom={["Büros", "Praxen", "Kanzleien", "Verwaltungen", "Coworking-Spaces"]}
    relatedServices={[
      { name: "Unterhaltsreinigung", link: "/unterhaltsreinigung" },
      { name: "Fensterreinigung", link: "/fensterreinigung" },
    ]}
  />
);

export default Bueroreinigung;
