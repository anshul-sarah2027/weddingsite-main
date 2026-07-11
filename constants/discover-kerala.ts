export type DestinationHighlight = {
  title: string;
  detail?: string;
};

export type TravelFact = {
  label: string;
  value: string;
};

export type KeralaDestination = {
  id: string;
  chapter: string;
  name: string;
  subtitle: string;
  illustration: string;
  story: string;
  travel: TravelFact[];
  highlights: DestinationHighlight[];
  /** Image on left when true */
  imageLeft: boolean;
  featured?: boolean;
};

export const keralaDestinations: KeralaDestination[] = [
  {
    id: "kochi",
    chapter: "01",
    name: "Kochi",
    subtitle: "The Cultural Heart of Kerala",
    illustration: "/kerala/images/kochi.png",
    imageLeft: true,
    featured: true,
    story:
      "Wander through colonial streets lined with cafés, art galleries, spice markets and beautiful heritage buildings. Kochi is best explored slowly — whether you're shopping in Fort Kochi, enjoying a sunset cruise across the harbour, or discovering Kerala's rich cultural traditions.",
    travel: [
      { label: "From Kumarakom", value: "Approx. 2 hours" },
      { label: "Best Way", value: "Private Cab / Hotel Transport" },
      { label: "Local Option", value: "Train · Kottayam → Ernakulam" },
    ],
    highlights: [
      {
        title: "Fort Kochi",
        detail:
          "Colonial streets, cafés, boutiques and seaside walks. Shop Princess Street for antiques and handicrafts.",
      },
      {
        title: "Mattancherry & Jew Town",
        detail:
          "Spice markets, antique stores, the Paradesi Synagogue and heritage buildings.",
      },
      {
        title: "Kochi Water Metro",
        detail:
          "India's first water metro — scenic electric boats across the backwaters (₹20–40).",
      },
      {
        title: "Kerala Folklore Museum",
        detail:
          "Traditional art, architecture, costumes and cultural history in one place.",
      },
      {
        title: "Cherai Beach",
        detail:
          "Around 1–1.5 hours from the city — cleaner, calmer, ideal for a half-day visit.",
      },
      {
        title: "Lulu Mall",
        detail:
          "Shopping, food, essentials and SIM cards — handy after international travel.",
      },
      {
        title: "Kathakali & Kalaripayattu",
        detail:
          "Evening performances at Fort Kochi cultural centres — wonderful for first-time visitors.",
      },
    ],
  },
  {
    id: "munnar",
    chapter: "02",
    name: "Munnar",
    subtitle: "Into the Tea Hills",
    illustration: "/kerala/images/munnar.png",
    imageLeft: false,
    story:
      "Rolling tea plantations, cool mountain air and peaceful luxury resorts make Munnar the perfect place to unwind after the celebrations.",
    travel: [
      { label: "From Kumarakom", value: "Approx. 4.5–5.5 hours" },
      { label: "Recommended", value: "Private Cab" },
    ],
    highlights: [
      { title: "Tea Plantations" },
      { title: "Cooler Climate" },
      { title: "Luxury Nature Resorts" },
      { title: "Waterfalls" },
      { title: "Mountain Viewpoints" },
      { title: "Relaxed Hill Atmosphere" },
    ],
  },
  {
    id: "varkala",
    chapter: "03",
    name: "Varkala",
    subtitle: "Where the Cliffs Meet the Sea",
    illustration: "/kerala/images/varkala.png",
    imageLeft: true,
    story:
      "Cliffside cafés, golden sunsets and a relaxed beach culture make Varkala perfect for anyone looking to slow down after the wedding.",
    travel: [
      { label: "From Kumarakom", value: "Approx. 4–5 hours" },
      { label: "Recommended", value: "Private Cab" },
    ],
    highlights: [
      { title: "Cliffside Cafés" },
      { title: "Yoga" },
      { title: "Surfing" },
      { title: "Beach Resorts" },
      { title: "Wellness" },
      { title: "International Atmosphere" },
    ],
  },
  {
    id: "kovalam",
    chapter: "04",
    name: "Kovalam",
    subtitle: "A Classic Coastal Escape",
    illustration: "/kerala/images/kovalam.png",
    imageLeft: false,
    story:
      "Calm beaches, luxury resorts and spa retreats make Kovalam a wonderful choice for families or anyone looking for a peaceful seaside stay.",
    travel: [
      { label: "From Kumarakom", value: "Approx. 4–4.5 hours" },
      { label: "Recommended", value: "Private Cab or Train + Short Drive" },
    ],
    highlights: [
      { title: "Resort Beaches" },
      { title: "Spa Retreats" },
      { title: "Family Friendly" },
      { title: "Trivandrum Day Trip" },
      { title: "Luxury Hotels" },
    ],
  },
];
