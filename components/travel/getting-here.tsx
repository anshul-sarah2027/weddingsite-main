"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

const gold = "text-[#B59A63]";

const VENUE = {
  name: "Kumarakom Lake Resort",
  mapUrl: "https://maps.app.goo.gl/DSu5W2zY3zqcuPaT9",
  websiteUrl: "https://www.kumarakomlakeresort.in/index.php",
  websiteLabel: "kumarakomlakeresort.in",
  phone: "+91 481 252 4900",
  phoneHref: "tel:+914812524900",
  address: "Kumarakom North Post, Kottayam 686563, Kerala, India",
  description:
    "Set on the edge of Vembanad Lake, Kumarakom Lake Resort is surrounded by coconut groves, paddy fields, and the quiet backwaters that Kerala is known for. It's a place where nature does most of the talking, calm waters, swaying palms, and views that change colour with the time of day, making it the perfect backdrop for these two days.",
} as const;

type TravelBlock = {
  id: string;
  title: string;
  lead?: string;
  facts?: string[];
  body: string[];
  highlight?: string;
};

const TRAVEL_BLOCKS: TravelBlock[] = [
  {
    id: "airport",
    title: "Arrival Airport",
    lead: "Cochin International Airport (COK)",
    facts: [
      "≈ 80 km from the resort",
      "From COK — 2–2.5 hours approx.",
      "From Kochi (city) — 2 hours approx. | ≈ 50 km",
      "From Trivandrum (TRV) — ≈ 4.5 hours | ≈ 165 km",
    ],
    body: [
      "To arrive at the resort, please fly into Cochin International Airport (COK), located approximately 80 kilometres away.",
    ],
  },
  {
    id: "rail",
    title: "By Rail",
    facts: [
      "Kottayam Railway Station — ≈ 15 km | 30 minutes",
      "Ernakulam Junction (South) — ≈ 60 km | ≈ 1.5 hours",
      "Ernakulam Town (North) — ≈ 62 km | ≈ 1.5 hours",
    ],
    body: [],
  },
  {
    id: "transfers",
    title: "Transfers",
    body: [
      "The most reliable way to reach Kumarakom Lake Resort from Cochin International Airport is by private taxi or pre-arranged transfer, approximately 2 to 2.5 hours depending on traffic. We'd recommend booking a transfer in advance through the resort or a trusted local operator rather than arranging a taxi on arrival.",
      "There are also multiple reliable taxi apps operating in Kochi, such as Uber, Ola, and Rapido. These offer a fixed price and journey map, so if you'd rather not book a private taxi, we'd highly recommend using one of these instead. Around Kumarakom, local taxis are recommended.",
    ],
  },
  {
    id: "self-drive",
    title: "Self Drive",
    body: [
      "Most international guests usually find private car transfers the easiest and safest option within Kerala, especially for routes from Kumarakom to Kochi, Munnar, or the beaches.",
    ],
  },
  {
    id: "flying-in",
    title: "Flying In",
    body: [
      "We recommend flying into Cochin International Airport (COK). For guests coming from Ireland, the easiest route is flying out of Dublin, connecting through a Middle Eastern hub such as Dubai, Abu Dhabi, or Doha, all of which have good onward connections to Kochi. This tends to be the most reliable and comfortable route for international guests.",
      "There are also multiple daily domestic flights connecting Kochi from other Indian airports, so guests already travelling within India can easily route through Delhi, Mumbai, or Bangalore etc.",
    ],
  },
  {
    id: "international",
    title: "International Guests",
    highlight: "Arrive at least one day before",
    body: [
      "If you're travelling internationally, we recommend arriving at least one day before the celebrations begin — to rest and enjoy the resort before the festivities.",
    ],
  },
];

function highlightRideApps(text: string) {
  const parts = text.split(/(Uber|Ola|Rapido)/g);
  return parts.map((part, index) =>
    part === "Uber" || part === "Ola" || part === "Rapido" ? (
      <strong key={`${part}-${index}`} className="font-semibold text-[#2F3A2E]">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function GoldenBullet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-4 w-11 shrink-0 overflow-hidden md:h-[1.125rem] md:w-12",
        className,
      )}
      aria-hidden="true"
    >
      <img
        src={IMAGES.patterns.bulletPoint}
        alt=""
        width={1536}
        height={1024}
        draggable={false}
        className="absolute left-1/2 top-1/2 h-[4.5rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 md:h-[5.25rem]"
      />
    </div>
  );
}

function JourneyStrip() {
  return (
    <FadeIn duration={0.8} delay={0.15} className="mt-14 md:mt-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 hidden items-center justify-between px-4 text-center md:flex md:px-8 lg:px-12">
          <p className="text-caption tracking-[0.16em] text-[#5B6D6A]/70 uppercase">
            Kochi Airport
          </p>
          <p className="text-caption tracking-[0.16em] text-[#5B6D6A]/70 uppercase">
            Scenic Drive
          </p>
          <p className="text-caption tracking-[0.16em] text-[#5B6D6A]/70 uppercase">
            Kumarakom Lake Resort
          </p>
        </div>

        <div className="relative mx-auto w-full">
          <img
            src={IMAGES.kerala.gettingHereArt}
            alt="Illustrated journey from Kochi Airport through a scenic drive to Kumarakom Lake Resort"
            width={1774}
            height={887}
            decoding="async"
            loading="lazy"
            draggable={false}
            className={cn(
              "h-auto w-full object-contain",
              "[mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_92%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)]",
              "[mask-composite:intersect]",
              "[webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_8%,#000_92%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_8%,#000_92%,transparent_100%)]",
              "[webkit-mask-composite:source-in]",
            )}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_88%_at_50%_50%,transparent_42%,#F3F5F1_100%)] opacity-75"
            aria-hidden="true"
          />
        </div>

      </div>
    </FadeIn>
  );
}

export function GettingHere() {
  return (
    <section
      id="getting-here"
      className="relative scroll-mt-32 overflow-hidden bg-[#F3F5F1] py-16 md:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
      aria-label="Getting Here"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(140,168,176,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.7}>
          <div className="relative mx-auto mb-4 h-16 w-36 md:mb-5 md:h-20 md:w-44">
            <Image
              src={IMAGES.decor.travelAndStayHeader}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-90"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            Your Journey Begins
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-[#2F3A2E] md:text-4xl lg:text-5xl">
            Getting Here
          </h2>

          <div className="mx-auto mt-6 flex justify-center md:mt-8">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="h-auto w-40 opacity-55 md:w-48"
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        <div className="mt-12 grid items-start gap-12 md:mt-14 md:grid-cols-[42%_58%] md:gap-12 lg:gap-16">
          <FadeIn duration={0.7} delay={0.06} className="text-center md:text-left">
            <p
              className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
              )}
            >
              From Around the World
            </p>

            <h3 className="font-heading mt-4 text-3xl font-medium leading-[1.25] text-[#2F3A2E] md:mt-5 md:text-4xl lg:text-[2.65rem] lg:leading-[1.2]">
              Your Journey to Kumarakom
            </h3>

            <div className="font-heading mx-auto mt-6 max-w-[480px] space-y-5 text-base leading-[1.85] text-[#3E4A45]/75 md:mx-0 md:text-lg">
              <p>
                Whether you&apos;re travelling from across India or flying in from
                overseas, getting to Kumarakom is wonderfully straightforward.
                Most guests will arrive through{" "}
                <span className={gold}>Kochi</span>, before enjoying one of
                Kerala&apos;s most beautiful drives through palm-lined roads,
                peaceful villages and shimmering backwaters.
              </p>

            <dl className="mx-auto mt-8 max-w-[480px] space-y-3 border-t border-[#2F3A2E]/10 pt-6 text-left md:mx-0">
              <div>
                <dt className="text-caption tracking-[0.14em] text-[#5B6D6A]/70 uppercase">
                  Address
                </dt>
                <dd className="font-heading mt-1 text-sm text-[#3E4A45]/75 md:text-base">
                  {VENUE.address}
                </dd>
              </div>
              <div>
                <dt className="text-caption tracking-[0.14em] text-[#5B6D6A]/70 uppercase">
                  Phone
                </dt>
                <dd className="font-heading mt-1 text-sm md:text-base">
                  <a
                    href={VENUE.phoneHref}
                    className={cn("underline-offset-4 hover:underline", gold)}
                  >
                    {VENUE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption tracking-[0.14em] text-[#5B6D6A]/70 uppercase">
                  Website
                </dt>
                <dd className="font-heading mt-1 text-sm md:text-base">
                  <a
                    href={VENUE.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("underline-offset-4 hover:underline", gold)}
                  >
                    {VENUE.websiteLabel}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption tracking-[0.14em] text-[#5B6D6A]/70 uppercase">
                  Map
                </dt>
                <dd className="font-heading mt-1 text-sm md:text-base">
                  <a
                    href={VENUE.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("underline-offset-4 hover:underline", gold)}
                  >
                    Open in Google Maps
                  </a>
                </dd>
              </div>
            </dl>
            </div>
          </FadeIn>

          <FadeIn duration={0.7} delay={0.12}>
            <aside
              className="relative overflow-hidden rounded-sm border border-[#2F3A2E]/8 bg-[#FAF8F3]/90 px-5 py-8 shadow-[0_1px_0_rgba(45,74,62,0.04)] md:px-8 md:py-10"
              aria-label="Travel information"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.2]"
                style={{
                  backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
                  backgroundSize: "cover",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-0 divide-y divide-[#2F3A2E]/8">
                {TRAVEL_BLOCKS.map((block) => (
                  <div key={block.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-2.5">
                      <GoldenBullet />
                      <h4 className="font-heading text-[0.7rem] font-semibold tracking-[0.16em] text-[#2F3A2E] uppercase md:text-xs">
                        {block.title}
                      </h4>
                    </div>

                    {block.lead && (
                      <p className="font-heading mt-2.5 text-lg font-semibold text-[#2F3A2E] md:text-xl">
                        {block.lead}
                      </p>
                    )}

                    {block.facts && (
                      <ul className="mt-2.5 flex flex-col gap-y-1.5">
                        {block.facts.map((fact) => (
                          <li
                            key={fact}
                            className={cn(
                              "font-heading text-sm font-semibold md:text-base",
                              gold,
                            )}
                          >
                            {fact}
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.highlight && (
                      <p
                        className={cn(
            "font-editorial text-editorial mt-2.5 text-lg font-medium md:text-xl",
                          gold,
                        )}
                      >
                        {block.highlight}
                      </p>
                    )}

                    {block.body.length > 0 && (
                      <div className="mt-2.5 space-y-2.5">
                        {block.body.map((line) => (
                          <p
                            key={line}
                            className="font-heading text-[0.9375rem] font-medium leading-[1.8] text-[#2F3A2E]/88 md:text-base"
                          >
                            {highlightRideApps(line)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </FadeIn>
        </div>

        <JourneyStrip />
      </Container>
    </section>
  );
}
