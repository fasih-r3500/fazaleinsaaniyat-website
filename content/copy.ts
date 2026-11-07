import type { Locale } from "@/lib/locale";

export type Bilingual = {
  en: string;
  ur: string | null;
};

const b = (en: string, ur: string | null = null): Bilingual => ({ en, ur });

export function plainText(locale: Locale, value: Bilingual): string {
  return locale === "ur" && value.ur ? value.ur : value.en;
}

export const site = {
  name: b("Fazal-e-Insaaniyat Charity Works", "فضلِ انسانیت چیریٹی ورکس"),
  shortName: b("Fazal-e-Insaaniyat", "فضلِ انسانیت"),
  charityWorks: b("Charity Works", "چیریٹی ورکس"),
  description: b(
    "Fazal-e-Insaaniyat Charity Works is a family team in Pakistan. Our signature programme is the Home-Based Madrasah. We also build mosques, wells and water pumps, support widows and help people toward a livelihood.",
    null,
  ),
};

export const nav = {
  madrasahs: b("Madrasahs", null),
  work: b("Our work", "ہمارا کام"),
  reports: b("Reports", "رپورٹس"),
  transparency: b("Transparency", "شفافیت"),
  about: b("About", "تعارف"),
  contact: b("Contact", "رابطہ"),
};

export const common = {
  skip: b("Skip to content", "مواد پر جائیں"),
  menu: b("Menu", "مینو"),
  mainNav: b("Main", "مرکزی"),
  home: b("Home", "ہوم"),
  give: b("Give", "عطیہ کریں"),
  getHelp: b("Get help", "مدد حاصل کریں"),
  readTheReports: b("Read the reports", "رپورٹس پڑھیں"),
  seeMadrasahs: b("See every madrasah", null),
  moreWork: b("More about our work", "ہمارے کام کی مزید تفصیل"),
  toBeConfirmed: b("to be confirmed", "تصدیق باقی ہے"),
  toBePublished: b("to be published", "شائع ہونا باقی"),
  pending: b("pending", "زیرِ التوا"),
};

export const footer = {
  registrationHeading: b("Registration status", "رجسٹریشن کی حالت"),
  ukCio: b("UK CIO: in progress, number", "UK CIO: جاری ہے، نمبر"),
  pakistanNgo: b("Pakistan NGO: in progress, number", "Pakistan NGO: جاری ہے، نمبر"),
  address: b("Address", "پتہ"),
  explore: b("Explore", "مزید"),
  policies: b("Policies", "پالیسیاں"),
  fieldReports: b("Field reports", "فیلڈ رپورٹس"),
  transparency: b("Transparency", "شفافیت"),
  madrasahs: b("Madrasahs", null),
  programmes: b("Our work", "ہمارا کام"),
  about: b("About", "تعارف"),
  privacy: b("Privacy", "رازداری"),
  safeguarding: b("Safeguarding", "تحفظ"),
  complaints: b("Complaints", "شکایات"),
  zakat: b("Zakat and Sadaqah", null),
  lastUpdated: b("Last updated", "آخری تازہ کاری"),
  lastUpdatedDate: b("7 November 2026", "7 نومبر 2026"),
  copyright: b("© 2026 Fazal-e-Insaaniyat Charity Works", "© 2026 فضلِ انسانیت چیریٹی ورکس"),
};

export const home = {
  heroTitle: b("Insaaniyat Zinda Hai!", "انسانیت زندہ ہے"),
  heroLede: b(
    "Fazal-e-Insaaniyat Charity Works pays educated women to teach the Holy Quran from their home. We also build mosques, wells and water pumps, support widows, and help people toward a livelihood.",
    null,
  ),
  verificationLabel: b("Latest field report", "تازہ ترین فیلڈ رپورٹ"),
  verificationEmpty: b("No verified report yet", null),
  verificationEmptyBody: b("Reports are published here once the field team has verified them.", null),
  pathwaysTitle: b("Where to start", null),
  paths: [
    {
      title: b("I need help", "مجھے مدد چاہیے"),
      body: b(
        "Tell us what your family needs. We will listen.",
        "ہمیں بتائیں آپ کے خاندان کو کیا چاہیے۔ ہم سنیں گے۔",
      ),
      action: b("Ask for help", "مدد مانگیں"),
      href: "get-help",
    },
    {
      title: b("I want to give", "میں عطیہ دینا چاہتا ہوں"),
      body: b(
        "Bank transfer details, and how we match your gift.",
        "بینک ٹرانسفر کی تفصیلات، اور آپ کے عطیے کی شناخت کا طریقہ۔",
      ),
      action: b("Give", "عطیہ کریں"),
      href: "give",
    },
    {
      title: b("I want to volunteer", "میں رضاکار بننا چاہتا ہوں"),
      body: b(
        "Give your time to distribution days, teaching and fieldwork.",
        "تقسیم، تدریس اور فیلڈ ورک کے لیے اپنا وقت دیں۔",
      ),
      action: b("Volunteer", "رضاکار بنیں"),
      href: "contact",
    },
    {
      title: b("I want to see the work", "میں کام دیکھنا چاہتا ہوں"),
      body: b(
        "Read our field reports, with the details behind each one.",
        "ہماری فیلڈ رپورٹس پڑھیں، ہر رپورٹ کی تفصیلات کے ساتھ۔",
      ),
      action: b("Read reports", "رپورٹس پڑھیں"),
      href: "reports",
    },
  ],
  latestReportTitle: b("Latest field report", "تازہ ترین فیلڈ رپورٹ"),
  latestReportEmpty: b("Reports will appear here as they are published.", null),
  howWeReportTitle: b("How we report", "ہم رپورٹ کیسے کرتے ہیں"),
  howWeReportBody: b(
    "Each report gets a number and a date, and lists the place, what was delivered and how many households. The underlying data will be available to download.",
    "ہر رپورٹ کو نمبر اور تاریخ دی جاتی ہے، اور اس میں مقام، فراہم کی گئی چیزیں اور خاندانوں کی تعداد درج ہوتی ہے۔ بنیادی ڈیٹا ڈاؤن لوڈ کے لیے دستیاب ہوگا۔",
  ),
  hbmEyebrow: b("Signature programme", null),
  hbmTitle: b("Home-Based Madrasahs", null),
  hbmLead: b(
    "FI sets up the madrasah and pays the teacher's salary. The teacher, an educated woman, teaches the Holy Quran from her home. Children are not charged.",
    null,
  ),
  hbmStatLabel: b("madrasahs across Sindh and Punjab", null),
  hbmNote: b(
    "Each dot on the map is one madrasah. Where a city repeats, dots are fanned. The table gives each place and how many madrasahs it holds.",
    null,
  ),
  hbmTableCaption: b("20 madrasahs, grouped by city", null),
  hbmLink: b("See every madrasah", null),
  initiativesTitle: b("What else we do", null),
  initiativesIntro: b(
    "Alongside the Home-Based Madrasahs, FI supports families in other ways. These lines are deliberately plain and carry no counts or dates.",
    null,
  ),
  initiatives: [
    {
      title: b("Mosques", null),
      body: b("Mosques built.", null),
    },
    {
      title: b("Water", null),
      body: b("Wells and water pumps built.", null),
    },
    {
      title: b("Widows", null),
      body: b("Support for widows.", null),
    },
    {
      title: b("Rozgaar", null),
      body: b("Help toward rozgaar, a livelihood.", null),
    },
    {
      title: b("Hunar Ghar", null),
      body: b("A talent house where women stitch clothes and earn a living.", null),
    },
    {
      title: b("Rickshaws", null),
      body: b("Help buying a rickshaw.", null),
    },
    {
      title: b("Collaboration", null),
      body: b("Work with other charities, including Quran Mehal from Lodhra.", null),
    },
  ],
  quoteEnglish: b("“Deen ki taleem, har bachey ka haq.”", null),
  quoteUrdu: "دین کی تعلیم، ہر بچے کا حق",
  quoteCite: b("Our education principle", null),
  ctaTitle: b("Give, or ask for help.", null),
  ctaNote: b("Two ways to start", null),
};

export const madrasahsPage = {
  title: b("Home-Based Madrasahs", null),
  lede: b(
    "FI pays an educated woman to teach the Holy Quran from her home. Children are not charged.",
    null,
  ),
  conceptTitle: b("The idea, plainly", null),
  conceptBody: b(
    "Fazal-e-Insaaniyat Charity Works sets up the madrasah and pays the teacher's salary. The teacher is an educated woman. She teaches the Holy Quran from her own home. Children are not charged.",
    null,
  ),
  conceptPoints: [
    b("FI pays the teacher's salary", null),
    b("FI sets up the madrasah", null),
    b("The teacher teaches from her home", null),
    b("Children are not charged", null),
  ],
  statLabel: b("madrasahs across Sindh and Punjab", null),
  mapTitle: b("The 20 sites", null),
  mapLead: b(
    "One dot for each madrasah, grouped by the place it is named after. Where a city repeats, the dots fan out.",
    null,
  ),
  mapNote: b(
    "Each dot marks the town or city where a madrasah operates. Where a city has more than one, the dots fan out so no site is collapsed.",
    null,
  ),
  mapAriaTitle: b("Map of Pakistan with 20 madrasah sites, one dot per madrasah", null),
  mapAriaDescription: b("Each dot is one madrasah. Where a city repeats, the dots are fanned so no site is collapsed.", null),
  tableCaption: b("20 madrasahs, grouped by city", null),
  tablePlace: b("Place", "مقام"),
  tableCount: b("No.", null),
  everyTitle: b("Every madrasah, by place", null),
  everyLead: b(
    "The list below covers all 20 madrasahs, grouped by city. Where a place holds more than one, the count is shown.",
    null,
  ),
  countNote: b("20 madrasahs in 11 cities.", null),
};

export const programmesPage = {
  title: b("Our work", "ہمارا کام"),
  lede: b(
    "Mosques, water, widows, rozgaar, Hunar Ghar, rickshaws and collaboration with other charities.",
    null,
  ),
  title2: b("What else we do", null),
  intro: b(
    "Alongside the Home-Based Madrasahs, FI supports families in other ways. These lines are deliberately plain and carry no counts or dates.",
    null,
  ),
  items: [
    {
      title: b("Mosques", null),
      body: b("Mosques built.", null),
    },
    {
      title: b("Water", null),
      body: b("Wells and water pumps built.", null),
    },
    {
      title: b("Widows", null),
      body: b("Support for widows.", null),
    },
    {
      title: b("Rozgaar", null),
      body: b("Help toward rozgaar, a livelihood.", null),
    },
    {
      title: b("Hunar Ghar", null),
      body: b("A talent house where women stitch clothes and earn a living.", null),
    },
    {
      title: b("Rickshaws", null),
      body: b("Help buying a rickshaw.", null),
    },
    {
      title: b("Collaboration", null),
      body: b("Work with other charities, including Quran Mehal from Lodhra.", null),
    },
  ],
  collaborationTitle: b("Working with others", null),
  collaborationBody: b(
    "FI works with other charities. One named collaboration is Quran Mehal from Lodhra.",
    null,
  ),
  hbmTitle: b("The signature programme", null),
  hbmBody: b(
    "The Home-Based Madrasahs are the centre of the work. FI sets up the madrasah and pays the teacher's salary.",
    null,
  ),
  hbmLink: b("See the madrasahs", null),
  noNumbers: b(
    "No counts, years or beneficiary numbers are shown for these lines.",
    null,
  ),
  ctaNote: b("Two ways to start", null),
};

export const aboutPage = {
  title: b("About Fazal-e-Insaaniyat", "فضلِ انسانیت کا تعارف"),
  lede: b(
    "A family team in Pakistan. Our signature programme is the Home-Based Madrasah; we also build mosques, wells and water pumps, support widows and help people toward a livelihood.",
    null,
  ),
  statement: b(
    "We are a family team serving families. We start with what is needed on the table, then what a child needs to learn.",
    null,
  ),
  founded: b("Founded", null),
  foundedValue: b("Year to be confirmed", null),
  basedIn: b("Based in", null),
  basedInValue: b("Pakistan", null),
  runBy: b("Run by", null),
  runByValue: b("A family team", null),
  trusteesFact: b("Trustees", null),
  trusteesFactValue: b("In place, names to be confirmed", null),
  howWeWorkTitle: b("How we work", "ہمارا طریقۂ کار"),
  howWeWorkBody: b(
    "Our work is small, local and done by people who know the families. We publish a report on each distribution so that donors can see what was done.",
    "ہمارا کام چھوٹا، مقامی اور ایسے لوگوں کے ذریعے ہے جو خاندانوں کو جانتے ہیں۔ ہم ہر تقسیم کی رپورٹ شائع کرتے ہیں تاکہ عطیہ دہندگان دیکھ سکیں کہ کیا کیا گیا۔",
  ),
  howWeWorkBody2: b(
    "Our signature programme is the Home-Based Madrasah: FI pays an educated woman to teach the Holy Quran from her home, and children are not charged.",
    null,
  ),
  howWeWorkBody3: b(
    "The work is reported as it is done, so donors can see the place and the activity.",
    null,
  ),
  governanceTitle: b("Governance", "نظم و نسق"),
  governanceBody: b(
    "The charity has trustees in place. Names and roles are published only with consent.",
    null,
  ),
  governanceLink: b("Transparency", "شفافیت"),
  policyTitle: b("Policies", "پالیسیاں"),
  policies: [
    b("Privacy statement", "رازداری کا بیان"),
    b("Safeguarding policy", "تحفظ کی پالیسی"),
    b("Complaints procedure", "شکایات کا طریقہ"),
    b("Zakat and Sadaqah policy", null),
  ],
  trusteesTitle: b("Trustees", null),
  trusteesNote: b(
    "The charity has trustees in place. Names and roles will be published with their consent.",
    null,
  ),
  trusteeName: b("Name to be confirmed", null),
  trusteeRole: b("Role to be confirmed", null),
  reportTitle: b("How we report", "ہم رپورٹ کیسے کرتے ہیں"),
  reportBody: b(
    "Each report gets a number and a date, and lists the place, what was delivered and how many households. The underlying data will be available to download.",
    "ہر رپورٹ کو نمبر اور تاریخ دی جاتی ہے، اور اس میں مقام، فراہم کی گئی چیزیں اور خاندانوں کی تعداد درج ہوتی ہے۔ بنیادی ڈیٹا ڈاؤن لوڈ کے لیے دستیاب ہوگا۔",
  ),
};

export const notFound = {
  title: b("Page not published yet", null),
  body: b(
    "This page is not part of the current build. The Madrasahs, Our work and About pages are ready.",
    null,
  ),
  backHome: b("Back to the home page", "ہوم پیج پر واپس جائیں"),
};
