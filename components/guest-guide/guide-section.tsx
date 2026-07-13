"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

export function GuideSection({
  id,
  ariaLabel,
  eyebrow,
  title,
  intro,
  tone = "ivory",
  children,
}: {
  id: string;
  ariaLabel: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "ivory" | "sage";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-32 overflow-hidden py-14 md:py-16 lg:py-20",
        tone === "ivory" ? "bg-[#FAF7F2]" : "bg-[#F4F6F2]",
      )}
      aria-label={ariaLabel}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.7}>
          {eyebrow && (
            <p
              className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
              )}
            >
              {eyebrow}
            </p>
          )}

          <h2
            className={cn(
              "font-heading text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl",
              eyebrow ? "mt-4" : "",
            )}
          >
            {title}
          </h2>

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

          {intro && (
            <p className="font-heading mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-forest/60 md:text-lg">
              {intro}
            </p>
          )}
        </FadeIn>

        <div className="mt-10 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}

export function GuideCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-sm border border-forest/10 bg-[#FFFCF7]/90 px-5 py-5 md:px-6 md:py-6",
        className,
      )}
    >
      {children}
    </article>
  );
}
