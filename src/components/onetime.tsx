"use client";

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
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./ui/loader";
import { useEffect, useState } from "react";
import { onetime } from "@/api/rest";
import type { SiteLocale } from "@/lib/i18n/ui";

type OnetimeValues = {
  onetime: string;
  password: string;
  user_id: string;
};

type OnetimeProps = {
  user_id: string;
  handleOpenOnetimeChange: (open: boolean) => void;
  locale?: SiteLocale;
};

const Onetime = ({
  user_id,
  handleOpenOnetimeChange,
  locale = "mn",
}: OnetimeProps) => {
  const isEnglish = locale === "en";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const formSchema = z.object({
    onetime: z.string().min(1, {
      message: isEnglish ? "Enter the one-time code you received." : "Хүлээн авсан кодоо бичнэ үү!",
    }),
    password: z.string().min(1, {
      message: isEnglish ? "Enter a new password." : "Та шинэ нууц үгээ оруулна уу!",
    }),
    user_id: z.string(),
  });

  useEffect(() => setOpen(true), []);

  const form = useForm<OnetimeValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { onetime: "", password: "", user_id },
  });

  const handleOpenChange = () => {
    handleOpenOnetimeChange(false);
    setOpen(false);
  };

  async function onSubmit(values: OnetimeValues) {
    setLoading(true);
    try {
      const response = await onetime(values);
      toast({
        title: isEnglish ? "Password" : "Нууц үг",
        description: isEnglish
          ? response?.result === "ok"
            ? "Your password has been created successfully."
            : "The password could not be created. Check the code and try again."
          : response?.message || "Шинэ нууц үг үүсгэж чадсангүй.",
      });
      if (response?.result === "ok") handleOpenChange();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle>
            {isEnglish ? "Create a new password" : "Шинэ нууц үг үүсгэх"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="onetime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={isEnglish ? "One-time code" : "Нэг удаагийн код"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={isEnglish ? "New password" : "Шинэ нууц үг"}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl><Input {...field} type="hidden" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{isEnglish ? "Continue" : "Үргэлжлүүлэх"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Onetime;
