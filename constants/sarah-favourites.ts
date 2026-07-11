export type SarahFavourite = {
  id: string;
  label: "Sarah Loves" | "Personal Pick";
  category: string;
  name: string;
  place?: string;
  note: string;
};

export const sarahFavourites: SarahFavourite[] = [
  {
    id: "anokhi",
    label: "Sarah Loves",
    category: "Favourite Shop",
    name: "Anokhi",
    place: "Fort Kochi",
    note: "One of my favourite places to browse beautiful hand block-printed clothing, home textiles and thoughtful gifts. I never leave without discovering something special.",
  },
  {
    id: "sunrise-sup",
    label: "Personal Pick",
    category: "Favourite Morning",
    name: "Sunrise SUP",
    place: "Backwaters, Kochi",
    note: "Watching the sun rise while paddling quietly through the backwaters is one of the most peaceful ways to experience Kerala.",
  },
  {
    id: "sunset-cruise",
    label: "Sarah Loves",
    category: "Favourite Evening",
    name: "Sunset Harbour Cruise",
    place: "Brunton Boatyard",
    note: "A slow cruise across Kochi Harbour as the sun sets behind the Chinese fishing nets. It's one of those evenings you'll remember long after you leave.",
  },
  {
    id: "fort-kochi",
    label: "Personal Pick",
    category: "Favourite Walk",
    name: "Fort Kochi",
    note: "Don't rush. Wander through the old streets, stop for coffee, explore small boutiques and simply enjoy the atmosphere.",
  },
  {
    id: "kathakali",
    label: "Sarah Loves",
    category: "Favourite Performance",
    name: "Kathakali & Kalaripayattu",
    note: "If it's your first visit to Kerala, this is a wonderful introduction to its art, storytelling and martial traditions.",
  },
  {
    id: "backwaters-sunrise",
    label: "Personal Pick",
    category: "Favourite Way to Unwind",
    name: "Sunrise by the Backwaters",
    note: "Sometimes the best plan is no plan at all. Find a quiet spot by the water with a coffee and simply enjoy the peaceful surroundings.",
  },
];
