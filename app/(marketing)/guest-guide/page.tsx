import { GuestGuideHero } from "@/components/guest-guide/guest-guide-hero";
import { BeyondKerala } from "@/components/guest-guide/beyond-kerala";
import { InternationalGetaways } from "@/components/guest-guide/international-getaways";
import { TravelPartners } from "@/components/guest-guide/travel-partners";
import { KochiRestaurants } from "@/components/guest-guide/kochi-restaurants";
import {
  DietaryPreferences,
  MustTryKerala,
} from "@/components/guest-guide/must-try-kerala";
import { WeddingShopping } from "@/components/guest-guide/wedding-shopping";
import { GuestFaqs } from "@/components/guest-guide/guest-faqs";
import { DiscoverKerala } from "@/components/travel/discover-kerala";
import { RsvpSection } from "@/components/home/rsvp";
import { SectionDivider } from "@/components/shared/section-divider";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Guest Guide",
  "A practical guest handbook for Anshul & Sarah's wedding — Kerala destinations, restaurants, shopping, and FAQs.",
);

export default function GuestGuidePage() {
  return (
    <>
      <GuestGuideHero />
      <DiscoverKerala />
      <BeyondKerala />
      <InternationalGetaways />
      <TravelPartners />
      <KochiRestaurants />
      <MustTryKerala />
      <DietaryPreferences />
      <WeddingShopping />
      <GuestFaqs />
      <SectionDivider />
      <RsvpSection variant="travel" />
    </>
  );
}
