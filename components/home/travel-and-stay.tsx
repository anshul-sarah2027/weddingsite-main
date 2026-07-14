"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE, WEDDING } from "@/lib/constants";
import { cn } from "@/lib/utils";

function BoardingPassField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="font-heading text-[9px] uppercase tracking-[0.22em] text-[#596B55]/55 sm:text-[10px]">
        {label}
      </p>
      <p className="font-heading mt-0.5 truncate text-sm font-medium tracking-[0.06em] text-[#56524A] sm:text-base">
        {value}
      </p>
    </div>
  );
}

function TravelBoardingPassCta() {
  return (
    <div className="group/boarding mt-14 flex w-full flex-col gap-8 md:mt-16 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
      {/* Left — guide guests to the seal */}
      <div className="flex flex-1 flex-col justify-center lg:items-end lg:text-right">
        <p
          className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
          )}
        >
          Everything you&apos;ll need
        </p>
        <p className="font-heading mt-3 max-w-md text-base leading-[1.85] text-[#56524A]/85 md:text-lg lg:ml-auto">
          Your complete travel and stay guide flights, accommodation, and
          local recommendations is ready whenever you are.
        </p>
        <p className="font-heading mt-5 flex items-center gap-2 text-sm tracking-[0.06em] text-[#596B55]/70 lg:justify-end">
          <span className="hidden lg:inline">Click the seal to open your guide</span>
          <span className="lg:hidden">Tap the seal to open your guide</span>
          <span
            className="inline-block transition-transform duration-500 ease-out group-hover/boarding:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </p>
        <div
          className="mt-4 hidden h-px max-w-[12rem] flex-1 bg-[repeating-linear-gradient(to_right,#596B55_0,#596B55_4px,transparent_4px,transparent_10px)] opacity-20 lg:ml-auto lg:block lg:max-w-[10rem]"
          aria-hidden="true"
        />
      </div>

      <Link
        href="/events"
        className="flex w-full shrink-0 rotate-[1.25deg] flex-row items-stretch overflow-hidden border border-[#596B55]/12 bg-[rgba(250,246,239,0.72)] transition-transform duration-700 ease-out group-hover/boarding:rotate-0 lg:max-w-3xl"
      >
      {/* Boarding pass details */}
      <div className="relative min-w-0 flex-1 px-4 py-4 sm:px-7 sm:py-6">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#596B55]/18 pb-4">
          <div>
            <p className="font-heading text-[9px] uppercase tracking-[0.24em] text-[#596B55]/55 sm:text-[10px]">
              Passenger
            </p>
            <p className="font-heading mt-1 text-base font-medium text-[#56524A] sm:text-lg">
              Guest of Honour
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-[9px] uppercase tracking-[0.24em] text-[#596B55]/55 sm:text-[10px]">
              Booking Ref
            </p>
            <p className="font-heading mt-1 text-sm tracking-[0.14em] text-[#56524A]/80 sm:text-base">
              KLR·0847291
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          <BoardingPassField label="From" value="WORLD" />
          <BoardingPassField label="To" value="COK" />
          <BoardingPassField label="Flight" value="AS·2027" />
          <BoardingPassField label="Date" value="30 JAN 27" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-4 border-t border-dashed border-[#596B55]/18 pt-4 sm:grid-cols-4">
          <BoardingPassField label="Gate" value="B12" />
          <BoardingPassField label="Seat" value="—" />
          <BoardingPassField label="Class" value="Guest" />
          <BoardingPassField
            label="Boarding"
            value="14:30"
            className="hidden sm:block"
          />
        </div>

        <div className="mt-4 border-t border-dashed border-[#596B55]/18 pt-4">
          <p className="font-heading text-[9px] uppercase tracking-[0.24em] text-[#596B55]/55 sm:text-[10px]">
            Destination
          </p>
          <p className="font-heading mt-1 text-sm tracking-[0.04em] text-[#56524A] sm:text-base">
            {WEDDING.venue} · {WEDDING.region}
          </p>
        </div>

        <p
          className={cn(
            "font-editorial text-editorial/80 mt-4 text-sm sm:text-base",
          )}
        >
          {SITE.hashtag}
        </p>

        <p className="font-heading mt-3 border-t border-dashed border-[#596B55]/18 pt-3 text-[11px] leading-relaxed tracking-[0.04em] text-[#596B55]/60 sm:text-xs">
          <span className="uppercase tracking-[0.18em]">Notice</span>
          <span className="mx-1.5 opacity-40" aria-hidden="true">
            ·
          </span>
          Present seal at right for full travel &amp; stay details
        </p>
      </div>

      {/* Tear line */}
      <div
        className="relative w-px shrink-0 bg-[repeating-linear-gradient(to_bottom,#596B55_0,#596B55_4px,transparent_4px,transparent_10px)] opacity-25"
        aria-hidden="true"
      />

      {/* Seal — right side */}
      <div className="flex shrink-0 items-center justify-center px-3 py-4 sm:px-6 sm:py-8">
        <span className="relative block w-[120px] transition-[transform,box-shadow] duration-500 ease-out group-hover/boarding:scale-105 group-hover/boarding:rotate-1 group-hover/boarding:shadow-[0_14px_40px_rgba(0,0,0,0.12)] sm:w-[180px] md:w-[200px]">
          <img
            src={IMAGES.patterns.weekendSeal}
            alt=""
            width={1254}
            height={1254}
            draggable={false}
            className="relative z-0 block h-auto w-full select-none"
            aria-hidden="true"
          />
          <span
            className={cn(
            "font-editorial pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-[0.72rem] leading-[1.15] text-[#5C4A32] transition-transform duration-500 ease-out group-hover/boarding:-translate-y-0.5 sm:text-[1.05rem]",
            )}
          >
            <span>Begin Your</span>
            <span>Journey →</span>
          </span>
        </span>
      </div>
      </Link>
    </div>
  );
}

export function TravelAndStay() {
  return (
    <section
      id="travel-stay"
      className="relative scroll-mt-32 overflow-hidden pt-0 pb-20 md:min-h-[900px] md:pt-0 md:pb-24 lg:min-h-[1000px]"
      aria-label="Travel and Stay Preview"
    >
      {/* Ivory paper background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt.invitation}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[rgba(250,246,239,0.94)]"
          aria-hidden="true"
        />
      </div>

      {/* Botanical accents */}
      <div
        className="pointer-events-none absolute top-10 left-6 z-[1] w-28 opacity-[0.04] md:left-12 md:w-36"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.bananaLeaves}
          alt=""
          width={200}
          height={260}
          className="h-auto w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute right-6 bottom-10 z-[1] w-24 opacity-[0.04] md:right-12 md:w-32"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.oliveBranch}
          alt=""
          width={180}
          height={220}
          className="h-auto w-full"
        />
      </div>

      {/* Full-bleed editorial images — Kumarakom Lake Resort */}
      <div className="relative z-10 mt-0">
        <FadeIn delay={0.3} duration={0.9}>
          <div className="group relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[420px]">
            <Image
              src={IMAGES.venueKerala.heritageLakeVillas}
              alt="Heritage lake-view villas at Kumarakom Lake Resort"
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3">
          <FadeIn delay={0.4} duration={0.9}>
            <div className="relative h-[200px] overflow-hidden sm:h-[260px] md:h-[320px]">
              <Image
                src={IMAGES.venueKerala.houseboats}
                alt="Traditional Kerala houseboats on the backwaters"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.5} duration={0.9}>
            <div className="relative h-[200px] overflow-hidden sm:h-[260px] md:h-[320px]">
              <Image
                src={IMAGES.venueKerala.meanderingPoolVillas}
                alt="Meandering pool and duplex villas at Kumarakom Lake Resort"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.55} duration={0.9} className="col-span-2 md:col-span-1">
            <div className="relative h-[200px] overflow-hidden sm:h-[260px] md:h-[320px]">
              <Image
                src={IMAGES.venueKerala.vembanadSeafoodBar}
                alt="Vembanad the Seafood Bar at Kumarakom Lake Resort"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>

      <Container size="wide" className="relative z-10">
        {/* Boarding pass CTA */}
        <FadeIn delay={0.6} duration={0.9}>
          <TravelBoardingPassCta />
        </FadeIn>

        {/* Signature */}
        <FadeIn
          className="mx-auto mt-12 flex flex-col items-center md:mt-14"
          delay={0.7}
          duration={0.9}
        >
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="200px"
            className="h-auto w-40 opacity-60 md:w-48"
            aria-hidden="true"
          />
          <p
            className={cn(
            "font-editorial text-editorial mt-8 text-xl tracking-[0.02em] opacity-75 md:text-2xl",
            )}
          >
            {SITE.hashtag}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
