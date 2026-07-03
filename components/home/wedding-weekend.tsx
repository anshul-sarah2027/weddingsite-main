import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { EditorialLink } from "@/components/shared/editorial-link";
import { weddingEvents } from "@/constants/events";
import { format, parseISO } from "date-fns";

export function WeddingWeekend() {
  return (
    <section id="weekend" className="section-padding bg-background">
      <Container>
        <SectionHeading
          eyebrow="The Wedding Weekend"
          title="Five days of celebration"
          description="From a gentle welcome evening to the sacred ceremony and candlelit reception — each moment has been designed with intention, blending Indian tradition with the warmth of Irish hospitality."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="space-y-0">
          {weddingEvents.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.08}>
              <article className="group grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <time
                    dateTime={event.date}
                    className="text-subtitle text-gold"
                  >
                    {format(parseISO(event.date), "EEEE, d MMMM")}
                  </time>
                  <p className="text-caption text-muted-foreground mt-1">
                    {event.time} · {event.location}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-title text-foreground group-hover:text-forest-light transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-body text-muted-foreground mt-3">
                    {event.description}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <p className="text-caption text-muted-foreground">
                    Dress code
                  </p>
                  <p className="text-body mt-1">{event.dressCode}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <EditorialLink href="/events">View full event details</EditorialLink>
        </div>
      </Container>
    </section>
  );
}
