import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Telecom Mongolia — English",
    template: "%s | Telecom Mongolia",
  },
  description:
    "English information about Telecom Mongolia services, plans, customer support and service locations.",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
