"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { fontAustinPen } from "@/lib/fonts";
import type { EditorialQuote } from "@/types/timeline";
import { cn } from "@/lib/utils";

interface TimelineEditorialQuoteProps {
  quote: EditorialQuote;
  index: number;
}

export function TimelineEditorialQuote({
  quote,
  index,
}: TimelineEditorialQuoteProps) {
  return (
    <FadeIn duration={0.9} delay={index * 0.06}>
      <blockquote
        className={cn(
          fontAustinPen.className,
          "austin-pen-soft relative mx-auto max-w-lg py-10 text-center text-2xl leading-snug text-[#B59A63] md:py-14 md:text-3xl",
        )}
      >
        <span
          className="absolute top-1/2 left-1/2 h-px w-24 -translate-x-1/2 -translate-y-8 bg-[#B59A63]/25 md:w-32"
          aria-hidden="true"
        />
        &ldquo;{quote.text}&rdquo;
        <span
          className="absolute top-1/2 left-1/2 h-px w-24 -translate-x-1/2 translate-y-8 bg-[#B59A63]/25 md:w-32"
          aria-hidden="true"
        />
      </blockquote>
    </FadeIn>
  );
}
