import { redirect } from "next/navigation";
import { SiteUnlockScreen } from "@/components/auth/site-unlock-screen";
import {
  isSiteAuthenticated,
  isSitePasswordConfigured,
} from "@/lib/site-auth";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Private Invitation",
  "Enter the password to view Sarah & Anshul's wedding website.",
);

export const dynamic = "force-dynamic";

function safeNextPath(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  if (value.startsWith("/unlock")) return "/";
  return value;
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  if (await isSiteAuthenticated()) {
    redirect(nextPath);
  }

  return (
    <SiteUnlockScreen
      nextPath={nextPath}
      passwordConfigured={isSitePasswordConfigured()}
    />
  );
}
