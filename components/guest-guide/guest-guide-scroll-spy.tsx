"use client";

import { guestGuideSectionIds } from "@/constants/guest-guide";
import { useSectionScrollSpy } from "@/hooks/use-section-scroll-spy";

/** Syncs /guest-guide URL hash with the section currently in view. */
export function GuestGuideScrollSpy() {
  useSectionScrollSpy(guestGuideSectionIds, {
    managedHashPrefixes: [...guestGuideSectionIds],
  });

  return null;
}
