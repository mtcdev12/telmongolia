"use client";

import { useEffect, useState } from "react";
import { getPaymentMethods } from "@/api/rest";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

export function useDigiPayAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    getPaymentMethods().then(({ digipay }) => {
      if (active) setAvailable(digipay);
    });
    return () => { active = false; };
  }, []);

  return available;
}

export function DigiPayOption() {
  return (
    <FormItem className="radiopay h-[120px] w-[140px] rounded-2xl p-2">
      <FormControl><RadioGroupItem value="digipay" /></FormControl>
      <FormLabel className="flex flex-col items-center justify-center gap-1 text-center font-normal">
        <img src="/assets/images/digipay.png" alt="" className="h-[60px] w-[60px] rounded-xl object-contain" />
        <span>Digi Pay</span>
      </FormLabel>
    </FormItem>
  );
}
