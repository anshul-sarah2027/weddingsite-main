"use client";

import { FadeIn } from "@/components/animations/fade-in";
import type { TimelineDay } from "@/types/timeline";

interface TimelineDayChapterProps {
  day: TimelineDay;
  dayIndex: number;
}

export function TimelineDayChapter({ day, dayIndex }: TimelineDayChapterProps) {
  return (
    <FadeIn duration={0.9} delay={dayIndex * 0.05} className="relative">
      <div className="mx-auto max-w-2xl py-8 text-center md:py-10">
        <p className="font-heading text-base font-medium uppercase tracking-[0.18em] text-[#B59A63] sm:text-lg md:text-xl md:tracking-[0.2em]">
          {day.label}
        </p>
      </div>
    </FadeIn>
  );
}
