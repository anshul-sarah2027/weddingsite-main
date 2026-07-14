"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import {
  kochiStayGroups,
  kumarakomStayGroups,
  type HotelGroup,
  type HotelListing,
} from "@/constants/accommodation";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

function HotelLogo({ hotel }: { hotel: HotelListing }) {
  const [failed, setFailed] = useState(false);

  if (!hotel.logo || failed) {
    return (
      <span
        className="font-heading flex size-full items-center justify-center text-sm font-medium tracking-[0.08em] text-forest/55"
        aria-hidden="true"
      >
        {hotel.monogram}
      </span>
    );
  }

  return (
    <img
      src={hotel.logo}
      alt=""
      width={120}
      height={80}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className="max-h-10 max-w-[7rem] object-contain opacity-90"
    />
  );
}

function HotelCard({ hotel }: { hotel: HotelListing }) {
  return (
    <article className="group flex flex-col rounded-sm border border-forest/10 bg-ivory/70 px-4 py-4 transition-[border-color,box-shadow,background-color] duration-300 hover:border-forest/20 hover:bg-ivory hover:shadow-[0_8px_28px_rgba(45,74,62,0.06)] md:px-5 md:py-5">
      <div className="flex h-14 items-center justify-center rounded-sm bg-white/70 px-3 ring-1 ring-forest/5">
        <HotelLogo hotel={hotel} />
      </div>

      <p className="text-caption mt-3 tracking-[0.12em] text-[#B59A63] uppercase">
        {hotel.category}
      </p>

      <h4 className="font-heading mt-1.5 text-base leading-snug text-forest md:text-[1.05rem]">
        {hotel.name}
      </h4>

      <a
        href={hotel.website}
        target="_blank"
        rel="noopener noreferrer"
        className="font-heading mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-forest/60 transition-colors duration-300 hover:text-[#B59A63]"
      >
        Visit Website
        <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
      </a>
    </article>
  );
}

function HotelCategoryBlock({ group }: { group: HotelGroup }) {
  return (
    <div>
      <h4 className="font-heading text-lg font-medium text-forest md:text-xl">
        {group.label}
      </h4>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {group.hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export function AccommodationSection() {
  return (
    <section
      id="accommodation"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_1000px]"
      aria-label="Accommodation"
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
              src={IMAGES.kerala.header}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>

          {/* <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Lakeside Living
          </p> */}

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Accommodation
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

          <p className="font-heading mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-forest/60 md:text-lg">
            Whether you&apos;re arriving early, extending your holiday, or
            exploring beyond the wedding weekend, here are a few wonderful places
            to stay.
          </p>
        </FadeIn>

        {/* Kochi */}
        <FadeIn duration={0.7} delay={0.06} className="mt-12 md:mt-14">
          <div className="text-center md:text-left">
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              Before or After the Wedding
            </p>
            <h3 className="font-heading mt-2 text-2xl font-medium uppercase tracking-[0.14em] text-forest md:text-3xl">
              Staying in Kochi
            </h3>
            <p className="font-heading mt-3 max-w-xl text-sm leading-relaxed text-forest/55 md:text-base">
              Ideal for guests arriving early or extending their stay in Fort
              Kochi and the city.
            </p>
          </div>

          <div className="mt-8 space-y-10 md:mt-10 md:space-y-12">
            {kochiStayGroups.map((group) => (
              <HotelCategoryBlock key={group.id} group={group} />
            ))}
          </div>
        </FadeIn>

        {/* Near Kumarakom */}
        <FadeIn duration={0.7} delay={0.08} className="mt-16 md:mt-20">
          <div className="text-center md:text-left">
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              Near the Wedding Venue
            </p>
            <h3 className="font-heading mt-2 text-2xl font-medium uppercase tracking-[0.14em] text-forest md:text-3xl">
              Staying Near Kumarakom
            </h3>
            <p className="font-heading mt-3 max-w-xl text-sm leading-relaxed text-forest/55 md:text-base">
              Beautiful lakeside stays close to the celebrations — including
              Coconut Lagoon, accessible only by boat.
            </p>
          </div>

          <div className="mt-8 space-y-10 md:mt-10 md:space-y-12">
            {kumarakomStayGroups.map((group) => (
              <HotelCategoryBlock key={group.id} group={group} />
            ))}
          </div>
        </FadeIn>

        <p className="font-heading mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-forest/45 md:mt-16">
          Preferential rates and booking guidance will be shared with confirmed
          guests. If you need help choosing a stay, we&apos;re happy to advise.
        </p>
      </Container>
    </section>
  );
}
