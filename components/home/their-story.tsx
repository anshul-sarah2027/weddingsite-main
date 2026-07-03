import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/animations/image-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuoteBlock } from "@/components/shared/quote-block";
import { FadeIn } from "@/components/animations/fade-in";
import { EditorialLink } from "@/components/shared/editorial-link";
import { IMAGES } from "@/constants/images";

export function TheirStory() {
  return (
    <section id="story" className="section-padding bg-ivory-muted">
      <Container>
        <div className="editorial-grid items-start lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeIn className="image-breathe-tall sticky top-28">
              <ImageReveal
                src={IMAGES.couple}
                alt="Anshul and Sarah"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <SectionHeading
              eyebrow="Their Story"
              title="Two paths, one destination"
              description="Anshul grew up between Mumbai and Dublin. Sarah was born under Irish skies but always felt drawn to warmer horizons. They met in London — two strangers at a bookshop, reaching for the same novel."
            />

            <FadeIn delay={0.2} className="mt-10 space-y-6">
              <p className="text-body-lg text-muted-foreground">
                What followed were years of long-distance flights, shared meals
                across three continents, and a quiet certainty that their
                stories were always meant to intertwine. When Anshul proposed on
                a misty morning in Connemara, Sarah said yes before he finished
                the question.
              </p>
              <p className="text-body-lg text-muted-foreground">
                Kerala holds a special place in their hearts — it&apos;s where
                Anshul&apos;s grandparents first fell in love, and where they
                dreamed of bringing their families together. This wedding is
                not just a celebration of their union, but a bridge between
                cultures, continents, and the people who shaped them.
              </p>
            </FadeIn>

            <div className="mt-12">
              <QuoteBlock
                quote="We wanted our wedding to feel less like an event and more like a journey — one our guests would remember long after the last dance."
                attribution="Anshul & Sarah"
              />
            </div>

            <div className="mt-10">
              <EditorialLink href="/about">Read our full story</EditorialLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
