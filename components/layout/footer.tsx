import Link from "next/link";
import { Container } from "@/components/layout/container";
import { footerNavigation } from "@/constants/navigation";
import { SITE, WEDDING } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-forest text-ivory">
      <Container className="section-padding-sm">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl">{SITE.name}</p>
            <p className="mt-3 text-caption text-ivory/70">
              {SITE.weddingDateDisplay}
              <br />
              {WEDDING.venue}, {WEDDING.region}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:text-right">
            <p className="text-editorial text-ivory/90">
              &ldquo;We can&apos;t wait to share this journey with you.&rdquo;
            </p>
            <p className="mt-4 text-caption text-ivory/50">
              With love, {SITE.couple.groom} & {SITE.couple.bride}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 md:flex-row">
          <p className="text-caption text-ivory/40">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-caption text-ivory/40">Kumarakom, Kerala</p>
        </div>
      </Container>
    </footer>
  );
}
