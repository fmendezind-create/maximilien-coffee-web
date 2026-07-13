"use client";

import { useEffect, useRef } from "react";

/**
 * Hook de scroll-reveal. Aplica la clase `is-visible` cuando
 * el elemento entra en el viewport — replica el comportamiento
 * del IntersectionObserver usado en las versiones HTML estáticas.
 *
 * Uso: const ref = useReveal<HTMLDivElement>();  <div ref={ref} className="reveal">
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
