import { NextResponse, type NextRequest } from "next/server";

// Kept inline: proxy should not rely on shared app modules.
const DEFAULT_LOCALE = "ar";
const OTHER_LOCALES = ["en"];

/**
 * Arabic is served at "/" (rewritten to /ar internally), English at "/en".
 * "/ar" itself redirects to "/" so each page has a single public URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (OTHER_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension (images, icons…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
