import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StructuredData } from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { AccessibilityFixes } from "@/components/AccessibilityFixes";
import { useTranslation } from 'react-i18next';

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const IntegrationPath = lazy(() => import("./pages/IntegrationPath"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Support = lazy(() => import("./pages/Support"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Component to sync language from URL
const LanguageSync = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const path = location.pathname;
    let lang = 'de'; // Default to German
    
    if (path.startsWith('/fr')) lang = 'fr';
    else if (path.startsWith('/de')) lang = 'de';
    else if (path.startsWith('/uk')) lang = 'uk';
    
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [location.pathname, i18n]);
  
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ServiceWorkerRegistration />
          <AccessibilityFixes />
          <LanguageSync />
          <ScrollProgressBar />
          <StructuredData />
          <AnalyticsProvider />
          <ScrollToHash />
          <ScrollToTopButton />
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Root route (default German) */}
                <Route path="/" element={<Index />} />
                
                {/* French routes */}
                <Route path="/fr" element={<Index />} />
                <Route path="/fr/contact" element={<Contact />} />
                <Route path="/fr/integration" element={<IntegrationPath />} />
                <Route path="/fr/privacy" element={<Privacy />} />
                <Route path="/fr/support" element={<Support />} />
                
                {/* German routes */}
                <Route path="/de" element={<Index />} />
                <Route path="/de/contact" element={<Contact />} />
                <Route path="/de/integration" element={<IntegrationPath />} />
                <Route path="/de/privacy" element={<Privacy />} />
                <Route path="/de/support" element={<Support />} />
                
                {/* Ukrainian routes */}
                <Route path="/uk" element={<Index />} />
                <Route path="/uk/contact" element={<Contact />} />
                <Route path="/uk/integration" element={<IntegrationPath />} />
                <Route path="/uk/privacy" element={<Privacy />} />
                <Route path="/uk/support" element={<Support />} />
                
                {/* Legacy routes (redirect to root with hash) */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/integration" element={<IntegrationPath />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/support" element={<Support />} />
                <Route path="/donate" element={<Navigate to="/#soutenir" replace />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
