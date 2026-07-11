"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

interface RsvpButtonProps {
  onHero?: boolean;
  className?: string;
  onClick?: () => void;
}

export function RsvpButton({ className, onClick }: RsvpButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      aria-label="RSVP"
      onClick={() => {
        onClick?.();
        router.push("/rsvp");
      }}
      className={cn(
        "group relative inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7BE79]/50 focus-visible:ring-offset-2",
        className,
      )}
      whileHover={{
        scale: 1.02,
        y: -1,
        transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <span className="relative inline-block w-[200px] min-w-[200px] sm:w-[215px] sm:min-w-[215px]">
        {/* Native img — reliable sizing; Next fill was collapsing to 0×0 */}
        <img
          src={IMAGES.patterns.sealButton}
          alt=""
          width={1672}
          height={941}
          decoding="async"
          draggable={false}
          className="relative z-0 block h-auto w-full select-none"
        />

        <span
          className={cn(
            "font-editorial pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-[1.4rem] tracking-[0.08em] text-[#F7F2E8] transition-colors duration-[450ms] ease-out group-hover:text-[#D7BE79] sm:text-[1.65rem]",
          )}
        >
          Rsvp
        </span>
      </span>
    </motion.button>
  );
}
