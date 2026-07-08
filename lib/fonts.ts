import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const fontHeading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Austin Pen Bold — hero date & venue script */
export const fontAustinPen = localFont({
  src: "../public/fonts/austin pen/austin-pen-bold.ttf",
  variable: "--font-austin-pen",
  weight: "700",
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
