"use client";

import Link from "next/link";
import { GuideCard, GuideSection } from "@/components/guest-guide/guide-section";
import { guestFaqs, guestFaqsIntro } from "@/constants/guest-guide";

export function GuestFaqs() {
  return (
    <GuideSection
      id="faqs"
      ariaLabel="Frequently Asked Questions"
      eyebrow="Q & A"
      title="Frequently Asked Questions"
      intro={guestFaqsIntro}
      tone="ivory"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {guestFaqs.map((faq) => (
          <GuideCard key={faq.id} className="scroll-mt-32 h-full">
            <div id={`faq-${faq.id}`}>
              <h3 className="font-heading text-lg font-semibold text-[#B59A63] md:text-xl">
                {faq.question}
              </h3>

              <div className="mt-3 space-y-3">
                {faq.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-heading text-base font-medium leading-[1.85] text-[#2F3A2E]/88 md:text-[1.05rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {faq.links && faq.links.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {faq.links.map((link) => (
                    <li key={link.url}>
                      {link.url.startsWith("/") ? (
                        <Link
                          href={link.url}
                          className="font-heading text-base font-medium text-[#B59A63] underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading text-base font-medium text-[#B59A63] underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </GuideCard>
        ))}
      </div>
    </GuideSection>
  );
}
