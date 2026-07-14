"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function CouplePhotoFrame({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative px-2 py-4 sm:px-4 sm:py-5">
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]">
        <motion.div
          className="couple-art-frame w-full"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: reducedMotion ? 0 : 1,
            delay: reducedMotion ? 0 : 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="couple-art-frame__photo">
            <Image
              src={IMAGES.couple.primary}
              alt="Sarah Ninan and Anshul Nama"
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
          <h2 className="font-heading mt-2 text-3xl font-medium uppercase tracking-[0.14em] text-ivory md:mt-3 md:text-4xl">
            The Couple
          </h2>
        </FadeIn>

        <div className="mt-10 grid items-center gap-10 md:mt-12 md:grid-cols-[2fr_3fr] md:gap-14 lg:gap-16">
          <div className="flex justify-center md:justify-end">
            <CouplePhotoFrame reducedMotion={reducedMotion} />
          </div>

          <FadeIn delay={0.15} duration={0.9} className="text-left">
            <div className="space-y-5 text-justify font-heading text-base leading-relaxed text-ivory/80 md:text-lg">
              <p>
                Sarah and Anshul are proof that opposites attract. She talks, he
                listens (someone has to), and somehow it works. Bonus points if
                there&apos;s a good film, a witty comeback, or dessert involved,
                ideally all three.
              </p>
              <p>
                What we do share is a love for cinema, sharp banter, and an
                unshakable devotion to finding the best restaurant in any city we
                visit.
              </p>
              <p>
                As we count down to our big day, we&apos;ve created this website
                to keep you updated on all the details, because Sarah is a proud
                type A planner who likes everything mapped out, colour coded, and,
                naturally, in one place. Consider this website her
                spreadsheet&apos;s more presentable cousin.
              </p>
              <p>
                Thank you for being part of our journey. We cannot wait to
                celebrate with you.
              </p>
              <div className="pt-2">
                <p className="text-ivory/75 italic">With love,</p>
                <p
                  className={cn(
                    "font-editorial text-editorial mt-1 text-2xl",
                  )}
                >
                  Sarah & Anshul
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

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
              "font-editorial text-editorial text-xl tracking-[0.02em] md:text-2xl",
            )}
          >
            {SITE.hashtag}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
