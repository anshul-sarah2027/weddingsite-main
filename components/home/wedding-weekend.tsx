"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function WeekendStampCta() {
  return (
    <Link
      href="/events"
      className="group relative mx-auto mt-10 inline-flex flex-col items-center md:mt-12"
    >
      <span className="relative block w-[130px] transition-[filter,transform,box-shadow] duration-500 ease-out group-hover:scale-[1.04] group-hover:rotate-1 group-hover:saturate-[1.08] group-hover:shadow-[0_12px_32px_rgba(45,74,62,0.14)] sm:w-[160px]">
        <img
          src={IMAGES.patterns.weekendSeal}
          alt=""
          width={1254}
          height={1254}
          draggable={false}
          className="block h-auto w-full select-none"
          aria-hidden="true"
        />
        <span
          className={cn(
            "font-editorial pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[1.05rem] leading-tight text-[#5C4A32] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:text-[1.15rem]",
          )}
        >
          <span>Explore</span>
          <span>The Weekend</span>
        </span>
      </span>

      <span className="font-heading mt-4 flex items-center gap-1 text-[12px] text-forest/55 transition-[gap] duration-500 ease-out group-hover:gap-2 sm:text-[13px]">
        Discover every celebration
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export function WeddingWeekend() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="weekend"
      className="relative scroll-mt-32 overflow-hidden py-16 md:min-h-[640px] md:py-20 lg:min-h-[680px]"
      aria-label="Wedding Weekend Preview"
    >
      {/* Paper texture background */}
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
          className="absolute inset-0 bg-[rgba(250,246,239,0.92)]"
          aria-hidden="true"
        />
      </div>

      {/* SA crest watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.04] mix-blend-multiply"
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

      {/* Botanical accents */}
      <div
        className="pointer-events-none absolute top-8 right-4 z-[1] w-28 opacity-[0.06] md:right-12 md:w-36"
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
        className="pointer-events-none absolute bottom-8 left-4 z-[1] w-24 opacity-[0.06] md:left-12 md:w-32"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.lotusCluster}
          alt=""
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Section heading */}
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-4 h-18 w-32 md:mb-5 md:h-24 md:w-40">
            <Image
              src={IMAGES.decor.weekendHeader}
              alt=""
              fill
              sizes="128px"
              className="object-contain opacity-75"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Three unforgettable days
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Wedding Weekend
          </h2>

          <div className="mx-auto mt-6 flex justify-center md:mt-8">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="h-auto w-40 opacity-60 md:w-48"
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        {/* Editorial spread */}
        <div className="mt-12 grid items-center gap-12 md:mt-14 md:grid-cols-[48%_52%] md:gap-14 lg:gap-20">
          {/* Left — timeline illustration */}
          <FadeIn duration={0.9} delay={0.1} className="flex justify-center md:justify-end">
            <motion.div
              className="w-full max-w-[520px]"
              animate={
                reducedMotion ? undefined : { y: [0, -5, 0] }
              }
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={IMAGES.venueKerala.timeline}
                alt="Illustrated timeline of wedding weekend celebrations in Kerala"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 520px"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </FadeIn>

          {/* Right — editorial invitation */}
          <FadeIn
            duration={0.9}
            delay={0.15}
            className="text-center md:text-left"
          >
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              A Weekend to Remember
            </p>

            <h3 className="font-heading mt-3 text-3xl font-medium text-forest md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Celebrate With Us
            </h3>

            <p className="font-heading mx-auto mt-6 max-w-[470px] text-base leading-[1.85] text-forest/65 md:mx-0 md:text-lg">
              From golden sunsets across the tranquil backwaters to heartfelt
              celebrations beneath swaying coconut palms, our wedding weekend has
              been thoughtfully planned to bring together family, friends,
              tradition and unforgettable moments. Every gathering has its own
              story, and we cannot wait to share them with you.
            </p>

            <blockquote
              className={cn(
            "font-editorial text-editorial-quote mx-auto mt-10 max-w-sm text-xl leading-snug md:mx-0 md:text-2xl",
              )}
            >
              &ldquo;Love deserves more than a day&mdash;
              <br />
              it deserves a weekend.&rdquo;
            </blockquote>

            <div className="md:flex md:justify-start">
              <WeekendStampCta />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
