"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

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

        <FadeIn
          duration={0.7}
          delay={0.08}
          className="mx-auto mt-12 flex justify-center md:mt-14"
        >
          <div className="animate-editorial-float w-full max-w-[min(100%,420px)] sm:max-w-[560px] md:max-w-[720px] lg:max-w-[860px] xl:max-w-[920px]">
            <Image
              src={IMAGES.kerala.placesArt}
              alt="Handcrafted illustration of Kerala — backwaters, houseboats, palms and places to explore"
              width={1536}
              height={1024}
              sizes="(max-width: 640px) 420px, (max-width: 768px) 560px, (max-width: 1024px) 720px, 920px"
              quality={80}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
