export interface TimelineEvent {
  id: string;
  time: string;
  name: string;
  subtitle: string;
  description: string;
  venue: string;
  illustration: string;
  /** Sarah's poetic chapter title — shown in Austin above the event name */
  poeticTitle?: string;
  /** e.g. "Followed By" for Sadya Lunch */
  timePrefix?: string;
}

export interface TimelineDay {
  id: string;
  label: string;
  chapterTitle: string;
  chapterIntro: string;
  events: TimelineEvent[];
}

export interface EditorialQuote {
  id: string;
  text: string;
  /** Insert after this day's events */
  afterDayId: string;
}

export interface GuestNote {
  id: string;
  title: string;
  text: string;
  /** Phrases to highlight in antique gold */
  highlights?: string[];
}
