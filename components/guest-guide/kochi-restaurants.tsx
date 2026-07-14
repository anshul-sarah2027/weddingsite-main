"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import { kochiRestaurantCategories } from "@/constants/guest-guide";

export function KochiRestaurants() {
  return (
    <GuideSection
      id="kochi-restaurants"
      ariaLabel="Kochi Restaurant Guide"
      eyebrow="Where to Eat"
      title="Kochi Restaurant Guide"
      tone="ivory"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kochiRestaurantCategories.map((category, index) => (
          <FadeIn key={category.id} duration={0.55} delay={0.02 * index}>
            <GuideCard className="h-full">
              <h3 className="font-heading text-lg font-medium text-forest md:text-xl">
                {category.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {category.places.map((place) => (
                  <li
                    key={place}
                    className="font-heading flex items-start gap-2 text-sm leading-[1.65] text-forest/85 md:text-[0.9375rem]"
                  >
                    <span className="mt-1.5 text-[#B59A63]" aria-hidden="true">
                      ◆
                    </span>
                    <span>{place}</span>
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
