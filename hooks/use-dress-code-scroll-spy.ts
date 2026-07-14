"use client";

import {
  dressCodeAnchorId,
  dressCodeEvents,
} from "@/constants/dress-code";
import { useSectionScrollSpy } from "@/hooks/use-section-scroll-spy";

/**
 * Keeps the URL hash in sync with the dress-code chapter in view.
 */
export function useDressCodeScrollSpy() {
  useSectionScrollSpy(
    dressCodeEvents.map((event) => dressCodeAnchorId(event.id)),
    {
      parentId: "dress-code",
      fallbackHash: "#dress-code",
      managedHashPrefixes: ["dress-code"],
    },
  );
}
