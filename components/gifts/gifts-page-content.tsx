"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";

const GIFT_INTRO =
  "Your presence at our wedding truly means the world to us, and that's all we could ever ask for. Since we'll be flying home after the celebrations, it'll be tricky to carry physical gifts , but if you'd still like to give something, we'd be so grateful.";

const PAYMENT_LINKS = [
  {
    label: "Paypal",
    href: "https://paypal.me/sarahninan",
    display: "paypal.me/sarahninan",
    logo: IMAGES.logo.paypal,
    logoAlt: "PayPal logo",
  },
  {
    label: "Revolut",
    href: "https://revolut.me/anshuli25e",
    display: "revolut.me/anshuli25e",
    logo: IMAGES.logo.revolut,
    logoAlt: "Revolut logo",
  },
] as const;

export function GiftsPageContent() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#FAF7F2]"
      aria-label="Gifts"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(181,154,99,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      <Container
        size="narrow"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pt-32 md:pb-24"
      >
        <FadeIn duration={0.9} className="w-full max-w-2xl">
          <h1 className="font-heading text-3xl font-medium uppercase tracking-[0.18em] text-[#2F3A2E] md:text-5xl lg:text-[3.25rem]">
            Gifts
          </h1>

          <div className="mx-auto mt-5 flex justify-center md:mt-6">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="180px"
              className="h-auto w-36 opacity-50 md:w-44"
              aria-hidden="true"
            />
          </div>

          <p className="font-heading mx-auto mt-8 max-w-xl text-base leading-[1.95] text-[#2F3A2E]/78 md:mt-10 md:text-lg md:leading-[2]">
            {GIFT_INTRO}
          </p>

          <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 md:mt-12">
            {PAYMENT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-sm border border-[#B59A63]/25 bg-[rgba(255,252,247,0.88)] px-4 py-3.5 text-left transition-[border-color,box-shadow] hover:border-[#B59A63]/45 hover:shadow-[0_10px_28px_rgba(47,58,46,0.06)] md:px-5 md:py-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-white/90 ring-1 ring-forest/8">
                  <Image
                    src={link.logo}
                    alt={link.logoAlt}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span className="min-w-0">
                  <span className="font-heading block text-[0.7rem] tracking-[0.16em] text-[#2F3A2E]/50 uppercase">
                    {link.label}
                  </span>
                  <span className="font-heading mt-1 block text-base text-[#B59A63] underline decoration-[#B59A63]/40 underline-offset-[5px] transition-colors group-hover:text-[#2F3A2E] group-hover:decoration-[#2F3A2E]/35 md:text-lg">
                    {link.display}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn duration={1} delay={0.15} className="mt-14 w-full md:mt-16">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
            <Image
              src={IMAGES.logo.wedding}
              alt="Anshul and Sarah wedding — Pints and Pappadams"
              fill
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
              className="object-contain"
              priority
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
