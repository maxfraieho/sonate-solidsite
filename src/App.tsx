import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { StructuredData } from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const IntegrationPath = lazy(() => import("./pages/IntegrationPath"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Support = lazy(() => import("./pages/Support"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgressBar />
          <StructuredData />
          <AnalyticsProvider />
          <ScrollToHash />
          <ScrollToTopButton />
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
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
