import { Resend } from "resend";
import type { RsvpInput } from "@/lib/validations/rsvp";
import { SITE, WEDDING } from "@/lib/constants";

const IVORY = "#FAF7F2";
const PAPER = "#FFFCFA";
const FOREST = "#2F3A2E";
const GOLD = "#B59A63";
const FOREST_SOFT = "rgba(47,58,46,0.72)";

const serif = "Georgia, 'Times New Roman', Times, serif";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Sarah & Anshul <onboarding@resend.dev>"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailShell({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  const siteHost = SITE.url.replace(/^https?:\/\//, "");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${IVORY};-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};">
    <tr>
      <td align="center" style="padding:40px 16px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${PAPER};border:1px solid rgba(181,154,99,0.32);box-shadow:0 18px 48px rgba(47,58,46,0.08);">
          <!-- Gold top rule -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD} 80%, transparent 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding:40px 32px 8px;text-align:center;">
              <p style="margin:0;font-family:${serif};font-size:13px;letter-spacing:0.28em;text-transform:uppercase;color:${GOLD};">
                ${escapeHtml(eyebrow)}
              </p>
              <p style="margin:16px 0 0;font-family:${serif};font-size:26px;font-weight:400;color:${GOLD};">
                ${escapeHtml(SITE.couple.displayName)}
              </p>
              <h1 style="margin:12px 0 0;font-family:${serif};font-size:30px;font-weight:400;line-height:1.2;letter-spacing:0.1em;text-transform:uppercase;color:${FOREST};">
                ${escapeHtml(title)}
              </h1>
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:20px auto 0;">
                <tr>
                  <td style="width:48px;height:1px;background:rgba(181,154,99,0.5);font-size:0;">&nbsp;</td>
                  <td style="width:8px;font-size:0;">&nbsp;</td>
                  <td style="width:48px;height:1px;background:rgba(181,154,99,0.5);font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:8px 32px 32px;font-family:${serif};font-size:16px;line-height:1.75;color:${FOREST};">
              ${body}
            </td>
          </tr>
          <!-- Connect -->
          <tr>
            <td style="padding:0 32px 8px;text-align:center;">
              <p style="margin:0;font-family:${serif};font-size:15px;line-height:1.6;color:${FOREST_SOFT};">
                You can connect with us.
              </p>
            </td>
          </tr>
          <!-- Sign-off -->
          <tr>
            <td style="padding:0 32px 36px;text-align:center;">
              <p style="margin:0;font-family:${serif};font-size:16px;font-style:italic;color:${FOREST_SOFT};">
                With love,
              </p>
              <p style="margin:8px 0 0;font-family:${serif};font-size:22px;color:${FOREST};">
                Sarah &amp; Anshul
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(47,58,46,0.08);text-align:center;">
              <p style="margin:0 0 6px;font-family:${serif};font-size:13px;letter-spacing:0.06em;color:${FOREST_SOFT};">
                ${escapeHtml(SITE.weddingWeekendDisplay)} &middot; ${escapeHtml(WEDDING.venue)}
              </p>
              <p style="margin:0;font-family:${serif};font-size:13px;color:${GOLD};">
                <a href="${escapeHtml(SITE.url)}" style="color:${GOLD};text-decoration:none;">${escapeHtml(siteHost)}</a>
                &nbsp;&nbsp;${escapeHtml(SITE.hashtag)}
              </p>
            </td>
          </tr>
          <!-- Gold bottom rule -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD} 80%, transparent 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function detailCard(label: string, content: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;background:${PAPER};border:1px solid rgba(181,154,99,0.22);">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 8px;font-family:${serif};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};">
            ${escapeHtml(label)}
          </p>
          <p style="margin:0;font-family:${serif};font-size:15px;line-height:1.65;color:${FOREST};">
            ${content}
          </p>
        </td>
      </tr>
    </table>
  `;
}

function buildAttendingHtml(data: Extract<RsvpInput, { attending: true }>) {
  const names = data.guestNames.map((name) => escapeHtml(name)).join("<br />");
  const allergies = data.allergies?.trim();

  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(data.fullName)},</p>
    <p style="margin:0;color:${FOREST_SOFT};">
      Thank you for your RSVP — we can't wait to celebrate with you on the serene backwaters of Kumarakom.
    </p>
    ${detailCard(
      "When &amp; where",
      `<strong style="color:${FOREST};">${escapeHtml(SITE.weddingWeekendDisplay)}</strong><br />
      ${escapeHtml(WEDDING.venue)}<br />
      ${escapeHtml(SITE.location)}`,
    )}
    ${detailCard(
      "Your party",
      `<strong style="color:${FOREST};">${data.partySize}</strong> ${data.partySize === 1 ? "guest" : "guests"}<br />${names}`,
    )}
    ${
      allergies
        ? detailCard("Dietary notes", escapeHtml(allergies))
        : ""
    }
  `;

  return emailShell({
    eyebrow: "RSVP confirmed",
    title: "You're on the list",
    body,
  });
}

function buildDecliningHtml(data: Extract<RsvpInput, { attending: false }>) {
  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(data.fullName)},</p>
    <p style="margin:0;color:${FOREST_SOFT};">
      Thank you for letting us know. We're sorry you won't be able to join us in Kumarakom, and we're grateful you took a moment to reply.
    </p>
    <p style="margin:20px 0 0;color:${FOREST_SOFT};">
      If your plans change before 14 August 2026, we'd love to hear from you.
    </p>
  `;

  return emailShell({
    eyebrow: "RSVP received",
    title: "Thank you",
    body,
  });
}

/**
 * Sends an RSVP confirmation email. Failures are logged only —
 * the RSVP itself should still succeed if mail can't send.
 */
export async function sendRsvpConfirmationEmail(data: RsvpInput) {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "[sendRsvpConfirmationEmail] RESEND_API_KEY is not set — skipped confirmation email.",
    );
    return { sent: false as const, reason: "not_configured" as const };
  }

  const subject = data.attending
    ? `You're on the list — ${SITE.couple.displayName}`
    : `RSVP received — ${SITE.couple.displayName}`;

  const html = data.attending
    ? buildAttendingHtml(data)
    : buildDecliningHtml(data);

  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: data.email.toLowerCase(),
      subject,
      html,
    });

    if (error) {
      console.error("[sendRsvpConfirmationEmail]", error.message);
      return { sent: false as const, reason: "send_failed" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[sendRsvpConfirmationEmail]", error);
    return { sent: false as const, reason: "send_failed" as const };
  }
}
