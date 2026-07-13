"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NAV_OFFSET = 120;

function scrollToHash(lenis: Lenis | null, hash: string) {
  if (!hash || hash === "#") return;

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.05 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) {
      const onHash = () => scrollToHash(null, window.location.hash);
      // Delay so the target section is in the DOM after route change
      const t = window.setTimeout(onHash, 80);
      window.addEventListener("hashchange", onHash);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("hashchange", onHash);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
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

    resize();
    const t1 = window.setTimeout(resize, 500);
    const t2 = window.setTimeout(resize, 1500);

    const onHash = () => scrollToHash(lenis, window.location.hash);
    const tHash = window.setTimeout(onHash, 120);
    window.addEventListener("hashchange", onHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("hashchange", onHash);
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(tHash);
      lenis.destroy();
    };
  }, [reducedMotion, pathname]);

  return <>{children}</>;
}
