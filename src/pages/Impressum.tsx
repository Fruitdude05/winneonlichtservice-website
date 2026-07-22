import { Link } from "react-router-dom";
import LegalPageLayout from "@/components/LegalPageLayout";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/seo";

const Impressum = () => (
  <LegalPageLayout title="Impressum">
    <h2>Angaben gemäß § 5 TMG</h2>
    <p>
      {SITE_NAME}
      <br />
      {BUSINESS.street}
      <br />
      {BUSINESS.postalCode} {BUSINESS.city}
    </p>

    <h2>Vertretungsberechtigt</h2>
    <p>Karin Hack</p>

    <h2>Kontakt</h2>
    <p>
      Telefon:{" "}
      <a href="tel:+49803192155">08031 92155</a>
      <br />
      Mobil:{" "}
      <a href="tel:+4915562052989">+49 15562 052989</a>
      <br />
      E-Mail:{" "}
      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
    </p>

    <h2>Umsatzsteuer-ID</h2>
    <p>
      Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
      <br />
      156/182/05808
    </p>

    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>
      Frankie Hack (Inhaber)
      <br />
      {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}
    </p>

    <h2>EU-Streitschlichtung</h2>
    <p>
      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
      <a
        href="https://ec.europa.eu/consumers/odr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://ec.europa.eu/consumers/odr/
      </a>
      . Unsere E-Mail-Adresse finden Sie oben im Impressum.
    </p>

    <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
    <p>
      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
      Verbraucherschlichtungsstelle teilzunehmen.
    </p>

    <h2>Haftung für Inhalte</h2>
    <p>
      Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
      den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
      jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
      oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
    </p>

    <h2>Haftung für Links</h2>
    <p>
      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
      haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
      Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
      verantwortlich.
    </p>

    <p className="text-sm not-prose mt-8">
      Website:{" "}
      <a href={SITE_URL} className="text-primary hover:underline">
        {SITE_URL}
      </a>
      {" · "}
      <Link to="/datenschutz" className="text-primary hover:underline">
        Datenschutzerklärung
      </Link>
    </p>
  </LegalPageLayout>
);

export default Impressum;
