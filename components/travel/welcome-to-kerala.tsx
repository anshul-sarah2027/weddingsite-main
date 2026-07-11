"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const highlight = "text-[#B59A63]";

const BOTANICALS = [
  {
    src: IMAGES.decor.eucalyptus,
    className:
      "top-[8%] -right-6 w-28 opacity-[0.07] md:right-8 md:w-36 md:opacity-[0.09]",
  },
  {
    src: IMAGES.decor.lotusCluster,
    className:
      "bottom-[12%] -left-5 w-24 opacity-[0.06] md:left-10 md:w-32 md:opacity-[0.08]",
  },
] as const;

export function WelcomeToKerala() {
  return (
    <section
      id="welcome-to-kerala"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:min-h-[640px] md:py-20 lg:min-h-[680px] [content-visibility:auto] [contain-intrinsic-size:auto_800px]"
      aria-label="Welcome to Kerala"
    >
      {/* Light paper wash — CSS only, no full-bleed Image + blend while scrolling */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* SA crest watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(70vw,28rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.logo.main}
          alt=""
          width={600}
          height={600}
          sizes="448px"
          className="h-auto w-full"
        />
      </div>

      {/* Static botanicals — no Framer loops */}
      {BOTANICALS.map((item) => (
        <div
          key={item.src}
          className={cn(
            "pointer-events-none absolute z-[1] hidden md:block",
            item.className,
          )}
          aria-hidden="true"
        >
          <Image
            src={item.src}
            alt=""
            width={160}
            height={200}
            sizes="144px"
            className="h-auto w-full"
          />
        </div>
      ))}

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.7}>
          <div className="relative mx-auto mb-4 h-16 w-36 md:mb-5 md:h-20 md:w-44">
            <Image
              src={IMAGES.decor.travelAndStayHeader}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            God&apos;s Own Country
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Welcome to Kerala
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

        <div className="mt-12 grid items-center gap-12 md:mt-14 md:grid-cols-[48%_52%] md:gap-14 lg:gap-20">
          <FadeIn
            duration={0.7}
            delay={0.08}
            className="flex justify-center md:justify-end"
          >
            <div className="animate-editorial-float w-full max-w-[320px] md:max-w-[520px] lg:max-w-[620px]">
              <Image
                src={IMAGES.kerala.placesArt}
                alt="Handcrafted illustration of Kerala — backwaters, houseboats, palms and places to explore"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 320px, 620px"
                quality={80}
                className="h-auto w-full object-contain"
              />
            </div>
          </FadeIn>

          <FadeIn duration={0.7} delay={0.12} className="text-center md:text-left">
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              {SITE.hashtag}
            </p>

            <h3 className="font-heading mt-3 text-3xl font-medium text-forest md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              A Journey Worth Taking
            </h3>

            <div className="font-heading mx-auto mt-6 max-w-[560px] space-y-5 text-base leading-[1.85] text-forest/65 md:mx-0 md:text-lg">
              <p>
                Kerala has a way of{" "}
                <span className={highlight}>slowing life down</span> in the most
                beautiful way. Mornings begin with birdsong over the{" "}
                <span className={highlight}>backwaters</span>, afternoons drift
                beneath swaying coconut palms, and evenings glow with golden
                sunsets reflected across the lake. It is a place where{" "}
                <span className={highlight}>
                  nature, tradition and hospitality
                </span>{" "}
                exist in perfect harmony.
              </p>

              <p>
                When we began dreaming about our wedding, we knew we wanted more
                than a beautiful venue—we wanted to{" "}
                <span className={highlight}>create an experience</span>. A place
                where family and friends could pause, explore, celebrate and make
                memories together. We hope you&apos;ll take time to wander, savour
                every meal, watch the houseboats drift by and discover why this
                little corner of the world has{" "}
                <span className={highlight}>captured our hearts</span>.
              </p>
            </div>

            <blockquote
              className={cn(
            "font-editorial text-editorial-quote mx-auto mt-10 max-w-sm text-xl leading-snug md:mx-0 md:text-2xl",
              )}
            >
              &ldquo;Some places stay with you forever.
              <br />
              Kerala is one of them.&rdquo;
            </blockquote>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
