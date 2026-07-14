"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function ScrollIndicator({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-9"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.55, duration: 1.2, ease: EASE_OUT_EXPO }}
      aria-hidden="true"
    >
      <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-forest/45">
        Explore
      </p>
      <span className="h-7 w-px bg-forest/30 opacity-50" />
    </motion.div>
  );
}

function BotanicalDivider({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="mx-auto mt-8 flex flex-col items-center gap-3 md:mt-10"
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 1, ease: EASE_OUT_EXPO }}
      aria-hidden="true"
    >
      <Image
        src={IMAGES.patterns.divider}
        alt=""
        width={1716}
        height={380}
        sizes="160px"
        className="h-auto w-32 opacity-55 md:w-40"
      />
      <Image
        src={IMAGES.decor.peonyWithBud}
        alt=""
        width={120}
        height={140}
        className="h-auto w-10 opacity-40 md:w-12"
      />
    </motion.div>
  );
}

export function TravelStayHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[82vh] flex-col overflow-hidden pt-28 md:min-h-[85vh] md:pt-32 lg:min-h-[88vh]"
      aria-label="Travel & Stay"
    >
      {/* Static hero background — no scroll-linked parallax (avoids Lenis jank) */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt.welcomeToKerala}
          alt="Watercolor of Kerala backwaters at morning — houseboats, lotus, and palms"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%] md:object-[center_32%]"
          quality={80}
        />

        <div
          className="absolute inset-0 bg-[rgba(250,246,238,0.14)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[rgba(255,252,247,0.22)] via-[rgba(250,246,238,0.1)] to-[rgba(250,246,238,0.1)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(255,252,247,0.26)_0%,transparent_60%)]"
          aria-hidden="true"
        />
      </div>

      <div
        className="pointer-events-none absolute top-[20%] -left-6 z-[1] hidden w-24 opacity-[0.12] md:left-4 md:block md:w-32 md:opacity-[0.16]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.bananaLeaves}
          alt=""
          width={180}
          height={220}
          sizes="128px"
          className="h-auto w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute top-[24%] -right-5 z-[1] hidden w-20 opacity-[0.1] md:right-6 md:block md:w-28 md:opacity-[0.14]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.lotusCluster}
          alt=""
          width={160}
          height={160}
          sizes="112px"
          className="h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-20 text-center md:pb-24">
        <motion.div
          className="relative mx-auto mb-5 h-[4.5rem] w-[7.5rem] md:mb-6 md:h-[5.25rem] md:w-[9rem]"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: EASE_OUT_EXPO }}
        >
          <Image
            src={IMAGES.decor.travelAndStayHeader}
            alt=""
            fill
            sizes="144px"
            className="object-contain opacity-[0.72]"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h1
          className={cn(
            "font-heading text-[2.375rem] font-medium uppercase tracking-[0.2em] text-forest",
            "drop-shadow-[0_1px_18px_rgba(250,246,238,0.85)]",
            "md:text-[3.25rem] md:tracking-[0.24em] lg:text-[4rem] lg:tracking-[0.28em]",
          )}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.25,
            delay: 0.28,
            ease: EASE_OUT_EXPO,
          }}
        >
          Travel &amp; Stay
        </motion.h1>

        <motion.p
          className={cn(
            "font-editorial mt-4 text-2xl text-forest md:mt-5 md:text-[1.85rem] lg:text-[2.125rem]",
            "drop-shadow-[0_1px_12px_rgba(250,246,238,0.8)]",
          )}
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.15,
            delay: 0.45,
            ease: EASE_OUT_EXPO,
          }}
        >
          God&apos;s Own Country
        </motion.p>

        <BotanicalDivider reducedMotion={reducedMotion} />
      </div>

      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  );
}
