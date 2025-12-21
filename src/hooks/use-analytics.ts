import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-LY0ZLRZZHL';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let isGtagLoaded = false;

const loadGtag = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isGtagLoaded) {
      resolve();
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Set default consent to denied
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    // Configure GA4 with privacy settings
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false, // We'll send manually for SPA
    });

    // Load gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    script.onload = () => {
      isGtagLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const useAnalytics = (hasConsented: boolean) => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);
  const isInitialized = useRef(false);

  // Load GA when consent is given
  useEffect(() => {
    if (hasConsented && !isInitialized.current) {
      isInitialized.current = true;
      loadGtag().then(() => {
        // Send initial page view
        trackPageView(location.pathname + location.search);
        previousPath.current = location.pathname + location.search;
      }).catch((error) => {
        console.error('Failed to load Google Analytics:', error);
      });
    }
  }, [hasConsented, location.pathname, location.search]);

  // Track page views on route changes
  useEffect(() => {
    if (!hasConsented || !isGtagLoaded) return;

    const currentPath = location.pathname + location.search;
    
    // Avoid duplicate page views
    if (previousPath.current !== currentPath) {
      trackPageView(currentPath);
      previousPath.current = currentPath;
    }
  }, [location.pathname, location.search, hasConsented]);
};

const trackPageView = (pagePath: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};
