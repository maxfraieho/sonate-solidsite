import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_OFFSET = 80;

/**
 * This component ensures:
 * - Always scrolls to top when route changes
 * - Supports scrolling to hash anchors (#section-id)
 */
export const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash (#section-id), scroll smoothly to that section
    if (location.hash) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - NAVBAR_OFFSET;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }

    // Otherwise, scroll to top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
};
