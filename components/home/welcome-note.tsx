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

const BOTANICALS = [
  {
    src: IMAGES.decor.eucalyptus,
    alt: "",
    className: "top-[10%] -left-6 w-32 opacity-[0.12] md:w-40 md:opacity-[0.16]",
    drift: { y: [0, -10, 0], x: [0, 6, 0] },
    duration: 12,
  },
  {
    src: IMAGES.decor.oliveBranch,
    alt: "",
    className: "top-[20%] -right-4 w-28 opacity-[0.1] md:w-36 md:opacity-[0.14]",
    drift: { y: [0, 8, 0], x: [0, -5, 0] },
    duration: 11,
  },
  {
    src: IMAGES.decor.lotusCluster,
    alt: "",
    className: "bottom-[22%] -left-4 w-28 opacity-[0.1] md:w-36 md:opacity-[0.14]",
    drift: { y: [0, -8, 0], x: [0, 5, 0] },
    duration: 10,
  },
  {
    src: IMAGES.decor.peonySingle,
    alt: "",
    className: "bottom-[12%] -right-6 w-24 opacity-[0.08] md:w-32 md:opacity-[0.12]",
    drift: { y: [0, 6, 0], x: [0, -4, 0] },
    duration: 13,
  },
] as const;

const highlight = "text-[#B59A63]";

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
      className={cn("pointer-events-none absolute z-[1] hidden md:block", className)}
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
      <Image src={src} alt={alt} width={200} height={260} className="h-auto w-full" />
    </motion.div>
  );
}

export function WelcomeNote() {
  return (
    <section
      id="welcome-note"
      className="relative scroll-mt-32 overflow-hidden py-16 md:py-24"
      aria-label="Welcome Note"
    >
      {/* Ivory paper texture background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroAlt.welcomeNote}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[rgba(250,246,239,0.88)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/50"
          aria-hidden="true"
        />
      </div>

      {BOTANICALS.map((item) => (
        <FloatingBotanical key={item.src} {...item} />
      ))}

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-2xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-5 h-14 w-28 md:mb-6 md:h-16 md:w-32">
            <Image
              src={IMAGES.decor.welcomeNoteIllustration}
              alt=""
              fill
              sizes="146px"
              className="object-contain opacity-85"
              aria-hidden="true"
            />
          </div>

          <h2 className="font-heading text-forest text-3xl font-medium uppercase tracking-[0.12em] md:text-4xl lg:text-5xl">
            Welcome
          </h2>
        </FadeIn>

        <FadeIn
          className="mx-auto mt-10 max-w-2xl md:mt-12"
          delay={0.1}
          duration={0.9}
        >
          <div className="space-y-6 text-center">
            <p className="font-heading text-body-lg text-forest/75 leading-relaxed">
              With great excitement, we welcome you to our wedding celebration,
              taking place on the{" "}
              <span className={highlight}>
                30th and 31st of January 2027 at Kumarakom Lake Resort, Kerala.
              </span>{" "}
              We&apos;d be absolutely delighted if you could join us for these
              special days, and we&apos;re so grateful you&apos;re considering
              making the journey to be with us. Your presence would truly add to
              the joy of the occasion.
            </p>

            <p className="font-heading text-body-lg text-forest/75 leading-relaxed">
              For those few days, forget the diet because{" "}
              <span className={highlight}>
                calories do not exist at weddings anyway
              </span>
              . Dancing is mandatory, shyness is strictly illegal, and smiling is
              pretty much guaranteed. If you think you are coming just to attend,
              fair warning,{" "}
              <span className={highlight}>participation is compulsory.</span>
            </p>

            <p className="font-heading text-body-lg text-forest/75 leading-relaxed">
              So start planning your sherwanis, lehengas, and sarees, and practise
              those secret dance moves you have been perfecting in front of the
              mirror. Get ready to dance the night away, laugh a little louder,
              and turn these moments into memories we will carry with us for
              years.
            </p>

            <p className="font-heading text-body-lg text-forest/75 leading-relaxed">
              We kindly ask that you RSVP by{" "}
              <span className={highlight}>14th August 2026</span>.
            </p>

            <div className="pt-4">
              <p className="font-heading text-forest/70 italic">Lots of love,</p>
              <p
                className={cn(
                  fontAustinPen.className,
                  "austin-pen-soft mt-2 text-2xl text-forest md:text-3xl",
                )}
              >
                Sarah & Anshul
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn
          className="mx-auto mt-10 text-center md:mt-12"
          delay={0.2}
          duration={0.9}
        >
          <p
            className={cn(
              fontAustinPen.className,
              "austin-pen-soft text-xl tracking-[0.02em] text-[#A98B5E] md:text-2xl",
            )}
          >
            {SITE.hashtag}
          </p>
        </FadeIn>

        <FadeIn
          className="mx-auto mt-8 flex justify-center md:mt-10"
          delay={0.25}
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
