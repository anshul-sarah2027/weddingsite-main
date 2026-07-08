"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import { IMAGES } from "@/constants/images";
import { fontAustinPen } from "@/lib/fonts";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.12;

function RsvpBotanicals() {
  return (
    <>
      {/* Top left — banana leaves */}
      <svg
        className="pointer-events-none absolute top-8 left-4 h-28 w-28 opacity-[0.05] md:top-12 md:left-10 md:h-36 md:w-36"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 95C18 70 28 48 42 32C52 20 64 12 72 8C58 22 48 42 40 62C32 78 24 90 8 95Z"
          fill="#3E5643"
        />
        <path
          d="M20 100C32 78 44 58 58 42C68 30 80 20 92 14C74 32 60 54 48 74C38 88 28 96 20 100Z"
          fill="#3E5643"
        />
        <path
          d="M36 108C46 88 56 68 72 52C80 44 90 38 100 34C86 50 74 68 62 84C54 94 44 102 36 108Z"
          fill="#3E5643"
        />
      </svg>

      {/* Bottom right — lotus outlines */}
      <svg
        className="pointer-events-none absolute right-6 bottom-10 h-24 w-24 opacity-[0.04] md:right-14 md:bottom-14 md:h-32 md:w-32"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="50" cy="58" rx="22" ry="10" stroke="#8A6C3A" strokeWidth="1.2" />
        <path
          d="M50 58C50 42 38 30 28 34C34 26 44 22 50 28C56 22 66 26 72 34C62 30 50 42 50 58Z"
          stroke="#8A6C3A"
          strokeWidth="1.2"
        />
        <path
          d="M50 58C42 48 34 40 26 38M50 58C58 48 66 40 74 38"
          stroke="#8A6C3A"
          strokeWidth="1"
        />
        <path d="M50 58V72" stroke="#8A6C3A" strokeWidth="1.2" />
      </svg>

      {/* Top right — tiny birds */}
      <svg
        className="pointer-events-none absolute top-14 right-8 h-10 w-16 opacity-[0.04] md:top-20 md:right-16"
        viewBox="0 0 64 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 18C12 14 18 12 24 14C20 10 14 8 8 10C10 8 14 6 18 8"
          stroke="#3E5643"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M34 12C40 8 46 6 52 8C48 4 42 2 36 4C38 2 42 0 46 2"
          stroke="#3E5643"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom left — jasmine flowers */}
      <svg
        className="pointer-events-none absolute bottom-12 left-6 h-20 w-20 opacity-[0.04] md:bottom-16 md:left-14 md:h-24 md:w-24"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="28" cy="40" r="3" fill="#FAF7F0" stroke="#8A6C3A" strokeWidth="0.8" />
        <circle cx="40" cy="32" r="3" fill="#FAF7F0" stroke="#8A6C3A" strokeWidth="0.8" />
        <circle cx="52" cy="40" r="3" fill="#FAF7F0" stroke="#8A6C3A" strokeWidth="0.8" />
        <circle cx="48" cy="52" r="3" fill="#FAF7F0" stroke="#8A6C3A" strokeWidth="0.8" />
        <circle cx="32" cy="52" r="3" fill="#FAF7F0" stroke="#8A6C3A" strokeWidth="0.8" />
        <circle cx="40" cy="42" r="2.5" fill="#8A6C3A" opacity="0.5" />
        <path
          d="M40 54V68M36 62H44"
          stroke="#3E5643"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

function RsvpSealButton() {
  return (
    <Link
      href="/rsvp"
      aria-label="Confirm your attendance"
      className="group relative inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C3A]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F0]"
    >
      <span
        className={cn(
          "relative block w-[170px] transition-[transform,box-shadow,filter] duration-[450ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
          "group-hover:scale-105 group-hover:-rotate-1 group-hover:brightness-[1.03]",
          "group-hover:shadow-[0_14px_40px_rgba(62,86,67,0.18)]",
          "sm:w-[200px]",
        )}
      >
        <img
          src={IMAGES.patterns.rsvpSeal}
          alt=""
          width={1254}
          height={1254}
          draggable={false}
          className="relative z-0 block h-auto w-full select-none"
          aria-hidden="true"
        />
        <span
          className={cn(
            fontAustinPen.className,
            "pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-[1.35rem] leading-[1.3] text-[#FAF7F0] sm:text-[1.625rem]",
            "[text-shadow:0_1px_3px_rgba(0,0,0,0.22)]",
          )}
        >
          <span>Confirm</span>
          <span>Your Attendance</span>
        </span>
      </span>
    </Link>
  );
}

export function RsvpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative scroll-mt-32 overflow-hidden pt-4 pb-14 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20"
      aria-label="RSVP"
    >
      {/* Background with subtle parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={reducedMotion ? undefined : { y: backgroundY }}
        >
          <Image
            src={IMAGES.heroAlt.rsvp}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
            priority={false}
            aria-hidden="true"
          />
        </motion.div>
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(250,247,240,0.82),rgba(250,247,240,0.88))]"
          aria-hidden="true"
        />
      </div>

      <RsvpBotanicals />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[720px] flex-col items-center justify-center text-center">
          {/* Illustration */}
          <FadeIn duration={0.8} delay={STAGGER * 0}>
            <motion.div
              className="relative h-[152px] w-[152px] opacity-95 sm:h-[180px] sm:w-[180px]"
              animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={IMAGES.decor.rsvpHeader}
                alt=""
                fill
                sizes="180px"
                className="object-contain"
                aria-hidden="true"
              />
            </motion.div>
          </FadeIn>

          {/* Austin eyebrow */}
          <FadeIn duration={0.8} delay={STAGGER * 1}>
            <p
              className={cn(
                fontAustinPen.className,
                "austin-pen-soft mt-6 text-[1.625rem] text-[#8A6C3A] opacity-95 sm:text-[1.875rem]",
              )}
            >
              One Final Step
            </p>
          </FadeIn>

          {/* Main heading */}
          <FadeIn duration={0.8} delay={STAGGER * 2}>
            <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
              Confirm Your Attendance
            </h2>
          </FadeIn>

          {/* Editorial paragraph */}
          <FadeIn duration={0.8} delay={STAGGER * 3}>
            <p className="font-heading mt-8 mb-[42px] max-w-[90%] text-base leading-[2] text-[rgba(70,70,70,0.82)] sm:max-w-[620px] sm:text-lg">
              We cannot wait to celebrate this unforgettable weekend with the
              people who mean the most to us. If you&apos;ll be joining us in
              Kumarakom, we&apos;d be so grateful if you could let us know by
              confirming your attendance. Your presence will truly make these
              celebrations complete.
            </p>
          </FadeIn>

          {/* Quote */}
          <FadeIn duration={0.8} delay={STAGGER * 4}>
            <blockquote
              className={cn(
                fontAustinPen.className,
                "austin-pen-soft mb-8 text-2xl text-[#A67C3A] opacity-90 sm:mb-9 sm:text-[1.75rem]",
              )}
            >
              &ldquo;The celebration begins with your yes.&rdquo;
            </blockquote>
          </FadeIn>

          {/* Seal */}
          <FadeIn duration={0.8} delay={STAGGER * 5}>
            <RsvpSealButton />
          </FadeIn>

          {/* Deadline */}
          <FadeIn duration={0.8} delay={STAGGER * 6}>
            <p className="font-heading mt-5 text-[0.9375rem] font-medium uppercase tracking-[2.5px] text-[#3E5643]/90 sm:text-sm sm:tracking-[3px]">
              Kindly RSVP by 14 August 2026
            </p>
          </FadeIn>

          {/* Divider */}
          <FadeIn duration={0.8} delay={STAGGER * 7}>
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="mx-auto mt-6 h-auto w-40 opacity-40 md:mt-7 md:w-48"
              aria-hidden="true"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
