import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn("container-editorial py-4", className)}
      aria-hidden="true"
    >
      <div className="mx-auto h-px w-16 bg-gold/40" />
    </div>
  );
}
