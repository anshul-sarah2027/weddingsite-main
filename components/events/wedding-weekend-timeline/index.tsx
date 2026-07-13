"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { weddingWeekendTimeline } from "@/constants/wedding-weekend-timeline";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TimelineDayChapter } from "./timeline-day-chapter";
import { TimelineEventStop } from "./timeline-event-stop";

export function WeddingWeekendTimeline() {
  return (
    <section
      id="our-wedding-weekend"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] pt-2 pb-16 md:pt-4 md:pb-20 lg:pb-24"
      aria-label="Our Wedding Weekend"
    >
      {/* Paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.patterns.paperTexture}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Botanical accents */}
      <div
        className="pointer-events-none absolute top-16 right-6 z-[1] w-24 opacity-[0.06] md:right-16 md:w-32"
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
        className="pointer-events-none absolute bottom-24 left-6 z-[1] w-20 opacity-[0.05] md:left-16 md:w-28"
        aria-hidden="true"
      >
        <Image
          src={IMAGES.decor.lotusCluster}
          alt=""
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Section header — matches homepage pattern */}
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.9}>
          <div className="relative mx-auto mb-4 h-18 w-32 md:mb-5 md:h-24 md:w-40">
            <Image
              src={IMAGES.decor.weekendHeader}
              alt=""
              fill
              sizes="128px"
              className="object-contain opacity-75"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            {SITE.hashtag}
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Our Wedding Weekend
          </h2>

          <p className="font-heading mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-forest/60 md:text-lg">
            Scroll through the celebrations — each moment thoughtfully planned,
            each tradition lovingly honoured, each gathering an invitation to be
            part of our story.
          </p>

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

        {/* Timeline journey — always centred */}
        <div className="relative mx-auto mt-6 max-w-5xl md:mt-8 lg:max-w-6xl">
          {/* Central scroll path — desktop */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#B59A63]/30 to-transparent md:block"
            aria-hidden="true"
          />

          {weddingWeekendTimeline.map((day, dayIndex) => (
            <div key={day.id} className="relative">
              <TimelineDayChapter day={day} dayIndex={dayIndex} />

              <div className="relative">
                {day.events.map((event, eventIndex) => {
                  const globalIndex =
                    weddingWeekendTimeline
                      .slice(0, dayIndex)
                      .reduce((sum, d) => sum + d.events.length, 0) +
                    eventIndex;
                  const isLastInDay = eventIndex === day.events.length - 1;
                  const isLastOverall =
                    dayIndex === weddingWeekendTimeline.length - 1 &&
                    isLastInDay;

                  return (
                    <TimelineEventStop
                      key={event.id}
                      event={event}
                      index={globalIndex}
                      isLast={isLastOverall}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
