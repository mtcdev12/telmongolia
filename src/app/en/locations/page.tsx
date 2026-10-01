import type { Metadata } from "next";

import LocationsPage from "@/app/(main)/locations/page";

export const metadata: Metadata = { title: "Service locations", alternates: { canonical: "/en/locations", languages: { mn: "/locations", en: "/en/locations" } } };

export default function EnglishLocationsPage() {
  return <div className="container"><LocationsPage /></div>;
}
