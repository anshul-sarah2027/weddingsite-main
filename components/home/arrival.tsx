"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Arrival() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="arrival"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#F3EEE4]"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        <motion.div
          className="relative size-full"
          initial={reducedMotion ? {} : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 2.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Desktop / tablet — no hashtag in art */}
          <Image
            src={IMAGES.hero}
            alt="Illustrated Kerala wedding scene — houseboat, elephant, and tropical botanicals"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center md:block"
            quality={90}
          />
          {/* Mobile — hashtag already in the image */}
          <Image
            src={IMAGES.heroMobile}
            alt="Illustrated Kerala wedding scene — houseboat, elephant, and tropical botanicals"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
            quality={90}
          />
        </motion.div>

        {/* Very light wash so the image still leads */}
        <div
          className="absolute inset-0 bg-[rgba(250,247,242,0.06)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#F3EEE4]/28 via-[#F3EEE4]/10 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Hashtag — desktop only (mobile art already includes it) */}
      <motion.p
        className={cn(
          "font-heading pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden px-6 text-center text-sm font-medium tracking-[0.22em] text-[#2F3A2E] uppercase md:bottom-10 md:block md:text-base lg:bottom-12 lg:text-lg",
        )}
        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label="Pints and Pappadams"
      >
        <span aria-hidden="true">#&nbsp;PINTS </span>
        <span
          className="font-heading font-normal tracking-[0.14em] text-[#B59A63] italic normal-case"
          aria-hidden="true"
        >
          and
        </span>
        <span aria-hidden="true"> PAPPADAMS</span>
      </motion.p>
    </section>
  );
}
