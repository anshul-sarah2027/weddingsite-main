"use client";

import { useEffect } from "react";
import {
  HASH_NAV_LOCK_MS,
  isHashNavigationLocked,
  lockHashNavigation,
} from "@/lib/hash-navigation";

type UseSectionScrollSpyOptions = {
  /**
   * Optional parent section. When a child isn't dominant but the parent
   * is still in view, we set `fallbackHash` (e.g. "#dress-code").
   */
  parentId?: string;
  fallbackHash?: string;
  /**
   * Only clear the URL hash when it matches one of these prefixes
   * (defaults to managed section ids).
   */
  managedHashPrefixes?: string[];
};

/**
 * Keeps the URL hash in sync with whichever section is in view.
 * Uses replaceState so Lenis hash scrolling is not re-triggered.
 */
export function useSectionScrollSpy(
  sectionIds: readonly string[],
  options: UseSectionScrollSpyOptions = {},
) {
  const { parentId, fallbackHash, managedHashPrefixes } = options;

  useEffect(() => {
    if (!sectionIds.length) return;

    const sectionEls = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sectionEls.length) return;

    const parentEl = parentId ? document.getElementById(parentId) : null;
    const managedIds = new Set(sectionIds);
    const prefixes =
      managedHashPrefixes ??
      (fallbackHash ? [fallbackHash.replace(/^#/, "")] : sectionIds);

    const isManagedHash = (hash: string) => {
      if (!hash.startsWith("#")) return false;
      const id = hash.slice(1);
      if (managedIds.has(id)) return true;
      if (fallbackHash && hash === fallbackHash) return true;
      return prefixes.some(
        (prefix) =>
          id === prefix || id.startsWith(`${prefix}-`) || id.startsWith(prefix),
      );
    };

    const ratios = new Map<string, number>();
    let localLockedUntil = 0;

    const lockSpy = () => {
      lockHashNavigation(HASH_NAV_LOCK_MS);
      localLockedUntil = Date.now() + HASH_NAV_LOCK_MS;
    };

    // Deep link / nav click: lock for ANY landing hash so sibling spies
    // (e.g. venue spy vs dress-code spy) cannot steal the target.
    if (window.location.hash && window.location.hash !== "#") {
      lockSpy();
    }

    window.addEventListener("hashchange", lockSpy);

    const notifyHashChange = () => {
      window.dispatchEvent(new Event("locationhashchange"));
    };

    const writeHash = (nextHash: string, strength = 1) => {
      const current = window.location.hash;
      if (current === nextHash) return;

      // Another spy / deep-link owns this hash — only strong takeovers allowed
      if (current && !isManagedHash(current)) {
        if (!nextHash || !isManagedHash(nextHash) || strength < 0.4) {
          return;
        }
      }

      if (!nextHash) {
        if (isManagedHash(current)) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
          notifyHashChange();
        }
        return;
      }

      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${nextHash}`,
      );
      notifyHashChange();
    };

    const parentInView = () => {
      if (!parentEl) return false;
      const rect = parentEl.getBoundingClientRect();
      return (
        rect.top < window.innerHeight * 0.65 &&
        rect.bottom > window.innerHeight * 0.2
      );
    };

    const isLocked = () =>
      isHashNavigationLocked() || Date.now() < localLockedUntil;

    const syncFromRatios = () => {
      if (isLocked()) return;

      let bestId: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId && bestRatio >= 0.08) {
        writeHash(`#${bestId}`, bestRatio);
        return;
      }

      if (parentEl && fallbackHash && parentInView()) {
        writeHash(fallbackHash, 0.5);
        return;
      }

      // No dominant intersection — pick the section nearest the reading line
      if (!parentEl) {
        let nearestId: string | null = null;
        let nearestDist = Number.POSITIVE_INFINITY;
        const targetY = window.innerHeight * 0.28;

        for (const el of sectionEls) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 100 || rect.top > window.innerHeight - 40) continue;
          const dist = Math.abs(rect.top - targetY);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestId = el.id;
          }
        }

        if (nearestId) {
          // Weak nearest-match — never steal a foreign deep-link hash
          writeHash(`#${nearestId}`, 0.2);
          return;
        }

        writeHash("");
        return;
      }

      writeHash("");
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        syncFromRatios();
      },
      {
        root: null,
        rootMargin: "-22% 0px -48% 0px",
        threshold: [0, 0.08, 0.2, 0.35, 0.5, 0.75, 1],
      },
    );

    for (const el of sectionEls) sectionObserver.observe(el);

    let parentObserver: IntersectionObserver | null = null;
    if (parentEl) {
      parentObserver = new IntersectionObserver(() => syncFromRatios(), {
        root: null,
        threshold: [0, 0.05, 0.15],
      });
      parentObserver.observe(parentEl);
    }

    return () => {
      sectionObserver.disconnect();
      parentObserver?.disconnect();
      window.removeEventListener("hashchange", lockSpy);
    };
    // sectionIds is a stable const array from callers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId, fallbackHash]);
}
