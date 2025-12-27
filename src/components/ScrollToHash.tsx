import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_OFFSET = 80;

/**
 * This component ensures:
 * - Always scrolls to top when route changes
 * - Supports scrolling to hash anchors (#section-id)
 * - Waits for DOM element to appear before scrolling (fixes cross-route navigation)
 */
export const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // If no hash, scroll to top
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    // If hash exists, poll for element until it appears in DOM
    let attempts = 0;
    const maxAttempts = 20; // 2 seconds max

    const interval = setInterval(() => {
      const element = document.querySelector(location.hash);
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - NAVBAR_OFFSET;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
      
      attempts++;
    }, 100);

    return () => clearInterval(interval);
  }, [location.pathname, location.hash]);

  return null;
};
