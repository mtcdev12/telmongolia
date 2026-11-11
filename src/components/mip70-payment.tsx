"use client";

import { useEffect, useState } from "react";
import { cardBuy, getCards } from "@/api/rest";
import Payment from "@/components/makePayment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MipCard = { TYPE: string; PREFIX: string; PRICE: string; CARD_TYPE: string; DAYS?: string };

export default function Mip70Payment() {
  const [number, setNumber] = useState("");
  const [cards, setCards] = useState<MipCard[]>([]);
  const [prefix, setPrefix] = useState("");
  const [receipt, setReceipt] = useState("personal");
  const [loadingCards, setLoadingCards] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<Record<string, unknown> | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("number");
    if (value && /^7008\d{4}$/.test(value)) setNumber(value);
  }, []);

  useEffect(() => {
    let active = true;
    setLoadingCards(true);
    setError("");
    getCards().then((response) => {
      if (!active) return;
      const available: MipCard[] = Array.isArray(response?.data)
        ? response.data.filter((card: MipCard) => card.TYPE === "MIP" && card.PREFIX && Number(card.PRICE) > 0 && Number(card.PRICE) !== 25000)
        : [];
      if (!available.length) throw new Error("MIP70 цэнэглэх дүнг ачаалж чадсангүй.");
      available.sort((a, b) => Number(a.PRICE) - Number(b.PRICE));
      setCards(available);
      setPrefix(available[0].PREFIX);
    }).catch(() => {
      if (active) setError("MIP70 цэнэглэх дүнг ачаалж чадсангүй. Дахин оролдоно уу.");
    }).finally(() => {
      if (active) setLoadingCards(false);
    });
    return () => { active = false; };
  }, [attempt]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const card = cards.find((item) => item.PREFIX === prefix && item.TYPE === "MIP");
    if (!/^7008\d{4}$/.test(number.trim()) || !card) {
      setError("7008-аар эхэлсэн 8 оронтой MIP70 дугаар болон цэнэглэх дүнгээ шалгана уу.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await cardBuy({
        type: "recharge", number: number.trim(), payment: "qpay",
        email: "", ebarimt: receipt, card_type: "MIP", prefix: card.PREFIX,
      });
      if (response?.result !== "ok" || !response.data?.invoice_id || !response.data?.qr_image) {
        throw new Error(response?.message || "Төлбөрийн нэхэмжлэх үүсгэж чадсангүй.");
      }
      setPayment(response.data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Төлбөрийн үйлчилгээтэй холбогдож чадсангүй. Дахин оролдоно уу.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-brand-1">Монголын Цахилгаан Холбоо ХК</p>
        <h1 className="mt-2 text-2xl font-bold">MIP70 цэнэглэх</h1>
        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="mip70-number" className="mb-2 block text-sm font-medium">MIP70 дугаар</label>
            <Input id="mip70-number" type="tel" inputMode="numeric" autoComplete="tel-national"
              placeholder="7008XXXX" pattern="7008[0-9]{4}" maxLength={8} required
              value={number} onChange={(event) => setNumber(event.target.value.replace(/[^0-9]/g, ""))} />
          </div>
          <div>
            <label htmlFor="mip70-amount" className="mb-2 block text-sm font-medium">Цэнэглэх дүн</label>
            <select id="mip70-amount" value={prefix} onChange={(event) => setPrefix(event.target.value)}
              required disabled={loadingCards || !cards.length || submitting}
              className="h-11 w-full rounded-md border bg-white px-3 text-sm">
              {!cards.length && <option value="">{loadingCards ? "Ачаалж байна…" : "Дүн олдсонгүй"}</option>}
              {cards.map((card) => <option key={card.PREFIX} value={card.PREFIX}>
                {Number(card.PRICE).toLocaleString("en-US")}₮ — {card.CARD_TYPE}
              </option>)}
            </select>
          </div>
          <div>
            <label htmlFor="mip70-receipt" className="mb-2 block text-sm font-medium">Ebarimt төрөл</label>
            <select id="mip70-receipt" value={receipt} onChange={(event) => setReceipt(event.target.value)}
              className="h-11 w-full rounded-md border bg-white px-3 text-sm">
              <option value="personal">Хувь хэрэглэгч</option>
              <option value="business">Албан байгууллага</option>
            </select>
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {!loadingCards && !cards.length
            ? <Button type="button" className="w-full" onClick={() => setAttempt((value) => value + 1)}>Дахин оролдох</Button>
            : <Button type="submit" className="w-full" disabled={submitting || loadingCards || !cards.length}>
                {submitting ? "Нэхэмжлэх үүсгэж байна…" : "Төлбөр төлөх"}
              </Button>}
        </form>
      </section>
      {payment && <Payment paymentdata={payment} bankAppsBelowQr returnAfterSuccess onPaymentClose={() => setPayment(null)} />}
    </div>
  );
}
