import { Arrival } from "@/components/home/arrival";
import { WelcomeToKerala } from "@/components/home/welcome-to-kerala";
import { TheirStory } from "@/components/home/their-story";
import { WeddingWeekend } from "@/components/home/wedding-weekend";
import { TheDestination } from "@/components/home/the-destination";
import { TheExperience } from "@/components/home/the-experience";
import { YourJourney } from "@/components/home/your-journey";
import { RsvpSection } from "@/components/home/rsvp";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <Arrival />
      <SectionDivider />
      <WelcomeToKerala />
      <SectionDivider />
      <TheirStory />
      <SectionDivider />
      <WeddingWeekend />
      <SectionDivider />
      <TheDestination />
      <SectionDivider />
      <TheExperience />
      <SectionDivider />
      <YourJourney />
      <SectionDivider />
      <RsvpSection />
    </>
  );
}
