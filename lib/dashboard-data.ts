import {
  createSupabaseAdminClient,
  getSupabaseAdminEnv,
} from "@/lib/supabase/admin";
import type { RsvpRow } from "@/types/database";

export const DASHBOARD_PAGE_SIZE = 10;

export type RsvpFilter = "all" | "attending" | "declining";

export type RsvpStats = {
  totalResponses: number;
  attendingParties: number;
  decliningParties: number;
  totalGuests: number;
  withAllergies: number;
  withNotes: number;
};

export type RsvpNoteItem = {
  id: string;
  fullName: string;
  email: string;
  detail: string;
  attending: boolean;
};

export type RsvpNoteLists = {
  allergyNotes: RsvpNoteItem[];
  extraNotes: RsvpNoteItem[];
};

export type RsvpPageResult = {
  rows: RsvpRow[];
  /** Matches for current filter/search (for pagination only) */
  matchedCount: number;
  page: number;
  pageSize: number;
  error: string | null;
};

function adminUnavailable(): string {
  return "Admin access is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local.";
}

function sanitizeSearch(raw: string) {
  return raw.replace(/[%_,.()"'\\]/g, " ").replace(/\s+/g, " ").trim();
}

/** Full wedding totals — never based on the current page */
export async function fetchRsvpStats(): Promise<{
  stats: RsvpStats;
  notes: RsvpNoteLists;
  error: string | null;
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

  if (!getSupabaseAdminEnv()) {
    return { stats: emptyStats, notes: emptyNotes, error: adminUnavailable() };
  }

  try {
    const supabase = createSupabaseAdminClient();

    const [totalRes, attendingRes, decliningRes, noteRowsRes] = await Promise.all([
      supabase.from("rsvps").select("*", { count: "exact", head: true }),
      supabase
        .from("rsvps")
        .select("id, full_name, email, party_size, guest_names, allergies, attending")
        .eq("attending", true)
        .order("full_name", { ascending: true }),
      supabase
        .from("rsvps")
        .select("*", { count: "exact", head: true })
        .eq("attending", false),
      supabase
        .from("rsvps")
        .select("id, full_name, email, notes, attending")
        .not("notes", "is", null)
        .order("full_name", { ascending: true }),
    ]);

    if (totalRes.error || attendingRes.error || decliningRes.error || noteRowsRes.error) {
      const message =
        totalRes.error?.message ||
        attendingRes.error?.message ||
        decliningRes.error?.message ||
        noteRowsRes.error?.message;
      console.error("[fetchRsvpStats]", message);
      return {
        stats: emptyStats,
        notes: emptyNotes,
        error: "Could not load RSVP totals from Supabase.",
      };
    }

    const attending = attendingRes.data ?? [];
    let totalGuests = 0;
    const allergyNotes: RsvpNoteItem[] = [];

    for (const row of attending) {
      totalGuests +=
        row.party_size ??
        (Array.isArray(row.guest_names) ? row.guest_names.length : 0);
      if (typeof row.allergies === "string" && row.allergies.trim()) {
        allergyNotes.push({
          id: row.id,
          fullName: row.full_name,
          email: row.email,
          detail: row.allergies.trim(),
          attending: true,
        });
      }
    }

    const extraNotes: RsvpNoteItem[] = (noteRowsRes.data ?? [])
      .filter((row) => typeof row.notes === "string" && row.notes.trim())
      .map((row) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        detail: row.notes.trim(),
        attending: Boolean(row.attending),
      }));

    return {
      stats: {
        totalResponses: totalRes.count ?? 0,
        attendingParties: attending.length,
        decliningParties: decliningRes.count ?? 0,
        totalGuests,
        withAllergies: allergyNotes.length,
        withNotes: extraNotes.length,
      },
      notes: { allergyNotes, extraNotes },
      error: null,
    };
  } catch (error) {
    console.error("[fetchRsvpStats]", error);
    return {
      stats: emptyStats,
      notes: emptyNotes,
      error: "Something went wrong loading RSVP totals.",
    };
  }
}

/** One page of replies from Supabase — not the full list */
export async function fetchRsvpsPage(options: {
  page?: number;
  pageSize?: number;
  filter?: RsvpFilter;
  query?: string;
}): Promise<RsvpPageResult> {
  const pageSize = options.pageSize ?? DASHBOARD_PAGE_SIZE;
  const page = Math.max(1, options.page ?? 1);
  const filter = options.filter ?? "all";
  const search = sanitizeSearch(options.query ?? "");

  if (!getSupabaseAdminEnv()) {
    return {
      rows: [],
      matchedCount: 0,
      page,
      pageSize,
      error: adminUnavailable(),
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let queryBuilder = supabase
      .from("rsvps")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (filter === "attending") {
      queryBuilder = queryBuilder.eq("attending", true);
    } else if (filter === "declining") {
      queryBuilder = queryBuilder.eq("attending", false);
    }

    if (search) {
      const pattern = `"%${search}%"`;
      queryBuilder = queryBuilder.or(
        `full_name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern},allergies.ilike.${pattern},notes.ilike.${pattern}`,
      );
    }

    const { data, error, count } = await queryBuilder.range(from, to);

    if (error) {
      console.error("[fetchRsvpsPage]", error.message);
      return {
        rows: [],
        matchedCount: 0,
        page,
        pageSize,
        error: "Could not load this page of RSVPs.",
      };
    }

    return {
      rows: (data ?? []) as RsvpRow[],
      matchedCount: count ?? 0,
      page,
      pageSize,
      error: null,
    };
  } catch (error) {
    console.error("[fetchRsvpsPage]", error);
    return {
      rows: [],
      matchedCount: 0,
      page,
      pageSize,
      error: "Something went wrong loading RSVPs.",
    };
  }
}

export type RsvpUpdateResult =
  | { ok: true; row: RsvpRow }
  | { ok: false; error: string };

export async function updateRsvpAttendanceInDb(input: {
  id: string;
  attending: boolean;
}): Promise<RsvpUpdateResult> {
  if (!getSupabaseAdminEnv()) {
    return { ok: false, error: adminUnavailable() };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data: existing, error: loadError } = await supabase
      .from("rsvps")
      .select("*")
      .eq("id", input.id)
      .maybeSingle();

    if (loadError || !existing) {
      return { ok: false, error: "Could not find that RSVP." };
    }

    const patch: Record<string, unknown> = {
      attending: input.attending,
    };

    // Restoring a decline: ensure they count as at least one guest
    if (input.attending) {
      const party =
        typeof existing.party_size === "number" && existing.party_size >= 1
          ? existing.party_size
          : 1;
      const names = Array.isArray(existing.guest_names)
        ? existing.guest_names.filter(
            (name: unknown): name is string =>
              typeof name === "string" && Boolean(name.trim()),
          )
        : [];

      patch.party_size = party;
      patch.guest_names =
        names.length > 0 ? names : [existing.full_name as string];
    }

    const { data, error } = await supabase
      .from("rsvps")
      .update(patch)
      .eq("id", input.id)
      .select("*")
      .single();

    if (error || !data) {
      console.error("[updateRsvpAttendanceInDb]", error?.message);
      return { ok: false, error: "Could not update attendance." };
    }

    return { ok: true, row: data as RsvpRow };
  } catch (error) {
    console.error("[updateRsvpAttendanceInDb]", error);
    return { ok: false, error: "Something went wrong updating attendance." };
  }
}

export async function updateRsvpAllergiesInDb(input: {
  id: string;
  allergies: string;
}): Promise<RsvpUpdateResult> {
  if (!getSupabaseAdminEnv()) {
    return { ok: false, error: adminUnavailable() };
  }

  const allergies = input.allergies.trim();

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("rsvps")
      .update({ allergies: allergies || null })
      .eq("id", input.id)
      .select("*")
      .single();

    if (error || !data) {
      console.error("[updateRsvpAllergiesInDb]", error?.message);
      return { ok: false, error: "Could not update dietary notes." };
    }

    return { ok: true, row: data as RsvpRow };
  } catch (error) {
    console.error("[updateRsvpAllergiesInDb]", error);
    return { ok: false, error: "Something went wrong updating dietary notes." };
  }
}
