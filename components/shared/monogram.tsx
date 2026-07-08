import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  /** light = ivory monogram for dark backgrounds; dark = forest monogram for light backgrounds */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-28",
  md: "size-36 md:size-40",
  lg: "size-44",
} as const;

export function Monogram({
  className,
  variant = "dark",
  size = "md",
}: MonogramProps) {
  const src = variant === "light" ? IMAGES.logo.light : IMAGES.logo.dark;

  return (
    <span
      className={cn("relative inline-block shrink-0", sizeClasses[size], className)}
    >
      <Image
        src={src}
        alt={SITE.name}
        fill
        sizes="160px"
        className="object-contain"
        priority
      />
    </span>
  );
}
