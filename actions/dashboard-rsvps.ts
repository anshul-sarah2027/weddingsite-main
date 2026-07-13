"use server";

import {
  DASHBOARD_PAGE_SIZE,
  fetchRsvpsPage,
  type RsvpFilter,
  type RsvpPageResult,
} from "@/lib/dashboard-data";
import { isDashboardAuthenticated } from "@/lib/dashboard-auth";

export async function loadRsvpPage(input: {
  page: number;
  filter: RsvpFilter;
  query: string;
}): Promise<RsvpPageResult> {
  const ok = await isDashboardAuthenticated();
  if (!ok) {
    return {
      rows: [],
      matchedCount: 0,
      page: 1,
      pageSize: DASHBOARD_PAGE_SIZE,
      error: "Please sign in again to view RSVPs.",
    };
  }

  return fetchRsvpsPage({
    page: input.page,
    pageSize: DASHBOARD_PAGE_SIZE,
    filter: input.filter,
    query: input.query,
  });
}
