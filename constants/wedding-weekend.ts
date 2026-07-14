/** Top-level Wedding Weekend section anchors for scrollspy / deep links.
 * Dress Code chapters keep their own spy via useDressCodeScrollSpy. */
export const weddingWeekendSections = [
  { id: "kumarakom-lake-resort", label: "Venue" },
  { id: "our-wedding-weekend", label: "Itinerary" },
  { id: "dress-code", label: "Dress Code" },
] as const;

/** Sections whose hash is owned by this page-level spy (not chapter-level).
 * Dress Code uses its own spy — keep it out of these ids so hashes aren't stolen. */
export const weddingWeekendScrollSpyIds = [
  "kumarakom-lake-resort",
  "our-wedding-weekend",
] as const;
