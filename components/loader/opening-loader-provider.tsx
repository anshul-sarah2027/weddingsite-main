"use client";

import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useState, type ReactNode } from "react";
import { OpeningLoader } from "@/components/loader/opening-loader";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STORAGE_KEY = "wedding-opening-loader-seen";
const CONTENT_FADE_DURATION = 0.8;

export function OpeningLoaderProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);

    if (reducedMotion || seen) {
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
    sessionStorage.setItem(STORAGE_KEY, "1");
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
