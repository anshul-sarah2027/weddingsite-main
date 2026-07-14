"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavDropdown } from "@/components/layout/navbar/nav-dropdown";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  onHero?: boolean;
}

const linkBase =
  "font-heading relative text-base font-bold tracking-[0.2em] uppercase transition-all duration-500 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2";

export function NavLinks({ onHero = false }: NavLinksProps) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const isGroupHovered = hoveredHref !== null;

  return (
    <ul
      className="flex items-center gap-6 xl:gap-9"
      onMouseLeave={() => setHoveredHref(null)}
    >
      {mainNavigation.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              item.children?.some((child) => {
                const pathOnly = child.href.split("#")[0] || child.href;
                return (
                  pathname === pathOnly || pathname.startsWith(`${pathOnly}/`)
                );
              });

        const isHovered = hoveredHref === item.href;
        const isDimmed = isGroupHovered && !isHovered;

        if (hasChildren) {
          return (
            <li key={item.href}>
              <NavDropdown
                item={item}
                onHero={onHero}
                isDimmed={isDimmed}
                isGroupHovered={isGroupHovered}
                onHoverStart={() => setHoveredHref(item.href)}
                onHoverEnd={() => setHoveredHref(null)}
                linkClassName={linkBase}
              />
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onMouseEnter={() => setHoveredHref(item.href)}
              className={cn(
                linkBase,
                onHero ? "text-ivory" : "text-forest",
                isDimmed && "opacity-35",
                !isDimmed && isHovered && "opacity-100",
                !isGroupHovered && !isActive && "opacity-80",
                isActive && "opacity-100",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-luxury",
                  isActive || isHovered ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
