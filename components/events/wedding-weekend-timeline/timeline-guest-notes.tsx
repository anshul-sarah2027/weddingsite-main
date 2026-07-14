"use client";

import Image from "next/image";
import { Fragment } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { IMAGES } from "@/constants/images";
import type { GuestNote } from "@/types/timeline";
import { cn } from "@/lib/utils";

const highlightClass = "text-[#B59A63]";

/** Crops PNG padding — mobile: above title; sm+: inline left */
function BulletMarker() {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden",
        "mx-auto h-5 w-[5.25rem]",
        "sm:mx-0 sm:h-4 sm:w-11 md:h-[1.125rem] md:w-12",
      )}
      aria-hidden="true"
    >
      <img
        src={IMAGES.patterns.bulletPoint}
        alt=""
        width={1536}
        height={1024}
        draggable={false}
        className={cn(
          "absolute left-1/2 top-1/2 w-auto max-w-none -translate-x-1/2 object-contain opacity-90",
          "h-[5rem] -translate-y-[46%]",
          "sm:h-[4.5rem] sm:-translate-y-1/2 md:h-[5.25rem]",
        )}
      />
    </div>
  );
}

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) {
  if (!highlights?.length) return text;

  const pattern = highlights
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g"));

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <span key={i} className={highlightClass}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

interface TimelineGuestNotesProps {
  notes: GuestNote[];
}

export function TimelineGuestNotes({ notes }: TimelineGuestNotesProps) {
  return (
    <FadeIn duration={0.9} className="mx-auto w-full max-w-4xl">
      <div
        className="relative overflow-hidden rounded-sm border border-forest/8 bg-ivory/50 px-6 py-10 md:px-10 md:py-12"
        aria-label="Notes for international guests"
      >
        {/* Paper texture inside panel */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-multiply"
          aria-hidden="true"
        >
          <Image
            src={IMAGES.patterns.paperTexture}
            alt=""
            fill
            sizes="900px"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 text-center">
          <p
            className={cn(
            "font-editorial text-editorial text-2xl md:text-3xl",
            )}
          >
            For Our Guests
          </p>
          <p className="font-heading mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/78 md:text-base">
            A few gentle notes to help you enjoy the weekend with ease.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-6 sm:grid-cols-2 md:mt-10 md:gap-8">
          {notes.map((note, i) => (
            <FadeIn key={note.id} duration={0.8} delay={0.06 * i}>
              <div className="text-center sm:text-left">
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:justify-start sm:gap-2 md:gap-2.5">
                  <BulletMarker />
                  <p className="text-caption tracking-[0.12em] text-forest/70 uppercase">
                    {note.title}
                  </p>
                </div>
                <p className="font-heading mt-1.5 text-sm leading-[1.75] text-forest/78 sm:ml-[3.25rem] sm:text-left md:ml-[3.5rem] md:text-[0.9375rem]">
                  <HighlightedText text={note.text} highlights={note.highlights} />
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-8 flex justify-center md:mt-10">
          <Image
            src={IMAGES.patterns.divider}
            alt=""
            width={1716}
            height={380}
            sizes="160px"
            className="h-auto w-32 opacity-40 md:w-36"
            aria-hidden="true"
          />
        </div>
      </div>
    </FadeIn>
  );
}
