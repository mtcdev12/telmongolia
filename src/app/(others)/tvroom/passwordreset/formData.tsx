"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import ReturnPage from "./returnPage";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  verificationcode: z.string().optional(),
});

const FormData = () => {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessOver, setIsProcessOver] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      verificationcode: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    let url = "/tvroom/api/verification";
    if (isCodeSent) {
      url = "/tvroom/api/passwordreset";
    }
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (data["res"] == "success") {
        if (isCodeSent) {
          setIsProcessOver(true);
        } else {
          setIsCodeSent(true);
        }
      }
      toast({
        title: data["res"],
        description: data["desc"],
      });

    } catch (err) {
      console.log("There was an error", err);
    } finally {
      setIsLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  useEffect(()=>{
    const mobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(mobile()){
      setIsMobile(true);
    }
  },[])
    return (
        <>
        {isProcessOver ? (
          <ReturnPage />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[400px]"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Нэвтрэх нэр</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="Имайл хаяг эсвэл утасны дугаар"
                        {...field}
                        type="string"
                        required
                        disabled={isLoading}
                      />
                    </FormControl>
                    {/* <FormDescription>Таны бүртгүүлсэн нэвтрэх нэр</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isCodeSent && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Шинэ нууц үг</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={isLoading}
                          required
                          minLength={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
  
              {isCodeSent && (
                <FormField
                  control={form.control}
                  name="verificationcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Баталгаажуулах код
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={isLoading}
                          required
                        />
                      </FormControl>
                      <FormDescription>
                        Нэвтрэх хаяг руу илгээгдсэн
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
  
              <div className="flex gap-4">
                {isCodeSent ? (
                  <Button type="submit" variant={"tvroom"} disabled={isLoading}>
                    {isLoading && (
                      <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Шинэчлэх
                  </Button>
                ) : (
                  <Button type="submit" variant={"tvroom"} disabled={isLoading}>
                    {isLoading && (
                      <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Баталгаажуулах код авах
                  </Button>
                )}
  
                <a
                  href={isMobile ? "https://ms.tvroom.mn/web/close" : "https://tvroom.mn"} 
                  className="flex gap-1 items-center tracking-tight text-brand-2 border border-brand-1 hover:text-white h-10 px-4 py-2 rounded-md ing-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
                >
                  <AiOutlineArrowLeft size={14} />
                  Буцах
                </a>
              </div>
            </form>
          </Form>
        )}
      </>
    );
}

export default FormData;