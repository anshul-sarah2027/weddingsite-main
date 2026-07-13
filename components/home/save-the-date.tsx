"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  const target = new Date(`${targetDate}T00:00:00+05:30`);
  return {
    days: Math.max(0, differenceInDays(target, now)),
    hours: Math.max(0, differenceInHours(target, now) % 24),
    minutes: Math.max(0, differenceInMinutes(target, now) % 60),
    seconds: Math.max(0, differenceInSeconds(target, now) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(SITE.weddingDate),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(SITE.weddingDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5"
      role="timer"
      aria-live="polite"
      aria-label={`Countdown to wedding on ${SITE.weddingWeekendDisplay}`}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-sm border border-[#B59A63]/35 bg-[#FFFCF7]",
            "px-3 py-5 shadow-[0_6px_20px_rgba(45,58,48,0.05)] md:px-5 md:py-7",
          )}
        >
          <span className="font-heading text-3xl font-medium tabular-nums tracking-wide text-forest md:text-5xl lg:text-[3.25rem]">
            {mounted ? String(unit.value).padStart(2, "0") : "—"}
          </span>
          <span
            className={cn(
            "font-editorial text-editorial mt-2 text-base md:mt-3 md:text-lg",
            )}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SaveTheDate() {
  return (
    <section
      id="save-the-date"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24"
      aria-label="Save the Date"
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

      <Container className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.8}>
          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            The Countdown Begins
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.2em] text-forest md:text-5xl lg:text-[3.25rem]">
            Save the Date
          </h2>

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
              aria-hidden="true"
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

        <FadeIn duration={0.85} delay={0.12} className="mx-auto mt-9 max-w-2xl md:mt-11">
          <Countdown />
        </FadeIn>
      </Container>
    </section>
  );
}
