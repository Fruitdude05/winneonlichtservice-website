import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { SITEMAP_PATHS } from "./src/lib/seo";
import { openAiChatProxy } from "./vite-openai-proxy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const openAiApiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY;
  const web3FormsKey = env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY;
  const callMeBotKey = env.CALLMEBOT_API_KEY || env.VITE_CALLMEBOT_API_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
    },
    plugins: [
      openAiChatProxy(openAiApiKey, {
        web3FormsKey,
        callMeBotKey,
        whatsappNumber: "4915562052989",
      }),
      react(),
      vitePrerenderPlugin({
        renderTarget: "#root",
        prerenderScript: path.join(__dirname, "src/prerender.tsx"),
        additionalPrerenderRoutes: SITEMAP_PATHS,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
