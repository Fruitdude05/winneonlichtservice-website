import { Eye, Building, ArrowUp, Sun } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroFenster from "@/assets/hero-fensterreinigung.jpg";
import fenster4 from "@/assets/fenster-4.jpg";
import fenster7 from "@/assets/fenster-7.jpg";

const Fensterreinigung = () => (
  <ServicePageLayout
    heroImage={heroFenster}
    title="Fensterreinigung"
    subtitle="Streifenfreie Glasflächen für Schaufenster, Fassaden und Vordächer"
    highlights={[
      "Schaufenster, Glasfassaden und Trennwände",
      "Rahmen, Falzen und Fensterbänke inklusive",
      "Hubsteiger und Leiter für Arbeiten in der Höhe",
    ]}
    storyBlocks={[
      {
        badge: "Erster Eindruck",
        title: "Klare Fenster — klares Image",
        paragraphs: [
          "Schaufenster und Glasflächen sind oft das Erste, was Kunden sehen. Streifen, Staub oder Wasserflecken wirken schnell unprofessionell.",
          "Wir reinigen gewerbliche und private Glasflächen streifenfrei — von der kleinen Schaufensterscheibe bis zur mehrstöckigen Glasfassade.",
        ],
        image: fenster4,
        imageAlt: "Streifenfrei gereinigte Glasfassade",
        imagePosition: "right",
      },
      {
        badge: "In der Höhe",
        title: "Auch schwer erreichbar — kein Problem",
        paragraphs: [
          "Wintergärten, Glasvordächer und Lichtkuppeln reinigen wir genauso gründlich wie normale Fenster. Mit Hubsteiger und Leiter kommen wir auch an schwierige Stellen.",
          "Dabei entfernen wir nicht nur Staub, sondern auch Straßenschmutz, Insektenrückstände und Kalk — für ein Ergebnis, das man sieht.",
        ],
        image: fenster7,
        imageAlt: "Fensterreinigung mit Hubsteiger an Glasfassade",
        imagePosition: "left",
      },
    ]}
    features={[
      { icon: Eye, title: "Streifenfreier Glanz", description: "Kristallklare Scheiben ohne Schlieren oder Wasserflecken." },
      { icon: Building, title: "Alle Glasflächen", description: "Schaufenster, Fassaden, Vordächer und Trennwände." },
      { icon: ArrowUp, title: "Höhenarbeiten", description: "Sicherer Einsatz von Hubsteigern und Leitern." },
      { icon: Sun, title: "Rahmen & Falzen", description: "Fensterrahmen und Falzen werden mitgereinigt." },
    ]}
    forWhom={["Apotheken", "Einzelhandel", "Bürogebäude", "Gastronomie"]}
    relatedServices={[
      { name: "Fassadenreinigung", link: "/fassadenreinigung" },
      { name: "Leuchtreklamenreinigung", link: "/leuchtreklamenreinigung" },
    ]}
  />
);

export default Fensterreinigung;
