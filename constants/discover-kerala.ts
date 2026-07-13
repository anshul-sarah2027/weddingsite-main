export type DestinationHighlight = {
  title: string;
  detail?: string;
  sarahFavourite?: boolean;
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
      { label: "From Kumarakom", value: "Approx. 2 hours | ≈ 50 km" },
      { label: "Recommended", value: "Private Cab" },
    ],
    highlights: [
      {
        title: "Fort Kochi",
        detail:
          "Don't rush. Wander through the old streets, stop for coffee, explore small boutiques and simply enjoy the atmosphere.",
        sarahFavourite: true,
      },
      {
        title: "Anokhi",
        detail:
          "One of my favourite places to browse beautiful hand block-printed clothing, home textiles and thoughtful gifts. I never leave without discovering something special. Fort Kochi.",
        sarahFavourite: true,
      },
      {
        title: "Sunrise SUP",
        detail:
          "Watching the sun rise while paddling quietly through the backwaters is one of the most peaceful ways to experience Kerala.",
        sarahFavourite: true,
      },
      {
        title: "Sunset Harbour Cruise",
        detail:
          "A slow cruise across Kochi Harbour as the sun sets behind the Chinese fishing nets. It's one of those evenings you'll remember long after you leave. Brunton Boatyard.",
        sarahFavourite: true,
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
          "If it's your first visit to Kerala, this is a wonderful introduction to its art, storytelling and martial traditions.",
        sarahFavourite: true,
      },
      {
        title: "Sunrise by the Backwaters",
        detail:
          "Sometimes the best plan is no plan at all. Find a quiet spot by the water with a coffee and simply enjoy the peaceful surroundings.",
        sarahFavourite: true,
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
