import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function EditorialLink({ href, children, className }: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-caption tracking-widest uppercase text-forest transition-colors hover:text-gold",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
