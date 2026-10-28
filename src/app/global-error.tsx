"use client";

import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => console.error(error), [error]);

  return (
    <html lang="mn">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "sans-serif" }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <h1 style={{ fontSize: 26, marginBottom: 12 }}>Сайтыг ачаалж чадсангүй</h1>
            <p style={{ color: "#475569", marginBottom: 24 }}>Түр зуурын алдаа гарлаа. Хуудсыг дахин ачаална уу.</p>
            <button type="button" onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 8, background: "#1d4ed8", color: "white", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}>
              Хуудсыг дахин ачаалах
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
