"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const resize = () => lenis.resize();
    window.addEventListener("resize", resize);

    const observer = new ResizeObserver(resize);
    observer.observe(document.body);

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Recalculate after fonts/images settle
    resize();
    const t1 = window.setTimeout(resize, 500);
    const t2 = window.setTimeout(resize, 1500);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
