import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export function QuoteBlock({ quote, attribution, className }: QuoteBlockProps) {
  return (
    <FadeIn className={cn("max-w-3xl", className)}>
      <blockquote>
        <p className="text-editorial text-foreground/90">&ldquo;{quote}&rdquo;</p>
        {attribution && (
          <footer className="text-caption text-muted-foreground mt-6">
            — {attribution}
          </footer>
        )}
      </blockquote>
    </FadeIn>
  );
}
