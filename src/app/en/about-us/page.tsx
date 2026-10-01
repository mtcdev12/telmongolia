import Image from "next/image";
import { FaGlassCheers, FaGlassMartini, FaStamp, FaUsers } from "react-icons/fa";

import Breadcrumb from "@/components/ui/breadcrumb";
import SourceContact from "@/components/source-contact";

const values = [
  [FaUsers, "CUSTOMER"],
  [FaGlassCheers, "OUR TEAM"],
  [FaGlassMartini, "RESPONSIBILITY"],
  [FaStamp, "OUR BRAND"],
] as const;

const milestones: Array<[string, string[]]> = [
  ["1996", ["Public payphone service was introduced.", "Telecom Mongolia JSC joined the Asia-Pacific satellite communications forum."]],
  ["1997", ["A 900 km digital relay system replaced the northern and southern analogue relay systems.", "The company launched its cable television service and established its training centre.", "Mongolia became the 142nd country to introduce the INTELSAT system.", "Solar power systems were installed at 24 relay stations."]],
  ["1998", ["National television transmission moved from ASIASAT to INTELSAT.", "VSAT satellite communications were introduced in four provinces and four soums.", "The Ulaanbaatar telephone network was expanded by 16,000 lines."]],
  ["2000", ["The Mongolian National Chamber of Commerce and Industry recognized the company for its economic contribution.", "Telecom Mongolia established Micom, an internet service company funded entirely by Telecom Mongolia.", "VSAT systems were deployed in provincial centres and connected to the main network."]],
  ["2001", ["Under a national project to extend radio communications, 2,050 radio stations were installed in rural areas; telecommunications points were opened in 321 soums and at hospitals in 298 soums.", "The company was named Company of the Year for the fourth consecutive year."]],
  ["2002", ["WLL and prepaid PPS services were introduced in Ulaanbaatar.", "The Bonus 1 international calling service was launched.", "Subsidiary Micom introduced ADSL service.", "The Mongolian National Chamber of Commerce and Industry recognized the company as an outstanding enterprise of 2002."]],
  ["2003", ["WLL service expanded to Orkhon, Darkhan-Uul and Dornod provinces and Nalaikh District.", "The company was recognized as one of Mongolia's leading taxpayers."]],
  ["2004", ["The 1109 directory and customer enquiry service opened.", "The DDD PLUS prepaid service was introduced.", "The company was again recognized as a leading taxpayer."]],
  ["2005", ["The E-10 telephone exchange gained capacity for 4,500 additional users, and its software was upgraded from R22 to R27.2 to support new services."]],
  ["2006", ["The company agreed with Huawei to acquire equipment for the NGN+CDMA+IN project and introduced a next-generation network.", "A flat-rate service was launched for residential customers.", "BONUS-800, DDD-800 and Gold prepaid packages marked the 800th anniversary of the Mongol Empire.", "One-stop service centres opened in Ulaanbaatar and provincial centres."]],
  ["2008", ["The f-Zone wireless service received a customer-trust award at ICT Expo 2008.", "The company was recognized among Mongolia's leading telecommunications and ICT enterprises."]],
  ["2010", ["The company received a distinctive-participant award at ICT Expo 2010 and was recognized among Mongolia's top enterprises in ICT."]],
  ["2011", ["The company was named among Mongolia's TOP 100 enterprises and received awards for supporting older people and pioneering telecommunications."]],
];

export default function AboutUsPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["About us"]} />
      <section className="rounded-2xl border border-slate-300 p-6">
        <h1 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Message from the Chief Executive Officer</h1>
        <div className="flex flex-row flex-wrap justify-stretch">
          <div className="relative h-[400px] w-full md:h-auto md:w-[400px]">
            <Image src="/assets/images/gutseth_zahiral.png" fill alt="Chief Executive Officer T. Sainjargal" className="rounded-2xl object-contain" quality={100} />
          </div>
          <div className="min-w-[300px] flex-1 px-6 text-justify text-sm leading-relaxed">
            <p>On behalf of everyone at Telecom Mongolia JSC, I extend my greetings to our customers and partners.</p>
            <p className="mt-3">Since 2022, the company has expanded fibre-based FTTH fixed-line, internet and OTT bundle services in four districts of Ulaanbaatar and 80 soums, reaching more than 6,000 customers. From 2026, our Wi-Fi 6–based triple-play network has expanded to 103 locations in 94 soums.</p>
            <p className="mt-3">As part of our social responsibility work, more than 500 schools have received a 7080-series “Trusted Phone” to help protect children. We aim to extend this service to schools nationwide, and have also installed it in hospitals, military units and ticket offices.</p>
            <p className="mt-3">We work with government ministries and public organizations to advance digital government, introduce modern communications technology and support Mongolia's digital economy. We will continue modernizing our network, expanding coverage and providing technology-based services.</p>
            <p className="mt-3">Through partnership rather than competition, we aim to improve profitability, shareholder returns and corporate governance. Together, let us build a digital nation founded on advanced technology and knowledge.</p>
            <p className="mt-4 text-right">Respectfully,<br />Chief Executive Officer<br /><strong>T. Sainjargal</strong></p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay.png')] bg-right bg-contain bg-no-repeat p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Company profile</h2>
        <div className="space-y-3 text-justify text-sm leading-relaxed">
          <p>Established in 1921 as the General Committee for Posts and Telegraphs, Telecom Mongolia is the country's oldest telecommunications company. It became Mongolian Telecommunications Company in 1992 and Telecom Mongolia JSC in 1995. It is a publicly listed company on the Mongolian Stock Exchange.</p>
          <p>From 1995 to 2018, the Government of Mongolia held 54.67% of the company, Korea Telecom Corporation held 40%, and Mongolian and foreign individuals and legal entities held 5.33%. Under an agreement signed on 19 April 2018, the Government purchased Korea Telecom's 40% stake, equal to 10,348,111 shares. The Government now holds 94.7%, or 24,499,287 shares; other Mongolian and foreign shareholders hold 5.3%, or 1,370,989 shares.</p>
          <p>The company provides national and intercity telecommunications, internet, cable television and directory services across every district of Ulaanbaatar, all 21 provinces and more than 290 soums. It has 695 employees.</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-300 p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Vision</h2><p className="text-justify text-sm leading-relaxed">To be the industry leader in competitiveness by offering a broad range of telecommunications and information technology services.</p></section>
      <section className="mt-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay3.png')] bg-right bg-contain bg-no-repeat p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Mission</h2><p className="text-justify text-sm leading-relaxed">Connect every connection.</p></section>
      <section className="mt-8 rounded-2xl border border-slate-300 p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Motto</h2><p className="text-justify text-sm leading-relaxed">“Together for connectivity and progress.”</p></section>
      <section className="my-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay2.png')] bg-right bg-contain bg-no-repeat p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Our values</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">{values.map(([Icon, label]) => <div key={label} className="flex items-center justify-center gap-2 rounded-2xl border border-brand-1/20 p-2"><Icon className="text-[60px] text-brand-2" /><p className="text-lg font-semibold text-slate-700">{label}</p></div>)}</div>
      </section>
      <section className="mt-8 rounded-2xl border border-slate-300 p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Organizational structure</h2>
        <div className="relative min-h-[300px] w-full xl:h-[800px]">
          <Image src="/assets/images/bvtets2.jpg" fill alt="Telecom Mongolia organizational structure" className="object-contain" />
        </div>
      </section>
      <section className="mb-2 mt-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay4.png')] bg-right bg-no-repeat p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Our milestones</h2>
        <div className="aboutus-timeline text-sm leading-relaxed">
          {milestones.map(([year, events]) => (
            <div key={year}>
              <h5>{year}</h5>
              <ul>{events.map((event) => <li key={event}>{event}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <SourceContact locale="en" person="ariungerel" />
    </div>
  );
}
