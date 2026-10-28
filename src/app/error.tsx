"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Хуудсыг ачаалж чадсангүй</h1>
      <p className="mt-3 text-slate-600">Түр зуурын алдаа гарлаа. Дахин оролдоно уу.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">
        Дахин оролдох
      </button>
    </section>
  );
}
