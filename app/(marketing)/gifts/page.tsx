import { GiftsPageContent } from "@/components/gifts/gifts-page-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Gifts",
  "Your presence is the greatest gift. If you'd like to give something, you can contribute via Paypal or Revolut.",
);

export default function GiftsPage() {
  return <GiftsPageContent />;
}
