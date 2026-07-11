export type HotelCategory = "Luxury" | "Boutique & Heritage" | "Mid-range" | "Mid-tier";

export interface HotelListing {
  id: string;
  name: string;
  category: HotelCategory;
  website: string;
  /** Path under /public/hotels — optional; monogram used as fallback */
  logo?: string;
  monogram: string;
}

export interface HotelGroup {
  id: string;
  label: string;
  hotels: HotelListing[];
}

export const weddingVenue = {
  name: "Kumarakom Lake Resort",
  badge: "Wedding Venue",
  description:
    "Set on the edge of Vembanad Lake, Kumarakom Lake Resort is surrounded by coconut groves, paddy fields, and the quiet backwaters that Kerala is known for. It's a place where nature does most of the talking — calm waters, swaying palms, and views that change colour with the time of day — making it the perfect backdrop for these two days.",
  mapsUrl: "https://maps.app.goo.gl/DSu5W2zY3zqcuPaT9",
  website: "https://www.kumarakomlakeresort.in/",
  address: "Kumarakom Lake Resort, Kumarakom, Kerala",
  images: {
    primary: "/venueKerela/SPN05850.jpg",
    secondary: "/venueKerela/SPN05912.jpg",
  },
} as const;

export const kochiStayGroups: HotelGroup[] = [
  {
    id: "kochi-luxury",
    label: "Luxury Hotels",
    hotels: [
      {
        id: "taj-malabar",
        name: "Taj Malabar Resort & Spa",
        category: "Luxury",
        website: "https://www.tajhotels.com/en-in/hotels/taj-malabar-cochin",
        logo: "/hotels/taj.svg",
        monogram: "TJ",
      },
      {
        id: "grand-hyatt",
        name: "Grand Hyatt Kochi Bolgatty",
        category: "Luxury",
        website: "https://www.booking.com/hotel/in/grand-hyatt-kochi-bolgatty.html",
        logo: "/hotels/hyatt.png",
        monogram: "GH",
      },
      {
        id: "brunton",
        name: "Brunton Boatyard",
        category: "Luxury",
        website: "https://www.cghearth.com/brunton-boatyard",
        logo: "/hotels/cgh.png",
        monogram: "BB",
      },
    ],
  },
  {
    id: "kochi-boutique",
    label: "Boutique & Heritage",
    hotels: [
      {
        id: "old-harbour",
        name: "Old Harbour Hotel",
        category: "Boutique & Heritage",
        website: "https://www.booking.com/hotel/in/old-harbour.html",
        logo: "/hotels/oldharbour.png",
        monogram: "OH",
      },
      {
        id: "malabar-house",
        name: "Malabar House",
        category: "Boutique & Heritage",
        website: "https://www.booking.com/hotel/in/the-malabar-house.html",
        logo: "/hotels/malabar.png",
        monogram: "MH",
      },
      {
        id: "forte-kochi",
        name: "Forte Kochi",
        category: "Boutique & Heritage",
        website: "https://www.booking.com/hotel/in/forte-kochi.html",
        logo: "/hotels/forte.png",
        monogram: "FK",
      },
      {
        id: "eighth-bastion",
        name: "Eighth Bastion",
        category: "Boutique & Heritage",
        website: "https://www.cghearth.com/eighth-bastion",
        logo: "/hotels/cgh.png",
        monogram: "EB",
      },
      {
        id: "976-panangad",
        name: "976 Panangad",
        category: "Boutique & Heritage",
        website: "https://www.booking.com/hotel/in/976-panangad.html",
        logo: "/hotels/panangad.png",
        monogram: "976",
      },
    ],
  },
  {
    id: "kochi-mid",
    label: "Mid-range",
    hotels: [
      {
        id: "crowne-plaza",
        name: "Crowne Plaza Kochi",
        category: "Mid-range",
        website: "https://www.booking.com/hotel/in/crowne-plaza.html",
        logo: "/hotels/ihg.png",
        monogram: "CP",
      },
      {
        id: "holiday-inn",
        name: "Holiday Inn Cochin",
        category: "Mid-range",
        website: "https://www.booking.com/hotel/in/holiday-inn-cochin.html",
        logo: "/hotels/ihg.png",
        monogram: "HI",
      },
      {
        id: "taj-airport",
        name: "Taj Cochin International Airport",
        category: "Mid-range",
        website:
          "https://www.tajhotels.com/en-in/hotels/taj-cochin-international-airport-kerala",
        logo: "/hotels/taj.svg",
        monogram: "TJ",
      },
      {
        id: "marriott-kochi",
        name: "Kochi Marriott Hotel",
        category: "Mid-range",
        website: "https://www.booking.com/hotel/in/kochi-marriott.html",
        logo: "/hotels/marriott.png",
        monogram: "MR",
      },
    ],
  },
];

export const kumarakomStayGroups: HotelGroup[] = [
  {
    id: "kumarakom-luxury",
    label: "Luxury",
    hotels: [
      {
        id: "taj-kumarakom",
        name: "Taj Kumarakom Resort & Spa",
        category: "Luxury",
        website: "https://www.tajhotels.com",
        logo: "/hotels/taj.svg",
        monogram: "TJ",
      },
      {
        id: "coconut-lagoon",
        name: "Coconut Lagoon",
        category: "Luxury",
        website: "https://www.cghearth.com",
        logo: "/hotels/cgh.png",
        monogram: "CL",
      },
      {
        id: "gokulam-grand",
        name: "Gokulam Grand Resort & Spa",
        category: "Luxury",
        website: "https://www.gokulamgrandkumarakom.com",
        logo: "/hotels/gokulam.png",
        monogram: "GG",
      },
    ],
  },
  {
    id: "kumarakom-mid",
    label: "Mid-tier",
    hotels: [
      {
        id: "backwater-ripples",
        name: "Backwater Ripples",
        category: "Mid-tier",
        website: "https://www.backwaterripples.com",
        logo: "/hotels/backwater.png",
        monogram: "BR",
      },
      {
        id: "water-scapes",
        name: "KTDC Water Scapes",
        category: "Mid-tier",
        website: "https://www.ktdc.com/water-scapes",
        logo: "/hotels/ktdc.png",
        monogram: "WS",
      },
    ],
  },
];
