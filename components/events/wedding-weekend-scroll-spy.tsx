"use client";

import { weddingWeekendScrollSpyIds } from "@/constants/wedding-weekend";
import { useSectionScrollSpy } from "@/hooks/use-section-scroll-spy";

/** Syncs /events URL hash for Venue + Itinerary as you scroll. */
export function WeddingWeekendScrollSpy() {
  useSectionScrollSpy(weddingWeekendScrollSpyIds, {
    managedHashPrefixes: [...weddingWeekendScrollSpyIds],
  });

  return null;
}
