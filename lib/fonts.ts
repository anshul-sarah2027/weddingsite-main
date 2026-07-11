import { Cormorant_Garamond, DM_Sans, EB_Garamond, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const fontHeading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** EB Garamond — editorial labels, dates & quotes (replaces Austin Pen) */
export const fontEditorial = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Bickham Script Pro — invitation-style script for RSVP */
export const fontScript = localFont({
  src: [
    {
      path: "../public/fonts/bickham-script-pro/Bickham Script Pro Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bickham-script-pro/Bickham Script Pro Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/bickham-script-pro/Bickham Script Pro Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-script",
  display: "swap",
});
