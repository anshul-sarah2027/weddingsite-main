"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMAGES } from "@/constants/images";
import { SITE, WEDDING } from "@/lib/constants";
import { fontAustinPen } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

/** ~7.8s total: 7s hold + 0.8s dissolve */
const EXIT_AT_MS = 7000;
const EXIT_DURATION = 0.8;

/** Ambient bansuri — begins partway into the track */
const MUSIC_SRC =
  "/kerala/music/boopul-indian-bansuri-flute-tarana-raga-music-525950.mp3";
const MUSIC_START_SEC = 20;
const MUSIC_VOLUME = 0.4;

const TIMING = {
  background: 0.4,
  botanicals: 1.1,
  logo: 1.4,
  hashtag: 2.0,
  divider: 2.5,
  date: 2.8,
} as const;

const BOTANICALS = [
  {
    src: IMAGES.decor.bananaLeaves,
    className: "left-0 top-0 w-56 -translate-x-1/4 -translate-y-1/4 md:w-72",
  },
  {
    src: IMAGES.decor.hangingJasmine,
    className: "right-0 top-0 w-44 translate-x-1/4 -translate-y-1/4 md:w-56",
  },
  {
    src: IMAGES.decor.bananaPlant,
    className: "bottom-0 left-0 w-64 -translate-x-1/3 translate-y-1/4 md:w-80",
  },
  {
    src: IMAGES.decor.lotusCluster,
    className: "right-0 bottom-0 w-48 translate-x-1/4 translate-y-1/4 md:w-64",
  },
] as const;

interface OpeningLoaderProps {
  onExitStart: () => void;
  onComplete: () => void;
}

function FloatingBotanical({
  src,
  className,
  isExiting,
}: {
  src: string;
  className: string;
  isExiting: boolean;
}) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute opacity-[0.05]", className)}
      initial={{ opacity: 0 }}
      animate={
        isExiting
          ? { opacity: 0, y: 0 }
          : { opacity: 0.05, y: [-3, 3] }
      }
      transition={
        isExiting
          ? { duration: EXIT_DURATION, ease: EASE_IN_OUT }
          : {
              opacity: { delay: TIMING.botanicals, duration: 1.4, ease: EASE_OUT },
              y: {
                delay: TIMING.botanicals,
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
            }
      }
      aria-hidden="true"
    >
      <Image src={src} alt="" width={320} height={320} className="h-auto w-full" />
    </motion.div>
  );
}

export function OpeningLoader({ onExitStart, onComplete }: OpeningLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundOnRef = useRef(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      onExitStart();
    }, EXIT_AT_MS);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, EXIT_AT_MS + EXIT_DURATION * 1000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, onExitStart]);

  // Unmute + play; resolves the "sound on" state only on genuine success
  const enableSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || soundOnRef.current) return;

    audio.muted = false;
    audio.volume = MUSIC_VOLUME;
    if (audio.currentTime < MUSIC_START_SEC) {
      audio.currentTime = MUSIC_START_SEC;
    }

    const result = audio.play();
    if (result) {
      result
        .then(() => {
          soundOnRef.current = true;
          setSoundOn(true);
        })
        .catch(() => {
          // Not a valid gesture yet — stay muted and ready for the next one
          audio.muted = true;
        });
    }
  }, []);

  // Start the ambient track at 20s. Browsers require a user gesture before
  // audible playback, so we begin muted autoplay right away, then unmute on the
  // visitor's first real interaction anywhere on the page.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = MUSIC_VOLUME;
    audio.muted = true;

    const seek = () => {
      if (audio.currentTime < MUSIC_START_SEC) {
        audio.currentTime = MUSIC_START_SEC;
      }
    };

    const startMuted = () => {
      seek();
      audio.play().catch(() => undefined);
    };

    if (audio.readyState >= 1) {
      startMuted();
    } else {
      audio.addEventListener("loadedmetadata", startMuted, { once: true });
    }

    const events = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "click",
      "keydown",
    ] as const;

    events.forEach((evt) =>
      window.addEventListener(evt, enableSound, { passive: true }),
    );

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, enableSound));
    };
  }, [enableSound]);

  // Gently fade the music out as the loader dissolves
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isExiting) return;

    const steps = 16;
    const stepMs = (EXIT_DURATION * 1000) / steps;
    const startVolume = audio.volume;
    let current = 0;

    const interval = window.setInterval(() => {
      current += 1;
      const next = startVolume * (1 - current / steps);
      audio.volume = next > 0 ? next : 0;
      if (current >= steps) {
        window.clearInterval(interval);
        audio.pause();
      }
    }, stepMs);

    return () => window.clearInterval(interval);
  }, [isExiting]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center will-change-[opacity,transform]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: isExiting ? EXIT_DURATION : 0.01, ease: EASE_IN_OUT }}
      aria-hidden={isExiting}
      aria-label="Opening invitation"
    >
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" aria-hidden="true" />

      {/* Sound hint — top right */}
      <motion.button
        type="button"
        onClick={enableSound}
        aria-label={soundOn ? "Music playing" : "Tap to play music"}
        className={cn(
          fontAustinPen.className,
          "group absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full border border-[#B59A63]/40 bg-[rgba(250,246,239,0.55)] px-4 py-2 backdrop-blur-sm transition-colors duration-500 hover:border-[#B59A63]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]/40 md:top-7 md:right-7",
        )}
        initial={{ opacity: 0, y: -6 }}
        animate={
          isExiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }
        }
        transition={{
          delay: 0,
          duration: isExiting ? EXIT_DURATION * 0.5 : 0.5,
          ease: EASE_OUT,
        }}
      >
        {/* Note icon with a soft pulse while muted */}
        <motion.span
          className="relative flex h-4 w-4 items-center justify-center text-[#8A6C3A]"
          animate={soundOn ? { scale: 1 } : { scale: [1, 1.18, 1] }}
          transition={
            soundOn
              ? { duration: 0.3 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
          aria-hidden="true"
        >
          {soundOn ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M4 9v6h4l5 4V5L8 9H4z"
                fill="currentColor"
              />
              <path
                d="M16 8.5C17 9.7 17 14.3 16 15.5M18.5 6C20.6 8.4 20.6 15.6 18.5 18"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M9 17.5a2.5 2.5 0 11-2.5-2.5c.55 0 1.06.18 1.47.47V6l9-2v9.5a2.5 2.5 0 11-2.5-2.5c.55 0 1.06.18 1.47.47V6.2L9 7.8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.span>
        <span className="austin-pen-soft text-sm text-[#8A6C3A] md:text-base">
          {soundOn ? "Music on" : "Tap to hear"}
        </span>
      </motion.button>

      {/* Background */}
      <motion.div
        className="absolute inset-0 will-change-[opacity]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{
          delay: isExiting ? 0 : TIMING.background,
          duration: isExiting ? EXIT_DURATION : 0.8,
          ease: EASE_IN_OUT,
        }}
      >
        <Image
          src={IMAGES.heroAlt.invitation}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div
          className="absolute inset-0 bg-[rgba(250,246,239,0.08)]"
          aria-hidden="true"
        />
      </motion.div>

      {/* Botanical atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {BOTANICALS.map((item) => (
          <FloatingBotanical
            key={item.className}
            src={item.src}
            className={item.className}
            isExiting={isExiting}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <motion.div
          className="relative w-full max-w-[280px] will-change-[opacity,transform] sm:max-w-[300px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 1.05 }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            delay: isExiting ? 0 : TIMING.logo,
            duration: isExiting ? EXIT_DURATION : 0.8,
            ease: EASE_OUT,
          }}
        >
          <Image
            src={IMAGES.logo.wedding}
            alt={`${SITE.couple.groom} & ${SITE.couple.bride}`}
            width={440}
            height={200}
            priority
            sizes="(max-width: 640px) 280px, 300px"
            className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[300px]"
          />
        </motion.div>

        <motion.p
          className={cn(
            fontAustinPen.className,
            "austin-pen-soft mt-8 text-xl tracking-[0.08em] text-[#B59A63] md:text-2xl",
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={isExiting ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
          transition={{
            delay: isExiting ? 0 : TIMING.hashtag,
            duration: isExiting ? EXIT_DURATION * 0.6 : 0.7,
            ease: EASE_OUT,
          }}
        >
          {SITE.hashtag}
        </motion.p>

        <motion.div
          className="mt-6 h-px w-20 bg-[#B59A63]/70"
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={
            isExiting
              ? { opacity: 0, scaleX: 0.85 }
              : { opacity: 1, scaleX: 1 }
          }
          transition={{
            delay: isExiting ? 0 : TIMING.divider,
            duration: isExiting ? EXIT_DURATION * 0.5 : 0.6,
            ease: EASE_OUT,
          }}
          aria-hidden="true"
        />

        <motion.div
          className="font-heading mt-6 space-y-1 text-sm leading-relaxed text-forest/85 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{
            delay: isExiting ? 0 : TIMING.date,
            duration: isExiting ? EXIT_DURATION * 0.5 : 0.6,
            ease: EASE_OUT,
          }}
        >
          <p>{SITE.weddingWeekendDisplay}</p>
          <p>{WEDDING.venue}</p>
          <p>Kerala</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
