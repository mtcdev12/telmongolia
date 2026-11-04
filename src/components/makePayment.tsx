"use client";

import { useState } from "react";
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
};

const Payment = ({ paymentdata, onPaymentClose, locale = "mn" }: PaymentProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
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
          && !/^(javascript|data|file|vbscript):/i.test(item.link);
      })
    : [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} defaultOpen>
      <DialogContent className="max-h-[98%] overflow-y-scroll sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle className="text-brand-1">
            {isEnglish ? "Payment" : "Төлбөр төлөлт"}
          </DialogTitle>
        </DialogHeader>

        {isDigiPay ? (
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
          <div className="space-y-4 text-center">
            {bankApps.length > 0 && (
              <div className="space-y-3">
                <h5 className="font-semibold text-brand-1">
                  {isEnglish ? "Pay with your bank app" : "Банкны апп-аар төлөх"}
                </h5>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? "On your phone, select an installed app. On a computer, scan the QR code with your bank app."
                    : "Утсан дээрээ ашигладаг банкны апп-аа сонгоно уу. Компьютероос төлөх бол банкны апп-аараа QR кодыг уншуулна уу."}
                </p>
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
            <Button onClick={checkPaymentStatus} disabled={loading}>
              {isEnglish ? "Check payment" : "Төлбөр шалгах"}
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
