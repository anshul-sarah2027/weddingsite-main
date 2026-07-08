import type { NavItem } from "@/types/navigation";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  {
    label: "Info",
    href: "/info",
    children: [
      { label: "Save the Date", href: "/save-the-date" },
      { label: "Guest Guide", href: "/guest-guide" },
      { label: "Wedding Menu", href: "/menu" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNavigation: NavItem[] = [
  { label: "Our Story", href: "/about" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Explore Kerala", href: "/explore" },
  { label: "Venue", href: "/venue" },
  { label: "RSVP", href: "/rsvp" },
];

/** Invitation-style closing navigation — single column, centered */
export const invitationFooterNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "FAQ", href: "/faqs" },
  { label: "RSVP", href: "/rsvp" },
];
