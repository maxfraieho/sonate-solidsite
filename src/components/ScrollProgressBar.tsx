import { useEffect, useState } from "react";

/**
 * Thin progress bar indicating scroll depth.
 */
export const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      if (height > 0) {
        setWidth((scrollTop / height) * 100);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-border/30 z-[60]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-linear"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
