"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

function TipCard({
  title,
  illustration,
  illustrationAlt,
  children,
  delay = 0,
}: {
  title: string;
  illustration: string;
  illustrationAlt: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn duration={0.7} delay={delay} className="h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest/8 bg-[#FFFCF7] px-6 py-7 shadow-[0_8px_28px_rgba(45,58,48,0.05)] md:px-8 md:py-8">
        <div className="relative mx-auto mb-5 h-14 w-24 opacity-90 md:h-16 md:w-28">
          <Image
            src={illustration}
            alt={illustrationAlt}
            fill
            sizes="112px"
            className="object-contain"
          />
        </div>

        <h3 className="font-heading text-center text-2xl font-medium text-forest md:text-[1.65rem]">
          {title}
        </h3>

        <div className="mt-6 flex flex-1 flex-col">{children}</div>
      </article>
    </FadeIn>
  );
}

export function WeatherTravelTips() {
  return (
    <section
      id="tips"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] pt-2 pb-16 md:pt-3 md:pb-20 lg:pt-4 lg:pb-24 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
      aria-label="Weather & Travel Tips"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

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
            Before You Travel
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Weather &amp; Travel Tips
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

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
          <TipCard
            title="Weather in January"
            illustration={IMAGES.decor.peonyWithBud}
            illustrationAlt=""
            delay={0.06}
          >
            <p className="font-heading text-center text-[0.95rem] leading-[1.85] text-forest/65 md:text-left md:text-base">
              January is one of the best times of year to visit Kumarakom, dry,
              sunny, and at the coolest point in the local calendar. Expect warm
              days with highs around 31 to 32°C (88 to 90°F), dropping to a more
              comfortable 22 to 24°C (72 to 75°F) in the evenings. Rainfall is
              minimal, this is the driest month of the year, so pack light,
              breathable fabrics, comfortable shoes, and clothes you&apos;d
              normally wear in summer.
            </p>
          </TipCard>

          <TipCard
            title="A Quick Note on Food & Water Safety"
            illustration={IMAGES.decor.oliveBranch}
            illustrationAlt=""
            delay={0.1}
          >
            <p className="font-heading text-center text-[0.95rem] leading-[1.85] text-forest/65 md:text-left md:text-base">
              As with travel anywhere in India, we&apos;d recommend sticking to
              bottled water throughout your stay, and being a little cautious
              with raw vegetables, salads, or pre-cut fruit from street stalls.
              Freshly cooked, hot food from reputable spots is generally very
              safe and part of the fun, just worth keeping in mind so an upset
              stomach doesn&apos;t get in the way of the celebrations.
            </p>
          </TipCard>
        </div>
      </Container>
    </section>
  );
}
