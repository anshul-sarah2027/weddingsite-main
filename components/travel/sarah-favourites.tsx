"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import {
  sarahFavourites,
  type SarahFavourite,
} from "@/constants/sarah-favourites";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

function FavouriteCard({
  favourite,
  index,
}: {
  favourite: SarahFavourite;
  index: number;
}) {
  return (
    <FadeIn duration={0.7} delay={0.05 * index}>
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#FFFCF7] px-6 py-7 shadow-[0_8px_28px_rgba(45,58,48,0.05)] md:px-8 md:py-8">
        <div
          className="pointer-events-none absolute -right-3 -top-2 h-20 w-20 opacity-[0.28] md:h-24 md:w-24"
          aria-hidden="true"
        >
          <Image
            src={IMAGES.decor.bananaCorner}
            alt=""
            fill
            sizes="96px"
            className="object-contain object-right-top"
          />
        </div>

        <p
          className={cn(
            "font-editorial text-editorial relative z-10 text-lg md:text-xl",
          )}
        >
          <span className="mr-1.5" aria-hidden="true">
            ★
          </span>
          {favourite.label}
        </p>

        <p className="text-caption relative z-10 mt-4 tracking-[0.14em] text-forest/40 uppercase">
          {favourite.category}
        </p>

        <h3 className="font-heading relative z-10 mt-2 text-2xl font-medium text-forest md:text-[1.65rem]">
          {favourite.name}
        </h3>

        {favourite.place && (
          <p className="font-heading relative z-10 mt-1.5 text-sm text-forest/50 md:text-[0.95rem]">
            {favourite.place}
          </p>
        )}

        <p className="font-heading relative z-10 mt-5 flex-1 text-[0.95rem] leading-[1.8] text-forest/60 md:text-base">
          {favourite.note}
        </p>
      </article>
    </FadeIn>
  );
}

function ClosingQuote() {
  return (
    <FadeIn duration={0.8} className="mx-auto mt-16 max-w-xl text-center md:mt-20">
      <div className="mx-auto mb-8 flex justify-center md:mb-10">
        <Image
          src={IMAGES.patterns.divider}
          alt=""
          width={1716}
          height={380}
          sizes="180px"
          className="h-auto w-36 opacity-50 md:w-44"
          aria-hidden="true"
        />
      </div>

      <blockquote className="font-editorial text-editorial-quote text-lg leading-[1.9] md:text-xl">
        &ldquo;Some of my favourite memories in Kerala have come from slowing
        down rather than trying to see everything.
        <br />
        <br />
        I hope you find a few moments like that too.&rdquo;
      </blockquote>

      <p
        className={cn(
            "font-editorial text-editorial mt-6 text-xl md:text-2xl",
        )}
      >
        — Sarah
      </p>

      <div className="mx-auto mt-8 flex justify-center md:mt-10">
        <Image
          src={IMAGES.patterns.divider}
          alt=""
          width={1716}
          height={380}
          sizes="180px"
          className="h-auto w-36 opacity-50 md:w-44"
          aria-hidden="true"
        />
      </div>
    </FadeIn>
  );
}

export function SarahFavourites() {
  return (
    <section
      id="sarahs-favourites"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_1200px]"
      aria-label="Sarah's Favourites"
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
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(181,154,99,0.07),transparent_45%),radial-gradient(ellipse_at_85%_90%,rgba(45,58,48,0.04),transparent_50%)]"
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
            Handpicked by Sarah
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Sarah&apos;s Favourites
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

          <p className="font-heading mx-auto mt-6 max-w-2xl text-base leading-[1.9] text-forest/60 md:text-lg">
            If you find yourself with a little extra time, these are a few places
            and experiences I genuinely love. They&apos;re the ones I&apos;d
            recommend to close friends visiting Kerala for the first time, and I
            hope you enjoy them just as much.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-14 lg:gap-7">
          {sarahFavourites.map((favourite, index) => (
            <FavouriteCard
              key={favourite.id}
              favourite={favourite}
              index={index}
            />
          ))}
        </div>

        <ClosingQuote />
      </Container>
    </section>
  );
}
