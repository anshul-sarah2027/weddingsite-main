"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CLIMATE = [
  "Warm tropical weather",
  "24–31°C daytime temperatures",
  "Pleasant evenings",
  "Light humidity",
  "January is one of the best months to visit Kerala",
] as const;

const EXPECT = [
  "Sunny mornings",
  "Lush tropical greenery",
  "Beautiful sunsets",
  "Peaceful backwaters",
] as const;

const PACK = [
  "Lightweight breathable clothing",
  "Comfortable walking shoes or sandals",
  "Sunglasses & sunscreen",
  "Traditional outfits for wedding celebrations",
  "Light shawl or stole for evenings",
] as const;

const GOOD_TO_KNOW = [
  "Cards are widely accepted, though carrying a little cash is helpful for local shops.",
  "Uber is available in Kochi, while local taxis are recommended around Kumarakom.",
  "Drinking bottled water is recommended throughout your stay.",
] as const;

function GoldenBullet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mt-1.5 h-3.5 w-9 shrink-0 overflow-hidden md:h-4 md:w-10",
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
        className="absolute left-1/2 top-1/2 h-[3.75rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 md:h-[4.25rem]"
      />
    </div>
  );
}

function TipList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <GoldenBullet />
          <p className="font-heading text-[0.95rem] leading-[1.7] text-forest/65 md:text-base">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

function TipCard({
  title,
  illustration,
  illustrationAlt,
  artSize = "default",
  children,
  delay = 0,
}: {
  title: string;
  illustration: string;
  illustrationAlt: string;
  artSize?: "default" | "wide";
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn duration={0.7} delay={delay} className="h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest/8 bg-[#FFFCF7] px-6 py-7 shadow-[0_8px_28px_rgba(45,58,48,0.05)] md:px-8 md:py-8">
        <div
          className={cn(
            "relative mx-auto mb-5 opacity-90",
            artSize === "wide"
              ? "h-20 w-44 md:h-24 md:w-52"
              : "h-14 w-24 md:h-16 md:w-28",
          )}
        >
          <Image
            src={illustration}
            alt={illustrationAlt}
            fill
            sizes={artSize === "wide" ? "208px" : "112px"}
            className="object-contain"
          />
        </div>

        <h3 className="font-heading text-center text-2xl font-medium text-forest md:text-[1.65rem]">
          {title}
        </h3>

        <div className="mt-6 flex flex-1 flex-col">{children}</div>
      </article>
    </FadeIn>
  );
}

function ClosingNote() {
  return (
    <FadeIn duration={0.75} className="mx-auto mt-14 max-w-md text-center md:mt-16">
      <p
        className={cn(
            "font-editorial text-editorial-quote text-2xl leading-snug md:text-3xl",
        )}
      >
        Safe travels,
        <br />
        and we&apos;ll see you in Kerala.
      </p>

      <p
        className={cn(
            "font-editorial text-editorial mt-5 text-lg md:text-xl",
        )}
      >
        — {SITE.couple.bride} & {SITE.couple.groom}
      </p>
    </FadeIn>
  );
}

export function WeatherTravelTips() {
  return (
    <section
      id="weather-travel-tips"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
      aria-label="Weather & Travel Tips"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
            Before You Travel
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Weather &amp; Travel Tips
          </h2>

          <div className="mx-auto mt-6 flex justify-center md:mt-8">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="h-auto w-40 opacity-60 md:w-48"
              aria-hidden="true"
            />
          </div>

          <p className="font-heading mx-auto mt-6 max-w-2xl text-base leading-[1.9] text-forest/60 md:text-lg">
            January is one of the most beautiful times to visit Kerala. Here are
            a few helpful tips to make your journey comfortable and stress-free.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
          <TipCard
            title="January in Kerala"
            illustration={IMAGES.decor.peonyWithBud}
            illustrationAlt=""
            artSize="default"
            delay={0.06}
          >
            <div>
              <p
                className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
                )}
              >
                Climate
              </p>
              <TipList items={CLIMATE} />
            </div>

            <div className="mt-8 border-t border-forest/8 pt-7">
              <p
                className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
                )}
              >
                Expect
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {EXPECT.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5"
                  >
                    <span className="text-[#B59A63]" aria-hidden="true">
                      ◆
                    </span>
                    <p className="font-heading text-[0.95rem] text-forest/65 md:text-base">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </TipCard>

          <TipCard
            title="Helpful Travel Tips"
            illustration={IMAGES.decor.oliveBranch}
            illustrationAlt=""
            delay={0.1}
          >
            <div>
              <p
                className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
                )}
              >
                What to Pack
              </p>
              <TipList items={PACK} />
            </div>

            <div className="mt-8 border-t border-forest/8 pt-7">
              <p
                className={cn(
            "font-editorial text-editorial text-lg md:text-xl",
                )}
              >
                Good to Know
              </p>
              <TipList items={GOOD_TO_KNOW} />
            </div>
          </TipCard>
        </div>

        <ClosingNote />
      </Container>
    </section>
  );
}
