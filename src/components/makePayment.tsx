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

  const handleOpenChange = () => {
    setOpen(false);
    onPaymentClose(false);
  };

  const checkPaymentStatus = async () => {
    setLoading(true);
    try {
      const response = await checkPayment({ invoice_id: paymentdata.invoice_id });
      toast({
        title: isEnglish ? "Payment status" : "Төлбөрийн төлөв",
        description: isEnglish
          ? response?.result === "ok"
            ? "The payment has been confirmed."
            : "The payment has not been confirmed yet."
          : response?.message || "Төлбөрийн төлөвийг шалгаж чадсангүй.",
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} defaultOpen>
      <DialogContent className="max-h-[98%] overflow-y-scroll sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle className="text-brand-1">
            {isEnglish ? "Payment" : "Төлбөр төлөлт"}
          </DialogTitle>
        </DialogHeader>

        {paymentdata.qr_image ? (
          <div className="mx-auto text-center">
            <img
              src={`data:image/jpeg;base64,${paymentdata.qr_image}`}
              width={320}
              height={320}
              alt="QPay QR code"
            />
            <Button onClick={checkPaymentStatus}>
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
