"use client";

/**
 * Shared helpers for in-page / cross-page hash navigation with Lenis + scrollspy.
 */

export const HASH_NAV_LOCK_MS = 2200;

let lockedUntil = 0;

/** Pause all section scrollspies while a hash navigation is in progress. */
export function lockHashNavigation(ms = HASH_NAV_LOCK_MS) {
  lockedUntil = Math.max(lockedUntil, Date.now() + ms);
}

export function isHashNavigationLocked() {
  return Date.now() < lockedUntil;
}

/**
 * Same-page section jump. Returns true when handled (caller should preventDefault).
 * Cross-page links return false so Next.js can route normally; spies lock on mount.
 */
export function navigateToSectionHash(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const pathOnly = href.slice(0, hashIndex) || window.location.pathname;
  const hash = href.slice(hashIndex);
  if (!hash || hash === "#") return false;

  const onSamePage =
    pathOnly === window.location.pathname ||
    pathOnly === "" ||
    href.startsWith("#");

  if (!onSamePage) {
    // Cross-page deep link — lock early so the destination page spy doesn't steal
    lockHashNavigation();
    return false;
  }

  lockHashNavigation();

  if (window.location.hash === hash) {
    window.dispatchEvent(new Event("hashchange"));
  } else {
    window.history.pushState(null, "", `${pathOnly}${hash}`);
    window.dispatchEvent(new Event("hashchange"));
  }

  return true;
}
