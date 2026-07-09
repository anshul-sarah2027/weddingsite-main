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

const highlight = "text-[#B59A63]";

const BOTANICALS = [
  {
    src: IMAGES.decor.eucalyptus,
    className: "top-[8%] -right-6 w-28 opacity-[0.07] md:right-8 md:w-36 md:opacity-[0.09]",
    duration: 12,
  },
  {
    src: IMAGES.decor.lotusCluster,
    className: "bottom-[12%] -left-5 w-24 opacity-[0.06] md:left-10 md:w-32 md:opacity-[0.08]",
    duration: 11,
  },
] as const;

function FloatingBotanical({
  src,
  className,
  duration,
}: {
  src: string;
  className: string;
  duration: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute z-[1] hidden md:block", className)}
      animate={reducedMotion ? undefined : { y: [0, -8, 0], x: [0, 4, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Image src={src} alt="" width={200} height={260} className="h-auto w-full" />
    </motion.div>
  );
}

export function SpiritOfKerala() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="spirit-of-kerala"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:min-h-[640px] md:py-20 lg:min-h-[680px]"
      aria-label="The Spirit of Kerala"
    >
      {/* Subtle paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.patterns.paperTexture}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* SA crest watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(88vw,40rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.035] mix-blend-multiply"
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

      {BOTANICALS.map((item) => (
        <FloatingBotanical key={item.src} {...item} />
      ))}

      <Container size="wide" className="relative z-10">
        {/* Section heading — matches homepage Wedding Weekend */}
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-4 h-[90px] w-[100px] md:mb-5 md:h-24 md:w-[110px]">
            <Image
              src={IMAGES.venueKerala.timeline}
              alt=""
              fill
              sizes="110px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft text-xl text-forest/70 md:text-2xl",
            )}
          >
            Where Traditions Become Memories
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            The Spirit of Kerala
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

        {/* Editorial spread — matches homepage two-column layout */}
        <div className="mt-12 grid items-center gap-12 md:mt-14 md:grid-cols-[48%_52%] md:gap-14 lg:gap-20">
          {/* Left — spirit of Kerala illustration */}
          <FadeIn duration={0.9} delay={0.1} className="flex justify-center md:justify-end">
            <motion.div
              className="w-full max-w-[320px] md:max-w-[520px] lg:max-w-[620px]"
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={IMAGES.kerala.spiritOfKerala}
                alt="Handcrafted illustration of Kerala wedding traditions — Sadya, Nilavilakku, music, family and celebration"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 320px, 620px"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </FadeIn>

          {/* Right — editorial introduction */}
          <FadeIn duration={0.9} delay={0.15} className="text-center md:text-left">
            <p
              className={cn(
                fontAustinPen.className,
                "austin-pen-soft text-lg text-[#B59A63] md:text-xl",
              )}
            >
              {SITE.hashtag}
            </p>

            <h3 className="font-heading mt-3 text-3xl font-medium text-forest md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {SITE.weddingWeekendDisplay}
            </h3>

            <p className="font-heading mx-auto mt-6 max-w-[560px] text-base leading-[1.85] text-forest/65 md:mx-0 md:text-lg">
              Kerala weddings are more than ceremonies—they are stories told
              through{" "}
              <span className={highlight}>
                rituals, music, food, family and togetherness
              </span>
              . Over these two days, you&apos;ll experience traditions that have
              been celebrated for generations, each carrying their own meaning
              and beauty. From the warmth of a{" "}
              <span className={highlight}>traditional Sadya</span> to the glow of
              the <span className={highlight}>Nilavilakku</span>, every moment
              reflects the spirit of Kerala. We hope you&apos;ll embrace these
              traditions, celebrate with us, and create memories that will stay
              with you long after the festivities come to an end.
            </p>

            <blockquote
              className={cn(
                fontAustinPen.className,
                "austin-pen-soft mx-auto mt-10 max-w-sm text-xl leading-snug text-[#B59A63] md:mx-0 md:text-2xl",
              )}
            >
              &ldquo;Every ritual carries a story&mdash;
              <br />
              every gathering, a blessing.&rdquo;
            </blockquote>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
