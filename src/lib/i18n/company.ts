export type CompanyPerson = {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  image: string;
  elected?: string;
};

export type DocumentCategory = {
  title: string;
  documents: string[][];
};

export const ENGLISH_EXECUTIVES: CompanyPerson[] = [
  { name: "T. Sainjargal", role: "Chief Executive Officer", phone: "70102245", email: "sainjargal@mtcone.net", image: "Т.Сайнжаргал.png" },
  { name: "Ch. Tsogtgerel", role: "Director, Management and Human Resources Department", phone: "70102900", email: "ch.tsogtgerel@mtcone.net", image: "Ч.Цогтгэрэл.png" },
  { name: "L. Batbayar", role: "Director, Internal Audit Department", phone: "70102902", email: "batbayar@mtcone.net", image: "Л.Батбаяр.png" },
  { name: "Ch. Sodkhuu", role: "Director, Innovation and Business Development Department", phone: "70102424", email: "sodkhuu@mtcone.net", image: "Ч.Содхүү.png" },
  { name: "O. Tsolmon", role: "Director, Marketing and Sales Department", phone: "11311717", email: "tsolmon@mtcone.net", image: "О.Цолмон.png" },
  { name: "G. Nyamjav", role: "Director, Technical Operations Department", phone: "70102220", email: "nyamjav@mtcone.net", image: "2.jpg" },
  { name: "B. Iderbat", role: "Director, Information Technology Center", phone: "70102509", email: "iderbat@mtcone.net", image: "Б.Идэрбат.png" },
  { name: "N. Tserenbanzad", role: "Director, Finance, Accounting and Administration Department", phone: "70102155", email: "tserenbanzad@mtcone.net", image: "Н.Цэрэнбанзад.png" },
  { name: "B. Batsaikhan", role: "Chief Executive Officer, MTC Service LLC", phone: "70106879", email: "batsaikhan@mtcone.net", image: "Б.Батсайхан.png" },
];

export const ENGLISH_BOARD_STATE: CompanyPerson[] = [
  { name: "Ts. Bayar-Erdene", role: "Head of the State Property Management and Regulation Division, State Property Policy and Coordination Agency", image: "bayrerdene.png", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
  { name: "A. Molor", role: "Specialist, State Property Management and Regulation Division, State Property Policy and Coordination Agency", image: "Molor.png", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
  { name: "B. Turbat", role: "Analyst, Cabinet Secretariat of the Government of Mongolia", image: "turbat.jpg", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
  { name: "D. Narangerel", role: "Head of State Property Registration and Use Division; Certified Public Accountant", image: "narangerel.png", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
  { name: "S. Ganzorig", role: "Head of Personal Data Protection Division, National Human Rights Commission of Mongolia", image: "Ganzorig.jpg", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
  { name: "B. Bilegdemberel", role: "Director, Information Technology and Systems Integration Department, Cabinet Secretariat", image: "bilegdemberel.jpg", elected: "Re-elected at the Annual General Meeting held on 30 April 2024" },
];

export const ENGLISH_BOARD_INDEPENDENT: CompanyPerson[] = [
  { name: "N. Tuul", role: "Independent member", image: "tuul.jpg", elected: "Re-elected at the Annual General Meeting held on 28 April 2023" },
  { name: "S. Tsolmon", role: "Director, Graduate School of Mandakh University", image: "tsolmon.jpg", elected: "Elected at the Annual General Meeting held on 28 April 2023" },
  { name: "N. Danzandagva", role: "Deputy Chief Executive Officer, Golomt Capital Securities", image: "Danzandagva.jpg", elected: "Independent member" },
];

export const ENGLISH_FUNCTION_DOCUMENTS: string[][] = [
  ["Functional mandate — Internal Audit Department", "chiguureg/АДХГ.pdf"],
  ["Functional mandate — Policy and Planning Department", "chiguureg/БХГ.pdf"],
  ["Functional mandate — Marketing and Sales Department", "chiguureg/МБГ.pdf"],
  ["Functional mandate — Technical Operations Department", "chiguureg/ТТАГ.pdf"],
  ["Functional mandate — Finance and Administration Department", "chiguureg/СБААГ.pdf"],
  ["Functional mandate — Management and Human Resources Department", "chiguureg/УХНГ.pdf"],
  ["Functional mandate — Innovation and Business Development Department", "chiguureg/ИБХГ.pdf"],
  ["Functional mandate — Internal Affairs Department", "chiguureg/ДАГ.pdf"],
];

export const ENGLISH_LEGAL_DOCUMENTS: string[][] = [
  ["Interim procedure for selecting Chief Executive Officer candidates", "erhzui/GZ_shalgaruulah_tur_juram.pdf"],
  ["Charter of Telecom Mongolia JSC", "erhzui/Компанийн дүрэм.pdf"],
  ["Rules of procedure of the Board of Directors", "erhzui/1n.pdf"],
  ["Salary and compensation rules", "erhzui/Цалин хөлсний журам.pdf"],
  ["Employee recruitment procedure", "erhzui/Ажилтан сонгон шалгаруулах журам.pdf"],
  ["Customer service procedure", "erhzui/Хэрэглэгчдэд үйлчилгээ үзүүлэх журам.pdf"],
  ["Corporate Governance Code implementation programme", "erhzui/15n.pdf"],
  ["Code of ethics", "erhzui/2.pdf"],
  ["Succession policy", "erhzui/3.pdf"],
  ["Nomination Committee rules", "erhzui/14n.pdf"],
  ["Remuneration Committee rules", "erhzui/13n.pdf"],
  ["Audit Committee rules", "erhzui/12n.pdf"],
  ["Internal control policy", "erhzui/11n.pdf"],
  ["Dividend procedure", "erhzui/10n.pdf"],
  ["Shareholders' meeting procedure", "erhzui/9.pdf"],
  ["Compliance monitoring procedure", "erhzui/9n.pdf"],
  ["Rules for the Secretary of the Board", "erhzui/11.pdf"],
  ["Information transparency and reporting procedure", "erhzui/8n.pdf"],
  ["Risk management procedure", "erhzui/7n.pdf"],
  ["Internal audit procedure", "erhzui/14.pdf"],
  ["Employee feedback and complaint resolution procedure", "erhzui/2n.pdf"],
  ["Stakeholder cooperation policy", "erhzui/3n.pdf"],
  ["Investor relations programme", "erhzui/4n.pdf"],
  ["Major and conflict-of-interest transaction procedure", "erhzui/5n.pdf"],
  ["Chief Executive Officer operating procedure", "erhzui/6n.pdf"],
  ["Social protection programme", "erhzui/niigemhamgaalal.pdf"],
];

export const ENGLISH_TRANSPARENCY: Record<string, DocumentCategory> = {
  governance: {
    title: "Corporate governance reports",
    documents: [
      ["Authorized officer remuneration, 2021–2026", "iltodbaidal/ЭБАТ-ны цалин хөлс (2021-2026).pdf"],
      ["Corporate governance report — 30 October 2024", "MTC2024-КЗ-ЫН_ҮЙЛ_АЖИЛЛАГААНЫ_ТАЙЛАН-2024-10-30.pdf"],
      ["Corporate governance report — 15 May 2024", "iltodbaidal/MTC2023-КЗ_ТАЙЛАН.PDF"],
    ],
  },
  annual: {
    title: "Annual reports",
    documents: [
      ["Annual report 2025", "iltodbaidal/2025jil.PDF"],
      ["Annual report 2023", "iltodbaidal/2023jil.PDF"],
      ["Annual report 2022", "iltodbaidal/2022jil.pdf"],
      ["Annual report 2021", "iltodbaidal/2021jil.pdf"],
      ["Annual report 2020", "iltodbaidal/2020jil.pdf"],
      ["Annual report 2019", "iltodbaidal/2019jil.pdf"],
      ["Annual report 2018", "iltodbaidal/2018jil.pdf"],
      ["Annual report 2017", "iltodbaidal/2017jil.pdf"],
    ],
  },
  quarterly: {
    title: "Interim reports",
    documents: [
      ["Semi-annual report 2024", "iltodbaidal/2024_semi_annual_report.pdf"],
      ["Semi-annual report 2020", "iltodbaidal/2020hagasjil.pdf"],
      ["Semi-annual report 2019", "iltodbaidal/2019hagasjil.pdf"],
      ["Semi-annual report 2018", "iltodbaidal/2018hagasjil.pdf"],
    ],
  },
  audited: {
    title: "Audited financial reports",
    documents: [
      ["Financial audit report 2025", "iltodbaidal/1. Profile 1.2. Audited balance 2026.pdf"],
      ["Financial audit report 2024", "iltodbaidal/audited balance 2025.pdf"],
      ["Financial audit report 2023", "iltodbaidal/sanhuuaudit2023.pdf"],
      ["Audit report on the 2022 financial statements", "iltodbaidal/audit2022.pdf"],
      ["Independent auditor's opinion on the 2018 financial statements", "iltodbaidal/audit2018.pdf"],
      ["Independent auditor's opinion on the 2017 financial statements", "iltodbaidal/audit2017.pdf"],
    ],
  },
  financial: {
    title: "Financial statements",
    documents: [
      ["Fourth-quarter report 2025", "iltodbaidal/Netgesen_tailan-2025.pdf"],
      ["Fourth-quarter report 2024", "iltodbaidal/Balance_2024.pdf"],
      ["Second-quarter report 2024", "iltodbaidal/2024uliral.pdf"],
      ["Fourth-quarter report 2023", "iltodbaidal/20920234report.pdf"],
      ["Second-quarter report 2022", "https://mse.mn/uploads/finance/20920222report.pdf"],
      ["Fourth-quarter report 2021", "https://mse.mn/uploads/finance/20920214report.pdf"],
      ["Second-quarter report 2021", "https://mse.mn/uploads/finance/20920212report.pdf"],
      ["Second-quarter report 2020", "https://mse.mn/uploads/finance/20920202report.pdf"],
      ["Fourth-quarter report 2019", "https://mse.mn/uploads/finance/20920194report.pdf"],
    ],
  },
  economic: {
    title: "Economic transparency",
    documents: [
      ["Budget performance report", "iltodbaidal/Төсвийн гүйцэтгэлийн тайлан.pdf"],
      ["Target levels for 2025–2027", "iltodbaidal/2025-2027 оны зорилтот түвшин.pdf"],
      ["Development policy and planning implementation report", "iltodbaidal/1.5 Хөгжлийн бодлого, төлөвлөлтийн баримт бичгийн хэрэгжилтийн тайлан.pdf"],
      ["2022 plan: savings and overruns", "iltodbaidal/2022 он төлөвлөгөө хэмнэлт хэтрэлт.pdf"],
      ["Target levels for 2022–2024", "iltodbaidal/2022-2024 зорилтот түвшин.pdf"],
      ["Medium-term business development strategy", "iltodbaidal/Дунд хугацааны бизнес хөгжлийн стратеги.pdf"],
      ["Strategic objectives, priorities, actions and results", "iltodbaidal/1.1 Стратеги зорилт, зорилго, тэргүүлэх чиглэл, тэдгээрийн хүрээнд авч хэрэгжүүлсэн арга хэмжээ, үр дүн99.pdf"],
      ["2024 plan: savings and overruns", "iltodbaidal/2024 оны төлөвлөгөө хэмнэлт хэтрэлт.pdf"],
      ["Target levels for 2024–2026", "iltodbaidal/2024-2026 он зорилтот түвшин99.pdf"],
      ["2025 key economic indicators and target performance", "iltodbaidal/2025 ЭЗЗТГүйцэтгэл.pdf"],
    ],
  },
  board: {
    title: "Board reports",
    documents: [
      ["Board of Directors activity report 2025", "iltodbaidal/tuz2025.pdf"],
      ["Board of Directors activity report 2024", "iltodbaidal/tuz2024.pdf"],
      ["Board of Directors activity report 2023", "iltodbaidal/tuz2023.pdf"],
      ["Board Secretary's report 2025", "iltodbaidal/Report_BOD_secretatry-2025.pdf"],
    ],
  },
};
