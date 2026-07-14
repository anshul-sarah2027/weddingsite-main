"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { IMAGES } from "@/constants/images";
import { invitationFooterNavigation } from "@/constants/navigation";
import { SITE, WEDDING } from "@/lib/constants";
import { navigateToSectionHash } from "@/lib/hash-navigation";
import { cn } from "@/lib/utils";

function ClosingDivider() {
  return (
    <div
      className="mx-auto flex w-[200px] max-w-[70%] items-center justify-center gap-2.5 opacity-40"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[#D2B57A]" />
      <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <ellipse
          cx="12"
          cy="14"
          rx="5"
          ry="2.5"
          stroke="#D2B57A"
          strokeWidth="1"
        />
        <path
          d="M12 14C12 10 9 7 6.5 8.5C8 6 10.5 5 12 7C13.5 5 16 6 17.5 8.5C15 7 12 10 12 14Z"
          stroke="#D2B57A"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px flex-1 bg-[#D2B57A]" />
    </div>
  );
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        if (navigateToSectionHash(href)) {
          event.preventDefault();
        }
      }}
      className="group relative font-heading text-base text-[rgba(250,246,238,0.88)] transition-colors duration-500 ease-luxury hover:text-[#E2C78D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2B57A]/50"
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-[#D2B57A] transition-transform duration-500 ease-luxury group-hover:scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Footer() {
  useEffect(() => {
    const refreshScroll = () => window.dispatchEvent(new Event("resize"));
    refreshScroll();
    const t1 = window.setTimeout(refreshScroll, 300);
    const t2 = window.setTimeout(refreshScroll, 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <footer
      className="relative isolate w-full scroll-mt-8"
      aria-label="Closing invitation"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={IMAGES.heroAlt.footer}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[rgba(33,54,41,0.82)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[900px] px-6 py-10 pb-4 text-center md:py-12 md:pb-5">
        {/* Seal */}
        <Link
          href="/"
          aria-label="Return to home"
          className="group inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2B57A]/50"
        >
          <img
            src={IMAGES.patterns.ivorySeal}
            alt=""
            width={1254}
            height={1254}
            draggable={false}
            className="mx-auto block h-auto w-[156px] select-none transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:w-[168px]"
            aria-hidden="true"
          />
        </Link>

        <p className="font-heading mt-3 text-3xl tracking-[1px] text-[#FAF6EE] sm:text-[2.625rem]">
          {SITE.couple.bride} &amp; {SITE.couple.groom}
        </p>

        <p
          className={cn(
            "font-editorial text-editorial mt-1.5 text-2xl",
          )}
        >
          {SITE.hashtag}
        </p>

        <div className="my-4">
          <ClosingDivider />
        </div>

        <p className="font-heading text-sm text-[#FAF6EE] sm:text-base">
          {SITE.weddingWeekendDisplay}
        </p>
        <p className="font-heading mt-1 text-sm text-[rgba(250,246,238,0.85)]">
          {WEDDING.venue}
        </p>
        <p className="font-heading mt-0.5 text-sm text-[rgba(250,246,238,0.75)]">
          Kerala
        </p>

        <div className="my-4">
          <ClosingDivider />
        </div>

        <nav aria-label="Invitation navigation">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {invitationFooterNavigation.map((item, index) => (
              <Fragment key={item.href}>
                <FooterNavLink href={item.href} label={item.label} />
                {index < invitationFooterNavigation.length - 1 ? (
                  <span
                    className="hidden font-heading text-sm text-[#D2B57A]/50 sm:inline"
                    aria-hidden="true"
                  >
                    •
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </nav>

        <div className="my-4">
          <ClosingDivider />
        </div>

        <p
          className={cn(
            "font-editorial text-editorial text-base sm:text-lg",
          )}
        >
          See you beneath the palms of Kumarakom.
        </p>

        {/* Studio credit — invitation colophon */}
        <div className="mt-5">
          <ClosingDivider />
          <p className="mt-5 font-heading text-[10px] uppercase tracking-[0.28em] text-[rgba(250,246,238,0.5)]">
            Website by
          </p>
          <a
            href="https://www.instagram.com/bymotifstudios/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
            "font-editorial group relative mt-1.5 inline-block text-xl text-editorial transition-colors duration-500 hover:text-[#E8C98A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2B57A]/40",
            )}
          >
            byMotifStudios
            <span
              className="absolute -bottom-0.5 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-[#D2B57A]/70 transition-transform duration-500 ease-luxury group-hover:scale-x-100"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
