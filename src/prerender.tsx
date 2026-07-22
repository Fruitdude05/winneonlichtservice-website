import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./AppRoutes";
import {
  getPrerenderHeadElements,
  getSeoForPath,
  SITEMAP_PATHS,
} from "./lib/seo";

export async function prerender(data: { url: string }) {
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={data.url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );

  const seo = getSeoForPath(data.url);
  const headElements = getPrerenderHeadElements(data.url);

  return {
    html,
    links: new Set(SITEMAP_PATHS.filter((path) => path !== data.url)),
    head: {
      lang: "de",
      title: seo.title,
      elements: new Set(headElements),
    },
  };
}
