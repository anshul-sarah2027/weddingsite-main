import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { createPageMetadata } from "@/lib/metadata";

const options = [
  {
    name: "Kumarakom Lake Resort",
    description:
      "Our wedding venue offers special rates for guests. Heritage villas and lake-facing rooms available.",
    note: "Booking code to be shared with confirmed guests",
  },
  {
    name: "Nearby boutique hotels",
    description:
      "Several charming properties within 15 minutes of the venue, ranging from backwater resorts to heritage homestays.",
    note: "Recommendations coming soon",
  },
  {
    name: "Cochin (pre/post wedding)",
    description:
      "For guests extending their trip, we've partnered with hotels in Fort Kochi for comfortable stays before or after the celebrations.",
    note: "Details to follow",
  },
];

export const metadata = createPageMetadata(
  "Accommodation",
  "Where to stay during the wedding weekend in Kumarakom.",
);

export default function AccommodationPage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container className="section-padding-sm">
        <SectionHeading
          eyebrow="Stay"
          title="Your home in Kumarakom"
          description="We've negotiated preferential rates at our venue and curated alternatives nearby. Accommodation details will be personalised for confirmed guests."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 space-y-0">
          {options.map((option, i) => (
            <FadeIn key={option.name} delay={i * 0.08}>
              <article className="border-t border-border py-10">
                <h2 className="text-title">{option.name}</h2>
                <p className="text-body text-muted-foreground mt-3">
                  {option.description}
                </p>
                <p className="text-caption text-gold mt-4">{option.note}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}
