import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
