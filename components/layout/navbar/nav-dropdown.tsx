"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { IMAGES } from "@/constants/images";
import type { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  item: NavItem;
  onHero?: boolean;
  isDimmed?: boolean;
  isGroupHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  linkClassName?: string;
}

export function NavDropdown({
  item,
  onHero = false,
  isDimmed = false,
  isGroupHovered = false,
  onHoverStart,
  onHoverEnd,
  linkClassName,
}: NavDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const children = item.children ?? [];

  const isActive =
    children.some((child) => pathname === child.href) || pathname === item.href;

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleEnter = () => {
    clearCloseTimeout();
    setOpen(true);
    onHoverStart?.();
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      onHoverEnd?.();
    }, 140);
  };

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={cn(
          linkClassName,
          onHero ? "text-ivory" : "text-forest",
          isDimmed && "opacity-35",
          !isDimmed && isGroupHovered && "opacity-100",
          !isGroupHovered && !isActive && "opacity-80",
          isActive && "opacity-100",
        )}
        onFocus={handleEnter}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            handleLeave();
          }
        }}
      >
        {item.label}
        <span
          className={cn(
            "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-luxury",
            isActive || open ? "scale-x-100" : "scale-x-0",
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "absolute top-full left-1/2 z-50 mt-6 min-w-[15rem] -translate-x-1/2",
              "overflow-hidden rounded-[22px] border border-ivory/20",
              "bg-forest/92 backdrop-blur-[10px]",
              "shadow-[0_12px_40px_rgba(45,74,62,0.18)]",
            )}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* Paper texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
              style={{
                backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />

            {/* Temple gold accent line */}
            <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <ul className="relative z-10 flex flex-col px-5 py-4">
              {children.map((child, index) => {
                const childActive = pathname === child.href;
                return (
                  <li key={child.href} role="none">
                    <Link
                      href={child.href}
                      role="menuitem"
                      className={cn(
                        "group/item font-heading relative block py-3 text-[0.9375rem] font-semibold tracking-[0.12em]",
                        "text-ivory/70 transition-all duration-500 ease-luxury",
                        "hover:text-ivory focus-visible:text-ivory focus-visible:outline-none",
                        childActive && "text-ivory",
                        index < children.length - 1 &&
                          "border-b border-ivory/10",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "h-px w-0 bg-gold transition-all duration-500 ease-luxury",
                            "group-hover/item:w-3",
                            childActive && "w-3",
                          )}
                          aria-hidden="true"
                        />
                        {child.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
