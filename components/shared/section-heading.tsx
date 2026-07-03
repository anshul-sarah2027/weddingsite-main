import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/animations/fade-in";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "default" | "inverse";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "default",
  className,
  children,
}: SectionHeadingProps) {
  const isInverse = variant === "inverse";

  return (
    <FadeIn
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-subtitle mb-4",
            isInverse ? "text-gold-muted" : "text-gold",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-headline",
          isInverse ? "text-ivory" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-body-lg mt-6 text-balance",
            isInverse ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </FadeIn>
  );
}
