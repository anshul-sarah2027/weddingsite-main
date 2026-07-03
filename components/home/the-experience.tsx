import { Container } from "@/components/layout/container";
import { ImageReveal } from "@/components/animations/image-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { IMAGES } from "@/constants/images";

const experiences = [
  {
    image: IMAGES.houseboat,
    title: "Houseboat journeys",
    description:
      "Drift through the backwaters on a traditional kettuvallam — the same vessels that have carried spices and stories for centuries.",
  },
  {
    image: IMAGES.cuisine,
    title: "Kerala cuisine",
    description:
      "From fragrant fish curry to delicate appam, every meal is an invitation to taste the land — prepared by chefs who honour generations of tradition.",
  },
  {
    image: IMAGES.ayurveda,
    title: "Ayurvedic wellness",
    description:
      "Kerala is the birthplace of Ayurveda. Between celebrations, restore yourself with treatments designed to harmonise body and spirit.",
  },
];

export function TheExperience() {
  return (
    <section id="experience" className="section-padding bg-background">
      <Container>
        <SectionHeading
          eyebrow="The Kerala Experience"
          title="Beyond the celebration"
          description="We've built in time for you to truly experience Kerala — not as tourists, but as welcomed guests in a land that knows how to make strangers feel like family."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <article>
                <div className="image-breathe mb-6">
                  <ImageReveal
                    src={item.image}
                    alt={item.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-title text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
