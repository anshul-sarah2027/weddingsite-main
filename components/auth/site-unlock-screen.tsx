"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginSite } from "@/actions/site-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LOADER_PENDING_KEY } from "@/components/loader/opening-loader-provider";
import { IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

export function SiteUnlockScreen({
  nextPath,
  passwordConfigured,
}: {
  nextPath: string;
  passwordConfigured: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGES.heroAlt.invitation}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
          quality={85}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.78)_0%,rgba(250,247,242,0.88)_45%,rgba(250,247,242,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,252,247,0.45),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-sm border border-[#B59A63]/28 bg-[rgba(255,252,247,0.92)] px-7 py-11 shadow-[0_24px_70px_rgba(47,58,46,0.1)] backdrop-blur-[4px] md:px-10 md:py-12">
        <span
          className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t border-l border-[#B59A63]/45"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t border-r border-[#B59A63]/45"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#B59A63]/45"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-[#B59A63]/45"
          aria-hidden="true"
        />

        <p className="font-editorial text-editorial text-center text-2xl md:text-[1.75rem]">
          Sarah & Anshul
        </p>
        <h1 className="font-heading mt-3 text-center text-2xl font-medium tracking-[0.16em] text-[#2F3A2E] uppercase">
          Private Invitation
        </h1>
        <p className="font-heading mx-auto mt-4 max-w-xs text-center text-sm leading-relaxed text-[#2F3A2E]/70">
          Enter the password from your invite to open the wedding website. You
          won&apos;t need to enter it again for 24 hours.
        </p>

        {!passwordConfigured ? (
          <p
            className="font-heading mt-8 border border-[#B59A63]/25 bg-[#B59A63]/08 px-4 py-3 text-sm text-[#2F3A2E]/80"
            role="status"
          >
            Add <code className="text-[#B59A63]">DASHBOARD_PASSWORD</code> to
            your <code>.env.local</code>, then restart the server.
          </p>
        ) : (
          <form
            className="mx-auto mt-8 w-full max-w-sm space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              setError(null);
              startTransition(async () => {
                // Force the opening loader on the next marketing page load
                sessionStorage.setItem(LOADER_PENDING_KEY, "1");
                sessionStorage.removeItem("wedding-opening-loader-seen");
                try {
                  const result = await loginSite(password, nextPath);
                  // On success loginSite redirects (throws). Only errors return.
                  if (result && !result.ok) {
                    sessionStorage.removeItem(LOADER_PENDING_KEY);
                    setError(result.error);
                  }
                } catch {
                  // Next.js redirect() throws — treat as success
                  router.refresh();
                }
              });
            }}
          >
            <div>
              <label
                htmlFor="site-password"
                className="font-heading mb-2.5 block text-[0.7rem] tracking-[0.2em] text-forest/78 uppercase"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="site-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={cn(
                    "font-heading h-12 rounded-none border-0 border-b border-[#2F3A2E]/18 bg-transparent pr-11 pl-0 text-base text-forest shadow-none",
                    "focus-visible:border-[#B59A63] focus-visible:ring-0",
                  )}
                  placeholder="Enter invite password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute top-1/2 right-0 inline-flex size-10 -translate-y-1/2 items-center justify-center text-[#2F3A2E]/45 transition-colors hover:text-[#2F3A2E]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="size-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                className="font-heading border border-[#8B3A3A]/20 bg-[#8B3A3A]/06 px-4 py-3 text-sm text-[#8B3A3A]/90"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending || !password}
              className="font-heading h-12 w-full rounded-none bg-forest text-sm tracking-[0.18em] text-[#FAF7F2] uppercase hover:bg-[#2F3A2E] disabled:opacity-40"
            >
              {isPending ? "Opening…" : "Enter website"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
