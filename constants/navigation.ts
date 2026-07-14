import type { NavItem } from "@/types/navigation";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Wedding Weekend",
    href: "/events",
    children: [
      { label: "Venue", href: "/events#kumarakom-lake-resort" },
      { label: "Itinerary", href: "/events#our-wedding-weekend" },
      { label: "Dress Code", href: "/events#dress-code" },
    ],
  },
  {
    label: "Travel & Stay",
    href: "/accommodation",
    children: [
      { label: "Getting there", href: "/accommodation#getting-here" },
      { label: "Accommodation", href: "/accommodation#accommodation" },
      { label: "Tips", href: "/accommodation#tips" },
    ],
  },
  {
    label: "Guest Guide",
    href: "/guest-guide",
    children: [
      { label: "Discover Kerala", href: "/guest-guide#discover-kerala" },
      { label: "Beyond Kerala", href: "/guest-guide#beyond-kerala" },
      {
        label: "International getaways",
        href: "/guest-guide#international-getaways",
      },
      { label: "Travel partners", href: "/guest-guide#travel-partners" },
      {
        label: "Kochi Restaurants / Food",
        href: "/guest-guide#kochi-restaurants",
      },
      {
        label: "Wedding wardrobe guide",
        href: "/guest-guide#wedding-shopping",
      },
    ],
  },
  {
    label: "Info",
    href: "/info",
    children: [
      { label: "Gifts", href: "/gifts" },
      { label: "FAQs", href: "/guest-guide#faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Wedding Weekend", href: "/events" },
  { label: "Venue", href: "/events#kumarakom-lake-resort" },
  { label: "Itinerary", href: "/events#our-wedding-weekend" },
  { label: "Dress Code", href: "/events#dress-code" },
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
  { label: "Venue", href: "/events#kumarakom-lake-resort" },
  { label: "Itinerary", href: "/events#our-wedding-weekend" },
  { label: "Dress Code", href: "/events#dress-code" },
  { label: "Travel & Stay", href: "/accommodation" },
  { label: "Guest Guide", href: "/guest-guide" },
  { label: "Gifts", href: "/gifts" },
  { label: "FAQs", href: "/guest-guide#faqs" },
  { label: "Contact", href: "/contact" },
  { label: "RSVP", href: "/rsvp" },
];
