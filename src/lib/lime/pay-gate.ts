import {
  loadVerifierFromEnv,
  verifyWebviewParams,
  type VerifyResult,
  type WebviewVerifier,
} from "./webview-auth";

/** Mask the signature so logs never contain a replayable value. */
export function maskedQuery(searchParams: URLSearchParams) {
  const out: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    out[key] = key === "sig" ? `***(len=${value.length})` : value;
  });
  return out;
}

export function logLimeRequest(info: {
  pathname: string;
  searchParams: URLSearchParams;
  userAgent: string | null;
  referer: string | null;
  result?: VerifyResult;
}) {
  console.log(
    "[lime-webview]",
    JSON.stringify({
      pathname: info.pathname,
      query: maskedQuery(info.searchParams),
      userAgent: info.userAgent,
      referer: info.referer,
      ...(info.result ? { verified: info.result.ok, reason: info.result.ok ? undefined : info.result.reason } : {}),
    }),
  );
}

export function verifyFromSearchParams(
  searchParams: URLSearchParams,
  verifier: WebviewVerifier | null = loadVerifierFromEnv(),
  nowSeconds?: number,
) {
  return verifyWebviewParams(
    { acc: searchParams.get("acc"), ts: searchParams.get("ts"), sig: searchParams.get("sig") },
    verifier,
    nowSeconds,
  );
}

const INVALID_LINK_HTML = `<!doctype html>
<html lang="mn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Холбоос хүчингүй</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;color:#0f172a;font-family:system-ui,sans-serif}
main{max-width:28rem;margin:1rem;padding:1.5rem;background:#fff;border:1px solid #e2e8f0;border-radius:1rem;text-align:center}
h1{font-size:1.25rem;margin:0 0 .75rem}p{margin:0;color:#475569}</style></head>
<body><main><h1>Холбоос хүчингүй</h1><p>Холбоос хүчингүй. LIME app-аас дахин оролдоно уу.</p></main></body></html>`;

export function invalidLinkResponse() {
  return new Response(INVALID_LINK_HTML, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/**
 * GET /mip70/pay. Invalid link -> 403 page. Valid link -> 302 to the form
 * page (which re-verifies), so an unverified request never receives the form.
 */
export function handleMip70PayRequest(
  request: Request,
  deps: { verifier?: WebviewVerifier | null; nowSeconds?: number } = {},
) {
  const url = new URL(request.url);
  const result = verifyFromSearchParams(
    url.searchParams,
    deps.verifier === undefined ? loadVerifierFromEnv() : deps.verifier,
    deps.nowSeconds,
  );
  logLimeRequest({
    pathname: url.pathname,
    searchParams: url.searchParams,
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    result,
  });
  if (!result.ok) return invalidLinkResponse();
  const qs = new URLSearchParams({
    acc: url.searchParams.get("acc")!,
    ts: url.searchParams.get("ts")!,
    sig: url.searchParams.get("sig")!.replace(/ /g, "+"),
  });
  return new Response(null, {
    status: 302,
    headers: { Location: `/mip70/form?${qs.toString()}`, "Cache-Control": "no-store" },
  });
}
