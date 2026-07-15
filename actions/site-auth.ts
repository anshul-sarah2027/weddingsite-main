"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSiteGateSessionToken,
  isSitePasswordConfigured,
  SITE_GATE_COOKIE,
  SITE_GATE_MAX_AGE_SECONDS,
  verifySitePassword,
} from "@/lib/site-auth";

export type SiteLoginResult =
  | { ok: true }
  | { ok: false; error: string };

function safeNextPath(nextPath?: string) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/";
  }
  if (nextPath.startsWith("/unlock")) return "/";
  return nextPath;
}

/**
 * Verifies the invite password, stores a signed session cookie (24h),
 * then redirects into the site. Redirect ensures Set-Cookie is applied reliably.
 */
export async function loginSite(
  password: string,
  nextPath?: string,
): Promise<SiteLoginResult> {
  if (!isSitePasswordConfigured()) {
    return {
      ok: false,
      error:
        "Site password is not configured yet. Add DASHBOARD_PASSWORD to .env.local.",
    };
  }

  if (!verifySitePassword(password)) {
    return {
      ok: false,
      error: "That password isn't right. Please try again.",
    };
  }

  const token = await createSiteGateSessionToken();
  if (!token) {
    return { ok: false, error: "Could not start your visit. Please try again." };
  }

  const jar = await cookies();
  jar.set(SITE_GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SITE_GATE_MAX_AGE_SECONDS,
  });

  redirect(safeNextPath(nextPath));
}
