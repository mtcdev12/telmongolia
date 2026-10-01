"use client";
import { login, getCookie } from "@/api/rest";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BiUser, BiExit } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useToast } from "@/components/ui/use-toast";
// import AuthCheck from "./authCheck";
import Link from "next/link";
import Loader from "./ui/loader";
import Onetime from "./onetime";
import { useState, useEffect } from "react";

type AuthSession = {
  data: {
    userId: string;
  };
  expireAt?: number;
  message?: string;
};

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;
  const data = (value as { data?: unknown }).data;
  if (!data || typeof data !== "object") return false;
  return typeof (data as { userId?: unknown }).userId === "string";
}

const formSchema = z.object({
  user_id: z.string().min(6, {
    message: "Та үйлчилгээний дугаараа бүрэн бичнэ үү!",
  }),
  user_pass_login: z.boolean().default(true),
  user_pass: z.string(),
});

const Login = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
  const copy = locale === "en"
    ? {
        signIn: "Sign in",
        dialogTitle: "Sign in",
        serviceId: "Service ID",
        password: "Password",
        example: "For example: 70008000, ddn-1234567",
        oneTimeCode: "One-time code",
        account: "Account",
        signOut: "Sign out",
      }
    : {
        signIn: "Нэвтрэх",
        dialogTitle: "Нэвтрэх цонх",
        serviceId: "Үйлчилгээний ID",
        password: "Нууц үг",
        example: "Жишээ нь: 70008000, ddn-1234567",
        oneTimeCode: "Нэг удаагийн код",
        account: "Хэрэглэгчийн булан",
        signOut: "Гарах",
      };
  const { toast } = useToast();
  const [auth, setAuth] = useState<AuthSession | null>(null);
  const [onetime, setOnetime] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log('bnu2');
  useEffect(() => {
    const temp = getCookie();
    if (isAuthSession(temp)) {
      setAuth(temp);
      return;
    }

    if (temp) {
      const cookies = new Cookies();
      cookies.remove("user", { path: "/" });
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      user_pass: "",
      user_pass_login: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await login(values);
    setLoading(false);
    const message = typeof res?.message === "string" ? res.message : "Нэвтрэх хүсэлт амжилтгүй боллоо.";
    toast({
      title: "Login",
      description: message,
    });
    if (message.includes("Successful") && isAuthSession(res)) {
      const cookies = new Cookies();
      cookies.set("user", JSON.stringify(res), {
        path: "/",
        ...(typeof res.expireAt === "number"
          ? { expires: new Date(res.expireAt * 1000) }
          : {}),
      });
      setAuth(res);
      // setTimeout(()=>router.push("/user"), 400);
      // router.push("/user");
      location.href = "/user";
    } else if (message.includes("Нэг удаа")) {
      setOnetime(true);
    }
  }
  function logOut() {
    const cookies = new Cookies();
    cookies.remove("user", { path: "/" });
    setAuth(null);
    // router.push("/");
    location.href="/";
  }
  function handleOpenOnetimeChange(d: boolean) {
    setOnetime(false);
    form.setValue("user_pass_login", true);
  }
  return (
    <div>
      {onetime && (
        <Onetime
          user_id={form.getValues("user_id")}
          handleOpenOnetimeChange={handleOpenOnetimeChange}
        />
      )}
      {auth ? (
        <div className="h-full flex group cursor-pointer text-slate-50 items-center gap-1 font-medium relative after:absolute after:content-[''] md:after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
          <BiUser className="text-lg" />
          {auth.data.userId}
          <ul className="absolute top-full md:right-0 bg-slate-50 text-slate-950 rounded-2xl shadow-md py-4 px-8 -ml-8 w-52 text-sm font-normal hidden group-hover:block">
            <Link href="/user">
              <li className="py-2 hover:translate-x-4 hover:list-disc hover:text-brand-2 transition-transform">
                {copy.account}
              </li>
            </Link>
            <button onClick={() => logOut()} className="w-full">
              <li className="py-2 hover:translate-x-4 hover:list-disc hover:text-brand-2 transition-transform flex gap-1 items-center">
                <BiExit className="text-lg" />
                {copy.signOut}
              </li>
            </button>
          </ul>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger className="h-full flex items-center gap-1 font-medium text-slate-50 relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
            <BiUser className="text-lg" />
            {copy.signIn}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle>{copy.dialogTitle}</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Username</FormLabel> */}
                      <FormControl>
                        <Input placeholder={copy.serviceId} {...field} required/>
                      </FormControl>
                      <FormDescription>
                        {copy.example}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_pass"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={copy.password}
                          {...field}
                          type={`${
                            form.getValues("user_pass_login")
                              ? "password"
                              : "hidden"
                          }`}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_pass_login"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Нууц Үг</FormLabel> */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Label
                          htmlFor="user_pass_login"
                          className="text-gray-500"
                        >
                          {copy.oneTimeCode}
                        </Label>
                        <FormControl>
                          <Switch
                            id="user_pass_login"
                            name="user_pass_login"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label htmlFor="user_pass_login">{copy.password}</Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">{copy.signIn}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Login;
