"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import {
  buildWeddingWeekendIcs,
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

const calendarLinks = [
  {
    id: "apple",
    label: "Apple",
    href: "#",
    download: true,
  },
  {
    id: "google",
    label: "Google",
    href: getGoogleCalendarUrl(),
    download: false,
  },
  {
    id: "outlook",
    label: "Outlook",
    href: getOutlookCalendarUrl(),
    download: false,
  },
  {
    id: "ics",
    label: "Download ICS",
    href: "#",
    download: true,
  },
] as const;

function downloadIcs() {
  const ics = buildWeddingWeekendIcs();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "anshul-sarah-wedding-weekend.ics";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function AddToCalendar() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAF7F2] py-12 md:py-16"
      aria-label="Add to Calendar"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10">
        <FadeIn duration={0.7} className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="160px"
              className="h-auto w-32 opacity-50 md:w-40"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Don&apos;t Miss a Moment
          </p>

          <p className="font-heading mt-3 text-base leading-[1.8] text-forest/60 md:text-lg">
            Add the wedding weekend
            <br />
            to your calendar.
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {calendarLinks.map((link) => (
              <li key={link.id}>
                {link.download ? (
                  <button
                    type="button"
                    onClick={downloadIcs}
                    className={cn(
                      "font-heading inline-flex min-w-[7.5rem] items-center justify-center rounded-sm border border-[#B59A63]/35 bg-[#FFFCF7] px-4 py-2.5 text-sm tracking-[0.08em] text-forest/75 transition-colors duration-300",
                      "hover:border-[#B59A63]/55 hover:text-forest",
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "font-heading inline-flex min-w-[7.5rem] items-center justify-center rounded-sm border border-[#B59A63]/35 bg-[#FFFCF7] px-4 py-2.5 text-sm tracking-[0.08em] text-forest/75 transition-colors duration-300",
                      "hover:border-[#B59A63]/55 hover:text-forest",
                    )}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-8 flex justify-center md:mt-10">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="160px"
              className="h-auto w-32 opacity-50 md:w-40"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
