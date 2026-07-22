import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isEmailServiceConfigured, sendContactMessage } from "@/lib/contactEmail";
import { hasCookieConsent } from "@/lib/cookieConsent";
import heroContact from "@/assets/hero-contact.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [mapsAllowed, setMapsAllowed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const emailConfigured = isEmailServiceConfigured();

  useEffect(() => {
    const syncMaps = () => setMapsAllowed(hasCookieConsent());
    syncMaps();
    window.addEventListener("cookie-consent-changed", syncMaps);
    window.addEventListener("storage", syncMaps);
    return () => {
      window.removeEventListener("cookie-consent-changed", syncMaps);
      window.removeEventListener("storage", syncMaps);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAccepted) {
      toast({
        title: "Datenschutz bestätigen",
        description: "Bitte stimmen Sie der Datenschutzerklärung zu, um die Nachricht zu senden.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const result = await sendContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      toast({
        title: "Senden fehlgeschlagen",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    if (result.method === "web3forms") {
      toast({
        title: "Nachricht gesendet!",
        description: "Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setPrivacyAccepted(false);
      return;
    }

    toast({
      title: "E-Mail-Programm wird geöffnet",
      description: "Bitte senden Sie die Nachricht in Ihrem E-Mail-Programm ab.",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-Mail",
      content: "info@winneonlichtservice.de",
      link: "mailto:info@winneonlichtservice.de",
    },
    {
      icon: Phone,
      title: "Festnetz",
      content: "08031 92155",
      link: "tel:+49803192155",
    },
    {
      icon: Phone,
      title: "Handy",
      content: "+49 15562 052989",
      link: "tel:+4915562052989",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Königseestraße 29, 83059 Kolbermoor",
      link: "https://www.google.com/maps/search/?api=1&query=K%C3%B6nigseestra%C3%9Fe+29%2C+83059+Kolbermoor",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MegaMenu />

      <PageHero
        image={heroContact}
        title="Kontakt"
        subtitle="Haben Sie Fragen? Wir freuen uns auf Ihre Nachricht."
        height="md"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {!emailConfigured && import.meta.env.DEV && (
            <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Hinweis für den Betreiber: Tragen Sie den Web3Forms-Schlüssel in `.env` ein, damit
              Anfragen direkt an info@winneonlichtservice.de gesendet werden.
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Kontaktinformationen
                </h2>
                <p className="text-muted-foreground">
                  Erreichen Sie uns per Telefon, E-Mail oder über das Formular.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.title === "Adresse" ? "_blank" : undefined}
                  rel={info.title === "Adresse" ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors min-h-11"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">{info.title}</div>
                    <div className="text-muted-foreground text-sm">{info.content}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="contact-form-glow bg-card border border-primary/40 rounded-xl p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Nachricht senden</h2>
                <p className="text-muted-foreground mb-6">
                  Schreiben Sie uns – die Anfrage geht direkt an info@winneonlichtservice.de.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ihr Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        E-Mail *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Betreff *
                    </label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Worum geht es?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Nachricht *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ihre Nachricht..."
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                    <Checkbox
                      id="privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                      className="mt-0.5"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Ich habe die{" "}
                      <Link to="/datenschutz" className="text-primary hover:underline font-medium">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage
                      zu. *
                    </label>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto min-h-11"
                    disabled={isSubmitting || !privacyAccepted}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden border border-border shadow-lg">
            {mapsAllowed ? (
              <iframe
                title="Standort Königseestraße 29, Kolbermoor"
                src="https://www.google.com/maps?q=K%C3%B6nigseestra%C3%9Fe+29%2C+83059+Kolbermoor&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(15%) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 p-6 text-center">
                <MapPin className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Google Maps wird erst nach Ihrer Zustimmung zu unseren Cookie- und Datenschutzhinweisen
                  geladen.
                </p>
                <Link to="/datenschutz" className="text-sm text-primary hover:underline font-medium">
                  Datenschutzerklärung ansehen
                </Link>
              </div>
            )}
            <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:bottom-6 md:max-w-xs">
              <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-0.5">
                      Standort
                    </div>
                    <div className="font-semibold text-foreground text-sm leading-snug">
                      Königseestraße 29
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">83059 Kolbermoor</div>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=K%C3%B6nigseestra%C3%9Fe+29%2C+83059+Kolbermoor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Route planen
                      <Send className="w-3 h-3 -rotate-45" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
