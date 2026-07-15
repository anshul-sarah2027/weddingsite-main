"use client";

import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useState, type ReactNode } from "react";
import { OpeningLoader } from "@/components/loader/opening-loader";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Set once per tab after the loader finishes — skip on in-site navigations. */
const SEEN_KEY = "wedding-opening-loader-seen";
/** Set on password unlock so the loader always plays when entering the site. */
export const LOADER_PENDING_KEY = "wedding-opening-loader-pending";
const CONTENT_FADE_DURATION = 0.8;

export function OpeningLoaderProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const pending = sessionStorage.getItem(LOADER_PENDING_KEY) === "1";
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";

    // Always play after unlock; otherwise once per tab for returning guests.
    const shouldShow = !reducedMotion && (pending || !seen);

    if (!shouldShow) {
      setShowLoader(false);
      setContentVisible(true);
      setReady(true);
      return;
    }

    setShowLoader(true);
    setContentVisible(false);
    document.documentElement.style.overflow = "hidden";
    setReady(true);

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [reducedMotion]);

  const handleExitStart = useCallback(() => {
    setContentVisible(true);
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.removeItem(LOADER_PENDING_KEY);
    sessionStorage.setItem(SEEN_KEY, "1");
    setShowLoader(false);
    document.documentElement.style.overflow = "";
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#faf6ef]" aria-hidden="true" />
    );
  }

  return (
    <>
      {showLoader && (
        <OpeningLoader
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}
      <motion.div
        className="flex flex-col will-change-[opacity]"
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{
          duration: showLoader ? CONTENT_FADE_DURATION : 0,
          ease: [0.42, 0, 0.58, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
