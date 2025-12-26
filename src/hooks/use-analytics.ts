import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-RNGPDPX4M3';

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

    // Load gtag.js script FIRST
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    
    script.onload = () => {
      // Initialize dataLayer and gtag function AFTER script loads
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };

      // Initialize GA4
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        send_page_view: false, // We'll send manually for SPA
      });

      isGtagLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Analytics script'));
    };
    
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
