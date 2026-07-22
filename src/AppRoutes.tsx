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
        <Route path="/" element={<Home />} />
        <Route path="/ueber-uns" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/apothekenreinigung" element={<Apothekenreinigung />} />
        <Route path="/bueroreinigung" element={<Bueroreinigung />} />
        <Route path="/fassadenreinigung" element={<Fassadenreinigung />} />
        <Route path="/fensterreinigung" element={<Fensterreinigung />} />
        <Route path="/leuchtreklamenreinigung" element={<Leuchtreklamenreinigung />} />
        <Route path="/unterhaltsreinigung" element={<Unterhaltsreinigung />} />
        <Route path="/folientechnik" element={<Folientechnik />} />
        <Route path="/led-umruestung" element={<LEDUmruestung />} />
        <Route path="/montage-anfertigung" element={<MontageAnfertigung />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <MobileCtaBar />
    <WhatsAppChatWidget />
    <CookieConsent />
  </>
);
