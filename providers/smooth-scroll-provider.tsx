"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { lockHashNavigation } from "@/lib/hash-navigation";

const NAV_OFFSET = 120;

function scrollToHash(lenis: Lenis | null, hash: string, attempt = 0) {
  if (!hash || hash === "#") return;

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = document.getElementById(id);

  if (!el) {
    if (attempt < 12) {
      window.setTimeout(() => scrollToHash(lenis, hash, attempt + 1), 80);
    }
    return;
  }

  lockHashNavigation();

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
      const t = window.setTimeout(onHash, 100);
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
    // After route change, wait a beat so sections (and scrollspy lock) settle
    const tHash = window.setTimeout(onHash, 160);
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
