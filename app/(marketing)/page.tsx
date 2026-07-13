import { Arrival } from "@/components/home/arrival";
// import { WelcomeToKerala } from "@/components/home/welcome-to-kerala";
import { WelcomeNote } from "@/components/home/welcome-note";
import { TheirStory } from "@/components/home/their-story";
// import { WeddingWeekend } from "@/components/home/wedding-weekend";
// import { TheDestination } from "@/components/home/the-destination";
// import { TheExperience } from "@/components/home/the-experience";
import { TravelAndStay } from "@/components/home/travel-and-stay";
import { SaveTheDate } from "@/components/home/save-the-date";
import { RsvpSection } from "@/components/home/rsvp";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <Arrival />
      <SectionDivider />
      {/* <WelcomeToKerala /> */}
      <WelcomeNote />
      <TheirStory />
      {/* <SectionDivider /> */}
      {/* <WeddingWeekend /> */}
      {/* <SectionDivider /> */}
      <TravelAndStay />
      <SectionDivider />
      <SaveTheDate />
      <SectionDivider />
      <RsvpSection />
    </>
  );
}
