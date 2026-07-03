"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Countdown } from "@/components/shared/countdown";
import { IMAGES } from "@/constants/images";
import { SITE, WEDDING } from "@/lib/constants";
import { TextReveal } from "@/components/animations/text-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Arrival() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="arrival"
      className="relative flex min-h-screen items-end overflow-hidden"
      aria-label="Welcome"
    >
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Kerala backwaters at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full pb-16 pt-32 md:pb-24">
        <div className="container-editorial">
          <motion.p
            className="text-subtitle text-gold-muted mb-6"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {SITE.weddingDateDisplay} · {WEDDING.region}
          </motion.p>

          <TextReveal
            text={`${SITE.couple.groom} & ${SITE.couple.bride}`}
            as="h1"
            className="text-display text-ivory"
            delay={0.5}
          />

          <motion.p
            className="text-body-lg mt-6 max-w-lg text-ivory/80"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            An invitation to journey with us to the serene backwaters of
            Kumarakom — where two worlds meet in celebration.
          </motion.p>

          <div className="mt-12">
            <Countdown />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/50"
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="size-5" />
      </motion.div>
    </section>
  );
}
