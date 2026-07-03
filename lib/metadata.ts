import type { Metadata } from "next";
import { SITE } from "./constants";

export const baseMetadata: Metadata = {
  title: {
    default: `${SITE.name} | Wedding in Kumarakom`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} — Kumarakom, Kerala`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Kumarakom, Kerala`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function createPageMetadata(
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    description: description ?? SITE.description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: description ?? SITE.description,
    },
  };
}
