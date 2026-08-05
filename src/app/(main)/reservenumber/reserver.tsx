"use client"
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { bookNumber } from "@/api/rest";



const createFormSchema = (isEnglish: boolean) => z.object({
    number: z.string().min(8, {
      message: isEnglish ? "The selected number is incomplete." : "Захиалагдсан дугаар дутуу байна!",
    }),
    email: z.string().min(1, {
      message: isEnglish ? "Enter your email address." : "Та И-майл хаягаа оруулна уу!",
    }),
    registernumber: z.string().min(10, {
        message: isEnglish ? "Enter your registration number." : "Та регистрийн дугаараа оруулна уу!",
    }),
    grade: z.string(),
    location: z.string()
  });

  const ub = [
    "7070",
    "7000",
    "7004",
    "7010",
    "7011",
    "7012",
    "7013",
    "7014",
    "7015",
    "7016",
    "7017",
    "7018",
    "7028",
    "1130",
    "1131",
    "1132",
    "1133",
    "1134",
    "1135",
    "1136",
    "1145",
    "1146",
    "1148",
    "7008",
  ];
  const countryside = {
    Архангай: "7033",
    БаянӨлгий: "7042",
    Баянхонгор: "7044",
    Булган: "7034",
    ГовьАлтай: "7048",
    Дорноговь: "7052",
    Дорнод: "7058",
    Дундговь: "7059",
    Завхан: "7046",
    Өвөрхангай: "7032",
    Өмнөговь: "7053",
    Сүхбаатар: "7051",
    Сэлэнгэ: "7036",
    Төв: "7027",
    Увс: "7045",
    Ховд: "7043",
    Хөвсгөл: "7038",
    Хэнтий: "7056",
    ДарханУул: "7037",
    Налайх: "7023",
    Орхон: "7035",
    Орхон2: "7039",
    Багануур: "7021",
    Говьсүмбэр: "7054",
    MIP70: "7008",
  };

const Reserver = (props:any) => {
    const isEnglish = props.locale === "en";
    const formSchema = createFormSchema(isEnglish);
    const copy = isEnglish
      ? { title: "Reserve a number", selected: "Selected number", grade: "Number category", region: "Number region", register: "Registration number", email: "Email address", submit: "Reserve", toast: "Number reservation", alert: "Please note", notice: "Your reservation remains valid for five days." }
      : { title: "Дугаар захиалах", selected: "Таны сонгосон дугаар", grade: "Дугаарын төрөл", region: "Дугаар харъяалагдах бүс", register: "Регистрийн дугаар", email: "И-майл хаяг", submit: "Захиалах", toast: "Дугаар захиалга", alert: "Өдрийн мэнд", notice: "Таны захиалсан дугаар 5 хоног хүчинтэй байхыг анхаарна уу!" };
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);

    const handleOpenChange = () => {
        props.onModalClose(false);
        setOpen(false);
      }
    const gradeToWord = (grade:string) =>{
        if(grade == 'G1'){
            return isEnglish ? 'Gold 1' : 'Алтан 1';
        }else if(grade == 'G2'){
            return isEnglish ? 'Gold 2' : 'Алтан 2';
        }else if(grade == 'G3'){
            return isEnglish ? 'Gold 3' : 'Алтан 3';
        }else if(grade == 'S'){
            return isEnglish ? 'Silver' : 'Мөнгөн';
        }else if(grade == 'C'){
            return isEnglish ? 'Bronze' : 'Хүрэл';
        }else{
            return isEnglish ? 'Standard' : 'Энгийн';
        }
    }
    const locationFinder = (num:string) => {
        const prefix = num.substring(0,4);
        if(prefix == '7008'){
            return 'MIP70';
        }
        if(ub.includes(prefix)){
            return isEnglish ? 'Ulaanbaatar' : 'Улаанбаатар';
        }else{
            const province = Object.keys(countryside).find(key => countryside[key as keyof typeof countryside] === prefix);
            if(province){
                return isEnglish ? province : province;
            }
        }
        return isEnglish ? 'Unknown' : 'Тодорхойгүй';
    }
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            number: props.selected.num,
            grade: gradeToWord(props.selected.grade),
            email: "",
            registernumber: "",
            location :locationFinder(props.selected.num)
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const payload = {
          number: values.number,
          email: values.email,
          register: values.registernumber,
          place: values.location,
        };
        const res = await bookNumber(payload);
        setLoading(false);
        toast({
          title: copy.toast,
          description: res["message"],
        });
        if (res["result"] === "ok") {
          handleOpenChange();
        }
      }

    return (
        <Dialog open={open} onOpenChange={()=>handleOpenChange()}>
        <DialogContent className="sm:max-w-[525px]">
          {loading && <Loader />}
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>{copy.selected}</FormLabel>
                  <FormControl>
                    <Input placeholder={copy.selected} {...field} readOnly/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>{copy.grade}</FormLabel>
                  <FormControl>
                    <Input placeholder={copy.grade} {...field} readOnly/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>{copy.region}</FormLabel>
                  <FormControl>
                    <Input placeholder={copy.region} {...field} readOnly/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registernumber"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>{copy.register}</FormLabel>
                  <FormControl>
                    <Input {...field} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>{copy.email}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{copy.submit}</Button>
          </form>
        </Form>
        <Alert className="bg-brand-2/10 text-brand-1 tracking-tight">
            <BsFillExclamationTriangleFill className="h-4 w-4 text-brand-1" />
            <AlertTitle>{copy.alert}</AlertTitle>
            <AlertDescription>
                {copy.notice}
            </AlertDescription>
            </Alert>
        </DialogContent>
      </Dialog>
    );
}

export default Reserver;
