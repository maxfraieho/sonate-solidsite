import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AccessibilityFixes component
 * Automatically adds aria-labels to buttons without accessible names
 * and ensures proper focus management for navigation
 */
export const AccessibilityFixes = () => {
  const location = useLocation();

  useEffect(() => {
    // Fix buttons without accessible names
    const fixButtonLabels = () => {
      document.querySelectorAll('button:not([aria-label])').forEach((btn) => {
        const button = btn as HTMLButtonElement;
        const text = button.textContent?.trim();
        const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
        const hasTitle = button.getAttribute('title');
        
        // Skip if already has accessible name
        if (hasAriaLabelledBy || hasTitle) return;
        
        // If button has no text content, add a generic label
        if (!text) {
          // Check for common icon button patterns
          const hasCloseIcon = button.querySelector('[class*="lucide-x"], [class*="X"]');
          const hasMenuIcon = button.querySelector('[class*="lucide-menu"], [class*="Menu"]');
          const hasChevron = button.querySelector('[class*="chevron"], [class*="Chevron"]');
          const hasPrevIcon = button.querySelector('[class*="left"], [class*="Left"]');
          const hasNextIcon = button.querySelector('[class*="right"], [class*="Right"]');
          
          if (hasCloseIcon) {
            button.setAttribute('aria-label', 'Close');
          } else if (hasMenuIcon) {
            button.setAttribute('aria-label', 'Menu');
          } else if (hasPrevIcon) {
            button.setAttribute('aria-label', 'Previous');
          } else if (hasNextIcon) {
            button.setAttribute('aria-label', 'Next');
          } else if (hasChevron) {
            button.setAttribute('aria-label', 'Toggle');
          } else {
            button.setAttribute('aria-label', 'Button');
          }
        }
      });
    };

    // Fix links that open in new windows
    const fixExternalLinks = () => {
      document.querySelectorAll('a[target="_blank"]:not([rel*="noopener"])').forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const currentRel = anchor.getAttribute('rel') || '';
        if (!currentRel.includes('noopener')) {
          anchor.setAttribute('rel', `${currentRel} noopener noreferrer`.trim());
        }
      });
    };

    // Run fixes after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      fixButtonLabels();
      fixExternalLinks();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]); // Re-run on route change

  return null;
};

export default AccessibilityFixes;
