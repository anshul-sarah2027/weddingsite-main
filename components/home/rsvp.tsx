import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function RsvpSection() {
  return (
    <section id="rsvp" className="section-padding bg-background">
      <Container size="narrow">
        <SectionHeading
          eyebrow="RSVP"
          title="We hope you'll join us"
          description={`Please let us know if you can celebrate with us in Kumarakom. Your response helps us prepare every detail of your stay — from accommodation to dietary preferences.`}
          align="center"
          className="mx-auto"
        />

        <FadeIn delay={0.2} className="mt-10 text-center">
          <p className="text-body text-muted-foreground mb-8">
            Kindly respond by 1 October 2026
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-none bg-forest px-10 py-6 text-caption tracking-widest uppercase hover:bg-forest-light"
          >
            <Link href="/rsvp">Confirm your attendance</Link>
          </Button>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="text-editorial text-foreground/80">
            &ldquo;{SITE.couple.groom} & {SITE.couple.bride} can&apos;t wait to
            welcome you to Kerala.&rdquo;
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
