"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER = 0.1;

export function RsvpPageShell() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="RSVP"
    >
      {/* Full-bleed invitation illustration */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt.invitation}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_35%] md:object-[center_40%]"
          aria-hidden="true"
        />
        {/* Soft ivory veil — art reads at edges, center stays readable */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.55)_0%,rgba(250,247,242,0.72)_28%,rgba(250,247,242,0.82)_55%,rgba(250,247,242,0.9)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,252,247,0.55)_0%,transparent_55%)]"
          aria-hidden="true"
        />
      </div>

      {/* Soft botanical accents */}
      <div
        className="pointer-events-none absolute top-[18%] -left-4 z-[1] hidden w-28 opacity-[0.14] md:block md:w-36"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.bananaLeaves}
          alt=""
          width={180}
          height={220}
          sizes="144px"
          className="h-auto w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute right-0 bottom-[12%] z-[1] hidden w-32 opacity-[0.12] md:block md:w-40"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.lotusCluster}
          alt=""
          width={200}
          height={200}
          sizes="160px"
          className="h-auto w-full"
        />
      </div>

      <Container
        size="narrow"
        className="relative z-10 flex min-h-screen flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-24"
      >
        <div className="mx-auto w-full max-w-[560px]">
          <header className="text-center">
            <FadeIn duration={0.9}>
              <motion.div
                className="relative mx-auto h-[120px] w-[120px] sm:h-[148px] sm:w-[148px]"
                animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={IMAGES.decor.rsvpHeader}
                  alt=""
                  fill
                  sizes="148px"
                  className="object-contain drop-shadow-[0_8px_24px_rgba(47,58,46,0.08)]"
                  aria-hidden="true"
                />
              </motion.div>
            </FadeIn>

            <FadeIn duration={0.9} delay={STAGGER}>
              <p
                className={cn(
                  "font-editorial text-editorial mt-5 text-[1.75rem] sm:text-[2rem]",
                )}
              >
                {SITE.name}
              </p>
            </FadeIn>

            <FadeIn duration={0.9} delay={STAGGER * 2}>
              <h1 className="font-heading mt-3 text-3xl font-medium tracking-[0.2em] text-forest uppercase md:text-4xl lg:text-[2.75rem]">
                RSVP
              </h1>
            </FadeIn>

            <FadeIn duration={0.9} delay={STAGGER * 3}>
              <p className="font-heading mx-auto mt-5 max-w-md text-base leading-[1.9] text-[#2F3A2E]/85 md:text-lg">
                One reply for the whole wedding weekend. Tell us who will join
                you in Kumarakom — and any food notes for your party.
              </p>
            </FadeIn>

            <FadeIn duration={0.9} delay={STAGGER * 4}>
              <p className="font-heading mt-5 text-[0.8125rem] font-medium tracking-[0.22em] text-[#3E5643]/85 uppercase">
                Please reply by 31 August 2026
              </p>
            </FadeIn>

            <FadeIn duration={0.9} delay={STAGGER * 5}>
              <Image
                src={IMAGES.patterns.divider}
                alt=""
                width={1716}
                height={380}
                sizes="180px"
                className="mx-auto mt-6 h-auto w-36 opacity-45 md:w-44"
                aria-hidden="true"
              />
            </FadeIn>
          </header>

          <FadeIn duration={1} delay={STAGGER * 6} className="mt-10 md:mt-12">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1, ease: EASE }}
              className="relative border border-[#B59A63]/28 bg-[rgba(255,252,247,0.78)] px-5 py-8 shadow-[0_20px_60px_rgba(47,58,46,0.08)] backdrop-blur-[6px] md:px-9 md:py-10"
            >
              {/* Fine corner marks */}
              <span
                className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t border-l border-[#B59A63]/45"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t border-r border-[#B59A63]/45"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#B59A63]/45"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-[#B59A63]/45"
                aria-hidden="true"
              />

              <RsvpForm />
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
