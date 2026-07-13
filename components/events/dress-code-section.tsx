"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Expand, X } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Container } from "@/components/layout/container";
import {
  dressCodeEvents,
  type DressCodeEvent,
  type DressCodeImage,
} from "@/constants/dress-code";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

function downloadFilename(src: string) {
  const decoded = decodeURIComponent(src.split("/").pop() ?? "dress-code.jpeg");
  return decoded.replace(/\s+/g, "-");
}

async function downloadImage(src: string) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFilename(src);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch {
    window.open(src, "_blank", "noopener,noreferrer");
  }
}

function DressImageModal({
  image,
  onClose,
}: {
  image: DressCodeImage;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#2F3A2E]/72 backdrop-blur-[2px]"
        aria-label="Close full image"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-[#FAF7F2]/20 bg-[#FAF7F2] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-3 border-b border-forest/10 px-4 py-3 md:px-5">
          <p className="font-heading truncate text-sm font-medium text-forest md:text-base">
            {image.label ? `${image.label} · ` : ""}
            {image.alt}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => downloadImage(image.src)}
              className="font-heading inline-flex items-center gap-2 rounded-sm border border-[#B59A63]/40 bg-[#B59A63]/10 px-3 py-2 text-sm text-forest transition-colors hover:border-[#B59A63]/60 hover:bg-[#B59A63]/18"
            >
              <Download className="size-4 text-[#B59A63]" aria-hidden="true" />
              Download
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-10 items-center justify-center rounded-sm border border-forest/15 text-forest transition-colors hover:bg-forest/5"
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#F4F1EA] p-3 md:p-5">
          {/* Native img so guests see full resolution without Next crop constraints */}
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[78vh] w-auto max-w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function DressBoard({
  src,
  alt,
  label,
  priority = false,
  compact = false,
  onOpen,
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  compact?: boolean;
  onOpen: () => void;
}) {
  return (
    <figure className={cn("group relative", compact && "mx-auto w-full max-w-md md:mx-0 md:max-w-lg")}>
      {label && (
        <figcaption className="font-editorial text-editorial mb-3 text-center text-lg md:text-left md:text-xl">
          {label}
        </figcaption>
      )}
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full overflow-hidden rounded-sm border border-forest/10 bg-[#FFFCF7] text-left shadow-[0_10px_36px_rgba(45,58,48,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#B59A63]/35 hover:shadow-[0_14px_40px_rgba(45,58,48,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]/40"
        aria-label={`Open full image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1500}
          sizes={compact ? "(max-width: 768px) 90vw, 480px" : "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-sm bg-[#FAF7F2]/92 px-2.5 py-1.5 text-xs tracking-[0.08em] text-forest uppercase opacity-90 shadow-sm backdrop-blur-sm md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
          <Expand className="size-3.5 text-[#B59A63]" aria-hidden="true" />
          View
        </span>
      </button>
    </figure>
  );
}

function DressCodeChapter({
  event,
  index,
  onOpenImage,
}: {
  event: DressCodeEvent;
  index: number;
  onOpenImage: (image: DressCodeImage) => void;
}) {
  const imageOnLeft = index % 2 === 0;
  const isSingle = event.images.length === 1;

  return (
    <FadeIn
      duration={0.8}
      delay={0.04 * index}
      className={cn(
        "relative py-12 md:py-16",
        index !== dressCodeEvents.length - 1 && "border-b border-forest/8",
      )}
    >
      <div
        className={cn(
          "grid items-start gap-10 lg:gap-16",
          isSingle
            ? "md:grid-cols-[1fr_minmax(0,28rem)] md:justify-between"
            : "md:grid-cols-1 lg:grid-cols-[38%_62%]",
          !imageOnLeft && isSingle && "md:[&>*:first-child]:order-2",
        )}
      >
        <div
          className={cn(
            "text-center md:text-left",
            !isSingle && "lg:sticky lg:top-32",
          )}
        >
          <p className="text-caption tracking-[0.18em] text-[#B59A63] uppercase">
            Look {String(index + 1).padStart(2, "0")}
          </p>

          {event.poeticTitle && (
            <p
              className={cn(
            "font-editorial text-editorial mt-4 text-xl md:text-2xl",
              )}
            >
              {event.poeticTitle}
            </p>
          )}

          <h3 className="font-heading mt-3 text-3xl font-medium uppercase tracking-[0.14em] text-forest md:text-4xl">
            {event.name}
          </h3>

          <div className="mx-auto mt-5 h-px w-16 bg-[#B59A63]/40 md:mx-0" />

          <p className="font-heading mx-auto mt-6 max-w-md text-base font-medium leading-[1.9] text-[#2F3A2E]/88 md:mx-0 md:text-lg">
            {event.description}
          </p>

          {event.appliesToNote && (
            <p className="font-editorial text-editorial mt-5 text-base md:text-lg">
              Same dress code/outfit for{" "}
              <span className="font-heading font-bold text-[#2F3A2E]">
                Upanayanam
              </span>{" "}
              and{" "}
              <span className="font-heading font-bold text-[#2F3A2E]">
                Kashi Yatra
              </span>
              .
            </p>
          )}
        </div>

        <div
          className={cn(
            "grid gap-6",
            isSingle ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
          )}
        >
          {event.images.map((image, imageIndex) => (
            <DressBoard
              key={image.src}
              src={image.src}
              alt={image.alt}
              label={image.label}
              priority={index === 0 && imageIndex === 0}
              compact={isSingle}
              onOpen={() => onOpenImage(image)}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export function DressCodeSection() {
  const [activeImage, setActiveImage] = useState<DressCodeImage | null>(null);

  return (
    <section
      id="dress-code"
      className="relative scroll-mt-32 overflow-hidden bg-[#FAF7F2] py-16 md:py-20 lg:py-24"
      aria-label="Dress Code"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `url(${IMAGES.patterns.paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(181,154,99,0.08),transparent_45%),radial-gradient(ellipse_at_80%_90%,rgba(45,74,62,0.05),transparent_40%)]"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center" duration={0.8}>
          <div className="relative mx-auto mb-4 h-16 w-36 md:mb-5 md:h-20 md:w-44">
            <Image
              src={IMAGES.decor.weekendHeader}
              alt=""
              fill
              sizes="176px"
              className="object-contain opacity-85"
              aria-hidden="true"
            />
          </div>

          <p
            className={cn(
            "font-editorial text-editorial text-xl md:text-2xl",
            )}
          >
            What to Wear
          </p>

          <h2 className="font-heading mt-4 text-3xl font-medium uppercase tracking-[0.18em] text-forest md:text-4xl lg:text-5xl">
            Dress Code
          </h2>

          <div className="mx-auto mt-6 flex justify-center md:mt-8">
            <Image
              src={IMAGES.patterns.divider}
              alt=""
              width={1716}
              height={380}
              sizes="200px"
              className="h-auto w-40 opacity-55 md:w-48"
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        <div className="mt-6 md:mt-8">
          {dressCodeEvents.map((event, index) => (
            <DressCodeChapter
              key={event.id}
              event={event}
              index={index}
              onOpenImage={setActiveImage}
            />
          ))}
        </div>
      </Container>

      {activeImage && (
        <DressImageModal
          image={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  );
}
