import { WeddingWeekendHero } from "@/components/events/wedding-weekend-hero";
import { SpiritOfKerala } from "@/components/events/spirit-of-kerala";
import { WeddingWeekendTimeline } from "@/components/events/wedding-weekend-timeline";
import { RsvpSection } from "@/components/home/rsvp";
import { createPageMetadata } from "@/lib/metadata";
import { SectionDivider } from "@/components/shared/section-divider";

export const metadata = createPageMetadata(
  "Wedding Weekend",
  "The full wedding weekend schedule — from welcome evening to reception.",
);

export default function EventsPage() {
  return (
    <>
      <WeddingWeekendHero />
      <SpiritOfKerala />
      <WeddingWeekendTimeline />
      <SectionDivider />
      <RsvpSection variant="events" />
    </>
  );
}
