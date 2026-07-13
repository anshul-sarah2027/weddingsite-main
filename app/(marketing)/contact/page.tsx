import { ContactPageContent } from "@/components/contact/contact-page-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Get in touch with Anshul Nama or Sarah Ninan about the wedding weekend.",
);

export default function ContactPage() {
  return <ContactPageContent />;
}
