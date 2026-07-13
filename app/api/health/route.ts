import {
  createSupabaseServerClient,
  getSupabaseEnv,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}

/**
 * Keep-alive for free-tier Supabase.
 * Point a free daily cron (e.g. cron-job.org) at GET /api/health
 * Optional: set CRON_SECRET and pass ?secret=... or Authorization: Bearer ...
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

  const env = getSupabaseEnv();
  if (!env) {
    return Response.json(
      {
        ok: false,
        app: "up",
        supabase: "unconfigured",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();

    // Lightweight touch — even an RLS deny still wakes the project.
    const { error } = await supabase
      .from("rsvps")
      .select("id", { head: true, count: "exact" })
      .limit(1);

    const permissionDenied =
      error?.code === "42501" ||
      error?.message?.toLowerCase().includes("permission") ||
      error?.message?.toLowerCase().includes("rls") ||
      error?.message?.toLowerCase().includes("policy");

    if (error && !permissionDenied) {
      return Response.json(
        {
          ok: false,
          app: "up",
          supabase: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      app: "up",
      supabase: "awake",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      {
        ok: false,
        app: "up",
        supabase: "error",
        message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
