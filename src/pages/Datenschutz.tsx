import { Link } from "react-router-dom";
import LegalPageLayout from "@/components/LegalPageLayout";
import { BUSINESS, SITE_NAME } from "@/lib/seo";

const Datenschutz = () => (
  <LegalPageLayout title="Datenschutzerklärung">
    <h2>1. Verantwortlicher</h2>
    <p>
      Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      <br />
      <br />
      {SITE_NAME}
      <br />
      Frankie Hack (Inhaber)
      <br />
      {BUSINESS.street}
      <br />
      {BUSINESS.postalCode} {BUSINESS.city}
      <br />
      E-Mail:{" "}
      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
      <br />
      Telefon: <a href="tel:+49803192155">08031 92155</a>
    </p>

    <h2>2. Allgemeine Hinweise</h2>
    <p>
      Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Personenbezogene Daten sind alle
      Daten, mit denen Sie persönlich identifiziert werden können. Diese Datenschutzerklärung
      informiert Sie darüber, welche Daten wir erheben, wofür wir sie nutzen und welche Rechte Sie
      haben.
    </p>

    <h2>3. Kontaktformular</h2>
    <p>
      Wenn Sie uns über das Kontaktformular eine Nachricht senden, verarbeiten wir die von Ihnen
      eingegebenen Daten (z. B. Name, E-Mail-Adresse, Betreff, Nachricht) zur Bearbeitung Ihrer
      Anfrage. Die Übermittlung erfolgt über den Dienst{" "}
      <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
        Web3Forms
      </a>
      . Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit.
      f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
    </p>
    <p>
      Die Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet ist und keine
      gesetzlichen Aufbewahrungspflichten entgegenstehen.
    </p>

    <h2>4. Cookies & lokale Speicherung</h2>
    <p>
      Wir setzen auf dieser Website ein technisch notwendiges Cookie bzw. einen Eintrag im lokalen
      Speicher Ihres Browsers (localStorage), um Ihre Entscheidung zum Cookie-Hinweis zu speichern
      („Akzeptieren“). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
      einer nutzerfreundlichen und rechtskonformen Website).
    </p>
    <p>Es werden keine Tracking- oder Marketing-Cookies eingesetzt.</p>

    <h2>5. Google Maps</h2>
    <p>
      Auf unserer Kontaktseite kann eine Karte von Google Maps eingebunden werden. Anbieter ist die
      Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Karte wird erst
      geladen, nachdem Sie über unseren Cookie-Hinweis zugestimmt haben.
    </p>
    <p>
      Beim Aufruf können personenbezogene Daten (z. B. IP-Adresse) an Google übertragen werden.
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Weitere Informationen:{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Datenschutzerklärung
      </a>
      .
    </p>

    <h2>6. Server-Logfiles</h2>
    <p>
      Beim Aufruf dieser Website können durch den Hosting-Anbieter automatisch Informationen
      erfasst werden (z. B. Browsertyp, Betriebssystem, IP-Adresse, Uhrzeit des Zugriffs). Diese
      Daten dienen der technischen Bereitstellung und Sicherheit der Website. Rechtsgrundlage ist
      Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h2>7. Ihre Rechte</h2>
    <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
    <ul>
      <li>Auskunft (Art. 15 DSGVO)</li>
      <li>Berichtigung (Art. 16 DSGVO)</li>
      <li>Löschung (Art. 17 DSGVO)</li>
      <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
      <li>Widerspruch (Art. 21 DSGVO)</li>
      <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
    </ul>
    <p>
      Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig
      in Bayern u. a.: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA).
    </p>

    <h2>8. Änderungen</h2>
    <p>
      Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
      rechtlichen Anforderungen entspricht.
    </p>

    <p className="text-sm not-prose mt-8">
      Stand: Juli 2026 ·{" "}
      <Link to="/impressum" className="text-primary hover:underline">
        Impressum
      </Link>
    </p>
  </LegalPageLayout>
);

export default Datenschutz;
