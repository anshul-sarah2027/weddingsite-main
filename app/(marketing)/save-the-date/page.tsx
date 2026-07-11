import { SaveTheDateHero } from "@/components/save-the-date/save-the-date-hero";
import { AddToCalendar } from "@/components/save-the-date/add-to-calendar";
import { SaveTheDateClosing } from "@/components/save-the-date/closing-note";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Save the Date",
  "Save the date for Anshul & Sarah's wedding weekend in Kumarakom, Kerala — 30 & 31 January 2027.",
);

export default function SaveTheDatePage() {
  return (
    <>
      <SaveTheDateHero />
      <AddToCalendar />
      <SaveTheDateClosing />
    </>
  );
}
