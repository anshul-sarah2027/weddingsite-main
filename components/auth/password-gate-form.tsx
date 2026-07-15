"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordGateFormProps = {
  onLogin: (password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  /** Where to send the guest after a successful unlock */
  redirectTo?: string;
  submitLabel: string;
  pendingLabel?: string;
  placeholder?: string;
  inputId?: string;
};

export function PasswordGateForm({
  onLogin,
  redirectTo,
  submitLabel,
  pendingLabel = "Opening…",
  placeholder = "Enter password",
  inputId = "gate-password",
}: PasswordGateFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="mx-auto w-full max-w-sm space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);
        startTransition(async () => {
          const result = await onLogin(password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          if (redirectTo) {
            router.replace(redirectTo);
            router.refresh();
            return;
          }
          router.refresh();
        });
      }}
    >
      <div>
        <label
          htmlFor={inputId}
          className="font-heading mb-2.5 block text-[0.7rem] tracking-[0.2em] text-forest/78 uppercase"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id={inputId}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={cn(
              "font-heading h-12 rounded-none border-0 border-b border-[#2F3A2E]/18 bg-transparent pr-11 pl-0 text-base text-forest shadow-none",
              "focus-visible:border-[#B59A63] focus-visible:ring-0",
            )}
            placeholder={placeholder}
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
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
