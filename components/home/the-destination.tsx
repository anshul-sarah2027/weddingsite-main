import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/animations/image-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { EditorialLink } from "@/components/shared/editorial-link";
import { Parallax } from "@/components/animations/parallax";
import { IMAGES } from "@/constants/images";
import { WEDDING } from "@/lib/constants";

export function TheDestination() {
  return (
    <section id="destination" className="section-padding bg-forest text-ivory">
      <Container>
        <div className="editorial-grid items-center lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The Destination"
              title={WEDDING.venue}
              variant="inverse"
              description="Nestled on the banks of Vembanad Lake, our venue is a sanctuary of traditional Kerala architecture — heritage villas, open courtyards, and pathways that wind through coconut groves down to the water's edge."
            />
            <FadeIn delay={0.2} className="mt-8 space-y-4">
              <p className="text-body-lg text-ivory/70">
                Kumarakom is a two-hour drive from Cochin International Airport.
                For guests travelling from abroad, we&apos;ve prepared a
                comprehensive travel guide covering flights, visas, and
                everything you need to arrive with ease.
              </p>
            </FadeIn>
            <div className="mt-10 flex flex-wrap gap-6">
              <EditorialLink href="/venue" className="text-ivory/80 hover:text-gold">
                Explore the venue
              </EditorialLink>
              <EditorialLink
                href="/accommodation"
                className="text-ivory/80 hover:text-gold"
              >
                Where to stay
              </EditorialLink>
            </div>
          </div>

          <Parallax speed={0.2}>
            <FadeIn delay={0.15} className="image-breathe">
              <ImageReveal
                src={IMAGES.keralaTemple}
                alt="Traditional Kerala architecture"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
