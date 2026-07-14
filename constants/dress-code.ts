export type DressCodeImage = {
  src: string;
  alt: string;
  label?: string;
};

export type DressCodeEvent = {
  id: string;
  name: string;
  poeticTitle?: string;
  appliesToNote?: string;
  description: string;
  images: DressCodeImage[];
};

export const dressCodeEvents: DressCodeEvent[] = [
  {
    id: "nichayathartam",
    name: "Nichayathartam",
    description:
      "Traditional Indian attire. (For women - sarees, half sarees, salwar suits, or anarkalis). (For men- kurta, or a veshtti / mundu). Any colour welcome except black.",
    images: [
      {
        src: "/dresscode/Nichayathartam(Both%20Menandwomen).jpeg",
        alt: "Nichayathartam dress code inspiration for men and women",
      },
    ],
  },
  {
    id: "baraat-sangeet",
    name: "Baarat & Sangeet",
    poeticTitle: "An Evening in Marigold",
    description:
      "Festive and colourful. Think bright, bold, and fun. For women, lehenga, saree, sharara or gharara set, or Indo-western gown. For men, kurta, sherwani.",
    images: [
      {
        src: "/dresscode/Sangeet(women).jpeg",
        alt: "Sangeet dress code inspiration for women",
        label: "Women",
      },
      {
        src: "/dresscode/Sangeet(Men).jpeg",
        alt: "Sangeet dress code inspiration for men",
        label: "Men",
      },
    ],
  },
  {
    id: "muhurtham",
    name: "Muhurtham",
    poeticTitle: "Where the Backwaters Turn to Gold",
    appliesToNote: "Same dress code/outfit for Upanayanam and Kashi Yatra.",
    description:
      "For women, sarees only, in pastel pink, blush pink, dusty lilac, lavender, or powder blue. We kindly ask women to avoid gold or black. For men, kurta, veshti, or mundu, in gold or cream tones.",
    images: [
      {
        src: "/dresscode/Muhurtham(women).jpeg",
        alt: "Muhurtham dress code inspiration for women",
        label: "Women",
      },
      {
        src: "/dresscode/Muhurtham(men).jpeg",
        alt: "Muhurtham dress code inspiration for men",
        label: "Men",
      },
    ],
  },
  {
    id: "reception",
    name: "Reception",
    poeticTitle: "Under a Thousand Lights",
    description:
      "Elegant evening wear. For women, evening gowns or dressy sarees. Kindly avoid white or cream. For men, suit or tuxedo.",
      
    images: [
      {
        src: "/dresscode/Reception(Women).jpeg",
        alt: "Reception dress code inspiration for women",
        label: "Women",
      },
      {
        src: "/dresscode/Reception(men).jpeg",
        alt: "Reception dress code inspiration for men",
        label: "Men",
      },
    ],
  },
];

/** Timeline event ids that should link guests to the Dress Code section */
export const timelineEventsWithDressCode = new Set([
  "nichayathartham",
  "baraat",
  "sangeet",
  "upanayanam",
  "kashi-yatra",
  "muhurtham",
  "reception",
]);

/**
 * Maps a wedding-weekend timeline event id → dress-code chapter id.
 * Several ceremonies share one look (e.g. Baraat + Sangeet).
 */
export const timelineToDressCodeId: Record<string, string> = {
  nichayathartham: "nichayathartam",
  baraat: "baraat-sangeet",
  sangeet: "baraat-sangeet",
  upanayanam: "muhurtham",
  "kashi-yatra": "muhurtham",
  muhurtham: "muhurtham",
  reception: "reception",
};

export function dressCodeAnchorId(dressCodeEventId: string) {
  return `dress-code-${dressCodeEventId}`;
}

/** Hash href for a timeline event’s matching dress-code chapter */
export function getTimelineDressCodeHref(timelineEventId: string): string | null {
  const dressCodeId = timelineToDressCodeId[timelineEventId];
  if (!dressCodeId) return null;
  return `#${dressCodeAnchorId(dressCodeId)}`;
}