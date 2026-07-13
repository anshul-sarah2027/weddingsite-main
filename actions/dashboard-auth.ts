"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createDashboardSessionToken,
  DASHBOARD_COOKIE,
  isDashboardPasswordConfigured,
  verifyDashboardPassword,
} from "@/lib/dashboard-auth";

export type DashboardLoginResult =
  | { ok: true }
  | { ok: false; error: string };

export async function loginDashboard(
  password: string,
): Promise<DashboardLoginResult> {
  if (!isDashboardPasswordConfigured()) {
    return {
      ok: false,
      error:
        "Dashboard password is not configured. Add DASHBOARD_PASSWORD to .env.local.",
    };
  }

  if (!verifyDashboardPassword(password)) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }

  const token = createDashboardSessionToken();
  if (!token) {
    return { ok: false, error: "Could not create a session. Check env config." };
  }

  const jar = await cookies();
  jar.set(DASHBOARD_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/dashboard",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true };
}

export async function logoutDashboard() {
  const jar = await cookies();
  jar.delete(DASHBOARD_COOKIE);
  redirect("/dashboard");
}
