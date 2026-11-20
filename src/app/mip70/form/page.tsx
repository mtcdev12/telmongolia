import type { Metadata } from "next";
import { headers } from "next/headers";
import Mip70Payment from "@/components/mip70-payment";
import { logLimeRequest, verifyFromSearchParams } from "@/lib/lime/pay-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MIP70 цэнэглэх | Монголын Цахилгаан Холбоо",
  robots: { index: false, follow: false },
};

export default function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const params = new URLSearchParams();
  for (const key of ["acc", "ts", "sig"]) {
    const value = searchParams[key];
    if (typeof value === "string") params.set(key, value);
  }
  const result = verifyFromSearchParams(params);
  const h = headers();
  logLimeRequest({
    pathname: "/mip70/form",
    searchParams: params,
    userAgent: h.get("user-agent"),
    referer: h.get("referer"),
    result,
  });
  // Never render the form for an unverified request. (/mip70/pay is the
  // entry point that answers invalid links with HTTP 403.)
  if (!result.ok) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center text-slate-900">
        <section role="alert" className="max-w-md rounded-2xl border bg-white p-6">
          <h1 className="text-xl font-bold">Холбоос хүчингүй</h1>
          <p className="mt-3 text-slate-600">Холбоос хүчингүй. LIME app-аас дахин оролдоно уу.</p>
        </section>
      </div>
    );
  }
  return <Mip70Payment acc={result.acc} />;
}
