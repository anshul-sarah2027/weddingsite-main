"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/navbar/logo";
import { MobileMenu } from "@/components/layout/navbar/mobile-menu";
import { NavLinks } from "@/components/layout/navbar/nav-links";
import { RsvpButton } from "@/components/layout/navbar/rsvp-button";
import { cn } from "@/lib/utils";

/** Routes with a full-bleed hero — navbar stays transparent until scroll */
const HERO_PATHS = ["/", "/events"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hasHero = HERO_PATHS.includes(pathname);
  const onHero = hasHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury",
        onHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-forest/8 bg-ivory/80 shadow-[0_1px_0_rgba(45,74,62,0.04)] backdrop-blur-xl",
      )}
    >
      <nav
        className="mx-auto grid h-28 max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 md:h-32 md:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-12"
        aria-label="Main navigation"
      >
        <div className="justify-self-start">
          <Logo onHero={onHero} />
        </div>

        <div className="hidden justify-self-center lg:block">
          <NavLinks onHero={onHero} />
        </div>

        <div className="flex items-center justify-self-end gap-4">
          <div className="hidden lg:block">
            <RsvpButton onHero={onHero} />
          </div>
          <MobileMenu onHero={onHero} />
        </div>
      </nav>
    </header>
  );
}
