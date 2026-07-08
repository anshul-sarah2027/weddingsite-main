"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/layout/navbar/logo";
import { RsvpButton } from "@/components/layout/navbar/rsvp-button";
import { mainNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onHero?: boolean;
}

export function MobileMenu({ onHero = false }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const panelId = useId();
  const infoPanelId = useId();

  useEffect(() => {
    setOpen(false);
    setInfoOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={cn(
          "flex size-11 items-center justify-center transition-colors duration-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
          onHero ? "text-ivory" : "text-forest",
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-50 flex flex-col bg-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex h-28 items-center justify-between px-6 md:h-32">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                className="flex size-11 items-center justify-center text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col justify-center px-8 pb-16"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ul className="flex flex-col gap-1">
                {mainNavigation.map((item, index) => {
                  const hasChildren = Boolean(item.children?.length);
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href ||
                        item.children?.some((child) => pathname === child.href);

                  if (hasChildren) {
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          aria-expanded={infoOpen}
                          aria-controls={infoPanelId}
                          onClick={() => setInfoOpen((value) => !value)}
                          className={cn(
                            "font-heading flex w-full items-center justify-between py-4 text-left text-3xl font-medium tracking-[0.04em] text-forest",
                            "transition-opacity duration-300",
                            !isActive && "opacity-70",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "size-5 transition-transform duration-400 ease-luxury",
                              infoOpen && "rotate-180",
                            )}
                            strokeWidth={1.5}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {infoOpen && (
                            <motion.ul
                              id={infoPanelId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="overflow-hidden pl-2"
                            >
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      "font-heading block py-3 text-lg tracking-[0.08em] text-forest/65 uppercase",
                                      "transition-colors duration-300 hover:text-forest",
                                      pathname === child.href && "text-forest",
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.06 * index,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "font-heading block py-4 text-3xl font-medium tracking-[0.04em] text-forest",
                            "transition-opacity duration-300",
                            isActive ? "opacity-100" : "opacity-70 hover:opacity-100",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10">
                <RsvpButton onClick={() => setOpen(false)} />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
