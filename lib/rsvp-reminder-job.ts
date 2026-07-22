import { createSupabaseAdminClient, getSupabaseAdminEnv } from "@/lib/supabase/admin";
import { getFromAddress, getResendClient } from "@/lib/email/shared";
import { buildReminderHtml, buildReminderSubject } from "@/lib/email/rsvp-reminder";
import { SITE, WEDDING } from "@/lib/constants";
import type { RsvpRow } from "@/types/database";

/** Resend's batch endpoint accepts up to 100 emails per request. */
const BATCH_SIZE = 100;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export type RsvpReminderRunResult =
  | { ok: false; error: string }
  | {
      ok: true;
      /** Whether today is on/after the reminder window (14 days before the wedding). */
      windowOpen: boolean;
      sent: number;
      failed: number;
      skipped: number;
    };

/** Days before the wedding date the reminder should start going out. */
export const RSVP_REMINDER_DAYS_BEFORE = 14;

/** Today's date (YYYY-MM-DD) in the wedding's local timezone. */
function todayInWeddingTimezone() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: WEDDING.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isReminderWindowOpen() {
  const today = todayInWeddingTimezone();

  // Parse the calendar date components explicitly and do the arithmetic in
  // UTC, so the result never shifts based on the server runtime's local
  // timezone (SITE.weddingDate is a plain "YYYY-MM-DD" calendar date).
  const [year, month, day] = SITE.weddingDate.split("-").map(Number);
  const reminderDate = new Date(Date.UTC(year, month - 1, day));
  reminderDate.setUTCDate(reminderDate.getUTCDate() - RSVP_REMINDER_DAYS_BEFORE);
  const reminderDateStr = reminderDate.toISOString().slice(0, 10);

  return today >= reminderDateStr;
}

/**
 * Sends the pre-wedding reminder email to every attending guest who hasn't
 * been reminded yet, once we're within RSVP_REMINDER_DAYS_BEFORE of the
 * wedding date. Safe to call once a day — already-reminded guests are
 * skipped, so re-running never double-sends.
 */
export async function runRsvpReminderJob(): Promise<RsvpReminderRunResult> {
  if (!isReminderWindowOpen()) {
    return { ok: true, windowOpen: false, sent: 0, failed: 0, skipped: 0 };
  }

  if (!getSupabaseAdminEnv()) {
    return { ok: false, error: "Supabase admin env is not configured." };
  }

  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("attending", true)
    .is("reminder_sent_at", null);

  if (error) {
    console.error("[runRsvpReminderJob] fetch failed", error.message);
    return { ok: false, error: "Could not load RSVPs to remind." };
  }

  const rows = (data ?? []) as RsvpRow[];
  if (rows.length === 0) {
    return { ok: true, windowOpen: true, sent: 0, failed: 0, skipped: 0 };
  }

  let sent = 0;
  let failed = 0;
  const from = getFromAddress();
  const subject = buildReminderSubject();

  for (const batch of chunk(rows, BATCH_SIZE)) {
    try {
      const { data: batchResult, error: batchError } = await resend.batch.send(
        batch.map((row) => ({
          from,
          to: row.email.toLowerCase(),
          subject,
          html: buildReminderHtml({
            id: row.id,
            fullName: row.full_name,
            email: row.email,
            allergies: row.allergies,
          }),
        })),
      );

      if (batchError || !batchResult) {
        console.error("[runRsvpReminderJob] batch send failed", batchError?.message);
        failed += batch.length;
        continue;
      }

      const succeededIds = batch
        .filter((_, index) => Boolean(batchResult.data?.[index]?.id))
        .map((row) => row.id);

      if (succeededIds.length > 0) {
        const { error: updateError } = await supabase
          .from("rsvps")
          .update({ reminder_sent_at: new Date().toISOString() })
          .in("id", succeededIds);

        if (updateError) {
          console.error(
            "[runRsvpReminderJob] failed to mark reminder_sent_at",
            updateError.message,
          );
        }
      }

      sent += succeededIds.length;
      failed += batch.length - succeededIds.length;
    } catch (err) {
      console.error("[runRsvpReminderJob] batch send threw", err);
      failed += batch.length;
    }
  }

  return { ok: true, windowOpen: true, sent, failed, skipped: 0 };
}
