import { useEffect, useRef } from "react";

/**
 * Adds "reveal-visible" class when element enters viewport.
 * Use together with .reveal-hidden CSS for smooth appearance.
 */
export const useScrollReveal = <T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
};
