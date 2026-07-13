"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IMAGES } from "@/constants/images";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function ScrollIndicator({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-45 md:bottom-10"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 0.45 }}
      transition={{ delay: 1.4, duration: 1.2, ease: EASE_OUT_EXPO }}
      aria-hidden="true"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(248,244,236,0.7)"
        strokeWidth="1"
      >
        <path
          d="M12 3C10 6 8 9 8 12c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-6-4-9z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 16v4" strokeLinecap="round" />
      </svg>
      <motion.span
        className="h-6 w-px bg-[rgba(248,244,236,0.5)]"
        animate={reducedMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function WeddingWeekendHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reducedMotion ? "0%" : "12%"],
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[72vh] flex-col overflow-hidden pt-28 md:min-h-[70vh] md:pt-32 lg:min-h-[65vh]"
      aria-label="Wedding Weekend"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -top-[12%] -bottom-[12%]"
        style={reducedMotion ? undefined : { y: backgroundY }}
      >
        <Image
          src={IMAGES.heroAlt.weddingWeekend}
          alt="Illustrated Kerala backwaters with houseboats and palm trees"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] md:object-[center_40%]"
          quality={90}
        />

        {/* Layered forest overlays — readability without losing the illustration */}
        <div className="absolute inset-0 bg-forest/28" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/22 to-forest/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(45,74,62,0.38)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Subtle Kerala botanical accents — edges only, never over copy */}
      <div
        className="pointer-events-none absolute top-[18%] -left-4 z-[1] w-24 opacity-[0.07] md:left-6 md:w-32 md:opacity-[0.1]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.eucalyptus}
          alt=""
          width={200}
          height={260}
          className="h-auto w-full brightness-0 invert"
        />
      </div>
      <div
        className="pointer-events-none absolute top-[22%] -right-3 z-[1] w-20 opacity-[0.06] md:right-8 md:w-28 md:opacity-[0.09]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.lotusCluster}
          alt=""
          width={200}
          height={200}
          className="h-auto w-full brightness-0 invert"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center md:pb-20">
        <motion.div
          className="relative mx-auto mb-4 h-16 w-28 md:mb-5 md:h-20 md:w-36"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT_EXPO }}
        >
          <Image
            src={IMAGES.decor.weekendHeader}
            alt=""
            fill
            sizes="144px"
            className="object-contain brightness-0 invert opacity-80"
            aria-hidden="true"
          />
        </motion.div>

        {/* <motion.p
          className={cn(
            "font-editorial text-editorial text-2xl md:text-[1.75rem] lg:text-[2rem]",
            "drop-shadow-[0_1px_14px_rgba(0,0,0,0.35)]",  
          )}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: EASE_OUT_EXPO,
          }}
        >
          Three unforgettable days.
        </motion.p> */}

        <motion.h1
          className={cn(
            "font-heading mt-4 text-[2.625rem] font-medium uppercase tracking-[0.18em] text-[#F8F4EC]",
            "drop-shadow-[0_2px_24px_rgba(0,0,0,0.38)]",
            "md:mt-5 md:text-[3.625rem] md:tracking-[0.22em] lg:text-[4.5rem] lg:tracking-[12px]",
          )}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.3,
            delay: 0.5,
            ease: EASE_OUT_EXPO,
          }}
        >
          Wedding Weekend
        </motion.h1>

        <motion.div
          className="mx-auto mt-5 flex justify-center md:mt-6"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 0.62, duration: 1, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="180px"
            className="h-auto w-36 brightness-0 invert md:w-44"
          />
        </motion.div>

        {/* <motion.p
          className={cn(
            "font-heading text-body-lg mt-6 max-w-[640px] leading-[1.9] text-white/92",
            "drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]",
            "md:mt-7",
          )}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.7,
            ease: EASE_OUT_EXPO,
          }}
        >
          Every gathering, every ritual and every celebration has been
          thoughtfully planned to bring together the people we love most. We
          can&apos;t wait to share these moments with you in the heart of
          Kerala.
        </motion.p> */}

        <motion.div
          className="mt-9 md:mt-10"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 1,
            ease: EASE_OUT_EXPO,
          }}
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={IMAGES.patterns.rsvpSeal}
              alt=""
              width={1254}
              height={1254}
              draggable={false}
              className="mx-auto block h-auto w-[90px] select-none md:w-[110px]"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  );
}
