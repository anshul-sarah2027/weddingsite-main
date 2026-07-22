import { runRsvpReminderJob } from "@/lib/rsvp-reminder-job";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function unauthorized() {
  return Response.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}

/**
 * Runs daily via Vercel Cron (see vercel.json). Only actually sends emails
 * once we're within RSVP_REMINDER_DAYS_BEFORE of the wedding date — safe to
 * invoke any number of times, guests already reminded are always skipped.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get("secret");
    const authHeader = request.headers.get("authorization");
    const bearer =
      authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (querySecret !== cronSecret && bearer !== cronSecret) {
      return unauthorized();
    }
  }

  const result = await runRsvpReminderJob();

  if (!result.ok) {
    return Response.json(result, { status: 500 });
  }

  return Response.json(result);
}
