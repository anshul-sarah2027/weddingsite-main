"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
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

        {/* Soft ivory washes — strengthen slightly for text clarity */}
        <div
          className="absolute inset-0 bg-[rgba(250,247,242,0.16)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#F3EEE4]/85 via-[#F3EEE4]/45 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(250,247,242,0.38)_0%,transparent_56%)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-24 pt-36 text-center md:pb-28 md:pt-40">
        <motion.div
          className="relative mb-5 size-14 opacity-75 md:mb-7 md:size-16"
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={IMAGES.decor.sandDollar}
            alt=""
            fill
            sizes="64px"
            className="object-contain opacity-85 [filter:brightness(0)_saturate(100%)_invert(35%)_sepia(18%)_saturate(550%)_hue-rotate(70deg)_brightness(92%)]"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h2
          className={cn(
            "font-editorial text-[1.65rem] tracking-[0.04em] text-[#2F3A2E] sm:text-[1.85rem] md:text-4xl lg:text-[2.75rem]",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {SITE.weddingHeroDateDisplay}
        </motion.h2>

        <motion.h1
          className={cn(
            "font-heading mt-2 max-w-4xl text-5xl font-medium tracking-wide text-[#2F3A2E] md:mt-3 md:text-7xl lg:text-8xl",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {SITE.couple.bride} & {SITE.couple.groom}
        </motion.h1>

        <motion.h3
          className={cn(
            "font-editorial mt-5 text-2xl text-[#2F3A2E] md:mt-6 md:text-3xl lg:text-4xl",
          )}
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Kumarakom, Kerala
        </motion.h3>
      </div>

      {/* Hashtag — desktop only (mobile art already includes it) */}
      <motion.p
        className={cn(
          "font-heading pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden px-6 text-center text-sm font-medium tracking-[0.22em] text-[#2F3A2E] uppercase md:bottom-10 md:block md:text-base lg:bottom-12 lg:text-lg",
        )}
        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
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
