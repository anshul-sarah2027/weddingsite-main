import { ContactPageContent } from "@/components/contact/contact-page-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Get in touch with Sarah Ninan or Anshul Nama about the wedding weekend.",
);

export default function ContactPage() {
  return <ContactPageContent />;
}
