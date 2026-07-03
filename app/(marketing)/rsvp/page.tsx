import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "RSVP",
  "Confirm your attendance for Anshul and Sarah's wedding in Kumarakom.",
);

export default function RsvpPage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container size="narrow" className="section-padding-sm">
        <SectionHeading
          eyebrow="RSVP"
          title="We hope you'll join us"
          description="Please respond by 1 October 2026. The full RSVP form with dietary preferences, accommodation requests, and travel details will be connected to Supabase."
          align="center"
          className="mx-auto"
        />

        <FadeIn className="mt-12">
          <div className="border border-border bg-ivory-muted p-8 text-center md:p-12">
            <p className="text-body-lg text-muted-foreground">
              RSVP form coming soon
            </p>
            <p className="text-caption text-muted-foreground mt-4">
              React Hook Form + Zod validation + Supabase integration
            </p>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
