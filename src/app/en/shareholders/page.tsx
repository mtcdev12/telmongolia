import Breadcrumb from "@/components/ui/breadcrumb";

export default function EnglishShareholdersPage() {
  return (
    <div className="pb-10">
      <Breadcrumb locale="en" data={["Shareholders", "Annual General Meeting"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">2026 Annual General Meeting of Shareholders</h1>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 shadow-sm">
        <dl className="grid gap-5 md:grid-cols-[220px_1fr]">
          <dt className="font-bold text-brand-1">Meeting date and time</dt><dd>29 April 2026 at 11:00</dd>
          <dt className="font-bold text-brand-1">Venue</dt><dd>Meeting hall of Information Communication Network LLC, 4th floor, Peace Avenue 1, Chingeltei District, Ulaanbaatar 15160</dd>
          <dt className="font-bold text-brand-1">Record date</dt><dd>9 April 2026</dd>
          <dt className="font-bold text-brand-1">Meeting materials</dt><dd>Available from 10 April 2026</dd>
        </dl>
      </section>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 shadow-sm">
        <h2 className="text-lg font-bold text-brand-1">Agenda</h2>
        <ol className="mt-4 list-inside list-decimal space-y-2">
          <li>Approval of the Board's conclusion on the company's 2025 operational and financial reports, including the operating report, Board report, dividend report and audited financial statements.</li>
          <li>Presentation of the Board resolution on dividend distribution.</li>
          <li>Election and release of members of the Board of Directors.</li>
          <li>Approval of the Board of Directors' 2026 expense budget.</li>
        </ol>
      </section>
      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7"><h2 className="font-bold text-brand-1">Meeting organizing committee</h2><p className="mt-2">Chair: Ch. Tsogtgerel<br />Members: Kh. Tsetsegmaa, G. Batnasan<br />Phone: 7010 2210, 7010 2390<br />Email: batnasan@mtcone.net, tsetsegmaa@mtcone.net, ch.tsogtgerel@mtcone.net</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7"><h2 className="font-bold text-brand-1">Counting commission</h2><p className="mt-2">Chair: T. Byambasuren<br />Members: B. Dagvadorj, E. Bulganchimeg<br />Phone: 7010 2211, 7010 2305<br />Email: planning@mtcone.net, bulganchimeg@mtcone.net, dagvadorj@mtcone.net</p></div>
      </section>
    </div>
  );
}
