import { SITE, WEDDING } from "@/lib/constants";
import {
  detailCard,
  emailShell,
  escapeHtml,
  FOREST,
  FOREST_SOFT,
  GOLD,
} from "@/lib/email/shared";

export type ReminderRecipient = {
  id: string;
  fullName: string;
  email: string;
  allergies: string | null;
};

function linkList() {
  const links = [
    { label: "Wedding Weekend", detail: "Full schedule & dress code", href: "/events" },
    { label: "Venue", detail: "Kumarakom Lake Resort & getting there", href: "/venue" },
    { label: "Accommodation", detail: "Where to stay nearby", href: "/accommodation" },
    { label: "Guest Guide", detail: "Kerala tips, food & FAQs", href: "/guest-guide" },
  ];

  return links
    .map(
      ({ label, detail, href }) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(47,58,46,0.08);">
            <a href="${escapeHtml(SITE.url)}${href}" style="text-decoration:none;color:${FOREST};font-family:Georgia, 'Times New Roman', Times, serif;">
              <span style="display:block;font-size:15px;font-weight:bold;">${escapeHtml(label)} &rarr;</span>
              <span style="display:block;margin-top:2px;font-size:13px;color:${FOREST_SOFT};">${escapeHtml(detail)}</span>
            </a>
          </td>
        </tr>
      `,
    )
    .join("");
}

export function buildReminderHtml(recipient: ReminderRecipient) {
  const allergies = recipient.allergies?.trim();

  const body = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(recipient.fullName)},</p>
    <p style="margin:0;color:${FOREST_SOFT};">
      The wedding weekend is almost here and we can't wait to celebrate with you on the backwaters of Kumarakom.
    </p>
    ${detailCard(
      "When &amp; where",
      `<strong style="color:${FOREST};">${escapeHtml(SITE.weddingWeekendDisplay)}</strong><br />
      ${escapeHtml(WEDDING.venue)}<br />
      ${escapeHtml(SITE.location)}`,
    )}
    ${
      allergies
        ? detailCard(
            "Dietary notes on file",
            `${escapeHtml(allergies)}<br /><span style="color:${FOREST_SOFT};font-size:13px;">Let us know if anything's changed.</span>`,
          )
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
      <tr>
        <td style="padding:0 0 4px;font-family:Georgia, 'Times New Roman', Times, serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};">
          Helpful links
        </td>
      </tr>
      ${linkList()}
    </table>
  `;

  return emailShell({
    eyebrow: "See you soon",
    title: "Almost time!",
    body,
  });
}

export function buildReminderSubject() {
  return `See you soon — ${SITE.couple.displayName}, ${SITE.weddingWeekendDisplay}`;
}
