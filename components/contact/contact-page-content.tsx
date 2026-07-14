"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";

const CONTACTS = [
  { ...SITE.contact.sarah, role: "Bride" as const },
  { ...SITE.contact.anshul, role: "Groom" as const },
];

export function ContactPageContent() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#FAF7F2]"
      aria-label="Contact"
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
            Contact
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

          <p className="font-heading mx-auto mt-8 max-w-lg text-base leading-[1.95] text-[#2F3A2E]/85 md:mt-10 md:text-lg md:leading-[2]">
            If you have any questions about the wedding weekend, travel, or
            your stay — please feel free to reach out to either of us.
          </p>

          <div className="mx-auto mt-12 grid w-full max-w-xl gap-5 sm:grid-cols-2 sm:gap-6 md:mt-14">
            {CONTACTS.map((person) => (
              <div
                key={person.fullName}
                className="rounded-sm border border-[#B59A63]/25 bg-[rgba(255,252,247,0.85)] px-5 py-7 shadow-[0_10px_36px_rgba(47,58,46,0.05)]"
              >
                <p className="font-heading text-[0.65rem] tracking-[0.18em] text-[#B59A63] uppercase">
                  {person.role}
                </p>
                <h2 className="font-heading mt-3 text-xl font-medium text-[#2F3A2E] md:text-2xl">
                  {person.fullName}
                </h2>
                <a
                  href={person.phoneHref}
                  className="font-heading mt-4 inline-block text-base text-[#2F3A2E]/85 underline decoration-[#B59A63]/35 underline-offset-[5px] transition-colors hover:text-[#B59A63] md:text-lg"
                >
                  {person.phoneDisplay}
                </a>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 md:mt-12">
            <div className="flex items-center gap-2.5">
              <Image
                src={IMAGES.logo.whatsapp}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="size-7 object-contain"
                aria-hidden="true"
              />
              <p className="font-heading text-base tracking-[0.06em] text-[#2F3A2E] md:text-lg">
                Connect on WhatsApp
              </p>
            </div>
            <p className="font-heading max-w-sm text-sm leading-relaxed text-[#2F3A2E]/85 md:text-[0.95rem]">
              Both numbers above are on WhatsApp — tap a name to message us.
            </p>
            <div className="flex items-center gap-3">
              {CONTACTS.map((person, index) => (
                <span key={person.fullName} className="contents">
                  {index > 0 && (
                    <span
                      className="h-3 w-px bg-[#B59A63]/40"
                      aria-hidden="true"
                    />
                  )}
                  <a
                    href={person.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-base text-[#B59A63] underline decoration-[#B59A63]/40 underline-offset-[5px] transition-colors hover:text-[#2F3A2E] hover:decoration-[#2F3A2E]/35 md:text-lg"
                  >
                    {person.fullName.split(" ")[0]}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn duration={1} delay={0.15} className="mt-14 w-full md:mt-16">
          <div className="relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[260px]">
            <Image
              src={IMAGES.logo.wedding}
              alt="Sarah and Anshul wedding — Pints and Pappadams"
              fill
              sizes="260px"
              className="object-contain opacity-95"
              priority
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
