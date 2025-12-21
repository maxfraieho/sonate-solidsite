import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StructuredData } from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ScrollToHash } from "@/components/ScrollToHash";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import IntegrationPath from "./pages/IntegrationPath";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <StructuredData />
          <AnalyticsProvider />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/integration" element={<IntegrationPath />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/donate" element={<Navigate to="/#soutenir" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
