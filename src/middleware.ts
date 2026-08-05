import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/" &&
    request.cookies.get("site-language")?.value === "en"
  ) {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-site-locale",
    request.nextUrl.pathname === "/en" ||
      request.nextUrl.pathname.startsWith("/en/")
      ? "en"
      : "mn"
  );

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
