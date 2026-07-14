"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import {
  keralaDestinations,
  type KeralaDestination,
} from "@/constants/discover-kerala";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

function FadedDestinationArt({
  src,
  alt,
  size = "default",
}: {
  src: string;
  alt: string;
  size?: "default" | "featured";
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        size === "featured" && "max-w-[340px] md:max-w-[480px] lg:max-w-[520px]",
        size === "default" && "max-w-[320px] md:max-w-[480px] lg:max-w-[560px]",
      )}
    >
      <img
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        decoding="async"
        loading="lazy"
        draggable={false}
        className={cn(
          "h-auto w-full object-contain",
          "[mask-image:linear-gradient(to_right,transparent_0%,#000_9%,#000_91%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_9%,#000_91%,transparent_100%)]",
          "[mask-composite:intersect]",
          "[webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_9%,#000_91%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_9%,#000_91%,transparent_100%)]",
          "[webkit-mask-composite:source-in]",
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_38%,#F4F6F2_100%)] opacity-75"
        aria-hidden="true"
      />
    </div>
  );
}

function TravelStrip({ travel }: { travel: KeralaDestination["travel"] }) {
  if (travel.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap items-stretch justify-center gap-y-3 border-y border-forest/10 py-4 md:justify-start md:gap-0 md:divide-x md:divide-forest/10">
      {travel.map((item) => (
        <div
          key={item.label}
          className="w-full px-0 text-center sm:w-auto sm:px-5 sm:text-left md:first:pl-0 md:last:pr-0 md:px-5"
        >
          <p className="text-caption tracking-[0.14em] text-forest/40 uppercase">
            {item.label}
          </p>
          <p className="font-heading mt-1 text-sm text-forest/80 md:text-[0.95rem]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function CompactHighlights({
  highlights,
}: {
  highlights: KeralaDestination["highlights"];
}) {
  return (
    <div className="mt-8">
      <p
        className={cn(
            "font-editorial text-editorial text-center text-lg md:text-left md:text-xl",
        )}
      >
        Things to Explore
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
        {highlights.map((item) => (
          <li key={item.title} className="text-center sm:text-left">
            <p className="font-heading text-[0.95rem] font-medium text-forest md:text-base">
              {item.sarahFavourite && (
                <span className="mr-1.5 text-[#B59A63]" aria-hidden="true">
                  ★
                </span>
              )}
              {item.title}
              {item.sarahFavourite && (
                <span className="font-heading ml-1.5 text-sm font-normal text-[#B59A63]">
                  (Sarah Favorite)
                </span>
              )}
            </p>
            {item.detail && (
              <p className="font-heading mt-1 text-sm leading-[1.65] text-forest/78">
                {item.detail}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimpleHighlights({
  highlights,
}: {
  highlights: KeralaDestination["highlights"];
}) {
  return (
    <div className="mt-8">
      <p
        className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
        )}
      >
        Why You&apos;ll Love It
      </p>

      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {highlights.map((item) => (
          <li key={item.title} className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-[#B59A63]" aria-hidden="true">
              ◆
            </span>
            <p className="font-heading text-[0.95rem] font-medium text-forest md:text-base">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function KochiChapter({ destination }: { destination: KeralaDestination }) {
  return (
    <FadeIn duration={0.75} className="relative border-b border-forest/8 py-14 md:py-16 lg:py-20">
      {/* Intro row — art + story balanced, not stacked endlessly */}
      <div className="grid items-center gap-10 md:grid-cols-[42%_58%] md:gap-12 lg:gap-14">
        <div className="flex justify-center">
          <FadedDestinationArt
            src={destination.illustration}
            alt="Handcrafted illustration of Kochi, Kerala"
            size="featured"
          />
        </div>

        <div className="text-center md:text-left">
          <p
            className={cn(
            "font-editorial text-editorial/80 text-2xl md:text-3xl",
            )}
          >
            {destination.chapter}
          </p>

          <h3 className="font-heading mt-2 text-3xl font-medium uppercase tracking-[0.16em] text-forest md:text-4xl lg:text-[3rem]">
            {destination.name}
          </h3>

          <p
            className={cn(
            "font-editorial text-editorial mt-3 text-xl md:text-2xl",
            )}
          >
            {destination.subtitle}
          </p>

          <p className="font-heading mx-auto mt-5 max-w-[540px] text-base leading-[1.85] text-forest/85 md:mx-0 md:text-lg">
            {destination.story}
          </p>

          <TravelStrip travel={destination.travel} />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl md:mt-12">
        <CompactHighlights highlights={destination.highlights} />
      </div>
    </FadeIn>
  );
}

function DestinationChapter({
  destination,
  index,
}: {
  destination: KeralaDestination;
  index: number;
}) {
  if (destination.featured) {
    return <KochiChapter destination={destination} />;
  }

  const content = (
    <div className="text-center md:text-left">
      <p
        className={cn(
            "font-editorial text-editorial/80 text-2xl md:text-3xl",
        )}
      >
        {destination.chapter}
      </p>

      <h3 className="font-heading mt-2 text-3xl font-medium uppercase tracking-[0.16em] text-forest md:text-4xl lg:text-[3rem]">
        {destination.name}
      </h3>

      <p
        className={cn(
            "font-editorial text-editorial mt-3 text-xl md:text-2xl",
        )}
      >
        {destination.subtitle}
      </p>

      <p className="font-heading mx-auto mt-5 max-w-[520px] text-base leading-[1.9] text-forest/85 md:mx-0 md:mt-6 md:text-lg">
        {destination.story}
      </p>

      <TravelStrip travel={destination.travel} />
      <SimpleHighlights highlights={destination.highlights} />
    </div>
  );

  return (
    <FadeIn
      duration={0.75}
      delay={0.04 * index}
      className={cn(
        "relative pt-14 md:pt-16 lg:pt-20",
        index !== keralaDestinations.length - 1
          ? "border-b border-forest/8 pb-14 md:pb-16 lg:pb-20"
          : "pb-2 md:pb-3",
      )}
    >
      <div
        className={cn(
          "grid items-center gap-10 md:grid-cols-[48%_52%] md:gap-12 lg:gap-16",
          !destination.imageLeft && "md:[&>*:first-child]:order-2",
        )}
      >
        <div className="flex justify-center">
          <FadedDestinationArt
            src={destination.illustration}
            alt={`Handcrafted illustration of ${destination.name}, Kerala`}
          />
        </div>
        {content}
      </div>
    </FadeIn>
  );
}

export function DiscoverKerala() {
  return (
    <section
      id="discover-kerala"
      className="relative scroll-mt-32 overflow-hidden bg-[#F4F6F2] pt-10 pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 [content-visibility:auto] [contain-intrinsic-size:auto_1400px]"
      aria-label="Discover Kerala"
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
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,rgba(140,168,176,0.1),transparent_50%),radial-gradient(ellipse_at_15%_80%,rgba(181,154,99,0.06),transparent_45%)]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.7}>
          <div className="relative mx-auto mb-4 h-16 w-36 md:mb-5 md:h-20 md:w-44">
            <Image
              src={IMAGES.kerala.placesArt}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-85"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Beyond the Wedding
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Discover Kerala
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
        </FadeIn>

        <div className="mt-8 md:mt-10">
          {keralaDestinations.map((destination, index) => (
            <DestinationChapter
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
