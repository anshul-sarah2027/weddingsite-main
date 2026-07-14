"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `window.location.hash`, including updates from scrollspy
 * `history.replaceState` (via the `locationhashchange` event).
 */
export function useLocationHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("locationhashchange", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("locationhashchange", sync);
    };
  }, []);

  return hash;
}

/** Whether a nav href (path or path#hash) matches the current location. */
export function isHashNavActive(
  href: string,
  pathname: string,
  hash: string,
) {
  const [pathOnly = href, hrefHash = ""] = href.split("#");
  if (pathname !== pathOnly && !pathname.startsWith(`${pathOnly}/`)) {
    return false;
  }
  if (!hrefHash) {
    return !hash || hash === "#";
  }
  const target = `#${hrefHash}`;
  if (hash === target) return true;
  // Parent section hash: dress-code matches dress-code-*
  return hash.startsWith(`${target}-`);
}
