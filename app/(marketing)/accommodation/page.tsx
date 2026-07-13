import { TravelStayHero } from "@/components/travel/travel-stay-hero";
import { WelcomeToKerala } from "@/components/travel/welcome-to-kerala";
import { GettingHere } from "@/components/travel/getting-here";
import { AccommodationSection } from "@/components/travel/accommodation-section";
import { WeatherTravelTips } from "@/components/travel/weather-travel-tips";
import { RsvpSection } from "@/components/home/rsvp";
import { createPageMetadata } from "@/lib/metadata";
import { SectionDivider } from "@/components/shared/section-divider";

export const metadata = createPageMetadata(
  "Travel & Stay",
  "Everything you need for your journey to Kumarakom — flights, stays, and arriving in God's Own Country.",
);

export default function AccommodationPage() {
  return (
    <>
      <TravelStayHero />
      <WelcomeToKerala />
      <GettingHere />
      <AccommodationSection />
      <WeatherTravelTips />
      <SectionDivider />
      <RsvpSection variant="travel" />
    </>
  );
}
