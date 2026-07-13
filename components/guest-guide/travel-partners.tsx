"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import { travelPartners, travelPartnersIntro } from "@/constants/guest-guide";

export function TravelPartners() {
  return (
    <GuideSection
      id="travel-partners"
      ariaLabel="Recommended Travel Partners"
      eyebrow="Planning Help"
      title="Recommended Travel Partners"
      intro={travelPartnersIntro}
      tone="sage"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {travelPartners.map((partner, index) => (
          <FadeIn key={partner.id} duration={0.55} delay={0.03 * index}>
            <GuideCard className="h-full">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-3"
              >
                <div>
                  <h3 className="font-heading text-base font-medium text-forest transition-colors group-hover:text-[#B59A63] md:text-lg">
                    {partner.name}
                  </h3>
                  <p className="font-heading mt-1.5 text-sm text-forest/50">
                    {partner.label}
                  </p>
                </div>
                <ExternalLink
                  className="mt-1 size-4 shrink-0 text-[#B59A63]"
                  aria-hidden="true"
                />
              </a>
            </GuideCard>
          </FadeIn>
        ))}
      </div>
    </GuideSection>
  );
}
