import { useEffect, useState } from "react";
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
import { getPaymentMethods, paymentPay } from "@/api/rest";
import Payment from "./makePayment";

const formSchema = z.object({
  user_id: z.string(),
  payment: z.string(),
  ebarimt: z.string(),
});

const PayBill = (props:any) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const [paymentData, setPaymentData] = useState({});
    const [digipayAvailable, setDigipayAvailable] = useState(false);

    useEffect(() => {
      let mounted = true;
      getPaymentMethods().then((methods) => {
        if (mounted) setDigipayAvailable(methods.digipay);
      });
      return () => { mounted = false; };
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          payment: "qpay",
          ebarimt: "personal",
          user_id: props.user_id
        },
      });
    
      const handleOpenChange = () => {
        setOpen(false);
        props.onCardClose(false);
      };

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        setLoading(true);
        const res = await paymentPay(values);
        setLoading(false);
        if (res?.["result"] === "ok") {
          setPaymentData(res['data']);
        }else{
          toast({
            title: "Payment",
            description: res?.["message"] || "Төлбөрийн нэхэмжлэх үүсгэж чадсангүй.",
          });
        }
      }
      const closePayment = () => {
        setPaymentData({});
      };
    return (
        <div>
        {Object.keys(paymentData).length > 0 ? (
          <Payment paymentdata={paymentData} onPaymentClose={closePayment} />
        ) : (
          <Dialog
            open={open}
            onOpenChange={() => handleOpenChange()}
            defaultOpen={true}
          >
            <DialogContent className="sm:max-w-[525px] max-h-[90%] overflow-y-scroll">
              {loading && <Loader />}
              <DialogHeader>
                <DialogTitle className="text-brand-1">Төлбөр төлөлт</DialogTitle>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
      
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-gray-600 font-normal">
                            Төлбөрийн хэлбэр
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row flex-wrap gap-2 justify-center"
                              required
                            >
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="qpay" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/qpay.svg"
                                    className="h-[60px] w-[60px] object-contain"
                                  />
                                  <span>Qpay хялбар төлөлт</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="bank" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/bank.svg"
                                    className="h-[60px] w-[60px] object-contain"
                                  />
                                  <span>Банк шилжүүлэг</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="digipay" disabled={!digipayAvailable} />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/digipay.png"
                                    alt="Digi Pay"
                                    className="h-[60px] w-[60px] rounded-xl object-contain"
                                  />
                                  <span>{digipayAvailable ? "ХААН Банкны Digi Pay" : "Digi Pay · Идэвхжээгүй"}</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          {!digipayAvailable && (
                            <div className="text-center text-sm text-gray-600 space-y-2">
                              <p>Утаснаасаа апп нээгдэх эсэхийг шалгаж болно. Энэ нь төлбөр хийхгүй.</p>
                              <a
                                href="digipay://payment/TEST"
                                className="inline-flex items-center justify-center rounded-md border border-emerald-600 px-3 py-2 font-medium text-emerald-700"
                              >
                                Digi Pay апп нээж турших
                              </a>
                              <p className="text-xs">Апп нээгдсэний дараа туршилтын нэхэмжлэх олдохгүй гэсэн алдаа гарч болно.</p>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ebarimt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-normal">
                            Ebarimt төрөл
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row gap-2 justify-center"
                              required
                            >
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="personal" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/personal.svg"
                                    alt="personal"
                                    className="h-[60px] w-[60px] object-contain"
                                  />
                                  <span>Хувь хэрэглэгч</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="business" />
                                </FormControl>
                                <FormLabel className="font-normal flex flex-col justify-center items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/corporate.svg"
                                    alt="corporate"
                                    className="h-[60px] w-[60px] object-contain"
                                  />
                                  <span>Албан байгууллага</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Үргэлжлүүлэх</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
}

export default PayBill;
