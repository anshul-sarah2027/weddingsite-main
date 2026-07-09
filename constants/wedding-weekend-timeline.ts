import type {
  EditorialQuote,
  GuestNote,
  TimelineDay,
} from "@/types/timeline";

const T = "/timeline";

export const weddingWeekendTimeline: TimelineDay[] = [
  {
    id: "saturday",
    label: "SATURDAY • 30 JANUARY 2027",
    chapterTitle: "An Evening in Marigold",
    chapterIntro:
      "The celebrations begin with laughter, music and the joyful gathering of family and friends as we welcome everyone to Kerala.",
    events: [
      {
        id: "nichayathartham",
        time: "10:30 AM",
        name: "Nichayathartham",
        subtitle: "Our Engagement Ceremony",
        description:
          "Our families come together to celebrate the beginning of this beautiful weekend with blessings, traditions and the exchange of rings.",
        venue: "Banquet Hall",
        illustration: `${T}/Nichayathartham.png`,
      },
      {
        id: "welcome-lunch",
        time: "12:30 PM",
        name: "Welcome Lunch",
        subtitle: "A Taste of Kerala",
        description:
          "Your first introduction to Kerala hospitality begins with a traditional welcome lunch served on banana leaves.",
        venue: "Vembanad Lawn",
        illustration: `${T}/WelcomeLunch.png`,
      },
      {
        id: "hotel-check-in",
        time: "2:00 PM Onwards",
        name: "Hotel Check-In",
        subtitle: "Settle Into Paradise",
        description:
          "Relax, explore the resort and make yourself at home before the evening celebrations begin.",
        venue: "Kumarakom Lake Resort",
        illustration: `${T}/Hotel-Check-in.png`,
      },
      {
        id: "baraat",
        time: "5:30 PM",
        name: "Baraat",
        subtitle: "The Groom's Grand Procession",
        description:
          "Music fills the air as friends and family dance together while welcoming the groom in true Indian wedding tradition.",
        venue: "Throughout the Resort",
        illustration: `${T}/Baraat.png`,
      },
      {
        id: "sangeet",
        time: "7:00 PM Onwards",
        name: "Sangeet",
        subtitle: "An Evening in Marigold",
        poeticTitle: "An Evening in Marigold",
        description:
          "A joyful evening of music, performances and dancing beneath glowing lights surrounded by the people we love most.",
        venue: "Vembanad Lawn",
        illustration: `${T}/Sangeet(An Evening in Marigold).png`,
      },
    ],
  },
  {
    id: "sunday",
    label: "SUNDAY • 31 JANUARY 2027",
    chapterTitle: "Where the Backwaters Turn to Gold",
    chapterIntro:
      "The day our forever begins, surrounded by Kerala's timeless traditions and the people who have travelled across the world to celebrate with us.",
    events: [
      {
        id: "upanayanam",
        time: "7:30 AM",
        name: "Upanayanam",
        subtitle: "Sacred Morning Ritual",
        description:
          "A traditional Hindu ceremony marking the beginning of the wedding day with prayers and blessings.",
        venue: "Tea Lawn",
        illustration: `${T}/Upanayanam.png`,
      },
      {
        id: "kashi-yatra",
        time: "8:30 AM",
        name: "Kashi Yatra",
        subtitle: "A Cherished Wedding Tradition",
        description:
          "One of the most playful moments of a Hindu wedding, where tradition meets laughter before the ceremony begins.",
        venue: "Tea Lawn",
        illustration: `${T}/KaashiYatra.png`,
      },
      {
        id: "muhurtham",
        time: "9:15 AM",
        name: "Muhurtham",
        subtitle: "The Wedding Ceremony",
        poeticTitle: "Where the Backwaters Turn to Gold",
        description:
          "The moment we exchange vows, blessings and begin the next chapter of our lives together.",
        venue: "Tea Lawn",
        illustration: `${T}/Muhurtham.png`,
      },
      {
        id: "sadya-lunch",
        timePrefix: "Followed By",
        time: "",
        name: "Sadya Lunch",
        subtitle: "Kerala's Grand Wedding Feast",
        description:
          "Join us for an authentic Sadya served on traditional banana leaves as we celebrate together through Kerala's most beloved culinary tradition.",
        venue: "Vembanad Lawn",
        illustration: `${T}/SadyaLunch.png`,
      },
      {
        id: "sunset-cruise",
        time: "4:30 PM",
        name: "Sunset Cruise",
        subtitle: "Where the Backwaters Turn to Gold",
        poeticTitle: "Where the Backwaters Turn to Gold",
        description:
          "Unwind aboard traditional Kerala houseboats as the sun sets across the tranquil backwaters of Kumarakom.",
        venue: "Departure from the Jetty",
        illustration: `${T}/SunsetCruise.png`,
      },
      {
        id: "reception",
        time: "7:00 PM Onwards",
        name: "Reception",
        subtitle: "Under a Thousand Lights",
        poeticTitle: "Under a Thousand Lights",
        description:
          "An elegant evening of dinner, heartfelt toasts and celebration beneath the stars.",
        venue: "Vembanad Lawn",
        illustration: `${T}/Reception(Under a Thousand Lights).png`,
      },
      {
        id: "after-party",
        time: "10:30 PM Onwards",
        name: "After Party",
        subtitle: "The After Hours Club",
        poeticTitle: "The After Hours Club",
        description:
          "The music continues, the dance floor opens and the celebrations carry on long into the night.",
        venue: "Banquet Hall",
        illustration: `${T}/AfterParty.png`,
      },
    ],
  },
  {
    id: "monday",
    label: "MONDAY • 1 FEBRUARY 2027",
    chapterTitle: "Until We Meet Again",
    chapterIntro:
      "Every beautiful journey eventually comes to an end—but the memories made here will stay with us forever.",
    events: [
      {
        id: "check-out",
        time: "12:00 PM",
        name: "Check-Out",
        subtitle: "Safe Travels",
        description:
          "Thank you for travelling across the world to celebrate with us. We hope you leave Kerala with wonderful memories, new friendships and a small piece of this beautiful place in your heart.",
        venue: "Kumarakom Lake Resort",
        illustration: `${T}/Farewell.png`,
      },
    ],
  },
];

export const timelineEditorialQuotes: EditorialQuote[] = [
  {
    id: "calories",
    text: "Calories do not exist at weddings anyway.",
    afterDayId: "saturday",
  },
  {
    id: "participation",
    text: "Participation is compulsory.",
    afterDayId: "saturday",
  },
  {
    id: "sleep",
    text: "Sleep is a tomorrow problem.",
    afterDayId: "sunday",
  },
  {
    id: "journey",
    text: "We promise it'll be worth the journey.",
    afterDayId: "monday",
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
