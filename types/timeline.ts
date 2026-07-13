export interface TimelineEvent {
  id: string;
  time: string;
  name: string;
  subtitle?: string;
  description: string;
  venue: string;
  illustration: string;
  /** Sarah's poetic chapter title — shown in Cormorant above the event name */
  poeticTitle?: string;
  /** e.g. "Followed By" for Sadhya Lunch */
  timePrefix?: string;
}

export interface TimelineDay {
  id: string;
  label: string;
  events: TimelineEvent[];
}

export interface GuestNote {
  id: string;
  title: string;
  text: string;
  /** Phrases to highlight in antique gold */
  highlights?: string[];
}
