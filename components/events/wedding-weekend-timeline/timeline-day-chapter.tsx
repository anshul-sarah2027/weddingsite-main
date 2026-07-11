"use client";

import { FadeIn } from "@/components/animations/fade-in";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import type { TimelineDay } from "@/types/timeline";
import { cn } from "@/lib/utils";

interface TimelineDayChapterProps {
  day: TimelineDay;
  dayIndex: number;
}

export function TimelineDayChapter({ day, dayIndex }: TimelineDayChapterProps) {
  return (
    <FadeIn duration={0.9} delay={dayIndex * 0.05} className="relative">
      <div className="mx-auto max-w-2xl py-16 text-center md:py-20">
        {/* Path ornament */}
        <div className="mx-auto mb-6 flex justify-center" aria-hidden="true">
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="160px"
            className="h-auto w-32 opacity-50 md:w-36"
          />
        </div>

        <p className="text-subtitle text-[#B59A63]">{day.label}</p>

        <p
          className={cn(
            "font-editorial text-editorial mt-4 text-3xl md:text-4xl lg:text-[2.75rem]",
          )}
        >
          {day.chapterTitle}
        </p>

        <p className="font-heading mx-auto mt-6 max-w-xl text-base leading-[1.85] text-forest/60 md:text-lg">
          {day.chapterIntro}
        </p>
      </div>
    </FadeIn>
  );
}
