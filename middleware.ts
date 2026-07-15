import { NextResponse, type NextRequest } from "next/server";
import { SITE_GATE_COOKIE, verifySiteSessionToken } from "@/lib/site-auth-token";

function isPublicPath(pathname: string) {
  if (pathname === "/unlock") return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api/health")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/robots.txt") return true;
  if (pathname === "/sitemap.xml") return true;
  if (
    /\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf|css|js|map)$/i.test(
      pathname,
    )
  ) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const password = process.env.DASHBOARD_PASSWORD?.trim();
  if (!password) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SITE_GATE_COOKIE)?.value;
  const ok = await verifySiteSessionToken(password, token);

  if (ok) {
    return NextResponse.next();
  }

  const unlockUrl = request.nextUrl.clone();
  unlockUrl.pathname = "/unlock";
  unlockUrl.search = "";
  const next = `${pathname}${search}`;
  if (next && next !== "/") {
    unlockUrl.searchParams.set("next", next);
  }

  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf)$).*)",
  ],
};
