import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImageReveal } from "@/components/animations/image-reveal";
import { FadeIn } from "@/components/animations/fade-in";
import { IMAGES } from "@/constants/images";
import { WEDDING } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Venue",
  "Kumarakom Lake Resort — our wedding venue on the banks of Vembanad Lake.",
);

export default function VenuePage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container className="section-padding-sm">
        <SectionHeading
          eyebrow="Venue"
          title={WEDDING.venue}
          description="A heritage resort where traditional Kerala architecture meets the tranquillity of the backwaters. Full venue details, maps, and directions will be available here."
        />

        <FadeIn className="image-breathe-wide mt-12">
          <ImageReveal
            src={IMAGES.keralaTemple}
            alt="Kumarakom Lake Resort"
          />
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-title mb-3">Getting there</h2>
            <p className="text-body text-muted-foreground">
              Cochin International Airport (COK) is approximately 2 hours by
              road. We will arrange group transfers for guests arriving on
              recommended flights — details to follow.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-title mb-3">The setting</h2>
            <p className="text-body text-muted-foreground">
              The ceremony takes place at the lakeside mandap, with the
              reception on the waterfront terrace. Interactive maps via Mapbox
              will be integrated in a future update.
            </p>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
