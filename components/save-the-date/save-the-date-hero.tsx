"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { InvitationCountdown } from "@/components/save-the-date/invitation-countdown";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function BotanicalFrame() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -right-1 -top-2 h-16 w-16 opacity-[0.45] md:-right-2 md:-top-3 md:h-24 md:w-24">
        <Image
          src={IMAGES.decor.peonyPair}
          alt=""
          fill
          sizes="96px"
          className="object-contain object-right-top"
        />
      </div>
    </div>
  );
}

export function SaveTheDateHero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32"
      aria-label="Save the Date"
    >
      {/* Warm ivory paper */}
      <div className="absolute inset-0 bg-[#FAF7F2]" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Ivory botanical watermark — hero7 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply md:opacity-[0.28]"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.heroAlt.rsvp}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
      </div>

      {/* SA crest watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[min(70vw,28rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.025] mix-blend-multiply"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.logo.main}
          alt=""
          width={1254}
          height={1254}
          className="h-auto w-full"
        />
      </div>

      {/* Soft floating botanicals */}
      <div
        className="pointer-events-none absolute top-[18%] left-[6%] hidden w-20 opacity-[0.08] md:block md:w-28"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.eucalyptus}
          alt=""
          width={200}
          height={260}
          className="h-auto w-full"
        />
      </div>
      <div
        className="pointer-events-none absolute right-[7%] bottom-[16%] hidden w-16 opacity-[0.07] md:block md:w-24"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.hangingJasmine}
          alt=""
          width={180}
          height={220}
          className="h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <FadeIn duration={0.8}>
          <div className="relative mx-auto mb-5 h-16 w-36 md:mb-6 md:h-20 md:w-44">
            <Image
              src={IMAGES.kerala.spiritOfKerala}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-85"
              priority
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            The Countdown Begins
          </p>

          <h1 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.2em] text-forest md:text-5xl lg:text-[3.25rem]">
            Save the Date
          </h1>

          <p className="font-editorial text-editorial mt-4 text-base tracking-[0.12em] md:mt-5 md:text-lg">
            {SITE.weddingWeekendDisplay}
          </p>

          <div className="mx-auto mt-5 flex justify-center md:mt-6">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="180px"
              className="h-auto w-36 opacity-55 md:w-44"
            />
          </div>

          <blockquote
            className={cn(
            "font-editorial text-editorial-quote mx-auto mt-6 max-w-md text-xl leading-snug md:mt-7 md:text-2xl",
            )}
          >
            Every great journey begins
            <br />
            with something worth waiting for.
          </blockquote>
        </FadeIn>

        <FadeIn duration={0.85} delay={0.12} className="mt-9 w-full md:mt-11">
          <div className="relative mx-auto max-w-2xl px-2 py-6 md:px-6 md:py-8">
            <BotanicalFrame />
            <div className="relative z-10">
              <InvitationCountdown />
            </div>
          </div>
        </FadeIn>

        <FadeIn duration={0.75} delay={0.2} className="mt-8 md:mt-10">
          <p className="text-caption tracking-[0.16em] text-forest/40 uppercase">
            Kumarakom · Kerala
          </p>
          <p
            className={cn(
            "font-editorial text-editorial mt-3 text-lg md:text-xl",
            )}
          >
            Wedding Weekend Begins Soon
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
