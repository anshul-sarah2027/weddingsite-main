import type { NavItem } from "@/types/navigation";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  {
    label: "Info",
    href: "/info",
    children: [
      { label: "Save the Date", href: "/save-the-date" },
      { label: "Guest Guide", href: "/guest-guide" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Save the Date", href: "/save-the-date" },
  { label: "Guest Guide", href: "/guest-guide" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
  { label: "RSVP", href: "/rsvp" },
];

/** Invitation-style closing navigation — single column, centered */
export const invitationFooterNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Save the Date", href: "/save-the-date" },
  { label: "Guest Guide", href: "/guest-guide" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
  { label: "RSVP", href: "/rsvp" },
];
