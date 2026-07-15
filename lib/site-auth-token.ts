/**
 * Shared HMAC helpers that work in Edge (middleware) and Node (server actions).
 */

export const SITE_GATE_COOKIE = "as_wedding_site_session";
/** Guests stay signed in for 24 hours after entering the password once. */
export const SITE_GATE_MAX_AGE_SECONDS = 60 * 60 * 24;

const SITE_PAYLOAD = "anshul-sarah-wedding-site-gate-v1";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toHex(signature);
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSiteSessionToken(password: string) {
  return hmacHex(password, SITE_PAYLOAD);
}

export async function verifySiteSessionToken(
  password: string,
  token: string | undefined,
) {
  if (!token) return false;
  const expected = await createSiteSessionToken(password);
  return timingSafeEqualHex(expected, token);
}
