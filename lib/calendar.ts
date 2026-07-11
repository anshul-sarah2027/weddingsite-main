import { SITE, WEDDING } from "@/lib/constants";

/** All-day wedding weekend · 30–31 January 2027 (IST) */
export const WEDDING_WEEKEND_CALENDAR = {
  title: `${SITE.couple.groom} & ${SITE.couple.bride} Wedding Weekend`,
  description: `Wedding weekend celebrations at ${WEDDING.venue}, ${SITE.location}.`,
  location: `${WEDDING.venue}, ${SITE.location}`,
  /** ICS all-day: exclusive end date */
  startDate: "20270130",
  endDate: "20270201",
  /** Google Calendar all-day format */
  googleStart: "20270130",
  googleEnd: "20270201",
} as const;

function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildWeddingWeekendIcs(): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AnshulSarah//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-weekend-${WEDDING_WEEKEND_CALENDAR.startDate}@anshulandsarah.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${WEDDING_WEEKEND_CALENDAR.startDate}`,
    `DTEND;VALUE=DATE:${WEDDING_WEEKEND_CALENDAR.endDate}`,
    `SUMMARY:${icsEscape(WEDDING_WEEKEND_CALENDAR.title)}`,
    `DESCRIPTION:${icsEscape(WEDDING_WEEKEND_CALENDAR.description)}`,
    `LOCATION:${icsEscape(WEDDING_WEEKEND_CALENDAR.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: WEDDING_WEEKEND_CALENDAR.title,
    details: WEDDING_WEEKEND_CALENDAR.description,
    location: WEDDING_WEEKEND_CALENDAR.location,
    dates: `${WEDDING_WEEKEND_CALENDAR.googleStart}/${WEDDING_WEEKEND_CALENDAR.googleEnd}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: WEDDING_WEEKEND_CALENDAR.title,
    body: WEDDING_WEEKEND_CALENDAR.description,
    location: WEDDING_WEEKEND_CALENDAR.location,
    startdt: "2027-01-30T00:00:00",
    enddt: "2027-02-01T00:00:00",
    allday: "true",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
