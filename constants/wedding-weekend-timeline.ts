import type { GuestNote, TimelineDay } from "@/types/timeline";

const T = "/timeline";

export const weddingWeekendTimeline: TimelineDay[] = [
  {
    id: "saturday",
    label: "SATURDAY • 30 JANUARY 2027",
    events: [
      {
        id: "nichayathartham",
        time: "10:30 AM",
        name: "Nichayathartam",
        description:
          "Our celebrations begin with the traditional engagement ceremony featuring the exchange of rings, traditional gifts, and the reading of the Lagna Patrika (wedding agreement) by the priest.",
        venue: "Banquet Hall",
        illustration: `${T}/Nichayathartham.png`,
      },
      {
        id: "welcome-lunch",
        time: "12:30 PM",
        name: "Welcome Lunch",
        description:
          "Join us as we kick off our wedding celebrations with a relaxed Welcome Lunch. Enjoy delicious local cuisine before the festivities begin.",
        venue: "Ettukettu Restaurant",
        illustration: `${T}/welcomelunchimage.png`,
      },
      {
        id: "hotel-check-in",
        time: "2:00 PM",
        name: "Check In",
        description:
          "Check in will open at 2 PM, and unfortunately we will not be able to facilitate an earlier time. You will receive a full itinerary of the events for both days at check in. All guests are asked to bring ID proof for the check in process, and international guests should have their passport on hand.",
        venue: "Kumarakom Lake Resort",
        illustration: `${T}/Hotel-Check-in.png`,
      },
      {
        id: "baraat",
        time: "5:00 PM",
        name: "Baraat",
        description:
          "A lively procession that marks the arrival of the couple, filled with music, dancing, and the joyful energy of family and friends escorting them to the venue. It's less a walk and more a celebration in motion, so come ready to dance your way there with us, and expect a surprise along the way. The Sangeet picks up right where the Baraat leaves off.",
        venue: "Throughout the Resort",
        illustration: `${T}/Baraat.png`,
      },
      {
        id: "sangeet",
        time: "6:30 PM",
        name: "Sangeet",
        poeticTitle: "An Evening in Marigold",
        description:
          "An evening of performances, dance battles between our families and friends, and plenty of laughter, all set against a backdrop of colour we are saving for you to see in person. We promise you a night of great tunes, so dust off your dancing shoes. Come hungry, come ready to move, and do not be surprised if you end up on the dance floor before you even realise it.",
        venue: "Vembanad Lawn",
        illustration: `${T}/Sangeet(An Evening in Marigold).png`,
      },
    ],
  },
  {
    id: "sunday",
    label: "SUNDAY • 31 JANUARY 2027",
    events: [
      {
        id: "upanayanam",
        time: "7:30 AM",
        name: "Upanayanam",
        description:
          "A sacred thread ceremony traditionally performed for the groom. Anshul will be presented with a sacred thread worn across the shoulder, marking a rite of passage into a new stage of life and the responsibilities that come with it. It is a quieter and more reflective ceremony rooted in generations of family tradition.",
        venue: "Tea Lawn",
        illustration: `${T}/Upanayanam.png`,
      },
      {
        id: "kashi-yatra",
        time: "8:30 AM",
        name: "Kashi Yatra",
        description:
          "In a playful nod to tradition, the groom pretends to abandon married life altogether in favour of a pilgrimage to Kashi in pursuit of higher wisdom, only to be talked out of it by the bride's family, who convince him that a life of love is the better path after all. It is a small piece of theatre, equal parts humour and heritage, and always a crowd favourite.",
        venue: "Tea Lawn",
        illustration: `${T}/KaashiYatra.png`,
      },
      {
        id: "muhurtham",
        time: "9:15 AM",
        name: "Muhurtham",
        subtitle: "Wedding Ceremony",
        poeticTitle: "Where the Backwaters Turn to Gold",
        description:
          "The morning builds towards the wedding ceremony itself, the heart of the entire celebration. During the ceremony, the couple is formally united through a series of sacred rituals guided by a priest, including the exchange of garlands and vows made in front of family, before the union is sealed. It is a ceremony steeped in centuries of tradition, and the moment every other event across these two days has been building towards.",
        venue: "Tea Lawn",
        illustration: `${T}/Muhurtham.png`,
      },
      {
        id: "sadhya-lunch",
        time: "",
        name: "Sadhya Lunch",
        description:
          "Following the Muhurtham, the celebrations move to the table for Sadhya, Kerala's traditional feast, served the way it has been for generations, on a banana leaf, with dish after dish arriving in careful sequence. It is less a meal than an experience, sweet, spicy, tangy and comforting all at once, and a proper introduction to Kerala on a plate. Come with an appetite, because this is a lunch meant to be savoured slowly, surrounded by the people who made the morning's ceremony so meaningful.",
        venue: "Ettukettu Restaurant",
        illustration: `${T}/SadyaLunch.png`,
      },
      {
        id: "sunset-cruise",
        time: "5:30 PM",
        name: "Sunset Cruise",
        description:
          "As the afternoon settles, we take the celebrations onto the water for a sunset cruise along the Kumarakom backwaters, watching the light shift over the lake as the day winds down. It's a moment to simply take in the beauty of the place that brought everyone here in the first place.",
        venue: "Departure from the Jetty",
        illustration: `${T}/SunsetCruise.png`,
      },
      {
        id: "reception",
        time: "7:30 PM",
        name: "Reception",
        poeticTitle: "Under a Thousand Lights",
        description:
          "The evening transitions into a more glamorous affair, with toasts, a first dance, and a night dedicated purely to celebration. It is our chance to properly thank everyone who made the journey to be here, and to celebrate the two of us officially becoming one, surrounded by the people who mean the most to us.",
        venue: "Vembanad Lawn",
        illustration: `${T}/Reception(Under a Thousand Lights).png`,
      },
      {
        id: "after-party",
        time: "11:00 PM",
        name: "After Party",
        poeticTitle: "Nightcap",
        description:
          "For those who have decided that sleep is a tomorrow problem. There will be music, there will be questionable dance moves, and there is a very real chance someone's uncle steals the show. Enter at your own risk.",
        venue: "Banquet Hall",
        illustration: `${T}/AfterParty.png`,
      },
    ],
  },
  {
    id: "monday",
    label: "MONDAY • 1 FEBRUARY 2027",
    events: [
      {
        id: "check-out",
        time: "12:00 PM",
        name: "Check-Out",
        description:
          "Thank you for travelling across the world to celebrate with us. We hope you leave Kerala with wonderful memories, new friendships and a small piece of this beautiful place in your heart.",
        venue: "Kumarakom Lake Resort",
        illustration: `${T}/Farewell.png`,
      },
    ],
  },
];

export const timelineGuestNotes: GuestNote[] = [
  {
    id: "check-in",
    title: "Hotel Check-In",
    text: "Rooms will be available from 2:00 PM onwards on Saturday. If you arrive earlier, our hospitality team will be delighted to welcome you while you enjoy lunch and the resort.",
    highlights: ["2:00 PM onwards on Saturday"],
  },
  {
    id: "dress-code",
    title: "Dress Code",
    text: "Each celebration has its own suggested attire. Please refer to the Dress Guide below for colour palettes and recommendations.",
    highlights: ["Dress Guide below"],
  },
  {
    id: "sunset-cruise",
    title: "Sunset Cruise",
    text: "Houseboats depart promptly from the jetty. We recommend arriving at least 15 minutes early.",
    highlights: ["at least 15 minutes early"],
  },
  {
    id: "kerala-time",
    title: "Kerala Time",
    text: "Our wedding is designed to be enjoyed at a relaxed pace. Take time to explore the resort, the backwaters and the beautiful surroundings between celebrations.",
    highlights: ["relaxed pace", "explore the resort, the backwaters"],
  },
];
