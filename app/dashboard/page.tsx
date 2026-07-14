import Image from "next/image";
import { DashboardLoginForm } from "@/components/dashboard/dashboard-login-form";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { IMAGES } from "@/constants/images";
import {
  isDashboardAuthenticated,
  isDashboardPasswordConfigured,
} from "@/lib/dashboard-auth";
import {
  DASHBOARD_PAGE_SIZE,
  fetchRsvpStats,
  fetchRsvpsPage,
} from "@/lib/dashboard-data";
import { createPageMetadata } from "@/lib/metadata";



export const metadata = createPageMetadata(
  "RSVP Dashboard",
  "Private RSVP overview for Sarah and Anshul.",
);

export const dynamic = "force-dynamic";

function DashboardBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src={IMAGES.heroAlt.invitation}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
        quality={85}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.78)_0%,rgba(250,247,242,0.88)_45%,rgba(250,247,242,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,252,247,0.45),transparent_55%)]" />
    </div>
  );
}

export default async function DashboardPage() {
  const authenticated = await isDashboardAuthenticated();

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
        <DashboardBackdrop />

        <div className="relative z-10 w-full max-w-md rounded-sm border border-[#B59A63]/28 bg-[rgba(255,252,247,0.92)] px-7 py-11 shadow-[0_24px_70px_rgba(47,58,46,0.1)] backdrop-blur-[4px] md:px-10 md:py-12">
          <span
            className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t border-l border-[#B59A63]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t border-r border-[#B59A63]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#B59A63]/45"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-[#B59A63]/45"
            aria-hidden="true"
          />

          <p className="font-editorial text-editorial text-center text-2xl md:text-[1.75rem]">
            Sarah & Anshul
          </p>
          <h1 className="font-heading mt-3 text-center text-2xl font-medium tracking-[0.16em] text-[#2F3A2E] uppercase">
            Private Dashboard
          </h1>
          <p className="font-heading mx-auto mt-4 max-w-xs text-center text-sm leading-relaxed text-[#2F3A2E]/55">
            For the couple only — RSVPs, headcount, and guest notes.
          </p>

          {!isDashboardPasswordConfigured() ? (
            <p
              className="font-heading mt-8 border border-[#B59A63]/25 bg-[#B59A63]/08 px-4 py-3 text-sm text-[#2F3A2E]/80"
              role="status"
            >
              Add <code className="text-[#B59A63]">DASHBOARD_PASSWORD</code> to
              your <code>.env.local</code>, then restart the dev server.
            </p>
          ) : (
            <div className="mt-8">
              <DashboardLoginForm />
            </div>
          )}
        </div>
      </div>
    );
  }

  const [{ stats, notes, error: statsError }, pageResult] = await Promise.all([
    fetchRsvpStats(),
    fetchRsvpsPage({ page: 1, pageSize: DASHBOARD_PAGE_SIZE, filter: "all" }),
  ]);

  const loadError = statsError || pageResult.error;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DashboardBackdrop />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14 lg:max-w-4xl">
        <DashboardView
          initialRows={pageResult.rows}
          initialMatchedCount={pageResult.matchedCount}
          stats={stats}
          notes={notes}
          initialError={loadError}
        />
      </div>
    </div>
  );
}
