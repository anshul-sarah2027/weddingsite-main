import type { Metadata } from "next";
import { fontHeading, fontSans } from "@/lib/fonts";
import { baseMetadata } from "@/lib/metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
