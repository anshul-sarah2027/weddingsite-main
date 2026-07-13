"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import {
  shoppingTip,
  weddingShoppingGroups,
} from "@/constants/guest-guide";
import { cn } from "@/lib/utils";

function StoreName({
  name,
  url,
}: {
  name: string;
  url?: string;
}) {
  if (!url) {
    return (
      <span className="font-heading text-lg font-semibold text-[#B59A63] md:text-xl">
        {name}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-heading inline-flex items-center gap-1.5 text-lg font-semibold text-[#B59A63] transition-colors hover:text-forest md:text-xl"
    >
      {name}
      <ExternalLink className="size-3.5 text-[#B59A63]" aria-hidden="true" />
    </a>
  );
}

export function WeddingShopping() {
  return (
    <GuideSection
      id="wedding-shopping"
      ariaLabel="Wedding Attire Shopping"
      eyebrow="Dressing for the Celebrations"
      title="Wedding Attire Shopping"
      tone="sage"
    >
      <div className="space-y-10 md:space-y-12">
        {weddingShoppingGroups.map((group, index) => (
          <FadeIn key={group.id} duration={0.6} delay={0.03 * index}>
            <h3 className="font-heading text-xl font-medium text-forest md:text-2xl">
              {group.title}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <GuideCard key={`${group.id}-${item.name}`}>
                  <StoreName name={item.name} url={item.url} />
                  {item.note && (
                    <p className="font-heading mt-2.5 text-base font-medium leading-[1.7] text-[#2F3A2E]/85 md:text-[1.05rem]">
                      {item.note}
                    </p>
                  )}
                </GuideCard>
              ))}
            </div>
          </FadeIn>
        ))}

        <FadeIn duration={0.65} delay={0.1}>
          <GuideCard>
            <h3 className="font-heading text-xl font-medium text-forest md:text-2xl">
              {shoppingTip.title}
            </h3>
            <div className="mt-4 space-y-3">
              {shoppingTip.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-heading text-sm leading-[1.85] text-forest/65 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href={shoppingTip.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-heading mt-4 inline-flex items-center gap-1.5 text-sm text-[#B59A63] transition-colors hover:text-forest md:text-base",
              )}
            >
              {shoppingTip.link.label}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </GuideCard>
        </FadeIn>
      </div>
    </GuideSection>
  );
}
