import type { Metadata } from "next";
import Mip70Payment from "@/components/mip70-payment";

export const metadata: Metadata = {
  title: "MIP70 цэнэглэх | Монголын Цахилгаан Холбоо",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Mip70Payment />;
}
