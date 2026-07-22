import type { RsvpInput } from "@/lib/validations/rsvp";
import { SITE, WEDDING } from "@/lib/constants";
import {
  detailCard,
  emailShell,
  escapeHtml,
  FOREST,
  FOREST_SOFT,
  getFromAddress,
  getResendClient,
} from "@/lib/email/shared";

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
      If your plans change before 31 August 2026, we'd love to hear from you.
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
