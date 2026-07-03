import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { createPageMetadata } from "@/lib/metadata";

const destinations = [
  {
    name: "Fort Kochi",
    description:
      "Colonial architecture, Chinese fishing nets, and the vibrant art scene of Kerala's historic port city.",
  },
  {
    name: "Munnar",
    description:
      "Rolling tea plantations, misty mountains, and some of the most breathtaking landscapes in South India.",
  },
  {
    name: "Thekkady",
    description:
      "Periyar Wildlife Sanctuary — elephants, spice gardens, and boat safaris through pristine forest.",
  },
  {
    name: "Alleppey",
    description:
      "The gateway to the backwaters. Day cruises and overnight houseboat experiences await.",
  },
];

export const metadata = createPageMetadata(
  "Explore Kerala",
  "A curated travel guide for guests visiting Kerala for the first time.",
);

export default function ExplorePage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container className="section-padding-sm">
        <SectionHeading
          eyebrow="Explore"
          title="Discover God's Own Country"
          description="For many of our guests, this is a once-in-a-lifetime trip to India. We've curated recommendations to help you make the most of your time in Kerala."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {destinations.map((dest, i) => (
            <FadeIn key={dest.name} delay={i * 0.08}>
              <article className="border-t border-border pt-8">
                <h2 className="text-title">{dest.name}</h2>
                <p className="text-body text-muted-foreground mt-3">
                  {dest.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <p className="text-body-lg text-muted-foreground">
            Detailed travel guides, visa information, and packing lists will be
            available through our CMS.
          </p>
        </FadeIn>
      </Container>
    </div>
  );
}
