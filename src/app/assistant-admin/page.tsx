"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { Activity, BarChart3, CheckCircle2, Loader2 } from "lucide-react";

type Metrics = {
  days: number;
  total: number;
  successRate: number;
  byType: Record<string, number>;
  byAction: Record<string, number>;
  byOutcome: Record<string, number>;
  byDay: Array<{ date: string; count: number }>;
};

const actionLabels: Record<string, string> = {
  "number-order": "Дугаар захиалга",
  "package-adviser": "Багц зөвлөх",
  "outage-check": "Саатал шалгах",
  "bill-explain": "Төлбөр тайлбарлах",
  "ticket-create": "Засварын хүсэлт",
  "appointment-book": "Салбарт цаг авах",
  "human-handoff": "Ажилтантай холбох",
};

export default function AssistantAdminPage() {
  const [key, setKey] = useState("");
  const [days, setDays] = useState("30");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadMetrics(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/assistant/metrics?days=${days}`, {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      const data = (await response.json()) as Metrics & { error?: string };
      if (!response.ok) throw new Error(data.error || "Тайлан авч чадсангүй.");
      setMetrics(data);
    } catch (loadError) {
      setMetrics(null);
      setError(
        loadError instanceof Error ? loadError.message : "Тайлан авч чадсангүй."
      );
    } finally {
      setLoading(false);
    }
  }

  const maxDaily = Math.max(1, ...(metrics?.byDay.map((item) => item.count) ?? []));

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Телеком туслахын тайлан</h1>
            <p className="text-sm text-slate-500">Хувийн мэдээлэлгүй хэрэглээний үзүүлэлт</p>
          </div>
        </div>

        <form
          onSubmit={loadMetrics}
          className="mb-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_140px_auto]"
        >
          <input
            type="password"
            autoComplete="off"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder="Админ түлхүүр"
            className="h-11 rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
            required
          />
          <select
            value={days}
            onChange={(event) => setDays(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-blue-500"
          >
            <option value="7">7 хоног</option>
            <option value="30">30 хоног</option>
            <option value="90">90 хоног</option>
          </select>
          <button
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 font-bold text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            Тайлан харах
          </button>
        </form>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {metrics && (
          <div className="space-y-6">
            <section className="grid gap-4 sm:grid-cols-3">
              <MetricCard label="Нийт үйлдэл" value={metrics.total} icon={<Activity size={19} />} />
              <MetricCard label="Амжилтын хувь" value={`${metrics.successRate}%`} icon={<CheckCircle2 size={19} />} />
              <MetricCard label="Амжилттай" value={metrics.byOutcome.success ?? 0} icon={<CheckCircle2 size={19} />} />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-black text-slate-800">Ашигласан боломжууд</h2>
                <div className="space-y-3">
                  {Object.entries(metrics.byAction).length > 0 ? (
                    Object.entries(metrics.byAction)
                      .sort(([, left], [, right]) => right - left)
                      .map(([action, count]) => (
                        <div key={action} className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
                          <span>{actionLabels[action] ?? action}</span>
                          <strong className="text-blue-700">{count}</strong>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-slate-500">Одоогоор үйлдлийн мэдээлэл алга.</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-black text-slate-800">Өдөр тутмын хэрэглээ</h2>
                <div className="flex min-h-52 items-end gap-2 overflow-x-auto pt-5">
                  {metrics.byDay.length > 0 ? (
                    metrics.byDay.map((item) => (
                      <div key={item.date} className="flex min-w-9 flex-1 flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600">{item.count}</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-blue-700 to-cyan-400"
                          style={{ height: `${Math.max(10, (item.count / maxDaily) * 140)}px` }}
                        />
                        <span className="text-[8px] text-slate-400">{item.date.slice(5)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="self-center text-sm text-slate-500">Одоогоор мэдээлэл алга.</p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>
      <strong className="block text-3xl font-black text-slate-900">{value}</strong>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}
