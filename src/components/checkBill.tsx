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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BiSearch } from "react-icons/bi";
import { checkBill } from "@/api/rest";
import { format_date2 } from "@/lib/helper";
import { translateBillingText, type SiteLocale } from "@/lib/i18n/ui";
import PayBill from "./payBill";

const formSchema = z.object({ id: z.string() });

type BillData = {
  userId?: string;
  type?: string;
  subs?: string;
  accExpireAt?: string;
  chargedMonth?: unknown;
  amount?: {
    amount?: string | number;
    vas?: string | number;
    total?: string | number;
  };
};

type CheckBillProps = {
  open: boolean;
  onModalClose: (open: boolean) => void;
  locale?: SiteLocale;
};

const CheckBill = ({ open: initialOpen, onModalClose, locale = "mn" }: CheckBillProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(initialOpen);
  const [paymentId, setPaymentId] = useState("");
  const [billData, setBillData] = useState<BillData>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: "" },
  });

  const handleOpenChange = () => {
    setOpen(false);
    onModalClose(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await checkBill(values);
      if (response?.result === "ok") {
        setBillData(response.data ?? {});
        return;
      }
      setBillData({});
      toast({
        title: isEnglish ? "Billing information" : "Төлбөрийн мэдээлэл",
        description: isEnglish
          ? "Billing information could not be retrieved. Check the number and try again."
          : response?.message || "Төлбөрийн мэдээллийг авч чадсангүй.",
      });
    } finally {
      setLoading(false);
    }
  }

  const isPrepaid = billData.type === "Урьдчилсан төлбөрт";

  return (
    <div>
      {paymentId ? (
        <PayBill
          user_id={paymentId}
          onCardClose={() => setPaymentId("")}
          locale={locale}
        />
      ) : (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[98%] overflow-y-scroll sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">
                {isEnglish ? "Bill payment" : "Төлбөр"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-gray-600">
                        {isEnglish
                          ? "Enter your service or contract number."
                          : "Та үйлчилгээний эсвэл гэрээний дугаараа оруулна уу."}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          required
                          placeholder={isEnglish ? "Service or contract number" : undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <BiSearch className="mr-1" />
                  {isEnglish ? "Search" : "Хайх"}
                </Button>
              </form>
            </Form>

            {billData.userId && (
              <div className="rounded-2xl border border-brand-1/20 p-4 shadow-sm">
                <h5 className="text-center text-[14px] font-medium uppercase text-brand-2">
                  {isEnglish ? "Billing information" : "Төлбөрийн мэдээлэл"}
                </h5>
                <table className="w-full table-auto text-[14px]">
                  <tbody>
                    <tr>
                      <td className="w-[230px] font-medium text-brand-1">
                        {isEnglish ? "Service number" : "Үйлчилгээний дугаар"}
                      </td>
                      <td className="p-2">{billData.userId}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-brand-1">
                        {isEnglish
                          ? isPrepaid
                            ? "Expiry date"
                            : "Billing period"
                          : isPrepaid
                          ? "Дуусах хугацаа"
                          : "Хамрах хугацаа"}
                      </td>
                      <td className="p-2">
                        {isPrepaid
                          ? billData.accExpireAt
                          : billData.chargedMonth
                          ? format_date2(billData.chargedMonth)
                          : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium text-brand-1">
                        {isEnglish ? "Billing type" : "Төлбөрийн төрөл"}
                      </td>
                      <td className="p-2">
                        {translateBillingText(billData.type, locale)}
                        {billData.subs
                          ? ` / ${translateBillingText(billData.subs, locale)}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium text-brand-1">
                        {isEnglish ? "Base charge" : "Суурь хураамж"}
                      </td>
                      <td className="p-2">{billData.amount?.amount ?? 0}₮</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-brand-1">
                        {isEnglish ? "Additional services" : "Нэмэлт үйлчилгээ"}
                      </td>
                      <td className="p-2">{billData.amount?.vas ?? 0}₮</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-brand-1">
                        {isEnglish ? "TOTAL" : "НИЙТ ТӨЛБӨР"}
                      </td>
                      <td className="p-2 font-semibold">{billData.amount?.total ?? 0}₮</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-2 text-right">
                  <Button
                    className="bg-brand-1 text-sm hover:bg-brand-1/80"
                    onClick={() => setPaymentId(billData.userId ?? "")}
                  >
                    {isEnglish ? "Pay bill" : "Төлбөр төлөх"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CheckBill;
