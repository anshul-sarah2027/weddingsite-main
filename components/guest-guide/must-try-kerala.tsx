"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import { dietaryPreferences, mustTryKerala } from "@/constants/guest-guide";

export function MustTryKerala() {
  return (
    <GuideSection
      id="must-try-kerala"
      ariaLabel="Must-Try Kerala Dishes"
      eyebrow="Local Flavours"
      title="Must-Try Kerala Dishes"
      tone="sage"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mustTryKerala.map((category, index) => (
          <FadeIn key={category.id} duration={0.55} delay={0.03 * index}>
            <GuideCard className="h-full">
              <h3 className="font-heading text-lg font-medium text-forest md:text-xl">
                {category.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {category.dishes.map((dish) => (
                  <li
                    key={dish}
                    className="font-heading flex items-start gap-2 text-sm leading-[1.65] text-forest/85 md:text-[0.9375rem]"
                  >
                    <span className="mt-1.5 text-[#B59A63]" aria-hidden="true">
                      ◆
                    </span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </GuideCard>
          </FadeIn>
        ))}
      </div>
    </GuideSection>
  );
}

export function DietaryPreferences() {
  return (
    <section
      id="dietary-preferences"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-10 md:py-12"
      aria-label="Dietary Preferences"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <FadeIn duration={0.65}>
          <GuideCard>
            <h3 className="font-heading text-center text-xl font-medium text-forest md:text-2xl">
              Dietary Preferences
            </h3>
            <p className="font-heading mx-auto mt-4 max-w-2xl text-center text-sm leading-[1.85] text-forest/85 md:text-base">
              {dietaryPreferences}
            </p>
          </GuideCard>
        </FadeIn>
      </div>
    </section>
  );
}
