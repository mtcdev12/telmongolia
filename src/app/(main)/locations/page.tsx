"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
const breadcrumb = ["САЛБАРЫН БАЙРШИЛУУД"];
const LocationsPage = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
    return (
        <div>
               <Breadcrumb data={locale === "en" ? ["Service locations"] : breadcrumb} locale={locale} />
               <iframe  title="locations" id="map" src="https://www.google.com/maps/d/u/0/embed?mid=1c03m-VAw6T4KntMDgem37rQUsvVH9vo&ehbc=2E312F" width="100%" height="600" frameBorder="0"></iframe>
        </div>
    );
}

export default function Page() {
    const locale = usePathname().startsWith("/en") ? "en" : "mn";
    return <LocationsPage locale={locale} />;
}
