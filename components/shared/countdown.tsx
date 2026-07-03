"use client";

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/animations/fade-in";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(SITE.weddingDate),
  );

  useEffect(() => {
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
    <FadeIn className="flex gap-6 md:gap-10">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <span className="font-heading text-3xl text-ivory md:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <p className="text-caption mt-1 text-ivory/50">{unit.label}</p>
        </div>
      ))}
    </FadeIn>
  );
}
