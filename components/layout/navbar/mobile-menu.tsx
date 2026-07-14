"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/layout/navbar/logo";
import { RsvpButton } from "@/components/layout/navbar/rsvp-button";
import { mainNavigation } from "@/constants/navigation";
import { IMAGES } from "@/constants/images";
import {
  isHashNavActive,
  useLocationHash,
} from "@/hooks/use-location-hash";
import { navigateToSectionHash } from "@/lib/hash-navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onHero?: boolean;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Solid warm ivory — never transparent */
const MENU_BG = "#FAF7F2";

export function MobileMenu({ onHero = false }: MobileMenuProps) {
  const pathname = usePathname();
  const hash = useLocationHash();
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSection(null);
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
        {open ? (
          <X className="size-5" strokeWidth={1.5} />
        ) : (
          <Menu className="size-5" strokeWidth={1.5} />
        )}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
                style={{ backgroundColor: MENU_BG }}
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0 }}
              >
                {/* Solid opaque ivory — never transparent */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundColor: MENU_BG }}
                  aria-hidden="true"
                />

                {/* Paper texture on solid ivory only */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(181,154,99,0.1),transparent_55%),radial-gradient(ellipse_at_50%_100%,rgba(45,58,48,0.05),transparent_50%)]"
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(78vw,22rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.04] mix-blend-multiply"
                  aria-hidden="true"
                >
                  <Image
                    src={IMAGES.logo.main}
                    alt=""
                    width={1254}
                    height={1254}
                    className="h-auto w-full"
                  />
                </div>

                <div
                  className="pointer-events-none absolute -left-4 top-24 w-24 opacity-[0.1] sm:w-28"
                  aria-hidden="true"
                >
                  <Image
                    src={IMAGES.decor.eucalyptus}
                    alt=""
                    width={200}
                    height={260}
                    className="h-auto w-full"
                  />
                </div>
                <div
                  className="pointer-events-none absolute -right-3 bottom-28 w-20 opacity-[0.09] sm:w-24"
                  aria-hidden="true"
                >
                  <Image
                    src={IMAGES.decor.peonyWithBud}
                    alt=""
                    width={160}
                    height={180}
                    className="h-auto w-full"
                  />
                </div>

                <div className="relative z-10 flex h-28 shrink-0 items-center justify-between px-6 md:h-32">
                  <Logo onClick={() => setOpen(false)} />
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center text-forest/70 transition-colors duration-300 hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <X className="size-5" strokeWidth={1.5} />
                  </button>
                </div>

                <nav
                  className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-y-auto px-8 pb-10 pt-2"
                  aria-label="Mobile navigation"
                >
                  <p className="font-editorial text-editorial mb-6 text-center text-lg tracking-[0.04em]">
                    Navigate
                  </p>

                  <div className="mb-8 flex justify-center">
                    <Image
                      src={IMAGES.patterns.divider}
                      alt=""
                      width={1716}
                      height={380}
                      sizes="140px"
                      className="h-auto w-28 opacity-50"
                      aria-hidden="true"
                    />
                  </div>

                  <ul className="flex w-full max-w-sm flex-col items-center gap-1 text-center">
                    {mainNavigation.map((item) => {
                      const hasChildren = Boolean(item.children?.length);
                      const sectionOpen = openSection === item.href;
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname === item.href ||
                            pathname.startsWith(`${item.href}/`) ||
                            item.children?.some((child) => {
                              const pathOnly =
                                child.href.split("#")[0] || child.href;
                              return (
                                pathname === pathOnly ||
                                pathname.startsWith(`${pathOnly}/`)
                              );
                            });

                      if (hasChildren) {
                        const sectionPanelId = `${panelId}-${item.href.replace(/\W/g, "")}`;
                        return (
                          <li key={item.href} className="w-full">
                            <button
                              type="button"
                              aria-expanded={sectionOpen}
                              aria-controls={sectionPanelId}
                              onClick={() =>
                                setOpenSection((value) =>
                                  value === item.href ? null : item.href,
                                )
                              }
                              className={cn(
                                "font-heading mx-auto flex items-center justify-center gap-2 py-3.5 text-center text-[1.75rem] font-medium tracking-[0.1em] text-forest uppercase sm:text-3xl",
                                "transition-opacity duration-300",
                                !isActive && "opacity-65",
                              )}
                            >
                              {item.label}
                              <ChevronDown
                                className={cn(
                                  "size-4 shrink-0 text-editorial transition-transform duration-400 ease-luxury sm:size-5",
                                  sectionOpen && "rotate-180",
                                )}
                                strokeWidth={1.5}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {sectionOpen && (
                                <motion.ul
                                  id={sectionPanelId}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: EASE }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-col items-center gap-0.5 pb-3 pt-1">
                                    {item.children?.map((child) => {
                                      const childActive = isHashNavActive(
                                        child.href,
                                        pathname,
                                        hash,
                                      );
                                      return (
                                        <li key={child.href}>
                                          <Link
                                            href={child.href}
                                            onClick={(event) => {
                                              if (
                                                navigateToSectionHash(child.href)
                                              ) {
                                                event.preventDefault();
                                              }
                                              setOpen(false);
                                            }}
                                            className={cn(
                                              "font-editorial block py-2.5 text-base tracking-[0.06em] text-forest/55 transition-colors duration-300 hover:text-editorial sm:text-lg",
                                              childActive && "text-editorial",
                                            )}
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </div>
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </li>
                        );
                      }

                      return (
                        <li key={item.href} className="w-full">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "font-heading block py-3.5 text-[1.75rem] font-medium tracking-[0.1em] text-forest uppercase sm:text-3xl",
                              "transition-opacity duration-300",
                              isActive
                                ? "opacity-100"
                                : "opacity-65 hover:opacity-100",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Image
                      src={IMAGES.patterns.divider}
                      alt=""
                      width={1716}
                      height={380}
                      sizes="140px"
                      className="h-auto w-28 opacity-50"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-8 flex flex-col items-center">
                    <RsvpButton onClick={() => setOpen(false)} />
                    <p className="font-editorial text-editorial mt-5 text-sm tracking-[0.08em]">
                      {SITE.weddingWeekendDisplay}
                    </p>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
