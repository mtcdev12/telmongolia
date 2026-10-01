export type SiteLocale = "mn" | "en";

export function translateCardText(value: unknown, locale: SiteLocale) {
  const text = String(value ?? "");
  if (locale !== "en") return text;

  return text
    .replace(/Олон улс/gi, "International")
    .replace(/Солонгос/gi, "South Korea")
    .replace(/Хятад/gi, "China")
    .replace(/Орос/gi, "Russia")
    .replace(/АНУ/gi, "USA")
    .replace(/Япон/gi, "Japan")
    .replace(/нэгж/gi, "units")
    .replace(/хоног/gi, "days");
}

export function translateBillingText(value: unknown, locale: SiteLocale) {
  const text = String(value ?? "");
  if (locale !== "en") return text;

  return text
    .replace(/Урьдчилсан төлбөрт/gi, "Prepaid")
    .replace(/Дараа төлбөрт/gi, "Postpaid")
    .replace(/Өрхийн хэрэглэгч/gi, "Residential customer")
    .replace(/Байгууллага/gi, "Business customer");
}
