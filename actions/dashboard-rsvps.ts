"use server";

import {
  DASHBOARD_PAGE_SIZE,
  fetchRsvpStats,
  fetchRsvpsPage,
  updateRsvpAllergiesInDb,
  updateRsvpAttendanceInDb,
  type RsvpFilter,
  type RsvpNoteLists,
  type RsvpPageResult,
  type RsvpStats,
  type RsvpUpdateResult,
} from "@/lib/dashboard-data";
import { isDashboardAuthenticated } from "@/lib/dashboard-auth";

async function unauthorizedUpdate(): Promise<RsvpUpdateResult> {
  return { ok: false, error: "Please sign in again to make changes." };
}

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

export async function refreshDashboardData(input: {
  page: number;
  filter: RsvpFilter;
  query: string;
}): Promise<{
  page: RsvpPageResult;
  stats: RsvpStats;
  notes: RsvpNoteLists;
}> {
  const emptyStats: RsvpStats = {
    totalResponses: 0,
    attendingParties: 0,
    decliningParties: 0,
    totalGuests: 0,
    withAllergies: 0,
    withNotes: 0,
  };
  const emptyNotes: RsvpNoteLists = { allergyNotes: [], extraNotes: [] };

  const ok = await isDashboardAuthenticated();
  if (!ok) {
    return {
      page: {
        rows: [],
        matchedCount: 0,
        page: 1,
        pageSize: DASHBOARD_PAGE_SIZE,
        error: "Please sign in again to view RSVPs.",
      },
      stats: emptyStats,
      notes: emptyNotes,
    };
  }

  const [page, totals] = await Promise.all([
    fetchRsvpsPage({
      page: input.page,
      pageSize: DASHBOARD_PAGE_SIZE,
      filter: input.filter,
      query: input.query,
    }),
    fetchRsvpStats(),
  ]);

  return {
    page,
    stats: totals.stats,
    notes: totals.notes,
  };
}

export async function updateRsvpAttendance(input: {
  id: string;
  attending: boolean;
}): Promise<RsvpUpdateResult> {
  const ok = await isDashboardAuthenticated();
  if (!ok) return unauthorizedUpdate();
  return updateRsvpAttendanceInDb(input);
}

export async function updateRsvpDietaryNotes(input: {
  id: string;
  allergies: string;
}): Promise<RsvpUpdateResult> {
  const ok = await isDashboardAuthenticated();
  if (!ok) return unauthorizedUpdate();
  return updateRsvpAllergiesInDb(input);
}
