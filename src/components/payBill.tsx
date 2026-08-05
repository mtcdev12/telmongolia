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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { paymentPay } from "@/api/rest";
import Payment from "./makePayment";
import type { SiteLocale } from "@/lib/i18n/ui";

const formSchema = z.object({
  user_id: z.string(),
  payment: z.string(),
  ebarimt: z.string(),
});

type PayBillProps = {
  user_id: string;
  onCardClose: (open: boolean) => void;
  locale?: SiteLocale;
};

const PayBill = ({ user_id, onCardClose, locale = "mn" }: PayBillProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [paymentData, setPaymentData] = useState<Record<string, unknown>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment: "qpay",
      ebarimt: "personal",
      user_id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await paymentPay(values);
      if (response?.result === "ok") {
        setPaymentData(response.data ?? {});
        return;
      }
      toast({
        title: isEnglish ? "Payment" : "Төлбөр төлөлт",
        description: isEnglish
          ? "The payment request could not be created. Please try again."
          : response?.message || "Төлбөрийн хүсэлт үүсгэж чадсангүй.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {Object.keys(paymentData).length > 0 ? (
        <Payment
          paymentdata={paymentData}
          onPaymentClose={() => setPaymentData({})}
          locale={locale}
        />
      ) : (
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(false);
            onCardClose(false);
          }}
          defaultOpen
        >
          <DialogContent className="max-h-[90%] overflow-y-scroll sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">
                {isEnglish ? "Payment" : "Төлбөр төлөлт"}
              </DialogTitle>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="payment"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-normal text-gray-600">
                          {isEnglish ? "Payment method" : "Төлбөрийн хэлбэр"}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row justify-center gap-2"
                            required
                          >
                            <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
                              <FormControl><RadioGroupItem value="qpay" /></FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img src="/assets/images/qpay.svg" alt="QPay" className="h-[60px] w-[60px] object-contain" />
                                <span>{isEnglish ? "QPay" : "Qpay хялбар төлөлт"}</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
                              <FormControl><RadioGroupItem value="bank" /></FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img src="/assets/images/bank.svg" alt="Bank transfer" className="h-[60px] w-[60px] object-contain" />
                                <span>{isEnglish ? "Bank transfer" : "Банк шилжүүлэг"}</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ebarimt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-gray-600">
                          {isEnglish ? "E-receipt type" : "Ebarimt төрөл"}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row justify-center gap-2"
                            required
                          >
                            <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
                              <FormControl><RadioGroupItem value="personal" /></FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img src="/assets/images/personal.svg" alt="Individual" className="h-[60px] w-[60px] object-contain" />
                                <span>{isEnglish ? "Individual" : "Хувь хэрэглэгч"}</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
                              <FormControl><RadioGroupItem value="business" /></FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img src="/assets/images/corporate.svg" alt="Organization" className="h-[60px] w-[60px] object-contain" />
                                <span>{isEnglish ? "Organization" : "Албан байгууллага"}</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">{isEnglish ? "Continue" : "Үргэлжлүүлэх"}</Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PayBill;
