"use client";

import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
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

export function InvitationCountdown() {
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
