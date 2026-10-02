import type { NextRequest } from "next/server";

const TRUSTED_HOSTNAMES = new Set([
  "telecommongolia.mn",
  "www.telecommongolia.mn",
  "localhost",
  "127.0.0.1",
]);

/**
 * Accept same-site browser requests even when Next.js is behind Apache.
 * Apache may expose its internal upstream as request.nextUrl.origin while the
 * browser sends the public origin, so compare against explicit public hosts.
 */
export function isTrustedBrowserRequest(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      TRUSTED_HOSTNAMES.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}
