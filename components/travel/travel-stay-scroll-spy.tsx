"use client";

import { travelStaySectionIds } from "@/constants/travel-stay";
import { useSectionScrollSpy } from "@/hooks/use-section-scroll-spy";

/** Syncs /accommodation URL hash with the section currently in view. */
export function TravelStayScrollSpy() {
  useSectionScrollSpy(travelStaySectionIds, {
    managedHashPrefixes: [...travelStaySectionIds],
  });

  return null;
}
