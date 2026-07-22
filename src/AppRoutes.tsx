import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollToTop from "@/components/ScrollToTop";
import MobileCtaBar from "@/components/MobileCtaBar";
import WhatsAppChatWidget from "@/components/WhatsAppChatWidget";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import NotFound from "@/pages/NotFound";
import Apothekenreinigung from "@/pages/Apothekenreinigung";
import Bueroreinigung from "@/pages/Bueroreinigung";
import Fassadenreinigung from "@/pages/Fassadenreinigung";
import Fensterreinigung from "@/pages/Fensterreinigung";
import Leuchtreklamenreinigung from "@/pages/Leuchtreklamenreinigung";
import Unterhaltsreinigung from "@/pages/Unterhaltsreinigung";
import Folientechnik from "@/pages/Folientechnik";
import LEDUmruestung from "@/pages/LEDUmruestung";
import MontageAnfertigung from "@/pages/MontageAnfertigung";

const queryClient = new QueryClient();

function pageRoute(path: string, element: JSX.Element) {
  if (path === "/") {
    return <Route key={path} path={path} element={element} />;
  }

  return [
    <Route key={path} path={path} element={element} />,
    <Route key={`${path}/`} path={`${path}/`} element={element} />,
  ];
}

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Seo />
    <div className="pb-24 md:pb-0">
      <Routes>
        {pageRoute("/", <Home />)}
        {pageRoute("/ueber-uns", <About />)}
        {pageRoute("/kontakt", <Contact />)}
        {pageRoute("/impressum", <Impressum />)}
        {pageRoute("/datenschutz", <Datenschutz />)}
        {pageRoute("/apothekenreinigung", <Apothekenreinigung />)}
        {pageRoute("/bueroreinigung", <Bueroreinigung />)}
        {pageRoute("/fassadenreinigung", <Fassadenreinigung />)}
        {pageRoute("/fensterreinigung", <Fensterreinigung />)}
        {pageRoute("/leuchtreklamenreinigung", <Leuchtreklamenreinigung />)}
        {pageRoute("/unterhaltsreinigung", <Unterhaltsreinigung />)}
        {pageRoute("/folientechnik", <Folientechnik />)}
        {pageRoute("/led-umruestung", <LEDUmruestung />)}
        {pageRoute("/montage-anfertigung", <MontageAnfertigung />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <MobileCtaBar />
    <WhatsAppChatWidget />
    <CookieConsent />
  </>
);
