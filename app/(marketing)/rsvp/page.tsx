import { RsvpPageShell } from "@/components/rsvp/rsvp-page-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "RSVP",
  "Confirm your attendance for Anshul and Sarah's wedding in Kumarakom by 14 August 2026.",
);

export default function RsvpPage() {
  return <RsvpPageShell />;
}
