import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCanonicalUrl, getJsonLdId, getSeoForPath, getStructuredDataForPath, JSON_LD_IDS, SITE_NAME, SITE_URL } from "@/lib/seo";
import { normalizePathname } from "@/lib/paths";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

function upsertMeta(
  key: string,
  content: string,
  attribute: "name" | "property" = "name",
) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

function syncStructuredData(pathname: string) {
  JSON_LD_IDS.forEach(removeJsonLd);

  const schemas = getStructuredDataForPath(normalizePathname(pathname));
  schemas.forEach((schema, index) => {
    upsertJsonLd(getJsonLdId(schema, index), schema);
  });
}

const Seo = () => {
  const { pathname } = useLocation();
  const normalizedPath = normalizePathname(pathname);
  const seo = getSeoForPath(normalizedPath);
  const canonicalUrl = getCanonicalUrl(seo.path.startsWith("/") ? seo.path : normalizedPath);

  useEffect(() => {
    document.documentElement.lang = "de";
    document.title = seo.title;

    upsertMeta("description", seo.description);
    upsertMeta("author", SITE_NAME);
    upsertMeta("application-name", SITE_NAME);
    upsertMeta("robots", seo.noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", canonicalUrl);

    upsertMeta("og:title", seo.title, "property");
    upsertMeta("og:description", seo.description, "property");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:url", canonicalUrl, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:locale", "de_DE", "property");
    upsertMeta("og:image", OG_IMAGE, "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", seo.title);
    upsertMeta("twitter:description", seo.description);
    upsertMeta("twitter:image", OG_IMAGE);

    if (!seo.noindex) {
      syncStructuredData(normalizedPath);
    } else {
      JSON_LD_IDS.forEach(removeJsonLd);
    }
  }, [seo, canonicalUrl, normalizedPath]);

  return null;
};

export default Seo;
