import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const DASHBOARD_COOKIE = "as_dashboard_session";

function getDashboardPassword() {
  return process.env.DASHBOARD_PASSWORD?.trim() || null;
}

export function isDashboardPasswordConfigured() {
  return Boolean(getDashboardPassword());
}

export function createDashboardSessionToken() {
  const password = getDashboardPassword();
  if (!password) return null;
  return createHmac("sha256", password)
    .update("anshul-sarah-rsvp-dashboard-v1")
    .digest("hex");
}

export function verifyDashboardPassword(input: string) {
  const password = getDashboardPassword();
  if (!password) return false;

  const expected = Buffer.from(password);
  const received = Buffer.from(input);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export function verifyDashboardSessionToken(token: string | undefined) {
  const expected = createDashboardSessionToken();
  if (!expected || !token) return false;

  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isDashboardAuthenticated() {
  const jar = await cookies();
  return verifyDashboardSessionToken(jar.get(DASHBOARD_COOKIE)?.value);
}
