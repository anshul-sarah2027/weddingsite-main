export const SITE = {
  name: "Sarah & Anshul",
  tagline: "A celebration in Kumarakom",
  description:
    "Join Sarah and Anshul for an unforgettable wedding celebration on the serene backwaters of Kumarakom, Kerala — January 2027.",
  url: "https://anshulandsarah.com",
  locale: "en_IE",
  weddingDate: "2027-01-30",
  /** Single-day format (countdown anchors, etc.) */
  weddingDateDisplay: "30. 01. 2027",
  /** Full weekend phrasing for body / footer copy */
  weddingWeekendDisplay: "30th & 31st January 2027",
  /** Compact two-day lockup for the home hero */
  weddingHeroDateDisplay: "30th & 31st January 2027",
  hashtag: "#PintsandPappadams",
  location: "Kumarakom, Kerala, India",
  couple: {
    groom: "Anshul",
    bride: "Sarah",
    groomFullName: "Anshul Nama",
    brideFullName: "Sarah Ninan",
    /** Brand order — always Sarah first */
    displayName: "Sarah & Anshul",
    displayNamePlain: "Sarah and Anshul",
  },
  contact: {
    sarah: {
      fullName: "Sarah Ninan",
      phoneDisplay: "+353 85 831 4664",
      phoneHref: "tel:+353858314664",
      whatsappHref: "https://wa.me/353858314664",
    },
    anshul: {
      fullName: "Anshul Nama",
      phoneDisplay: "+353 87 168 4811",
      phoneHref: "tel:+353871684811",
      whatsappHref: "https://wa.me/353871684811",
    },
  },
} as const;

export const WEDDING = {
  venue: "Kumarakom Lake Resort",
  region: "Kerala Backwaters",
  timezone: "Asia/Kolkata",
} as const;
