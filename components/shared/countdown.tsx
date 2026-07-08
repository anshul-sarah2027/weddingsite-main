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

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  variant?: "default" | "hero";
}

function getTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  const target = new Date(targetDate);
  return {
    days: Math.max(0, differenceInDays(target, now)),
    hours: Math.max(0, differenceInHours(target, now) % 24),
    minutes: Math.max(0, differenceInMinutes(target, now) % 60),
    seconds: Math.max(0, differenceInSeconds(target, now) % 60),
  };
}

export function Countdown({ variant = "default" }: CountdownProps) {
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

  const isHero = variant === "hero";

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex justify-center gap-8",
          isHero && "border-t border-ivory/15 pt-8",
        )}
        aria-hidden="true"
      >
        {units.map((unit) => (
          <div key={unit.label} className="text-center">
            <span
              className={cn(
                "font-heading tabular-nums",
                isHero ? "text-3xl text-ivory md:text-4xl" : "text-3xl",
              )}
            >
              —
            </span>
            <p
              className={cn(
                "text-caption mt-1",
                isHero ? "text-ivory/45" : "text-muted-foreground",
              )}
            >
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex justify-center gap-6 md:gap-10",
        isHero && "border-t border-ivory/15 pt-8",
      )}
      role="timer"
      aria-label={`Countdown to wedding on ${SITE.weddingDateDisplay}`}
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-6 md:gap-10">
          {i > 0 && isHero && (
            <span
              className="hidden font-heading text-xl text-ivory/20 md:inline"
              aria-hidden="true"
            >
              ·
            </span>
          )}
          <div className="text-center">
            <span
              className={cn(
                "font-heading tabular-nums",
                isHero ? "text-3xl text-ivory md:text-4xl" : "text-3xl",
              )}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <p
              className={cn(
                "text-caption mt-1",
                isHero ? "text-ivory/45" : "text-muted-foreground",
              )}
            >
              {unit.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
