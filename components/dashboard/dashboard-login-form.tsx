"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loginDashboard } from "@/actions/dashboard-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="mx-auto w-full max-w-sm space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);
        startTransition(async () => {
          const result = await loginDashboard(password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          router.refresh();
        });
      }}
    >
      <div>
        <label
          htmlFor="dashboard-password"
          className="font-heading mb-2.5 block text-[0.7rem] tracking-[0.2em] text-forest/55 uppercase"
        >
          Password
        </label>
        <Input
          id="dashboard-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="font-heading h-12 rounded-none border-0 border-b border-[#2F3A2E]/18 bg-transparent px-0 text-base text-forest shadow-none focus-visible:border-[#B59A63] focus-visible:ring-0"
          placeholder="Enter dashboard password"
          required
        />
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
        {isPending ? "Opening…" : "Enter dashboard"}
      </Button>
    </form>
  );
}
