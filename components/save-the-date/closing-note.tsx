"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SaveTheDateClosing() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAF7F2] pb-16 pt-4 md:pb-20 md:pt-6"
      aria-label="Closing note"
    >
      <Container size="narrow" className="relative z-10">
        <FadeIn duration={0.75} className="mx-auto max-w-md text-center">
          <p
            className={cn(
            "font-editorial text-editorial-quote text-2xl leading-snug md:text-3xl",
            )}
          >
            We can&apos;t wait
            <br />
            to celebrate with you.
          </p>

          <p
            className={cn(
            "font-editorial text-editorial mt-5 text-lg md:text-xl",
            )}
          >
            {SITE.couple.bride} & {SITE.couple.groom}
          </p>

          <div className="relative mx-auto mt-8 h-16 w-16 opacity-70 md:mt-10 md:h-20 md:w-20">
            <Image
              src={IMAGES.logo.main}
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
