import { normalizePathname } from "./paths";

export const SITE_URL = "https://winneonlichtservice.de";
export const SITE_NAME = "Win Neonlicht-Service";
export const SITE_DOMAIN = "winneonlichtservice.de";

export const BUSINESS_ALTERNATE_NAMES = [
  "winneonlichtservice",
  "winneonlichtservice.de",
  "Win Neonlicht Service",
] as const;

export const BUSINESS = {
  name: SITE_NAME,
  email: "info@winneonlichtservice.de",
  phone: "+49-8031-92155",
  mobile: "+49-15562-052989",
  whatsappNumber: "4915562052989",
  street: "Königseestraße 29",
  city: "Kolbermoor",
  postalCode: "83059",
  country: "DE",
  region: "Bayern",
  latitude: 47.8563,
  longitude: 12.1284,
  serviceRadiusMeters: 100000,
  areaServed: ["München", "Kolbermoor", "Rosenheim", "Freilassing", "Oberbayern"],
  openingHours: {
    opens: "08:00",
    closes: "19:00",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    label: "Montag–Freitag, 8:00–19:00 Uhr (Samstag und Sonntag geschlossen)",
  },
};

const SERVICE_PATHS = [
  "/fassadenreinigung",
  "/fensterreinigung",
  "/leuchtreklamenreinigung",
  "/folientechnik",
  "/led-umruestung",
  "/montage-anfertigung",
  "/apothekenreinigung",
  "/bueroreinigung",
  "/unterhaltsreinigung",
] as const;

export type ServicePath = (typeof SERVICE_PATHS)[number];

const SERVICE_NAMES: Record<ServicePath, string> = {
  "/fassadenreinigung": "Fassadenreinigung",
  "/fensterreinigung": "Fensterreinigung",
  "/leuchtreklamenreinigung": "Leuchtreklamenreinigung",
  "/folientechnik": "Folientechnik",
  "/led-umruestung": "LED-Umrüstung",
  "/montage-anfertigung": "Montage & Anfertigung",
  "/apothekenreinigung": "Apothekenreinigung",
  "/bueroreinigung": "Büroreinigung",
  "/unterhaltsreinigung": "Unterhaltsreinigung",
};

function getGeoCircleAreaServed() {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    geoRadius: BUSINESS.serviceRadiusMeters,
  };
}

function getOpeningHoursSpecification() {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...BUSINESS.openingHours.dayOfWeek],
    opens: BUSINESS.openingHours.opens,
    closes: BUSINESS.openingHours.closes,
  };
}

function getBusinessAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    postalCode: BUSINESS.postalCode,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  };
}

function getBusinessProviderReference() {
  return {
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: getBusinessAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
  };
}

export function getWhatsAppUrl(
  message = "Hallo, ich habe eine Anfrage über winneonlichtservice.de.",
) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

const defaultDescription =
  "Win Neonlicht-Service – Ihr Partner für Leuchtreklamenreinigung, LED-Umrüstung, Folientechnik, Montage und Gebäudereinigung in München und Oberbayern.";

export const SEO_PAGES: Record<string, SeoConfig> = {
  "/": {
    title: `${SITE_NAME} – Neonlicht & Werbetechnik in München`,
    description: defaultDescription,
    path: "/",
  },
  "/ueber-uns": {
    title: `Über uns | ${SITE_NAME}`,
    description:
      "Erfahren Sie mehr über Win Neonlicht-Service – Ihr erfahrener Partner für Neonlicht, Werbetechnik und professionelle Reinigung in München und Umgebung.",
    path: "/ueber-uns",
  },
  "/kontakt": {
    title: `Kontakt | ${SITE_NAME}`,
    description:
      "Kontaktieren Sie Win Neonlicht-Service: Festnetz 08031 92155, Handy +49 15562 052989, info@winneonlichtservice.de – Königseestraße 29, Kolbermoor.",
    path: "/kontakt",
  },
  "/impressum": {
    title: `Impressum | ${SITE_NAME}`,
    description: `Impressum und Anbieterkennzeichnung von ${SITE_NAME}, Kolbermoor.`,
    path: "/impressum",
  },
  "/datenschutz": {
    title: `Datenschutz | ${SITE_NAME}`,
    description: `Datenschutzerklärung von ${SITE_NAME} – Informationen zur Verarbeitung personenbezogener Daten.`,
    path: "/datenschutz",
  },
  "/fassadenreinigung": {
    title: `Gebäudereinigung & Fassadenreinigung München | ${SITE_NAME}`,
    description:
      "Professionelle Fassaden- und Gebäudereinigung in München. Schonende Reinigung von Algen, Moos und Verschmutzungen – Werterhalt für Ihre Immobilie.",
    path: "/fassadenreinigung",
  },
  "/fensterreinigung": {
    title: `Fensterreinigung München | ${SITE_NAME}`,
    description:
      "Streifenfreie Fensterreinigung für Gewerbe und Privat in München und Umgebung. Zuverlässig, gründlich und termingerecht von Win Neonlicht-Service.",
    path: "/fensterreinigung",
  },
  "/leuchtreklamenreinigung": {
    title: `Leuchtreklamenreinigung München | ${SITE_NAME}`,
    description:
      "Professionelle Reinigung von Leuchtreklamen und Neonwerbung in München. Mehr Sichtbarkeit und längere Lebensdauer für Ihre Außenwerbung.",
    path: "/leuchtreklamenreinigung",
  },
  "/folientechnik": {
    title: `Folientechnik & Beschriftung München | ${SITE_NAME}`,
    description:
      "Folierung, Beschriftung und Werbetechnik in München. Win Neonlicht-Service bietet hochwertige Folientechnik für Schaufenster, Fahrzeuge und Fassaden.",
    path: "/folientechnik",
  },
  "/led-umruestung": {
    title: `LED-Umrüstung Leuchtreklamen München | ${SITE_NAME}`,
    description:
      "Energieeffiziente LED-Umrüstung für Leuchtreklamen und Neonwerbung in München. Sparen Sie Stromkosten und steigern Sie die Haltbarkeit Ihrer Werbung.",
    path: "/led-umruestung",
  },
  "/montage-anfertigung": {
    title: `Montage & Anfertigung Werbetechnik München | ${SITE_NAME}`,
    description:
      "Montage und Anfertigung von Leuchtreklamen, Profilbuchstaben und Werbeanlagen in München. Planung, Produktion und Installation aus einer Hand.",
    path: "/montage-anfertigung",
  },
  "/apothekenreinigung": {
    title: `Apothekenreinigung München | ${SITE_NAME}`,
    description:
      "Spezialisierte Reinigung für Apotheken in München – hygienisch, zuverlässig und diskret. Win Neonlicht-Service für saubere und einladende Räumlichkeiten.",
    path: "/apothekenreinigung",
  },
  "/bueroreinigung": {
    title: `Büroreinigung München | ${SITE_NAME}`,
    description:
      "Professionelle Büroreinigung in München und Umgebung. Regelmäßige Unterhaltsreinigung für produktive und gepflegte Arbeitsplätze.",
    path: "/bueroreinigung",
  },
  "/unterhaltsreinigung": {
    title: `Unterhaltsreinigung München | ${SITE_NAME}`,
    description:
      "Zuverlässige Unterhaltsreinigung für Gewerbe und Privat in München. Win Neonlicht-Service – regelmäßig, gründlich und flexibel.",
    path: "/unterhaltsreinigung",
  },
};

export const SITEMAP_PATHS = Object.entries(SEO_PAGES)
  .filter(([, config]) => !config.noindex)
  .map(([, config]) => config.path);

export function getSeoForPath(pathname: string): SeoConfig {
  const path = normalizePathname(pathname);

  if (SEO_PAGES[path]) {
    return SEO_PAGES[path];
  }

  return {
    title: `Seite nicht gefunden | ${SITE_NAME}`,
    description: defaultDescription,
    path,
    noindex: true,
  };
}

export function getCanonicalUrl(path: string): string {
  if (path === "/") {
    return SITE_URL;
  }
  return `${SITE_URL}${path}`;
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    alternateName: [...BUSINESS_ALTERNATE_NAMES],
    description: defaultDescription,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    image: `${SITE_URL}/og-image.png`,
    address: getBusinessAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: [
      getGeoCircleAreaServed(),
      ...BUSINESS.areaServed.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
    openingHoursSpecification: getOpeningHoursSpecification(),
    sameAs: [],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [...BUSINESS_ALTERNATE_NAMES],
    url: SITE_URL,
    description: defaultDescription,
    inLanguage: "de-DE",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
    },
  };
}

export function isServicePath(path: string): path is ServicePath {
  return (SERVICE_PATHS as readonly string[]).includes(path);
}

export function getServiceSchema(path: ServicePath) {
  const seo = SEO_PAGES[path];
  const serviceName = SERVICE_NAMES[path];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: seo.description,
    url: getCanonicalUrl(path),
    provider: getBusinessProviderReference(),
    areaServed: getGeoCircleAreaServed(),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: getCanonicalUrl(path),
      servicePhone: BUSINESS.phone,
    },
  };
}

export function getStructuredDataForPath(pathname: string) {
  const path = normalizePathname(pathname);
  const seo = getSeoForPath(path);
  if (seo.noindex) {
    return [];
  }

  const schemas: object[] = [getLocalBusinessSchema()];

  if (path === "/") {
    schemas.push(getWebSiteSchema());
  }

  if (isServicePath(path)) {
    schemas.push(getServiceSchema(path));
  }

  return schemas;
}

export const JSON_LD_IDS = [
  "json-ld-local-business",
  "json-ld-website",
  "json-ld-service",
] as const;

export function getJsonLdId(schema: object, index: number): string {
  const type = (schema as { "@type"?: string })["@type"];

  if (type === "LocalBusiness") {
    return "json-ld-local-business";
  }
  if (type === "WebSite") {
    return "json-ld-website";
  }
  if (type === "Service") {
    return "json-ld-service";
  }

  return `json-ld-${index}`;
}

export type PrerenderHeadElement = {
  type: string;
  props?: Record<string, string>;
  children?: string;
};

export function getPrerenderHeadElements(pathname: string): PrerenderHeadElement[] {
  const seo = getSeoForPath(pathname);
  const canonicalUrl = getCanonicalUrl(seo.path);
  const ogImage = `${SITE_URL}/og-image.png`;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

  const elements: PrerenderHeadElement[] = [
    { type: "meta", props: { name: "description", content: seo.description } },
    { type: "meta", props: { name: "author", content: SITE_NAME } },
    { type: "meta", props: { name: "application-name", content: SITE_NAME } },
    { type: "meta", props: { name: "robots", content: robots } },
    { type: "link", props: { rel: "canonical", href: canonicalUrl } },
    { type: "meta", props: { property: "og:title", content: seo.title } },
    { type: "meta", props: { property: "og:description", content: seo.description } },
    { type: "meta", props: { property: "og:type", content: "website" } },
    { type: "meta", props: { property: "og:url", content: canonicalUrl } },
    { type: "meta", props: { property: "og:site_name", content: SITE_NAME } },
    { type: "meta", props: { property: "og:locale", content: "de_DE" } },
    { type: "meta", props: { property: "og:image", content: ogImage } },
    { type: "meta", props: { name: "twitter:card", content: "summary_large_image" } },
    { type: "meta", props: { name: "twitter:title", content: seo.title } },
    { type: "meta", props: { name: "twitter:description", content: seo.description } },
    { type: "meta", props: { name: "twitter:image", content: ogImage } },
  ];

  if (!seo.noindex) {
    getStructuredDataForPath(pathname).forEach((schema, index) => {
      elements.push({
        type: "script",
        props: {
          id: getJsonLdId(schema, index),
          type: "application/ld+json",
        },
        children: JSON.stringify(schema),
      });
    });
  }

  return elements;
}
