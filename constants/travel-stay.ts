/** In-page section anchors for Travel & Stay scrollspy / deep links */
export const travelStaySections = [
  { id: "getting-here", label: "Getting there" },
  { id: "accommodation", label: "Accommodation" },
  { id: "tips", label: "Tips" },
] as const;

export const travelStaySectionIds = travelStaySections.map(
  (section) => section.id,
);
