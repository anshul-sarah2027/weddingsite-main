import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/animations/image-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { IMAGES } from "@/constants/images";

export function WelcomeToKerala() {
  return (
    <section id="welcome" className="section-padding bg-background">
      <Container>
        <div className="editorial-grid items-center lg:grid-cols-2">
          <SectionHeading
            eyebrow="Welcome to Kerala"
            title="Where the backwaters hold their breath"
            description="Kumarakom sits on the edge of Vembanad Lake — a labyrinth of canals, coconut groves, and quiet villages. For centuries, travellers have come here to slow down. We chose it because it feels like the world pausing to breathe."
          />

          <FadeIn delay={0.2} className="image-breathe-wide">
            <ImageReveal
              src={IMAGES.keralaBackwaters}
              alt="Serene Kerala backwaters with palm trees"
            />
          </FadeIn>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "A land of contrasts",
              text: "Ancient temples beside colonial churches. Spice markets next to silent lagoons. Kerala is India at its most gentle.",
            },
            {
              title: "The art of slowing down",
              text: "Here, time moves with the tide. Houseboats drift. Tea cools. Conversations linger. This is hospitality as a way of life.",
            },
            {
              title: "Your first chapter",
              text: "Whether you've travelled from Dublin, Delhi, or somewhere in between — this is where your journey begins.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i}>
              <h3 className="text-title text-foreground mb-3">{item.title}</h3>
              <p className="text-body text-muted-foreground">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
