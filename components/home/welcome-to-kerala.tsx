"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { fontAustinPen } from "@/lib/fonts";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const BOTANICALS = [
  {
    src: IMAGES.decor.bananaLeaves,
    alt: "",
    className: "top-[6%] -left-10 w-36 opacity-20 md:-left-2 md:w-52 md:opacity-25",
    drift: { y: [0, -14, 0], x: [0, 8, 0] },
    duration: 10,
  },
  {
    src: IMAGES.decor.bananaFlower,
    alt: "",
    className: "top-[14%] -right-8 w-28 opacity-15 md:right-2 md:w-40 md:opacity-20",
    drift: { y: [0, 12, 0], x: [0, -7, 0] },
    duration: 11,
  },
  {
    src: IMAGES.decor.eucalyptus,
    alt: "",
    className: "top-[32%] -right-4 w-32 opacity-15 md:w-40 md:opacity-20",
    drift: { y: [0, 10, 0], x: [0, -6, 0] },
    duration: 12,
  },
  {
    src: IMAGES.decor.oliveBranch,
    alt: "",
    className: "bottom-[30%] -left-6 w-28 opacity-15 md:bottom-[34%] md:w-36 md:opacity-20",
    drift: { y: [0, 8, 0], x: [0, 5, 0] },
    duration: 11,
  },
  {
    src: IMAGES.decor.floralElephant,
    alt: "",
    className: "bottom-[18%] -right-10 w-36 opacity-20 md:-right-2 md:w-44 md:opacity-25",
    drift: { y: [0, -10, 0], x: [0, -8, 0] },
    duration: 9,
  },
  {
    src: IMAGES.decor.lotusCluster,
    alt: "",
    className: "bottom-[8%] -left-4 w-32 opacity-15 md:w-40 md:opacity-20",
    drift: { y: [0, -8, 0], x: [0, 6, 0] },
    duration: 10,
  },
  {
    src: IMAGES.decor.peonySingle,
    alt: "",
    className: "top-[48%] -left-8 w-24 opacity-10 md:w-32 md:opacity-15",
    drift: { y: [0, 6, 0], x: [0, 4, 0] },
    duration: 13,
  },
] as const;

/** Natural dimensions — landscape stays landscape, portrait stays portrait */
const VENUE_IMAGES = {
  poolHouseboats: {
    src: IMAGES.venueKerala.poolHouseboats,
    alt: "Pool overlooking the Kerala backwaters with traditional houseboats",
    width: 4307,
    height: 2871,
  },
  bridgeEntrance: {
    src: IMAGES.venueKerala.bridgeEntrance,
    alt: "Wooden bridge leading to a traditional Kerala heritage entrance",
    width: 2796,
    height: 4194,
  },
  backwatersLawn: {
    src: IMAGES.venueKerala.backwatersLawn,
    alt: "Lawn and pool beside the serene Kerala backwaters",
    width: 4573,
    height: 3049,
  },
} as const;

function FloatingBotanical({
  src,
  alt,
  className,
  drift,
  duration,
}: {
  src: string;
  alt: string;
  className: string;
  drift: { y: readonly number[]; x: readonly number[] };
  duration: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute z-0 hidden md:block", className)}
      animate={
        reducedMotion ? undefined : { y: [...drift.y], x: [...drift.x] }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <Image src={src} alt={alt} width={220} height={300} className="h-auto w-full" />
    </motion.div>
  );
}

export function WelcomeToKerala() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="welcome"
      className="relative scroll-mt-32 overflow-hidden bg-background pb-[clamp(5rem,12vw,9rem)] pt-8 md:pt-12"
    >
      {BOTANICALS.map((item) => (
        <FloatingBotanical key={item.src} {...item} />
      ))}

      <Container size="wide" className="relative z-10">
        {/* Header */}
        <FadeIn className="mx-auto max-w-4xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-5 h-20 w-36 md:mb-6 md:h-24 md:w-48">
            <Image
              src={IMAGES.decor.resortPool}
              alt=""
              fill
              sizes="192px"
              className="object-contain opacity-80"
              aria-hidden="true"
            />
          </div>
          <p
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft mb-8 text-3xl text-forest md:text-4xl",
            )}
          >
            God&apos;s Own Country
          </p>
          <h2 className="font-heading text-forest text-balance text-3xl font-medium uppercase tracking-[0.06em] md:text-5xl lg:text-6xl">
            A Celebration of Love in the Heart of Kerala
          </h2>
        </FadeIn>

        {/* Editorial paragraph */}
        <FadeIn
          className="mx-auto mt-10 max-w-2xl text-center md:mt-14"
          delay={0.1}
          duration={0.9}
        >
          <p className="font-heading text-body-lg text-muted-foreground text-balance leading-relaxed">
            From tranquil backwaters and lush coconut groves to timeless
            traditions and warm hospitality, Kumarakom in Kerala offers a
            setting unlike anywhere else in the world. We are delighted to invite
            you to celebrate with us in this extraordinary place.
          </p>
        </FadeIn>

        {/* Images — natural aspect ratios, soft fade only */}
        <div className="mt-14 space-y-8 md:mt-16">
          <FadeIn duration={0.9} delay={0.15}>
            <Image
              src={VENUE_IMAGES.poolHouseboats.src}
              alt={VENUE_IMAGES.poolHouseboats.alt}
              width={VENUE_IMAGES.poolHouseboats.width}
              height={VENUE_IMAGES.poolHouseboats.height}
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="mx-auto h-auto w-full max-w-4xl rounded-sm"
            />
          </FadeIn>

          <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
            <FadeIn duration={0.9} delay={0.2}>
              <Image
                src={VENUE_IMAGES.bridgeEntrance.src}
                alt={VENUE_IMAGES.bridgeEntrance.alt}
                width={VENUE_IMAGES.bridgeEntrance.width}
                height={VENUE_IMAGES.bridgeEntrance.height}
                sizes="(max-width: 768px) 100vw, 540px"
                className="mx-auto h-auto w-full max-w-md rounded-sm md:mx-0"
              />
            </FadeIn>

            <FadeIn duration={0.9} delay={0.25}>
              <Image
                src={VENUE_IMAGES.backwatersLawn.src}
                alt={VENUE_IMAGES.backwatersLawn.alt}
                width={VENUE_IMAGES.backwatersLawn.width}
                height={VENUE_IMAGES.backwatersLawn.height}
                sizes="(max-width: 768px) 100vw, 540px"
                className="h-auto w-full rounded-sm md:mt-8"
              />
            </FadeIn>
          </div>
        </div>

        <motion.p
          className="font-heading mx-auto mt-14 max-w-lg text-center text-xl text-forest/70 italic md:mt-16 md:text-2xl"
          initial={reducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Where every moment feels like a page turned slowly.
        </motion.p>

        <FadeIn className="mt-6 text-center md:mt-8" delay={0.05} duration={0.9}>
          <Link
            href="https://maps.app.goo.gl/DSu5W2zY3zqcuPaT9"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft text-xl text-[#B59A63] tracking-wide transition-colors duration-300 hover:text-forest md:text-2xl",
            )}
          >
            View Location
          </Link>
     
        </FadeIn>

        <FadeIn
          className="mx-auto mt-8 flex justify-center md:mt-10"
          delay={0.1}
          duration={0.9}
        >
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="288px"
            className="h-auto w-48 opacity-70 md:w-72"
            aria-hidden="true"
          />
        </FadeIn>
      </Container>
    </section>
  );
}
