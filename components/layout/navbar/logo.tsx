"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { fontAustinPen } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface LogoProps {
  onHero?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Logo({ onHero = false, className, onClick }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);

  useEffect(() => {
    setHoverEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const showHashtag = hoverEnabled && hovered;

  return (
    <div
      className={cn("relative inline-flex shrink-0 items-center", className)}
      onMouseEnter={() => hoverEnabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href="/"
        onClick={onClick}
        className="relative block cursor-pointer"
        aria-label="Go to Home"
      >
        <div className="relative flex size-32 items-center justify-center md:size-36">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: showHashtag ? 0 : 1,
              y: 0,
            }}
            transition={{
              opacity: { duration: showHashtag ? 0.35 : 0.45, ease: "easeOut" },
              y: { duration: 0.7, ease: [0, 0, 0.2, 1] },
            }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden={showHashtag}
          >
            <Image
              src={IMAGES.logo.main}
              alt="Anshul & Sarah Wedding"
              width={1254}
              height={1254}
              sizes="(max-width: 768px) 128px, 144px"
              className={cn(
                "h-auto w-[128px] object-contain transition-[filter] duration-500 ease-out md:w-[144px]",
                onHero && "brightness-0 invert",
              )}
              priority
            />
          </motion.div>

          {/* Hashtag — replaces logo on hover */}
          <span
            className={cn(
              fontAustinPen.className,
              "absolute inset-0 flex items-center justify-center whitespace-nowrap text-center text-[19px] leading-none tracking-[0.02em] transition-[opacity,color] duration-500 ease-out md:text-[24px]",
              onHero ? "text-ivory" : "text-[#A98B5E]",
              showHashtag ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={!showHashtag}
          >
            {SITE.hashtag}
          </span>
        </div>
      </Link>
    </div>
  );
}
