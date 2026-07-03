import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/animations/image-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { EditorialLink } from "@/components/shared/editorial-link";
import { IMAGES } from "@/constants/images";

const highlights = [
  "Fort Kochi & its colonial heritage",
  "Munnar tea plantations",
  "Periyar wildlife sanctuary",
  "Traditional Kathakali performances",
  "Spice markets of Thekkady",
  "Sunset cruises on Vembanad Lake",
];

export function YourJourney() {
  return (
    <section id="explore" className="section-padding bg-ivory-muted">
      <Container>
        <div className="editorial-grid items-center lg:grid-cols-2">
          <FadeIn className="image-breathe-wide order-2 lg:order-1">
            <ImageReveal
              src={IMAGES.sunset}
              alt="Sunset over Kerala landscape"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeIn>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Explore Kerala"
              title="Extend your journey"
              description="Many of our guests are travelling from across the world for the first time. We encourage you to arrive early or stay after — Kerala rewards those who linger."
            />

            <FadeIn delay={0.2} className="mt-8">
              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-body text-muted-foreground"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <div className="mt-10">
              <EditorialLink href="/explore">
                Discover our travel guide
              </EditorialLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
