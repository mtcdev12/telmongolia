import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const selectedLocale = locale === "en" ? "en" : "mn";
  const requestedPath = request.nextUrl.searchParams.get("returnTo") ?? "";
  const isSafePath = /^\/[A-Za-z0-9/_-]*$/.test(requestedPath) && !requestedPath.startsWith("//");
  const matchesLocale = selectedLocale === "en"
    ? requestedPath === "/en" || requestedPath.startsWith("/en/")
    : requestedPath !== "/en" && !requestedPath.startsWith("/en/");
  const destinationPath = isSafePath && matchesLocale ? requestedPath : selectedLocale === "en" ? "/en" : "/";
  const destination = new URL(destinationPath, request.url);
  const response = NextResponse.redirect(destination, 303);

  response.cookies.set("site-language", selectedLocale, {
    httpOnly: false,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
  });
  response.headers.set("Cache-Control", "no-store");

  return response;
}
