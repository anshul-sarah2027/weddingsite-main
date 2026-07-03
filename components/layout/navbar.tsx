"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation } from "@/constants/navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTextClass =
    isHome && !scrolled
      ? "text-ivory/90 hover:text-ivory"
      : "text-foreground/70 hover:text-foreground";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury",
        scrolled || !isHome
          ? "border-b border-border/60 bg-background/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav
        className="container-editorial flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={cn(
            "font-heading text-lg tracking-wide transition-colors md:text-xl",
            isHome && !scrolled ? "text-ivory" : "text-foreground",
          )}
        >
          {SITE.couple.groom} & {SITE.couple.bride}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-caption transition-colors duration-300",
                navTextClass,
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant={isHome && !scrolled ? "outline" : "default"}
            size="sm"
            className={cn(
              "rounded-none px-5 tracking-widest uppercase",
              isHome &&
                !scrolled &&
                "border-ivory/40 bg-transparent text-ivory hover:bg-ivory/10 hover:text-ivory",
            )}
          >
            <Link href="/rsvp">RSVP</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              className={cn(
                "flex size-10 items-center justify-center",
                isHome && !scrolled ? "text-ivory" : "text-foreground",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading text-left text-xl font-normal">
                {SITE.name}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-10 flex flex-col gap-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/rsvp"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center border border-forest bg-forest px-6 py-3 text-caption text-ivory"
              >
                RSVP
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
