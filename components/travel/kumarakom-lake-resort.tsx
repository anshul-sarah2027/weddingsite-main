"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, ExternalLink, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { weddingVenue } from "@/constants/accommodation";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

const VENUE_DETAILS = [
  { label: "Location", value: "Kumarakom, Kerala" },
  { label: "Venue", value: "Kumarakom Lake Resort" },
  { label: "Overlooking", value: "Vembanad Lake" },
] as const;

const BOTANICALS = [
  {
    src: IMAGES.decor.oliveBranch,
    className:
      "top-[10%] -left-5 w-28 opacity-[0.07] md:left-8 md:w-36 md:opacity-[0.09]",
  },
  {
    src: IMAGES.decor.peonySingle,
    className:
      "bottom-[14%] -right-4 w-24 opacity-[0.06] md:right-10 md:w-32 md:opacity-[0.08]",
  },
] as const;

function FadedResortArt() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] md:max-w-[560px] lg:max-w-[640px]">
      <Image
        src={IMAGES.kerala.kumarakomArt}
        alt="Handcrafted illustration of Kumarakom Lake Resort on the shores of Vembanad Lake"
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 560px, 640px"
        quality={75}
        className="h-auto w-full object-contain"
        priority
      />
      {/* Soft rectangular edge fade into bg — all four sides, no rounded vignette */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-[#FAF7F2] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#FAF7F2] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#FAF7F2] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#FAF7F2] to-transparent" />
      </div>
    </div>
  );
}

function VenueActions() {
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
    <div className="mx-auto mt-8 flex max-w-[560px] flex-col items-center gap-3 md:mx-0 md:items-start">
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
          className="font-heading inline-flex items-center gap-2 rounded-sm border border-forest/18 bg-transparent px-4 py-2.5 text-sm text-forest/85 transition-[background-color,border-color,color] duration-300 hover:border-forest/30 hover:bg-forest/5 hover:text-forest"
        >
          Visit Resort Website
          <ExternalLink className="size-3.5 text-[#B59A63]" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function KumarakomLakeResort() {
  return (
    <section
      id="kumarakom-lake-resort"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] pt-14 pb-4 md:pt-16 md:pb-6"
      aria-label="Kumarakom Lake Resort"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

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
              src={IMAGES.kerala.header}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>


          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Kumarakom Lake Resort
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

        <div className="mt-12 grid items-center gap-12 md:mt-14 md:grid-cols-[52%_48%] md:gap-14 lg:gap-20">
          <FadeIn duration={0.7} delay={0.08} className="text-center md:text-left">
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              Where We&apos;ll Celebrate Together
            </p>

            <h3 className="font-heading mt-4 text-3xl font-medium leading-[1.25] tracking-[0.01em] text-forest md:mt-5 md:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
              A Place Made For Gathering
            </h3>

            <div className="font-heading mx-auto mt-6 max-w-[560px] space-y-5 text-base leading-[1.85] text-forest/85 md:mx-0 md:text-lg">
              <p>
                Nestled along the tranquil shores of Vembanad Lake, Kumarakom
                Lake Resort is where every chapter of our wedding weekend
                unfolds. Surrounded by peaceful backwaters, tropical gardens and
                traditional Kerala architecture, it offers the perfect setting to
                slow down, reconnect and celebrate together.
              </p>

              <p>
                Over the next few days, this beautiful resort will become home to
                morning conversations over breakfast, joyful celebrations beneath
                the palms, quiet walks by the lake and unforgettable evenings
                shared with family and friends. We hope you&apos;ll make yourself
                at home and enjoy every moment.
              </p>
            </div>

            <dl className="mx-auto mt-8 max-w-[560px] space-y-2.5 border-t border-forest/10 pt-6 text-left md:mx-0">
              {VENUE_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                >
                  <dt className="text-caption min-w-[5.5rem] tracking-[0.14em] text-forest/40 uppercase">
                    {detail.label}
                  </dt>
                  <dd className="font-heading text-sm text-forest/78 md:text-base">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <VenueActions />
          </FadeIn>

          <FadeIn
            duration={0.7}
            delay={0.12}
            className="flex w-full justify-center md:justify-start"
          >
            <div className="animate-editorial-float w-full max-w-[340px] md:max-w-[560px] lg:max-w-[640px]">
              <FadedResortArt />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
