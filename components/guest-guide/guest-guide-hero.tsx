"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

export function GuestGuideHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAF7F2] pt-28 pb-12 md:pt-32 md:pb-14"
      aria-label="Guest Guide"
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
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.8}>
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
            Everything You Need
          </p>

          <h1 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-5xl lg:text-[3.25rem]">
            Guest Guide
          </h1>

          <div className="mx-auto mt-6 flex justify-center md:mt-8">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="h-auto w-40 opacity-55 md:w-48"
              aria-hidden="true"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
