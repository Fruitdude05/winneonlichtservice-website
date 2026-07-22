import { Calendar, DollarSign, FileText, User } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroUnterhalt from "@/assets/hero-unterhalt.jpg";
import fassade2 from "@/assets/fassade-2.jpg";

const Unterhaltsreinigung = () => (
  <ServicePageLayout
    heroImage={heroUnterhalt}
    title="Unterhaltsreinigung"
    subtitle="Dauerhafte Sauberkeit in festen Intervallen — planbar und zuverlässig"
    highlights={[
      "Täglich, wöchentlich oder monatlich nach Bedarf",
      "Transparente Preise und feste Ansprechpartner",
      "Gebäude- und Leuchtreklamen-Pflege aus einer Hand",
    ]}
    storyBlocks={[
      {
        badge: "Regelmäßig",
        title: "Sauberkeit als Daueraufgabe",
        paragraphs: [
          "Sauberkeit ist kein einmaliges Ereignis, sondern ein fortlaufender Prozess. Mit unserer Unterhaltsreinigung sichern Sie sich ein konstant gepflegtes Erscheinungsbild.",
          "Wir kommen in festgelegten Intervallen und erledigen alle anfallenden Arbeiten routiniert und gründlich.",
        ],
        image: heroUnterhalt,
        imageAlt: "Unterhaltsreinigung in einem modernen Gewerbegebäude",
        imagePosition: "right",
        imageObjectPosition: "center 30%",
      },
      {
        badge: "Aus einer Hand",
        title: "Gebäude und Werbeanlagen",
        paragraphs: [
          "Besonders attraktiv für Besitzer von Lichtwerbeanlagen: Wartungsverträge verbinden Gebäudereinigung und Leuchtreklamen-Pflege.",
          "Alles aus einer Hand — für einen dauerhaft gepflegten Auftritt Ihrer Immobilie.",
        ],
        image: fassade2,
        imageAlt: "Gepflegte Gewerbefassade durch regelmäßige Reinigung",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Calendar, title: "Feste Intervalle", description: "Täglich, wöchentlich oder monatlich — ganz nach Ihrem Bedarf." },
      { icon: DollarSign, title: "Planbare Kosten", description: "Transparente Preise und kalkulierbare monatliche Ausgaben." },
      { icon: FileText, title: "Wartungsverträge", description: "Gebäudereinigung und Leuchtreklamen-Pflege kombiniert." },
      { icon: User, title: "Fester Ansprechpartner", description: "Ein persönlicher Kontakt für alle Reinigungsfragen." },
    ]}
    forWhom={["Einzelhandel", "Bürogebäude", "Apotheken", "Praxen", "Gewerbeimmobilien"]}
    relatedServices={[
      { name: "Büroreinigung", link: "/bueroreinigung" },
      { name: "Fassadenreinigung", link: "/fassadenreinigung" },
    ]}
  />
);

export default Unterhaltsreinigung;
