"use client";

import { FadeIn } from "@/components/animations/fade-in";
import type { TimelineEvent } from "@/types/timeline";
import { cn } from "@/lib/utils";
import { TimelineIllustration } from "./timeline-illustration";

interface TimelineEventStopProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}

export function TimelineEventStop({ event, index, isLast }: TimelineEventStopProps) {
  const imageOnLeft = index % 2 === 0;

  return (
    <FadeIn duration={1} delay={index * 0.04} className="relative">
      {/* Path connector dot */}
      <div
        className="absolute top-12 left-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-[#B59A63]/50 bg-[#FAF7F2] md:block"
        aria-hidden="true"
      >
        <div className="absolute inset-[3px] rounded-full bg-[#B59A63]/70" />
      </div>

      {/* Mobile path line segment */}
      {!isLast && (
        <div
          className="absolute top-14 left-6 h-[calc(100%+2rem)] w-px bg-gradient-to-b from-[#B59A63]/35 via-[#B59A63]/20 to-transparent md:hidden"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "grid items-center gap-8 pb-16 md:grid-cols-2 md:gap-12 md:pb-20 lg:gap-16",
          !imageOnLeft && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1",
        )}
      >
        {/* Illustration */}
        <div className={cn("relative", imageOnLeft ? "md:pr-4" : "md:pl-4")}>
          <TimelineIllustration
            src={event.illustration}
            alt={`Illustration for ${event.name}`}
          />
        </div>

        {/* Editorial content */}
        <div
          className={cn(
            "relative pl-10 text-center md:pl-0 md:text-left",
            imageOnLeft ? "md:pl-2 lg:pl-6" : "md:pr-2 lg:pr-6",
          )}
        >
          {/* Mobile dot */}
          <div
            className="absolute top-1 left-0 h-2.5 w-2.5 rounded-full border border-[#B59A63]/50 bg-[#FAF7F2] md:hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-[2px] rounded-full bg-[#B59A63]/70" />
          </div>

          {/* Time */}
          {event.timePrefix ? (
            <p className="text-subtitle text-[#B59A63]">
              <span className="block text-[0.7rem] tracking-[0.24em] text-forest/45">
                {event.timePrefix}
              </span>
            </p>
          ) : (
            <p className="text-subtitle text-[#B59A63]">{event.time}</p>
          )}

          {/* Sarah's poetic title */}
          {event.poeticTitle && (
            <p
              className={cn(
            "font-editorial text-editorial mt-3 text-xl uppercase tracking-[0.06em] md:text-2xl",
              )}
            >
              {event.poeticTitle}
            </p>
          )}

          {/* Event name */}
          <h3 className="font-heading mt-2 text-2xl font-medium uppercase tracking-[0.12em] text-forest md:text-3xl">
            {event.name}
          </h3>

          {/* Subtitle — hidden when it duplicates the poetic title */}
          {event.subtitle.toLowerCase() !== event.poeticTitle?.toLowerCase() && (
            <p className="font-heading mt-2 text-lg text-forest/75 md:text-xl">
              {event.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="font-heading mx-auto mt-4 max-w-md text-base leading-[1.85] text-forest/60 md:mx-0 md:text-lg">
            {event.description}
          </p>

          {/* Venue */}
          <p className="mt-5 text-caption tracking-[0.14em] text-forest/45 uppercase">
            <span aria-hidden="true" className="mr-1.5 text-[#B59A63]">
              ◆
            </span>
            {event.venue}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
