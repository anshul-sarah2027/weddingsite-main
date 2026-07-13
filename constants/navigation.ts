import type { NavItem } from "@/types/navigation";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  {
    label: "Info",
    href: "/info",
    children: [
      { label: "Guest Guide", href: "/guest-guide" },
      { label: "Gifts", href: "/gifts" },
      { label: "FAQs", href: "/guest-guide#faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Guest Guide", href: "/guest-guide" },
  { label: "Gifts", href: "/gifts" },
  { label: "FAQs", href: "/guest-guide#faqs" },
  { label: "Contact", href: "/contact" },
  { label: "RSVP", href: "/rsvp" },
];

/** Invitation-style closing navigation — single column, centered */
export const invitationFooterNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Guest Guide", href: "/guest-guide" },
  { label: "Gifts", href: "/gifts" },
  { label: "FAQs", href: "/guest-guide#faqs" },
  { label: "Contact", href: "/contact" },
  { label: "RSVP", href: "/rsvp" },
];
