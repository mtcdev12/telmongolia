import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const directHost = (request.headers.get("host") || "").split(":")[0];
  const proxyHost = (forwardedHost || "").split(":")[0];
  const isWwwHost = [directHost, proxyHost].includes("www.telecommongolia.mn");

  // Apache owns the HTTP-to-HTTPS redirect. Canonicalize only the www host
  // here because the proxy reports its internal hop as HTTP even for HTTPS.
  if (isWwwHost) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.host = "telecommongolia.mn";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

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
