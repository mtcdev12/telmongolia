"use client";

import { BiCurrentLocation, BiAt, BiPhone, BiLogoFacebookSquare, BiLogoTwitter, BiLogoInstagramAlt } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/ui/breadcrumb";

const breadcrumb = ["Холбоо барих"];

const ContactPage = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
    const isEnglish = locale === "en";
    return (
        <div>
            <Breadcrumb data={isEnglish ? ["Contact"] : breadcrumb} locale={locale} />
            <div className="relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.9991126234668!2d106.91396565225666!3d47.917054627540416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969245c68c488f%3A0xe6d80cd8b769d6b1!2sMongolia%20Telecom%20Company!5e0!3m2!1sen!2smn!4v1689913014402!5m2!1sen!2smn" width="100%" height="550" className="border-0" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="absolute top-4 bg-white left-10 right-10 flex flex-wrap justify-center items-center shadow-lg shadow-brand-2/60 border border-x-brand-1/30 rounded-full py-2 px-6 md:px-10 text-sm tracking-tight">
                    <div className="flex items-center justify-center gap-1 flex-1 text-center">
                        <BiCurrentLocation className="text-[40px] text-brand-2"/>
                        <p className="text-gray-700 w-[280px]">
                            {isEnglish ? "Ulaanbaatar 15160, Chingeltei District, 1st Khoroo, Peace Avenue 1, P.O. Box 1166" : "Улаанбаатар-15160, Чингэлтэй дүүрэг 1-р хороо, Энхтайваны өргөн чөлөө-1, Ш/X-1166"}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-1">
                        <BiAt className="text-[40px] text-brand-2"/>
                        <p className="text-gray-700">
                            mongoliatelecom@mtcone.net
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-1">
                        <BiPhone className="text-[40px] text-brand-2"/>
                        <p className="text-gray-700">
                            +(976) 7000-8000
                        </p>
                    </div>
                </div>
            </div>
            <h5 className="text-brand-1 font-semibold text-2xl text-center mt-4">Socials</h5>
            <div className="flex justify-center">
            <div className="flex gap-4 justify-center mb-4 border border-slate-300 py-2 px-6 rounded-full bg-indigo-50 shadow-md shadow-brand-2/60">
                <Link href="https://www.facebook.com/TelecomMongoliaCompany/" target="_blank" rel="noreferrer">
                    <BiLogoFacebookSquare className="text-[60px] text-[#3b5998]"/>
                </Link>
                <Link href="https://twitter.com/mtc_telecom" target="_blank" rel="noreferrer">
                    <BiLogoTwitter className="text-[60px] text-[#00acee]"/>
                </Link>
                <Link href="https://www.instagram.com/mongoliatelecom/" target="_blank" rel="noreferrer">
                    <BiLogoInstagramAlt className="text-[60px] text-[#E4405F]"/>
                </Link>
            </div>
            </div>
       
       </div>
    );
}

export default function Page() {
    const locale = usePathname().startsWith("/en") ? "en" : "mn";
    return <ContactPage locale={locale} />;
}
