import type { WeddingEvent } from "@/types/events";

export const weddingEvents: WeddingEvent[] = [
  {
    id: "welcome",
    name: "Welcome Evening",
    date: "2027-01-14",
    time: "18:00",
    description:
      "A relaxed gathering as our international family arrives — gentle introductions, Kerala cuisine, and the first glimpse of the backwaters at dusk.",
    dressCode: "Resort casual",
    location: "Kumarakom Lake Resort",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    date: "2027-01-15",
    time: "11:00",
    description:
      "An afternoon of colour, music, and intricate henna — a cherished tradition welcoming you into the celebration.",
    dressCode: "Vibrant colours encouraged",
    location: "Resort Gardens",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    date: "2027-01-15",
    time: "19:00",
    description:
      "An evening of dance, laughter, and performances from both families — Irish and Indian rhythms woven together.",
    dressCode: "Festive attire",
    location: "Grand Pavilion",
  },
  {
    id: "wedding",
    name: "Wedding Ceremony",
    date: "2027-01-16",
    time: "10:00",
    description:
      "The sacred union — traditional rituals by the water, surrounded by the people we love most.",
    dressCode: "Traditional or formal",
    location: "Lakeside Mandap",
  },
  {
    id: "reception",
    name: "Reception",
    date: "2027-01-16",
    time: "19:00",
    description:
      "A candlelit evening of fine dining, toasts, and dancing under the Kerala sky.",
    dressCode: "Black tie optional",
    location: "Waterfront Terrace",
  },
];
