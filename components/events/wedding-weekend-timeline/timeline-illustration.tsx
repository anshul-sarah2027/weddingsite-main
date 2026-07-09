"use client";

import { cn } from "@/lib/utils";

interface TimelineIllustrationProps {
  src: string;
  alt: string;
  className?: string;
}

export function TimelineIllustration({
  src,
  alt,
  className,
}: TimelineIllustrationProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[340px] md:max-w-[400px] lg:max-w-[440px]",
        className,
      )}
    >
      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[#B59A63]/6 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full">
        <img
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          decoding="async"
          draggable={false}
          className={cn(
            "h-auto w-full object-contain",
            /* Fade all four edges — horizontal + vertical masks combined */
            "[mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]",
            "[mask-composite:intersect]",
            "[webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]",
            "[webkit-mask-composite:source-in]",
          )}
        />

        {/* Ivory vignette — feathers remaining edges into section background */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_38%,#FAF7F2_100%)] opacity-80"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
