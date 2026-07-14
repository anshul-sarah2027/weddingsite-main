export type GuideDestination = {
  id: string;
  name: string;
  description: string;
};

export type InternationalDestination = {
  id: string;
  name: string;
  flightTime: string;
  description: string;
};

export type TravelPartner = {
  id: string;
  name: string;
  url: string;
  label: string;
};

export type RestaurantCategory = {
  id: string;
  title: string;
  places: string[];
};

export type DishCategory = {
  id: string;
  title: string;
  dishes: string[];
};

export type ShoppingLink = {
  name: string;
  note?: string;
  url?: string;
};

export type ShoppingGroup = {
  id: string;
  title: string;
  items: ShoppingLink[];
};

export type GuestFaq = {
  id: string;
  question: string;
  paragraphs: string[];
  links?: { label: string; url: string }[];
};

export const beyondKeralaIntro =
  "If you're extending your trip after the wedding, here are a few destinations worth considering.";

export const beyondKeralaDestinations: GuideDestination[] = [
  {
    id: "goa",
    name: "Goa",
    description:
      "Easy domestic flights from Kochi/Bangalore. Great for beaches, nightlife, cafés, luxury stays, and villa experiences.",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    description:
      "Palaces, forts, shopping, heritage hotels, and cultural experiences. January weather is ideal.",
  },
  {
    id: "delhi-agra",
    name: "Delhi + Agra",
    description:
      "Good for first-time India visitors wanting iconic sightseeing including the Taj Mahal. Usually best done with private transport/guided tours.",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    description:
      "Beautiful lakeside city known for luxury heritage hotels, palaces, boat rides, and a slower, more scenic atmosphere compared to larger cities.",
  },
  {
    id: "pondicherry",
    name: "Pondicherry",
    description:
      "French-inspired coastal town with boutique cafés, beachside stays, art spaces, and a quieter relaxed vibe. Works well for guests looking for a peaceful extension trip.",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    description:
      "Best for guests wanting a more cosmopolitan city experience with luxury hotels, nightlife, restaurants, shopping, colonial architecture, and Bollywood culture.",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    description:
      "Good option for food lovers and guests interested in history and architecture. Known for biryani, palaces, old city markets, and luxury stays.",
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep",
    description:
      "A short direct flight from Kochi to a quieter, less touristy alternative to the Maldives, with turquoise lagoons and excellent snorkelling. Requires a permit, so guests interested should plan and apply well ahead of travel.",
  },
];

export const internationalGetaways: InternationalDestination[] = [
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    flightTime: "Around 1 hour 15 minutes direct from Kochi",
    description:
      "Colonial architecture, beaches, and hill country tea estates, an easy and affordable first international stop.",
  },
  {
    id: "maldives",
    name: "Maldives",
    flightTime: "Around 1.5 hours direct from Kochi",
    description:
      "Pure beach and resort relaxation, ideal for guests wanting a quick, low-effort island getaway.",
  },
  {
    id: "thailand",
    name: "Thailand",
    flightTime: "Around 4 to 4.5 hours direct from Kochi",
    description:
      "Bangkok's temples and street food, with easy onward hops to Phuket or Krabi for beaches.",
  },
  {
    id: "singapore",
    name: "Singapore",
    flightTime: "Around 4.5 hours direct from Kochi",
    description:
      "Clean, easy, and English-speaking, great for guests wanting a polished city stop with minimal culture shock.",
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    flightTime: "Around 4 hours direct from Kochi",
    description:
      "Similar appeal to Singapore, generally more affordable, with a strong food and shopping scene.",
  },
  {
    id: "gulf",
    name: "Dubai / Abu Dhabi / Doha",
    flightTime: "Around 3.5 hours direct from Kochi",
    description:
      "Easy, luxury-friendly, and a natural stopover for guests already flying in from Europe or the US.",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    flightTime: "Around 5 to 5.5 hours direct from Kochi to Ho Chi Minh City",
    description:
      "Vibrant food and history, with Hoi An's lantern-lit old town for something quieter.",
  },
];

export const travelPartnersIntro =
  "A few agencies/operators we suggest that guests can directly coordinate with if required:";

export const travelPartners: TravelPartner[] = [
  {
    id: "budget-holidays",
    name: "Budget holidays",
    url: "https://www.instagram.com/budgetholidayz?igsh=MXBqNGFvNjVxOG93Nw==",
    label: "Instagram",
  },
  {
    id: "iris-holidays",
    name: "Iris Holidays",
    url: "https://irisholidays.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnc6NHIcrZjSNiKYfmG5mTPZMkhcw9cXwnI44vzY3i-NsEL1ipwmsyi9l4UnQ_aem_5vsWJhMcUPzgwdRZqw2yDQ",
    label: "Website",
  },
  {
    id: "trips-to-luxury",
    name: "Trips to Luxury",
    url: "https://www.instagram.com/tripstoluxury?igsh=cjVjNHVzb2lpODlo",
    label: "Instagram",
  },
  {
    id: "tentgram",
    name: "Tentgram Trips",
    url: "https://www.instagram.com/tentgramtrips?igsh=MTA2OHZlYmtyZ3B4aQ==",
    label: "Instagram",
  },
  {
    id: "fortune-tours",
    name: "Fortune Tours",
    url: "https://www.instagram.com/fortunetours?igsh=bXRmdmY2djU0Mnln",
    label: "Instagram",
  },
  {
    id: "mas-holidays",
    name: "Mas Holidays Tours and Travels",
    url: "https://www.instagram.com/masholidayz?igsh=bjhna2c4bnZ1dXRh",
    label: "Instagram",
  },
  {
    id: "intersight",
    name: "Intersight Tours and Travels",
    url: "https://www.intersighttours.com/packages/jet-to-kerala/enchanting-kerala-tour",
    label: "Website",
  },
  {
    id: "thomas-cook",
    name: "Thomas Cook",
    url: "https://www.thomascook.in/holidays/india-tour-packages/kerala-tour-packages?src=HODD9-Kerala",
    label: "Website",
  },
];

export const kochiRestaurantCategories: RestaurantCategory[] = [
  {
    id: "cafes",
    title: "Cafés",
    places: [
      "Kashi Art Café",
      "French Toast",
      "Pandhal Café & Deli",
      "Lila Art Cafe",
      "Loving Earth - Vegan / Vegetarian",
      "Coz Café",
      "Loafers Corner Café",
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    places: ["Grana Pizzeria", "Canvas Restaurant & Pizzeria"],
  },
  {
    id: "asian",
    title: "Asian",
    places: [
      "Thai Soul - Sarah's top pick, highly recommend",
      "Tony's Kitchen - Japanese-inspired",
      "Little Soi",
    ],
  },
  {
    id: "bbq",
    title: "BBQ / American",
    places: ["Smoke Culture by Steve"],
  },
  {
    id: "south-indian",
    title: "South Indian",
    places: ["Paragon", "Karthiyayni", "Malabar Junction"],
  },
  {
    id: "sadhya",
    title: "Traditional Kerala Sadhya (Vegetarian Feast)",
    places: [
      "Brindhavan Vegetarian Restaurant",
      "BTH Bharat Hotel",
      "Gokul Oottupura",
      "Saravana Bhavan",
    ],
  },
  {
    id: "north-indian",
    title: "North Indian",
    places: ["Punjab Grill"],
  },
  {
    id: "seafood",
    title: "Seafood & Waterfront",
    places: [
      "The Backwaters, Kochi",
      "Seagull Restaurant",
      "History & Terrace Grill, Brunton Boatyard",
    ],
  },
  {
    id: "hotel-dining",
    title: "Hotel Dining",
    places: [
      "The Malabar, Grand Hyatt Bolgatty",
      "The Rice Boat, Taj Malabar",
      "Raintree, Old Harbour Hotel",
    ],
  },
  {
    id: "bars",
    title: "Bars",
    places: [
      "Velocity",
      "Grand Hyatt Rooftop Bar",
      "Hortus",
      "Watson's Kochi",
      "Plan B",
    ],
  },
  {
    id: "bakeries",
    title: "Bakeries & Desserts",
    places: [
      "Milano",
      "Caravan",
      "Chocolick",
      "Ann's Bakery",
      "Navya Bake Shop, Donut Factory",
    ],
  },
  {
    id: "local",
    title: "Authentic Local Experience",
    places: [
      "Nettoor Toddy Shop – Crab roast, fish head curry, prawns, tapioca dishes",
    ],
  },
];

export const mustTryKerala: DishCategory[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    dishes: [
      "Idli & Sambar",
      "Dosa & Sambar",
      "Puttu & Kadala Curry",
      "Appam & Stew",
      "Idiyappam & Egg/Chicken Curry",
      "Pathiri & Curry",
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    dishes: [
      "Kerala Sadhya (traditional vegetarian feast)",
      "Kerala Fish Curry Meal",
      "Karimeen Pollichathu (Pearl Spot Fish)",
      "Malabar Biryani",
      "Kappa & Meen Curry (Tapioca & Fish Curry)",
      "Beef Roast & Porotta",
    ],
  },
  {
    id: "snacks",
    title: "Snacks",
    dishes: [
      "Banana Chips",
      "Pazham Pori (Banana Fritters)",
      "Unniyappam",
      "Parippu Vada",
      "Kozhukatta",
      "Sukhiyan",
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    dishes: [
      "Ada Pradhaman",
      "Palada Payasam",
      "Elaneer Pudding",
      "Tender Coconut Ice Cream",
    ],
  },
];

export const dietaryPreferences =
  "Most restaurants offer vegetarian options, and many accommodate vegan, gluten-free, and Jain requirements. If you have any allergies or dietary restrictions, it's best to let the restaurant know when ordering.";

export const weddingShoppingGroups: ShoppingGroup[] = [
  {
    id: "womens-ethnic",
    title: "Women's Ethnic Wear",
    items: [
      {
        name: "Koskii (MG Road)",
        note: "Ready-to-wear lehengas, sarees, gowns and festive wear. Ships worldwide",
        url: "https://us.koskii.com/collections/partywear-saree",
      },
      {
        name: "Seematti (MG Road)",
        note: "Sarees, lehengas, gowns, salwar suits, Kerala kasavu collections",
        url: "https://seematti.com/",
      },
      {
        name: "Almarah (by Pulimoottil Silks)",
        note: "Best known for sarees and premium saree materials",
        url: "https://almarahonline.com/",
      },
      {
        name: "Jayalakshmi Silks (MG Road)",
        note: "Sarees, festive wear, kasavu collections, ready-to-wear ethnic outfits",
        url: "https://www.jayalakshmisilks.com/",
      },
      {
        name: "Pothys (MG Road & Edappally)",
        note: "Sarees, lehengas, salwar suits, men's ethnic wear",
        url: "https://www.pothys.com/",
      },
      {
        name: "Kalyan Silks (MG Road & Edappally)",
        note: "Sarees, lehengas, kurtas, salwar suits and festive collections",
        url: "https://www.kalyansilks.com/",
      },
      {
        name: "Milan Design",
        note: "Designer ready-to-wear lehengas, gowns, sarees and Indo-western outfits",
        url: "https://milandesign.in/",
      },
      {
        name: "Paris De Boutique",
        note: "Premium designer lehengas, gowns and festive wear.",
      },
      {
        name: "BIBA",
        note: "Ready-to-wear salwar suits, kurta sets and festive collections",
        url: "https://www.biba.in/row",
      },
      {
        name: "Utsav (MG Road)",
        note: "Ready-made sarees, lehengas, gowns and occasion wear. Ships worldwide",
        url: "https://www.utsavfashion.com/",
      },
      {
        name: "Ready-Made Blouses",
        note: "Seematti, Jayalakshmi Silks, Pothys, Kalyan Silks, Koskii, Utsav (links above)",
      },
    ],
  },
  {
    id: "mens-ethnic",
    title: "Men's Ethnic Wear",
    items: [
      { name: "Tasva (MG Road)", url: "https://www.tasva.com/" },
      { name: "Fabindia", url: "https://www.fabindia.com/" },
      { name: "Manyavar", url: "https://www.manyavar.com/en-gg" },
      {
        name: "M Loft",
        note: "local Kochi boutique, best contacted via Instagram/in-person",
      },
    ],
  },
  {
    id: "kerala-attire",
    title: "Traditional Kerala Attire",
    items: [
      {
        name: "Kasavu Mundu (Men)",
        note: "Kasavu Kada (Fort Kochi — no website, visit in person), also at Seematti, Jayalakshmi Silks, Kalyan Silks, Pothys.",
      },
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    items: [
      { name: "Metro Shoes (MG Road)" },
      { name: "Mochi (MG Road)" },
      {
        name: "Online Stores",
        note: "Metro Shoes, Mochi, Needledust, Kalki Fashion, Aza Fashions, Pernia's Pop-Up Shop, Fabindia, BIBA, Utsav Fashion, Andaaz Fashion, Myntra, Ajio",
      },
    ],
  },
  {
    id: "online",
    title: "Online Stores",
    items: [
      {
        name: "Kalki Fashion",
        note: "Men & Women",
        url: "https://www.kalkifashion.com/",
      },
      {
        name: "Koskii",
        note: "Women only",
        url: "https://us.koskii.com/",
      },
      {
        name: "Aza Fashions",
        note: "Men & Women",
        url: "https://www.azafashions.com/",
      },
      {
        name: "Cbazaar",
        note: "Men & Women",
        url: "https://www.cbazaar.com/uk/",
      },
      {
        name: "Pernia's Pop-Up Shop",
        note: "Men & Women",
        url: "https://www.perniaspopupshop.com/",
      },
      {
        name: "House of Indya",
        note: "Men & Women",
        url: "https://www.houseofindya.com/",
      },
      {
        name: "BIBA",
        note: "Women only",
        url: "https://www.biba.in/row",
      },
      {
        name: "Tasva",
        note: "Men only",
        url: "https://www.tasva.com/",
      },
      {
        name: "Utsav Fashion",
        note: "Men & Women",
        url: "https://www.utsavfashion.com/",
      },
      {
        name: "Myntra",
        note: "Men & Women",
        url: "https://www.myntra.com/",
      },
      { name: "Lashkaraa", url: "https://www.lashkaraa.com/" },
      {
        name: "Andaaz Fashion",
        note: "Men & Women",
        url: "https://www.andaazfashion.com/",
      },
      {
        name: "Inddus",
        note: "Men & Women",
        url: "https://www.inddus.com/",
      },
      {
        name: "Mirraw",
        note: "Men & Women",
        url: "https://www.mirraw.com/",
      },
      {
        name: "Manyavar & Mohey",
        note: "Men & Women (Manyavar = menswear, Mohey = women's line)",
        url: "https://www.manyavar.com/en-gg",
      },
      {
        name: "Fabindia",
        note: "Men & Women",
        url: "https://www.fabindia.com/",
      },
    ],
  },
];

export const shoppingTip = {
  title: "Shopping Tip",
  paragraphs: [
    "Lulu Mall, Kochi — houses Manyavar, BIBA, Koskii, and other Indian and international brands offering ethnic wear, party wear, accessories, footwear, and jewellery under one roof.",
    "If you're arriving in Kerala before the wedding, you're welcome to shop in person too. Just note that a lot of ready-made pieces in India are stitched to fit, so leave a few extra days if you're going this route.",
  ],
  link: {
    label: "lulumall.in",
    url: "https://www.lulumall.in/",
  },
};

export const guestFaqsIntro =
  "For any friends and family with questions, please see below. If there's something we haven't covered, feel free to reach out to Sarah or Anshul directly.";

/** In-page section anchors for Guest Guide scrollspy / deep links */
export const guestGuideSections = [
  { id: "discover-kerala", label: "Discover Kerala" },
  { id: "beyond-kerala", label: "Beyond Kerala" },
  { id: "international-getaways", label: "International" },
  { id: "travel-partners", label: "Travel Partners" },
  { id: "kochi-restaurants", label: "Kochi Restaurants" },
  { id: "must-try-kerala", label: "Must Try" },
  { id: "dietary-preferences", label: "Dietary" },
  { id: "wedding-shopping", label: "Shopping" },
  { id: "faqs", label: "FAQs" },
] as const;

export const guestGuideSectionIds = guestGuideSections.map(
  (section) => section.id,
);
export const guestFaqs: GuestFaq[] = [
  {
    id: "wear",
    question: "What should I wear?",
    paragraphs: [
      "Please check our Schedule page for the dress code for each event, since it varies by day. If you'd like some shopping inspiration, a few websites to browse are listed in the Wedding Attire Shopping section above.",
    ],
    links: [
      { label: "Wedding Weekend · Dress Code", url: "/events#dress-code" },
    ],
  },
  {
    id: "dietary",
    question: "Is there anything specific for dietary requirements?",
    paragraphs: [
      "If you have any dietary needs, please let Sarah/Anshul know ahead of time. There will be vegetarian and vegan options available throughout the weekend.",
    ],
  },
  {
    id: "shoes",
    question: "What about shoes?",
    paragraphs: [
      "Wear whatever feels comfortable. There will be plenty of dancing across both days, so prioritise your feet over anything else.",
    ],
  },
  {
    id: "visa",
    question: "Do I need a visa?",
    paragraphs: [
      "Yes, you'll need to apply for a tourist visa before travelling to India. You'll also need to complete the e-arrival card within 72 hours of arrival. Hotels in India often ask for your passport as ID too.",
    ],
    links: [
      { label: "VISA: indianvisaonline.gov.in", url: "https://indianvisaonline.gov.in" },
      {
        label: "Arrival card: indianvisaonline.gov.in/earrival/",
        url: "https://indianvisaonline.gov.in/earrival/",
      },
    ],
  },
];
