import { WeddingWeekendHero } from "@/components/events/wedding-weekend-hero";
// import { SpiritOfKerala } from "@/components/events/spirit-of-kerala";
import { WeddingWeekendTimeline } from "@/components/events/wedding-weekend-timeline";
import { DressCodeSection } from "@/components/events/dress-code-section";
import { RsvpSection } from "@/components/home/rsvp";
import { createPageMetadata } from "@/lib/metadata";
import { SectionDivider } from "@/components/shared/section-divider";
import { KumarakomLakeResort } from "@/components/travel/kumarakom-lake-resort";

export const metadata = createPageMetadata(
  "Wedding Weekend",
  "The full wedding weekend schedule — from welcome evening to reception.",
);

export default function EventsPage() {
  return (
    <>
      <WeddingWeekendHero />
      {/* <SpiritOfKerala /> */}
      <KumarakomLakeResort />
      <WeddingWeekendTimeline />
      <DressCodeSection />
      <SectionDivider />
      <RsvpSection variant="events" />
    </>
  );
}
