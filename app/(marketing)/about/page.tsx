import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuoteBlock } from "@/components/shared/quote-block";
import { ImageReveal } from "@/components/animations/image-reveal";
import { FadeIn } from "@/components/animations/fade-in";
import { IMAGES } from "@/constants/images";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Our Story",
  "The story of Sarah and Anshul — from a London bookshop to the backwaters of Kerala.",
);

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container className="section-padding-sm">
        <SectionHeading
          eyebrow="About"
          title="A love written across continents"
          description="This page will be enriched with content from our CMS. For now, here is the essence of our story."
        />

        <div className="editorial-grid mt-16 items-start lg:grid-cols-2">
          <FadeIn className="image-breathe">
            <ImageReveal src={IMAGES.couple.primary} alt="Sarah and Anshul" />
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <p className="text-body-lg text-muted-foreground">
                Sarah and Anshul&apos;s story began with a chance encounter and
                grew through years of patience, adventure, and unwavering
                devotion. Their wedding in Kumarakom is a celebration of
                everything they hold dear — family, culture, and the beauty of
                bringing different worlds together.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-muted-foreground">
                Full story content, photo galleries, and family introductions
                will be managed through Sanity CMS.
              </p>
            </FadeIn>
            <QuoteBlock
              quote="Love recognises no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope."
              attribution="Maya Angelou"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
