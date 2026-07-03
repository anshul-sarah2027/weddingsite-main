import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { weddingEvents } from "@/constants/events";
import { createPageMetadata } from "@/lib/metadata";
import { format, parseISO } from "date-fns";

export const metadata = createPageMetadata(
  "Events",
  "The full wedding weekend schedule — from welcome evening to reception.",
);

export default function EventsPage() {
  return (
    <div className="pt-24 md:pt-32">
      <Container className="section-padding-sm">
        <SectionHeading
          eyebrow="Events"
          title="Your weekend at a glance"
          description="Five days of celebration across Kumarakom. Each event has been thoughtfully planned — timings and details may be refined closer to the date."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 space-y-0">
          {weddingEvents.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.08}>
              <article className="border-t border-border py-10">
                <div className="grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <time
                      dateTime={event.date}
                      className="text-subtitle text-gold"
                    >
                      {format(parseISO(event.date), "EEEE, d MMMM yyyy")}
                    </time>
                    <p className="text-caption text-muted-foreground mt-2">
                      {event.time}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="text-title">{event.name}</h2>
                    <p className="text-body text-muted-foreground mt-3">
                      {event.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-6 text-caption text-muted-foreground">
                      <span>{event.location}</span>
                      <span>Dress: {event.dressCode}</span>
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}
