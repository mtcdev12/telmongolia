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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { cardBuy } from "@/api/rest";
import Payment from "./makePayment";
import { translateCardText, type SiteLocale } from "@/lib/i18n/ui";

const formSchema = z.object({
  type: z.string(),
  number: z.string().optional(),
  payment: z.string(),
  email: z.string(),
  ebarimt: z.string(),
  card_type: z.string(),
  prefix: z.string(),
});

type SelectedCardProps = {
  card: Record<string, any>;
  onCardClose: (open: boolean) => void;
  locale?: SiteLocale;
};

const SelectedCard = ({ card, onCardClose, locale = "mn" }: SelectedCardProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [paymentData, setPaymentData] = useState<Record<string, unknown>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "buycard",
      number: "",
      payment: "qpay",
      email: "",
      ebarimt: "personal",
      card_type: card.TYPE,
      prefix: card.PREFIX,
    },
  });
  const deliveryType = form.watch("type");

  const handleOpenChange = () => {
    setOpen(false);
    onCardClose(false);
  };

  const typeName = (raw: string) => {
    if (raw === "ALL") return isEnglish ? "Standard" : "Энгийн";
    if (raw === "MIP") return "MIP70";
    return isEnglish ? "International" : "Олон улсын";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await cardBuy(values);
      if (response?.result === "ok") {
        setPaymentData(response.data);
        return;
      }
      toast({
        title: isEnglish ? "Card order" : "Картын захиалга",
        description: isEnglish
          ? "The card order could not be processed. Please try again."
          : response?.message || "Картын захиалгыг боловсруулах боломжгүй байна.",
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
        <Dialog open={open} onOpenChange={handleOpenChange} defaultOpen>
          <DialogContent className="max-h-[98%] overflow-y-scroll sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">
                {isEnglish ? "Selected card" : "Сонгосон карт"}
              </DialogTitle>
              <div className="py-6">
                <table>
                  <tbody>
                    <tr>
                      <td className="w-[140px] font-semibold">
                        {isEnglish ? "Type" : "Төрөл"}
                      </td>
                      <td>{typeName(card.TYPE)}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">{isEnglish ? "Price" : "Үнэ"}</td>
                      <td>{card.PRICE}₮</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">
                        {isEnglish ? "Description" : "Тайлбар"}
                      </td>
                      <td>{translateCardText(card.CARD_TYPE, locale)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-gray-600">
                          {isEnglish ? "Card delivery method" : "Карт авах хэлбэр"}
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={isEnglish ? "Choose a method" : "Карт авах хэлбэр"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {card.TYPE !== "IDD" && (
                              <SelectItem value="recharge">
                                {isEnglish ? "Recharge directly" : "Шууд цэнэглэх"}
                              </SelectItem>
                            )}
                            <SelectItem value="buycard">
                              {isEnglish ? "Receive a card code" : "Картаар авах"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {deliveryType === "recharge" && (
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal text-gray-600">
                            {isEnglish ? "Telephone number to recharge" : "Цэнэглэх утасны дугаар"}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

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
                              <FormControl>
                                <RadioGroupItem value="qpay" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img
                                  src="/assets/images/qpay.svg"
                                  alt="QPay"
                                  className="h-[60px] w-[60px] object-contain"
                                />
                                <span>{isEnglish ? "QPay" : "Qpay хялбар төлөлт"}</span>
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
                              <FormControl>
                                <RadioGroupItem value="personal" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
                                <img src="/assets/images/personal.svg" alt="Individual" className="h-[60px] w-[60px] object-contain" />
                                <span>{isEnglish ? "Individual" : "Хувь хэрэглэгч"}</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
                              <FormControl>
                                <RadioGroupItem value="business" />
                              </FormControl>
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

                  {deliveryType === "buycard" && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal text-gray-600">
                            {isEnglish ? "Email address" : "Цахим шуудангийн хаяг"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              required
                              placeholder={
                                isEnglish
                                  ? "Email address for receiving the card code"
                                  : "Картын дугаар хүлээн авах email хаяг"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit">
                    {isEnglish ? "Continue" : "Үргэлжлүүлэх"}
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SelectedCard;
