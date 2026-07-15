import { cookies } from "next/headers";
import {
  createSiteSessionToken,
  SITE_GATE_COOKIE,
  verifySiteSessionToken,
} from "@/lib/site-auth-token";

export {
  SITE_GATE_COOKIE,
  SITE_GATE_MAX_AGE_SECONDS,
} from "@/lib/site-auth-token";

function getSitePassword() {
  // Same password as the couple dashboard — one password for the whole wedding site.
  return process.env.DASHBOARD_PASSWORD?.trim() || null;
}

export function isSitePasswordConfigured() {
  return Boolean(getSitePassword());
}

export function verifySitePassword(input: string) {
  const password = getSitePassword();
  if (!password) return false;
  if (password.length !== input.length) return false;

  let mismatch = 0;
  for (let i = 0; i < password.length; i += 1) {
    mismatch |= password.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSiteGateSessionToken() {
  const password = getSitePassword();
  if (!password) return null;
  return createSiteSessionToken(password);
}

export async function isSiteAuthenticated() {
  const password = getSitePassword();
  if (!password) return false;
  const jar = await cookies();
  return verifySiteSessionToken(password, jar.get(SITE_GATE_COOKIE)?.value);
}
