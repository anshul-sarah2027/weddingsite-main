"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, ExternalLink, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import {
  kochiStayGroups,
  kumarakomStayGroups,
  weddingVenue,
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

function VenueFeatureCard() {
  const [copied, setCopied] = useState(false);

  const copyMapsLink = async () => {
    try {
      await navigator.clipboard.writeText(weddingVenue.mapsUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(weddingVenue.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <FadeIn duration={0.7}>
      <article className="grid items-center gap-10 md:grid-cols-[48%_52%] md:gap-14 lg:gap-16">
        {/* Soft full-bleed photo — edges fade into ivory, no card frame */}
        <div className="relative mx-auto w-full max-w-[520px] md:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={weddingVenue.images.primary}
              alt="Kumarakom Lake Resort on the shores of Vembanad Lake"
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className={cn(
                "object-cover object-[center_60%]",
                "[mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_92%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)]",
                "[mask-composite:intersect]",
                "[webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_92%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)]",
                "[webkit-mask-composite:source-in]",
              )}
              quality={85}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_40%,#FAF7F2_100%)] opacity-80"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Editorial copy — open, calm, no boxed panel */}
        <div className="text-center md:text-left">
          <p
            className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
            )}
          >
            Wedding Venue
          </p>

          <h3 className="font-heading mt-3 text-3xl font-medium leading-[1.2] text-forest md:text-4xl lg:text-[2.65rem]">
            {weddingVenue.name}
          </h3>

          <p className="font-heading mx-auto mt-5 max-w-[520px] text-base leading-[1.9] text-forest/65 md:mx-0 md:mt-6 md:text-lg">
            {weddingVenue.description}
          </p>

          <p className="mt-6 text-caption tracking-[0.12em] text-forest/40 uppercase">
            {weddingVenue.address}
          </p>

          {/* Primary actions — clear at a glance, still editorial */}
          <div className="mt-8 flex flex-col items-center gap-3 md:items-start">
            <a
              href={weddingVenue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading inline-flex items-center gap-2.5 rounded-sm bg-forest px-5 py-3 text-[0.9375rem] tracking-[0.04em] text-ivory transition-[background-color,transform] duration-300 hover:bg-forest/90"
            >
              <MapPin className="size-4 text-[#D7BE79]" aria-hidden="true" />
              View on Google Maps
              <span aria-hidden="true" className="text-[#D7BE79]">
                →
              </span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <button
                type="button"
                onClick={copyMapsLink}
                className="font-heading inline-flex items-center gap-2 rounded-sm border border-[#B59A63]/35 bg-[#B59A63]/8 px-4 py-2.5 text-sm text-forest transition-[background-color,border-color] duration-300 hover:border-[#B59A63]/55 hover:bg-[#B59A63]/14"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-[#B59A63]" aria-hidden="true" />
                    Link copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-[#B59A63]" aria-hidden="true" />
                    Copy Maps Link
                  </>
                )}
              </button>

              <a
                href={weddingVenue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading inline-flex items-center gap-2 rounded-sm border border-forest/18 bg-transparent px-4 py-2.5 text-sm text-forest/75 transition-[background-color,border-color,color] duration-300 hover:border-forest/30 hover:bg-forest/5 hover:text-forest"
              >
                Visit Resort Website
                <ExternalLink className="size-3.5 text-[#B59A63]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
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
        {/* Section header */}
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

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Lakeside Living
          </p>

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

        {/* 1 — Wedding Venue */}
        <div className="mt-12 md:mt-14">
          <VenueFeatureCard />
        </div>

        {/* 2 — Kochi */}
        <FadeIn duration={0.7} delay={0.06} className="mt-16 md:mt-20">
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

        {/* 3 — Near Kumarakom */}
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
