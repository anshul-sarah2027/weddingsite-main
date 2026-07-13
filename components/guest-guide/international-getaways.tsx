"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import { internationalGetaways } from "@/constants/guest-guide";

export function InternationalGetaways() {
  return (
    <GuideSection
      id="international-getaways"
      ariaLabel="International Getaways"
      eyebrow="Outside India"
      title="International Getaways"
      tone="ivory"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {internationalGetaways.map((destination, index) => (
          <FadeIn key={destination.id} duration={0.6} delay={0.03 * index}>
            <GuideCard className="h-full">
              <h3 className="font-heading text-lg font-medium text-forest md:text-xl">
                {destination.name}
              </h3>
              <p className="font-editorial text-editorial mt-2 text-sm md:text-base">
                {destination.flightTime}
              </p>
              <p className="font-heading mt-3 text-sm leading-[1.75] text-forest/60 md:text-[0.9375rem]">
                {destination.description}
              </p>
            </GuideCard>
          </FadeIn>
        ))}
      </div>
    </GuideSection>
  );
}
