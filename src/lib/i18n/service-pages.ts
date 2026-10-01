export type EnglishServiceAdvantage = {
  title: string;
  description: string;
  image: string;
};

export type EnglishServicePlan = {
  title: string;
  price: string;
  items: string[];
};

export type EnglishServicePlanGroup = {
  title?: string;
  description?: string;
  plans: EnglishServicePlan[];
};

export type EnglishServiceHighlight = {
  title: string;
  description: string;
};

export type EnglishServicePage = {
  title: string;
  bundle: string;
  description: string;
  logo: string;
  benefitsIntro: string;
  advantages: EnglishServiceAdvantage[];
  tariffIntro: string;
  tariffNote: string;
  highlights?: EnglishServiceHighlight[];
  extraNote?: EnglishServiceHighlight;
  groups: EnglishServicePlanGroup[];
  commentsIntro: string;
  comments: string[];
};

export const ENGLISH_SERVICE_PAGES: Record<string, EnglishServicePage> = {
  "fixed-line": {
    title: "Fixed-line telephone",
    bundle: "STANDALONE SERVICE",
    description:
      "Entrust your family's communication needs to a fixed-line telephone that has no adverse effect on health and continues to operate reliably even during unexpected emergencies.",
    logo: "single.png",
    benefitsIntro:
      "Fixed-line telephone is a reliable, uninterrupted service suitable for everyday use.",
    advantages: [
      {
        title: "Uninterrupted",
        description: "Works even during a power outage",
        image: "urh/icon9.png",
      },
      {
        title: "Reliable",
        description: "No risk of network failure",
        image: "urh/icon10.png",
      },
      {
        title: "Health-friendly",
        description: "Does not emit radio waves",
        image: "urh/icon11.png",
      },
    ],
    tariffIntro: "Choose the fixed-line plan that suits your usage.",
    tariffNote: "VAT included",
    groups: [
      {
        plans: [
          {
            title: "Plan 1",
            price: "9,900₮",
            items: [
              "Initial connection fee: 33,000₮ in Ulaanbaatar and 16,500₮ in regional areas",
              "Unlimited calls within the network and to 26xxxx numbers",
              "100 minutes to other networks",
              "1 additional service",
            ],
          },
          {
            title: "Plan 2",
            price: "16,500₮",
            items: [
              "Initial connection fee: 33,000₮ in Ulaanbaatar and 16,500₮ in regional areas",
              "Unlimited calls within the network and to 26xxxx numbers",
              "200 minutes to other networks",
              "3 additional services",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers who use our service.",
    comments: [
      "A dependable service that continues to work even when other networks are unavailable.",
      "Thank you for providing our organization's internal communications reliably.",
      "Thank you to your team for completing repairs quickly.",
    ],
  },

  "double-play": {
    title: "Double-play package",
    bundle: "FIXED-LINE TELEPHONE + INTERNET",
    description:
      "Combine internet, now an essential part of everyday life, with a health-friendly fixed-line telephone that is a reliable means of communication, and choose the package that best suits your family's needs.",
    logo: "double.png",
    benefitsIntro:
      "A reliable and convenient way to use fixed-line telephone and internet in one package.",
    advantages: [
      {
        title: "Reliable",
        description: "A dependable fiber-optic network infrastructure",
        image: "urh/icon12.png",
      },
      {
        title: "Wide coverage",
        description: "One of the widest networks across Mongolia",
        image: "urh/icon13.png",
      },
      {
        title: "Uninterrupted",
        description:
          "24-hour continuous and reliable operation with a monitoring system",
        image: "urh/icon14.png",
      },
    ],
    tariffIntro:
      "Choose a GPON or ADSL double-play package that matches your usage.",
    tariffNote: "VAT included",
    groups: [
      {
        title: "Fiber-optic cable — GPON",
        description: "High-speed fiber-optic double-play packages",
        plans: [
          {
            title: "S Plan",
            price: "30,000₮",
            items: [
              "Initial connection fee: 16,500₮",
              "Internet speed: 10 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "100 minutes to other networks",
              "1 additional service",
            ],
          },
          {
            title: "M Plan",
            price: "40,000₮",
            items: [
              "Initial connection fee: 16,500₮",
              "Internet speed: 30 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "200 minutes to other networks",
              "3 additional services",
            ],
          },
        ],
      },
      {
        title: "Physical cable — ADSL",
        description: "Internet + telephone packages based on a fixed line",
        plans: [
          {
            title: "S Plan",
            price: "19,800₮ – 24,200₮",
            items: [
              "Initial connection fee: 22,000₮ in Ulaanbaatar and 16,500₮ in regional areas",
              "Internet speed: 2 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "100 minutes to other networks",
              "1 additional service",
            ],
          },
          {
            title: "M Plan",
            price: "29,700₮ – 38,500₮",
            items: [
              "Initial connection fee: 22,000₮ in Ulaanbaatar and 16,500₮ in regional areas",
              "Internet speed: 3 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "200 minutes to other networks",
              "3 additional services",
            ],
          },
          {
            title: "L Plan",
            price: "39,600₮ – 49,500₮",
            items: [
              "Initial connection fee: 22,000₮ in Ulaanbaatar and 16,500₮ in regional areas",
              "Internet speed: 5 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "200 minutes to other networks",
              "5 additional services",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using our double-play packages.",
    comments: [
      "A friendly team with a long history and reliable service.",
      "Thank you to your team for completing repairs quickly.",
      "My previous internet connection used to lag and made gaming impossible. Since switching, I have forgotten what lag feels like. I am completely satisfied with choosing your service.",
    ],
  },

  "triple-play": {
    title: "Triple-play package",
    bundle: "FIXED-LINE TELEPHONE + INTERNET + IPTV (OTT)",
    description:
      "We offer a triple-play service that combines fixed-line telephone, unlimited data, high-speed internet, and a wide selection of television channels with high-quality sound and picture using OTT, the next-generation technology after IPTV.",
    logo: "triple.png",
    benefitsIntro:
      "A complete family package that combines fixed-line telephone, internet and IPTV services.",
    advantages: [
      {
        title: "Unlimited data",
        description: "Internet with unlimited data",
        image: "urh/icon5.png",
      },
      {
        title: "Talk freely",
        description:
          "Unlimited calls within the network plus included minutes to other networks",
        image: "urh/icon15.png",
      },
      {
        title: "Content library",
        description:
          "Movies in the video library are free, except specially priced content",
        image: "urh/icon3.png",
      },
    ],
    tariffIntro:
      "Packages include fixed-line telephone, high-speed internet, TV ROOM channels, a PSN sports package and 96-hour catch-up viewing.",
    tariffNote: "VAT included",
    highlights: [
      {
        title: "Fixed-line telephone",
        description: "Unlimited calls within the network and to 26xxxx numbers.",
      },
      {
        title: "Internet",
        description: "High-speed internet with unlimited data.",
      },
      {
        title: "TV ROOM",
        description:
          "80+ TV channels, a PSN sports package and 96-hour catch-up viewing.",
      },
    ],
    groups: [
      {
        plans: [
          {
            title: "Plan 1",
            price: "49,500₮",
            items: [
              "Initial connection fee: 22,000₮",
              "Internet speed: 20 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "30 minutes to other networks",
              "80+ TV ROOM channels",
              "PSN sports package included",
              "96-hour catch-up viewing included",
              "1 additional service",
            ],
          },
          {
            title: "Plan 2",
            price: "66,000₮",
            items: [
              "Initial connection fee: 22,000₮",
              "Internet speed: 50 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "60 minutes to other networks",
              "80+ TV ROOM channels",
              "PSN sports package included",
              "96-hour catch-up viewing included",
              "3 additional services",
            ],
          },
          {
            title: "Soum Plan",
            price: "49,500₮",
            items: [
              "Initial connection fee: 22,000₮",
              "Internet speed: 10 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "30 minutes to other networks",
              "80+ TV ROOM channels",
              "PSN sports package included",
              "96-hour catch-up viewing included",
              "1 additional service",
            ],
          },
          {
            title: "Soum Office Customer Plan",
            price: "165,000₮",
            items: [
              "Initial connection fee: 22,000₮",
              "Internet speed: 12 Mbps",
              "Unlimited calls within the network and to 26xxxx numbers",
              "400 minutes to other networks",
              "80+ TV ROOM channels",
              "PSN sports package included",
              "96-hour catch-up viewing included",
              "1 additional service",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using our triple-play packages.",
    comments: [
      "The price seems very reasonable. I personally like it.",
      "There are many sports channels for loyal sports fans like us. Thank you to your team.",
      "The Wi-Fi connection makes it very easy to move the device around the room.",
    ],
  },

  "national-catv": {
    title: "National Cable TV",
    bundle: "CABLE TELEVISION SERVICE",
    description:
      "National Cable TV is delivered to customers in Ulaanbaatar and the provinces with high-quality sound and picture through a combination of fiber-optic cable, coaxial cable and over-the-air transmission. More than 80 television channels are delivered nationwide through 16 studios.",
    logo: "catv.png",
    benefitsIntro:
      "Cable television with high-quality sound and picture, a reliable network, and a wide selection of sports and movie channels.",
    advantages: [
      {
        title: "Reliable",
        description:
          "The underground fiber-optic solution is not affected by weather conditions",
        image: "urh/icon12.png",
      },
      {
        title: "High quality",
        description: "High-quality sound and picture",
        image: "baiguullaga/icon23.png",
      },
      {
        title: "Affordable",
        description:
          "Low equipment prices, antenna options and a low monthly base fee",
        image: "baiguullaga/icon24.png",
      },
      {
        title: "PSN",
        description: "PSN sports package and MovieBox channels",
        image: "urh/psn.png",
      },
    ],
    tariffIntro:
      "Choose the STANDARD or PREMIUM package that suits your viewing needs.",
    tariffNote: "Package price tariff",
    highlights: [
      {
        title: "80+ channels",
        description:
          "Mongolian, sports, children's, knowledge, movie and information channels.",
      },
      {
        title: "Sports package",
        description: "A choice of PSN sports package and sports channels.",
      },
      {
        title: "Movies and content",
        description:
          "A wide selection of MovieBox, movie and entertainment channels.",
      },
    ],
    groups: [
      {
        plans: [
          {
            title: "STANDARD Plan",
            price: "12,000₮",
            items: [
              "Initial connection fee: 5,500₮",
              "59 Mongolian channels",
              "10 sports channels",
              "5 children's channels",
              "Knowledge channels: 0",
              "Movie and entertainment channels: 0",
              "News and information channels: 0",
            ],
          },
          {
            title: "PREMIUM Plan",
            price: "14,000₮",
            items: [
              "Initial connection fee: 5,500₮",
              "59 Mongolian channels",
              "10 sports channels",
              "5 children's channels",
              "4 knowledge channels",
              "8 movie and entertainment channels",
              "7 news and information channels",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using National Cable TV.",
    comments: [
      "There are many educational channels such as Discovery, World Wide and Animal Planet that help expand our knowledge.",
      "There are Disney and many other children's channels. Our children really enjoy them.",
      "It is affordable and easy to use. Thank you to your team.",
    ],
  },

  "tv-room": {
    title: "TV ROOM",
    bundle: "IPTV (OTT)",
    description:
      "TV ROOM is a service based on OTT, the next generation after IPTV technology, that allows television channels and video content to be viewed with high-quality sound and picture on all types of smart devices over the internet.",
    logo: "iptv.png",
    benefitsIntro:
      "Watch TV channels, movies and content in high quality on the device of your choice over the internet.",
    advantages: [
      {
        title: "Convenient",
        description:
          "Watch many television channels, movies and content online from anywhere at any time",
        image: "urh/icon1.png",
      },
      {
        title: "Catch up",
        description:
          "Catch up on and rewind television channels and scheduled programs for up to 96 hours",
        image: "urh/icon4.png",
      },
      {
        title: "Many channels",
        description:
          "A large selection of television channels, including PSN sports and MovieBox channels",
        image: "urh/icon2.png",
      },
      {
        title: "Content library",
        description:
          "Movies in the video library are free, except specially priced content",
        image: "urh/icon3.png",
      },
    ],
    tariffIntro:
      "Choose the STANDARD or PREMIUM package that suits your viewing needs.",
    tariffNote: "VAT included",
    highlights: [
      {
        title: "80+ TV channels",
        description: "A wide range of TV channels is included in the PREMIUM plan.",
      },
      {
        title: "PSN sports",
        description: "Five sports channels are included in the PREMIUM plan.",
      },
      {
        title: "96-hour catch-up",
        description: "Catch up on scheduled programs for up to 96 hours.",
      },
      {
        title: "Smart devices",
        description: "Watch on a mobile phone, tablet, smart TV and other devices.",
      },
    ],
    groups: [
      {
        plans: [
          {
            title: "STANDARD Plan",
            price: "7,700₮",
            items: [
              "50–60 TV channels",
              "Five PSN sports channels are not included",
              "Catch-up viewing for up to 96 hours is not included",
              "1 device can watch at a time",
            ],
          },
          {
            title: "PREMIUM Plan",
            price: "13,200₮",
            items: [
              "80+ TV channels",
              "Five PSN sports channels included",
              "Catch-up viewing for up to 96 hours included",
              "1 device can watch at a time",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using TV ROOM.",
    comments: [
      "Thank you for adding new and interesting movies every week.",
      "With 96-hour catch-up, I no longer worry about running out of time because I have four full days to watch a program.",
      "It is compact and easy to take anywhere.",
    ],
  },

  mip70: {
    title: "MIP70",
    bundle: "IP PHONE",
    description:
      "MIP70 is a SIP-based prepaid service that allows telephone calls over the internet from anywhere in the world, without geographical limits.",
    logo: "sip.png",
    benefitsIntro:
      "Make affordable and convenient telephone calls from anywhere using SIP technology over the internet.",
    advantages: [
      {
        title: "Low-cost calls",
        description:
          "Free calls within Telecom Mongolia's network and low rates to other networks",
        image: "urh/icon5.png",
      },
      {
        title: "Wide choice",
        description: "A wide selection of customer devices",
        image: "urh/icon7.png",
      },
      {
        title: "Convenient",
        description: "The call recipient does not need an internet connection",
        image: "urh/icon6.png",
      },
      {
        title: "Free",
        description: "No charge for receiving and answering incoming calls",
        image: "urh/icon8.png",
      },
    ],
    tariffIntro:
      "MIP70 number, included calling credit and additional service charges.",
    tariffNote: "VAT included",
    highlights: [
      {
        title: "MIP70 number",
        description: "IP phone service with a 7008-**** number.",
      },
      {
        title: "Use it anywhere",
        description: "Make telephone calls online from anywhere in the world.",
      },
      {
        title: "Low tariff",
        description:
          "Includes 5,000 units and offers low call rates to other networks.",
      },
    ],
    extraNote: {
      title: "Use it on a mobile phone, tablet or SIP device",
      description:
        "Configure SIP on an internet-connected device to use the MIP70 service.",
    },
    groups: [
      {
        plans: [
          {
            title: "Plan 1",
            price: "7,700₮",
            items: [
              "MIP70 number: 7008-****",
              "Initial connection price: 11,000₮",
              "Included calling credit: 5,000 units, valid for 30 days",
              "Calls to other networks: 44₮",
              "Number change, once: 3,300₮",
              "Service restoration, once: 3,300₮",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using MIP70.",
    comments: [
      "It is affordable and easy to use. Thank you to your team.",
      "A friendly team with a long history and reliable service.",
      "Thank you to your team for completing repairs quickly.",
    ],
  },

  "call-center": {
    title: "Call Center",
    bundle: "CALL CENTER",
    description:
      "A Call Center is a technology solution that performs an organization's customer-service functions. Introducing a Call Center into a business can reduce customer-service costs, increase productivity and sales, and improve customer satisfaction.",
    logo: "callcenter.png",
    benefitsIntro:
      "A business call-center solution with incoming-call handling, automated attendants, reports, recordings and operator workload distribution.",
    advantages: [
      {
        title: "Convenient",
        description:
          "Your organization can use the service with only a fixed-line telephone and without purchasing additional equipment",
        image: "urh/icon15.png",
      },
      {
        title: "Flexible",
        description:
          "If there is no fixed-line telephone, a number can be created and used over the internet",
        image: "baiguullaga/icon16.png",
      },
      {
        title: "Dashboard",
        description:
          "View detailed call reports from a dashboard in a web environment",
        image: "baiguullaga/icon17.png",
      },
      {
        title: "Automated",
        description:
          "Automated attendant, call-recording archive, listening and monitoring",
        image: "baiguullaga/icon18.png",
      },
    ],
    tariffIntro:
      "Choose a physical-cable or fiber-optic Call Center package that suits your organization's call-handling needs.",
    tariffNote: "VAT included",
    highlights: [
      {
        title: "Call center",
        description: "Main number, operators and call forwarding.",
      },
      {
        title: "Business-hours settings",
        description: "Organize calls according to your organization's business hours.",
      },
      {
        title: "IVR voice menu",
        description: "Automated attendant, IVR voice menu and call classification.",
      },
      {
        title: "Reports and statistics",
        description: "Call history, reports and a monitoring dashboard.",
      },
    ],
    groups: [
      {
        title: "Physical-cable Call Center",
        description: "Physical-cable Call Center service packages",
        plans: [
          {
            title: "STANDARD Plan",
            price: "55,000₮",
            items: [
              "Main number",
              "Business-hours configuration",
              "Automated attendant",
              "Call forwarding",
              "Technical assistance",
            ],
          },
          {
            title: "OPERATOR Plan",
            price: "165,000₮",
            items: [
              "Main number",
              "Business-hours configuration",
              "Automated attendant",
              "Call forwarding",
              "Technical assistance",
              "Operator workload distribution",
              "Call grouping and classification",
              "Call history and reports",
              "Operator pause mode",
              "IVR voice menu",
            ],
          },
        ],
      },
      {
        title: "Fiber-optic Call Center",
        description: "Fiber-optic Call Center service packages",
        plans: [
          {
            title: "S Plan",
            price: "55,000₮",
            items: [
              "Main number",
              "Business-hours configuration",
              "Automated attendant",
              "Call forwarding",
              "2 extensions",
              "2 call-waiting lines",
            ],
          },
          {
            title: "OPERATOR Plan",
            price: "165,000₮",
            items: [
              "Main number",
              "Business-hours configuration",
              "Automated attendant",
              "Call forwarding",
              "5 extensions",
              "5 call-waiting lines",
              "Call grouping and classification",
              "Call history and reports",
              "Operator temporary pause mode",
              "Recorded IVR voice menu",
            ],
          },
          {
            title: "BUSINESS Plan",
            price: "385,000₮",
            items: [
              "Main number",
              "Business-hours configuration",
              "Automated attendant",
              "Call forwarding",
              "Conditional call forwarding",
              "Call forwarding when there is no answer",
              "Business-hours configuration",
              "Call forwarding while a call is in progress",
              "Dashboard, reports and statistics",
              "Call history",
              "Call-history retention period",
            ],
          },
        ],
      },
    ],
    commentsIntro: "Comments from customers using the Call Center service.",
    comments: [
      "Thank you for providing our organization's internal communications reliably.",
      "Thank you to your team for completing repairs quickly.",
    ],
  },
};

export function getEnglishServicePage(slug: string) {
  return ENGLISH_SERVICE_PAGES[slug] ?? null;
}
