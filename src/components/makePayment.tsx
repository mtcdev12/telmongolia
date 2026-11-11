"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { checkPayment } from "@/api/rest";
import { BiCopyAlt } from "react-icons/bi";
import type { SiteLocale } from "@/lib/i18n/ui";

type PaymentProps = {
  paymentdata: Record<string, any>;
  onPaymentClose: (open: boolean) => void;
  locale?: SiteLocale;
  bankAppsBelowQr?: boolean;
  returnAfterSuccess?: boolean;
};

const Payment = ({ paymentdata, onPaymentClose, locale = "mn", bankAppsBelowQr = false, returnAfterSuccess = false }: PaymentProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const isDigiPay = paymentdata.payment_method === "digipay";

  const handleOpenChange = () => {
    setOpen(false);
    onPaymentClose(false);
  };

  const checkPaymentStatus = async () => {
    setLoading(true);
    try {
      const response = await checkPayment({
        invoice_id: paymentdata.invoice_id,
        ...(isDigiPay ? { payment: "digipay" } : {}),
      });
      if (returnAfterSuccess && response?.result === "ok") {
        setPaymentSucceeded(true);
        return;
      }
      toast({
        title: isEnglish ? "Payment status" : "Төлбөрийн төлөв",
        description: isEnglish
          ? response?.result === "ok"
            ? "The payment has been confirmed."
            : "The payment has not been confirmed yet."
          : response?.message || "Төлбөрийн төлөвийг шалгаж чадсангүй.",
      });
    } catch {
      toast({
        title: isEnglish ? "Payment status" : "Төлбөрийн төлөв",
        description: isEnglish
          ? "Could not check the payment. Please try again."
          : "Төлбөрийн төлөв шалгаж чадсангүй. Дахин оролдоно уу.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copier = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: isEnglish ? "Copied" : "Амжилттай хуулагдлаа!",
      description: text,
    });
  };

  const account = paymentdata.account ?? {};
  const bankApps = Array.isArray(paymentdata.urls)
    ? paymentdata.urls.filter((app: unknown): app is {
        name: string; description?: string; logo?: string; link: string;
      } => {
        if (!app || typeof app !== "object") return false;
        const item = app as Record<string, unknown>;
        return typeof item.name === "string" && typeof item.link === "string"
          && /^[a-z][a-z0-9+.-]*:\/\//i.test(item.link)
          && !/^(javascript|data|file|vbscript):/i.test(item.link)
          && (!bankAppsBelowQr || !/^qpaywallet:/i.test(item.link));
      })
    : [];

  return (
    <Dialog open={open} onOpenChange={paymentSucceeded ? undefined : handleOpenChange} defaultOpen>
      <DialogContent
        className={`max-h-[98%] overflow-y-scroll sm:max-w-[525px] ${paymentSucceeded ? "[&>button]:hidden" : ""}`}
        onEscapeKeyDown={paymentSucceeded ? (event) => event.preventDefault() : undefined}
        onPointerDownOutside={paymentSucceeded ? (event) => event.preventDefault() : undefined}
      >
        {loading && !returnAfterSuccess && <Loader />}
        {!paymentSucceeded && (
          <DialogHeader>
            <DialogTitle className="text-brand-1">
              {isEnglish ? "Payment" : "Төлбөр төлөлт"}
            </DialogTitle>
          </DialogHeader>
        )}

        {paymentSucceeded ? (
          <div className="flex flex-col items-center gap-6 px-2 py-10 text-center sm:py-14">
            <div aria-hidden="true" className="grid h-24 w-24 place-items-center rounded-full border border-green-100 bg-green-50">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-green-600 text-white">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
            </div>
            <div role="status">
              <DialogTitle className="text-xl font-semibold text-slate-900 sm:text-2xl">
                {isEnglish ? "Payment successful" : "Төлбөр амжилттай төлөгдлөө"}
              </DialogTitle>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                {isEnglish ? "Thank you for choosing us." : "Манайхыг сонгон үйлчлүүлсэн танд баярлалаа."}
              </p>
            </div>
            <Button variant="outline" className="h-11 min-w-[9rem] rounded-full bg-slate-50 px-6 font-semibold" onClick={handleOpenChange}>
              {isEnglish ? "Done" : "Дуусгах"}
            </Button>
          </div>
        ) : isDigiPay ? (
          <div className="space-y-4 text-center">
            <p>
              {isEnglish
                ? "Open Digi Pay on your phone to approve this payment."
                : "Digi Pay апп суусан утсан дээр доорх товчийг дарж төлбөрөө баталгаажуулна уу."}
            </p>
            <a
              href={String(paymentdata.deeplink ?? "")}
              className="inline-flex items-center justify-center rounded-md bg-brand-1 px-4 py-2 text-white hover:bg-brand-1/90"
            >
              {isEnglish ? "Open Digi Pay" : "Digi Pay апп нээх"}
            </a>
            <p className="break-all text-sm text-gray-600">
              {isEnglish ? "Invoice" : "Нэхэмжлэхийн дугаар"}: {String(paymentdata.invoice_id ?? "")}
            </p>
            <Button onClick={checkPaymentStatus} disabled={loading}>
              {isEnglish ? "Check payment" : "Төлбөр шалгах"}
            </Button>
          </div>
        ) : paymentdata.qr_image ? (
          <div className={bankAppsBelowQr ? "flex flex-col gap-4 text-center" : "space-y-4 text-center"}>
            {bankApps.length > 0 && (
              <div className={bankAppsBelowQr ? "order-1 space-y-3" : "space-y-3"}>
                <h5 className="font-semibold text-brand-1">
                  {isEnglish ? "Pay with your bank app" : "Банкны апп-аар төлөх"}
                </h5>
                {!bankAppsBelowQr && (
                  <p className="text-sm text-gray-600">
                    {isEnglish
                      ? "On your phone, select an installed app. On a computer, scan the QR code with your bank app."
                      : "Утсан дээрээ ашигладаг банкны апп-аа сонгоно уу. Компьютероос төлөх бол банкны апп-аараа QR кодыг уншуулна уу."}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {bankApps.map((app: { name: string; description?: string; logo?: string; link: string }) => (
                    <a
                      key={app.link}
                      href={app.link}
                      className="flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-xl border p-2 text-xs hover:border-brand-1 hover:bg-brand-2/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-1"
                    >
                      {app.logo && /^https:\/\//i.test(app.logo) && (
                        <img src={app.logo} alt="" className="h-10 w-10 rounded-lg object-contain" />
                      )}
                      <span>{app.description || app.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600">
              {isEnglish ? "Scan with a QPay-enabled bank app" : "QPay дэмждэг банкны апп-аар QR кодыг уншуулна уу"}
            </p>
            <img
              className="mx-auto h-auto max-w-full"
              src={`data:image/png;base64,${paymentdata.qr_image}`}
              width={320}
              height={320}
              alt="QPay QR code"
            />
            <Button className={bankAppsBelowQr ? "order-2" : undefined} onClick={checkPaymentStatus} disabled={loading}>
              {loading && returnAfterSuccess ? (
                <span role="status" className="inline-flex items-center gap-2">
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  {isEnglish ? "Checking payment…" : "Төлбөр шалгаж байна…"}
                </span>
              ) : isEnglish ? "Check payment" : "Төлбөр шалгах"}
            </Button>
          </div>
        ) : (
          <div>
            <h5 className="my-2 text-center font-semibold text-brand-1">
              {isEnglish ? "Bank transfer" : "Банк шилжүүлэг"}
            </h5>
            <table className="table">
              <tbody>
                <BankRow
                  label={isEnglish ? "Khan Bank" : "Хаан банк"}
                  prefix="MN 78000500"
                  value={account.khaan_bank}
                  onCopy={copier}
                />
                <BankRow
                  label={isEnglish ? "State Bank" : "Төрийн банк"}
                  prefix="MN 910034"
                  value={account.state_bank}
                  onCopy={copier}
                />
                <BankRow
                  label={isEnglish ? "Golomt Bank" : "Голомт банк"}
                  prefix="MN 06001500"
                  value={account.golomt_bank}
                  onCopy={copier}
                />
                <CopyRow
                  label={isEnglish ? "Amount" : "Төлөх дүн"}
                  value={String(paymentdata.amount ?? "")}
                  onCopy={copier}
                />
                <CopyRow
                  label={isEnglish ? "Transaction reference" : "Гүйлгээний утга"}
                  value={String(paymentdata.trans_desc ?? "")}
                  onCopy={copier}
                />
              </tbody>
            </table>
            <div className="mt-2 border border-brand-1/60 bg-brand-2/30 p-2 text-sm">
              {isEnglish
                ? "Your payment receipt will be sent to the email address registered with your account."
                : "Таны төлбөрийн баримтын мэдээлэл манай системд бүртгэлтэй байгаа цахим шуудангийн хаяг руу илгээгдэнэ."}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function BankRow({
  label,
  prefix,
  value,
  onCopy,
}: {
  label: string;
  prefix: string;
  value: unknown;
  onCopy: (value: string) => void;
}) {
  const text = String(value ?? "");
  return (
    <tr>
      <td className="bg-yellow-100 text-brand-1">{label}</td>
      <td className="text-center">
        {prefix}<br />
        {text}
        <BiCopyAlt
          className="float-right cursor-pointer text-[20px]"
          onClick={() => onCopy(`${prefix.replace(/\s/g, "")}${text}`)}
          aria-label={`Copy ${label} account`}
        />
      </td>
    </tr>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
}) {
  return (
    <tr>
      <td>{label}</td>
      <td className="text-center">
        {value}
        <BiCopyAlt
          className="float-right cursor-pointer text-[20px]"
          onClick={() => onCopy(value)}
          aria-label={`Copy ${label}`}
        />
      </td>
    </tr>
  );
}

export default Payment;
