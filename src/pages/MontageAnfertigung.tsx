import { Settings, Hammer, FileCheck, Award } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroMontage from "@/assets/hero-montage.jpg";
import montage3 from "@/assets/montage-3.jpg";
import montage5 from "@/assets/montage-5.jpg";

const MontageAnfertigung = () => (
  <ServicePageLayout
    heroImage={heroMontage}
    title="Montage & Anfertigung"
    subtitle="Planung, Produktion und Montage von Werbeanlagen — aus einer Hand"
    highlights={[
      "Maßanfertigung nach Ihren Designvorgaben",
      "Montage inklusive Hubsteiger-Einsatz",
      "Unterstützung bei Genehmigungen",
    ]}
    storyBlocks={[
      {
        badge: "Individuell",
        title: "Ihre Marke an der Fassade — exakt nach Maß",
        paragraphs: [
          "Ob 3D-Buchstaben, Leuchtkasten oder Pylon: Wir fertigen Werbeanlagen aus Aluminium, Edelstahl, Messing oder Acrylglas — passgenau nach Ihrem Design.",
          "Von der ersten Skizze bis zur fertigen Anlage an der Wand begleiten wir Sie. So wird aus einer Idee ein sichtbares Zeichen für Ihr Unternehmen.",
        ],
        image: montage5,
        imageAlt: "Anfertigung von Werbeschildern in der Werkstatt",
        imagePosition: "right",
      },
      {
        badge: "Vor Ort",
        title: "Montage sicher und termingerecht",
        paragraphs: [
          "Unser Montageteam installiert auch in der Höhe — mit Hubsteiger, Gerüst und Erfahrung. Apotheken, Läden und Büros betreuen wir auch bei laufendem Betrieb.",
          "Genehmigungen für Absperrungen oder Gehwegnutzung übernehmen wir auf Wunsch mit — damit vor Ort alles reibungslos läuft.",
        ],
        image: montage3,
        imageAlt: "Montage von Leuchtbuchstaben mit Hubsteiger",
        imagePosition: "left",
        imageObjectPosition: "center 35%",
      },
    ]}
    features={[
      { icon: Settings, title: "Maßanfertigung", description: "Individuelle Anlagen exakt nach Ihren Vorgaben." },
      { icon: Hammer, title: "Profimontage", description: "Sichere Installation durch erfahrene Monteure." },
      { icon: FileCheck, title: "Genehmigungen", description: "Unterstützung bei Anträgen im öffentlichen Raum." },
      { icon: Award, title: "Hochwertige Materialien", description: "Witterungsbeständig und langlebig." },
    ]}
    forWhom={["Apotheken", "Einzelhandel", "Gastronomie", "Industrie"]}
    relatedServices={[
      { name: "Folientechnik", link: "/folientechnik" },
      { name: "LED-Umrüstung", link: "/led-umruestung" },
    ]}
  />
);

export default MontageAnfertigung;
