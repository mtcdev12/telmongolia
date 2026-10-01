"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "@/components/ui/loader";
import { getAddresses } from "@/api/rest";
import Breadcrumb from "@/components/ui/breadcrumb";
import { newOrder } from "@/api/rest";

const breadcrumb = ["Захиалга өгөх"];

const formSchema = z.object({
  lastname: z.string(),
  firstname: z.string(),
  registernum: z.string(),
  cust_type: z.string(),
  mobile: z.string(),
  email: z.string(),
  services: z.string().array(),
  city: z.string(),
  district: z.string(),
  khoroo: z.string(),
  apartment: z.string(),
  entrance: z.string(),
  door: z.string(),
  additional: z.string(),
  cust_name: z.string(),
  tax_id: z.string()
});

const OrderForm = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [customer_type, setCustomer_type] = useState('');

  useEffect(() => {
    setLoading(true);
    const res = getAddresses().then((res) => {
      setLoading(false);

      const groups = ["CITY", "DISTRICT", "HOROO"];
      const grouped = {};
      res["data"].forEach(function (a: any) {
        groups
          .reduce(function (o: any, g, i) {
            o[a[g as keyof typeof a] as keyof typeof o] =
              o[a[g]] || (i + 1 === groups.length ? [] : {});
            return o[a[g]];
          }, grouped)
          .push(a);
      });
      setAddresses(grouped);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      registernum: "",
      mobile: "",
      email: "",
      services: [],
      city: "",
      district: "",
      khoroo: "",
      apartment: "",
      entrance: "",
      door: "",
      additional: "",
      cust_name: "",
      tax_id: ""
    },
  });
  const handleFormChange = (e: any) => {
    if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "district") {
      setDistrict(e.target.value);
    }else if(e.target.name == "cust_type"){
      setCustomer_type(e.target.value);
    }
  };
  function handleLang(e: any) {
    if (isEnglish) return;
    if (e.key == "Backspace") {
      return;
    }
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    // const englishAlphabetAndWhiteSpace = /[A-Za-z ]/g;
    const numberPatter = /^([-0-9])| +$/; //with space, and dash
    if (cyrillicPattern.test(e.key)) {
      // console.log('mn');
    } else {
      if (!numberPatter.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // console.log(values);
    const res = await newOrder(values);
    setLoading(false);
    toast({
      title: isEnglish ? "New service order" : "Шинэ захиалга",
      description: res["message"],
    });
    if (res["result"] === "ok") {
      form.reset();
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <Breadcrumb data={isEnglish ? ["Place an order"] : breadcrumb} locale={locale} />
      <div className="flex justify-around flex-wrap">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={handleFormChange}
            className="p-4 order-2 md:order-1 flex flex-wrap justify-center"
          >
            <div className="w-[380px] px-4 space-y-2 border-r border-slate-50">
            <h5 className="text-brand-1 text-center">{isEnglish ? "General information" : "Ерөнхий мэдээлэл"}</h5>
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Last name" : "Овог"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "First name" : "Нэр"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registernum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Registration number" : "Регистерын дугаар"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cust_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{isEnglish ? "Customer type" : "Хэрэглэгчийн төрөл"}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      required
                      name="cust_type"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PSN" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {isEnglish ? "Individual" : "Хувь хэрэглэгч"}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BUS" />
                        </FormControl>
                        <FormLabel className="font-normal">{isEnglish ? "Business" : "Бизнес"}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="GOV" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {isEnglish ? "Government organization" : "Албан байгууллага"}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              (customer_type == 'GOV' || customer_type == 'BUS') &&
              <>
                           <FormField
              control={form.control}
              name="cust_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Organization name" : "Байгууллагын нэр"}</FormLabel>
                  <FormControl>
                    <Input {...field} required={(customer_type == 'GOV' || customer_type == 'BUS') ? true : false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
   
             <FormField
              control={form.control}
              name="tax_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Organization tax or registration ID" : "Байгууллагын ТТД /регистер/"}</FormLabel>
                  <FormControl>
                    <Input {...field} required={(customer_type == 'GOV' || customer_type == 'BUS') ? true : false} type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              </>
            }

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Telephone number" : "Утасны дугаар"}</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" required />
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
                  <FormLabel>{isEnglish ? "Email address" : "И-майл хаяг"}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Requested services" : "Хүсэж буй үйлчилгээ"}</FormLabel>
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("telephone")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      "telephone",
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "telephone"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {isEnglish ? "Fixed-line telephone" : "Суурин утас"}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("internet")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "internet"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "internet"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {isEnglish ? "Internet" : "Интернет"}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("katv")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "katv"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "katv"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {isEnglish ? "National Cable TV" : "National КаТв"}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </FormItem>
              )}
            />
            </div>
                  <div className="w-[380px] px-4 space-y-2">
                  <h5 className="text-brand-1 text-center mt-4 md:mt-0">{isEnglish ? "Service installation address" : "Захиалга өгөх хаяг"}</h5>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "City or province" : "Хот"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="city"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select a city or province" : "Хот сонгох"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        Object.entries(addresses).map((address: any) => (
                          <SelectItem value={address[0]} key={address[0]}>
                            {
                              (
                                Object.values(
                                  Object.values(
                                    address[1]
                                  )[0] as (typeof address)[1]
                                )[0] as (typeof address)[1][0]
                              )[0]["CITY"]
                            }
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "District or soum" : "Дүүрэг"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="district"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select a district or soum" : "Дүүрэг сонгох"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        city != "" &&
                        Object.entries(
                          addresses[city as keyof typeof addresses]
                        ).map((address: any) => (
                          <SelectItem value={address[0]} key={address[0]}>
                            {
                              (
                                Object.values(
                                  address[1]
                                )[0] as (typeof address)[1]
                              )[0]["DISTRICT"]
                            }
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="khoroo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Khoroo or bagh" : "Хороо"}</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="khoroo"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isEnglish ? "Select a khoroo or bagh" : "Хороо сонгох"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        city != "" &&
                        district != "" &&
                        addresses[city as keyof typeof addresses] &&
                        addresses[city as keyof typeof addresses][district] &&
                        Object.entries(
                          addresses[city as keyof typeof addresses][district]
                        ).map((address: any) => (
                          <SelectItem
                            value={address[1][0]["HOROO_NAME"]}
                            key={address[0]}
                          >
                            {address[1][0]["HOROO_NAME"]}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Building" : "Байр"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entrance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Entrance" : "Орц"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="door"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Apartment or unit" : "Тоот"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEnglish ? "Additional details" : "Нэмэлт тайлбар"}</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
            <Button type="submit" className="mt-4">{isEnglish ? "Submit order" : "Захиалга өгөх"}</Button>
            </div>
                       
                  </div>
            
 
          </form>
        </Form>
        <div className="max-w-[400px] my-4 order-1">
          <Alert className="bg-yellow-100/80">
            <BsFillExclamationTriangleFill className="h-4 w-4" />
            <AlertDescription>
              {isEnglish ? "Enter your information accurately. Official address selections remain in Mongolian to match the service database." : "Та энэхүү формыг зөвхөн Монгол хэлээр бөглөнө үү!"}
            </AlertDescription>
          </Alert>

          <Alert className="bg-cyan-100/80 mt-4">
            <AlertDescription>
              {isEnglish ? "We will send the response to the email address you provide. A response is normally issued within 4–8 business hours." : "Бид таны хүсэлтийн хариуг таны цахим шуудангаар илгээх тул та өөрийн ашигладаг цахим шуудангийн хаягаа хаягаа бичнэ үү! Хариуг ажлын өдрийн 4-8 цагийн дотор мэдэгдэнэ."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const locale = usePathname().startsWith("/en") ? "en" : "mn";
  return <OrderForm locale={locale} />;
}
