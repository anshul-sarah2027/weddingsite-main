"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { fontAustinPen } from "@/lib/fonts";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Arrival() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="arrival"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        <motion.div
          className="relative size-full"
          initial={reducedMotion ? {} : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 2.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src={IMAGES.hero}
            alt="Illustrated Kerala backwaters — houseboats, temple, and tropical landscape at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] md:object-center"
            quality={90}
          />
        </motion.div>

        <div className="absolute inset-0 bg-forest/20" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/15 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(45,74,62,0.25)_100%)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-28 pt-36 text-center md:pb-32 md:pt-40">
        {/* Sand dollar ornament */}
        <motion.div
          className="relative mb-6 size-16 md:mb-8 md:size-20"
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={IMAGES.decor.sandDollar}
            alt=""
            fill
            sizes="80px"
            className="object-contain brightness-0 invert"
            aria-hidden="true"
          />
        </motion.div>

        {/* Date — Austin Pen */}
        <motion.h2
          className={cn(
            fontAustinPen.className,
            "austin-pen-soft text-4xl italic text-white md:text-5xl lg:text-6xl",
            "drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {SITE.weddingDateDisplay}
        </motion.h2>

        {/* Couple names — Cormorant Garamond */}
        <motion.h1
          className={cn(
            "font-heading mt-2 max-w-4xl text-5xl font-medium tracking-wide text-white md:mt-3 md:text-7xl lg:text-8xl",
            "drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {SITE.couple.groom} & {SITE.couple.bride}
        </motion.h1>

        {/* Venue — Austin Pen */}
        <motion.h3
          className={cn(
            fontAustinPen.className,
            "austin-pen-soft mt-5 text-3xl text-white md:mt-6 md:text-4xl",
            "drop-shadow-[0_1px_12px_rgba(0,0,0,0.3)]",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Kumarakom, Kerala
        </motion.h3>
      </div>

      {/* Bottom — text link only */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-4 md:bottom-10"
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <Link
          href="#welcome"
          className={cn(
            fontAustinPen.className,
            "austin-pen-soft whitespace-nowrap text-center text-xl text-white/75 transition-colors duration-500 hover:text-white md:text-2xl",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30",
          )}
        >
          {SITE.hashtag}
        </Link>
      </motion.div>
    </section>
  );
}
