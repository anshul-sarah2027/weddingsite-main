"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { fontAustinPen } from "@/lib/fonts";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function CouplePhotoFrame({ reducedMotion }: { reducedMotion: boolean }) {
  const frameTransition = {
    duration: reducedMotion ? 0 : 1,
    delay: reducedMotion ? 0 : 0.5,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  const botanicalTransition = (delay: number) => ({
    duration: reducedMotion ? 0 : 0.9,
    delay: reducedMotion ? 0 : delay,
    ease: [0.25, 0.1, 0.25, 1] as const,
  });

  return (
    <div className="relative px-2 py-4 sm:px-4 sm:py-5">
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]">
        {/* Banana corner — top left, aligned to frame corner */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 w-48 origin-top-left -translate-x-[2%] -translate-y-[28%] sm:w-52 md:w-56"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={botanicalTransition(0.75)}
          aria-hidden="true"
        >
          <Image
            src={IMAGES.decor.bananaCorner}
            alt=""
            width={1402}
            height={1122}
            className="h-auto w-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
          />
        </motion.div>

        {/* Peony — bottom right, aligned to frame corner */}
        <motion.div
          className="pointer-events-none absolute right-0 bottom-0 z-20 w-32 origin-bottom-right translate-x-[32%] translate-y-[28%] sm:w-36 md:w-40"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.92, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={botanicalTransition(0.95)}
          aria-hidden="true"
        >
          <Image
            src={IMAGES.decor.peonyWithBud}
            alt=""
            width={400}
            height={400}
            className="h-auto w-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
          />
        </motion.div>

        {/* Ivory paper mat frame */}
        <motion.div
          className="couple-art-frame w-full"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={frameTransition}
        >
          <div className="couple-art-frame__photo">
            <Image
              src={IMAGES.couple.primary}
              alt="Anshul Nama and Sarah Ninan"
              width={1200}
              height={1600}
              sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function TheirStory() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative scroll-mt-32 py-16 md:py-24"
      aria-label="The Couple"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt.couple}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-forest/70" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/65 to-forest/85"
          aria-hidden="true"
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Header */}
        <FadeIn className="mx-auto max-w-2xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-5 h-14 w-28 md:mb-6 md:h-16 md:w-32">
            <Image
              src={IMAGES.decor.coupleIllustration}
              alt=""
              fill
              sizes="128px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>
          <p
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft text-2xl text-ivory/85 md:text-3xl",
            )}
          >
            Two hearts, one beautiful beginning
          </p>
          <h2 className="font-heading mt-5 text-3xl font-medium uppercase tracking-[0.14em] text-ivory md:text-4xl">
            The Couple
          </h2>
        </FadeIn>

        {/* Image left · copy right */}
        <div className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-[2fr_3fr] md:gap-14 lg:gap-16">
          {/* Couple photo — left */}
          <div className="flex justify-center md:justify-end">
            <CouplePhotoFrame reducedMotion={reducedMotion} />
          </div>

          {/* Copy — right */}
          <FadeIn delay={0.15} duration={0.9} className="text-left">
            <div className="space-y-5 font-heading text-base leading-relaxed text-ivory/80 md:text-lg">
              <p>
                Anshul Nama and Sarah Ninan are two kindred spirits who found
                each other across continents drawn together by curiosity,
                laughter, and a shared love of life&apos;s quiet, beautiful
                moments.
              </p>
              <p>
                We&apos;re so excited to{" "}
                <span className="text-gold italic">celebrate</span> our wedding
                with the people we{" "}
                <span className="italic tracking-widest text-ivory">love</span>{" "}
                most. As we count down to our big day, we&apos;ve created this
                website to keep you updated on all the details.
              </p>
              <p>
                Thank you for being a part of our journey. We can&apos;t wait to
                celebrate with you!
              </p>
              <div className="pt-2">
                <p className="text-ivory/75 italic">With love,</p>
                <p
                  className={cn(
                    fontAustinPen.className,
                    "austin-pen-soft mt-1 text-2xl text-gold",
                  )}
                >
                  ~ Anshul & Sarah
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <FadeIn
          className="mx-auto mt-12 flex justify-center md:mt-14"
          delay={0.3}
          duration={0.9}
        >
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="288px"
            className="h-auto w-48 opacity-50 brightness-110 md:w-72"
            aria-hidden="true"
          />
        </FadeIn>

        <FadeIn className="mt-8 text-center md:mt-10" delay={0.35} duration={0.9}>
          <p
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft text-xl tracking-[0.02em] text-gold md:text-2xl",
            )}
          >
            {SITE.hashtag}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
