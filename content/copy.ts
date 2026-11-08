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
  fieldTrips: b("Field Trips", "میدانی دورے"),
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
  readFieldTrips: b("Read the field trips", "میدانی دورے پڑھیں"),
  seeMadrasahs: b("See every madrasah", null),
  moreWork: b("More about our work", "ہمارے کام کی مزید تفصیل"),
  toBeConfirmed: b("to be confirmed", "تصدیق باقی ہے"),
  toBePublished: b("to be published", "شائع ہونا باقی"),
  pending: b("pending", "زیرِ التوا"),
  opensInNewTab: b("opens in a new tab", "نئی ونڈو میں کھلتا ہے"),
};

export const footer = {
  registrationHeading: b("Registration status", "رجسٹریشن کی حالت"),
  ukCio: b("UK CIO: in progress, number", "UK CIO: جاری ہے، نمبر"),
  pakistanNgo: b("Pakistan NGO: in progress, number", "Pakistan NGO: جاری ہے، نمبر"),
  address: b("Address", "پتہ"),
  explore: b("Explore", "مزید"),
  policies: b("Policies", "پالیسیاں"),
  allPolicies: b("All policies", null),
  fieldTrips: b("Field trips", "میدانی دورے"),
  transparency: b("Transparency", "شفافیت"),
  madrasahs: b("Madrasahs", null),
  programmes: b("Our work", "ہمارا کام"),
  about: b("About", "تعارف"),
  privacy: b("Privacy", "رازداری"),
  safeguarding: b("Safeguarding", "تحفظ"),
  complaints: b("Complaints", "شکایات"),
  zakat: b("Zakat and Sadaqah", null),
  followHeading: b("Follow", "ہمیں فالو کریں"),
  instagram: b("Instagram", "Instagram"),
  facebook: b("Facebook", "Facebook"),
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
  verificationLabel: b("Latest field trip", "تازہ ترین میدانی دورہ"),
  verificationEmpty: b("No field trips yet", "ابھی کوئی میدانی دورہ نہیں"),
  verificationEmptyBody: b(
    "Field trips are published here once the write-up has been checked.",
    "تحریر کی جانچ کے بعد میدانی دورے یہاں شائع ہوتے ہیں۔",
  ),
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
        "Read our field trips, with the details behind each one.",
        "ہمارے میدانی دورے پڑھیں، ہر دورے کی تفصیلات کے ساتھ۔",
      ),
      action: b("Read field trips", "میدانی دورے پڑھیں"),
      href: "field-trips",
    },
  ],
  latestTripTitle: b("Latest field trip", "تازہ ترین میدانی دورہ"),
  latestTripEmpty: b(
    "Field trips will appear here as they are published.",
    "میدانی دورے شائع ہوتے ہی یہاں آئیں گے۔",
  ),
  howWeWriteTripsTitle: b("How we write a field trip", "ہم میدانی دورہ کیسے لکھتے ہیں"),
  howWeWriteTripsBody: b(
    "A field trip write-up names the place, the date and who went. It can also carry the people and groups met, partners, photos and any figures the trip actually holds. Where a detail is not known, it is left out rather than guessed.",
    "میدانی دورے کی تحریر میں مقام، تاریخ اور یہ درج ہوتا ہے کہ کون گیا۔ اس میں ملنے والے لوگ اور گروہ، شراکت دار، تصاویر اور دورے کے وہ اعداد و شمار بھی ہو سکتے ہیں جو واقعی معلوم ہوں۔ جو بات معلوم نہ ہو، اسے اندازے سے نہیں بلکہ خالی چھوڑ دیا جاتا ہے۔",
  ),
  hbmEyebrow: b("Signature programme", null),
  hbmTitle: b("Home-Based Madrasahs", null),
  hbmLead: b(
    "FI sets up the madrasah and pays the teacher's salary. The teacher, an educated woman, teaches the Holy Quran from her home. Children are not charged.",
    null,
  ),
  hbmStatLabel: b("madrasahs across Sindh and Punjab", null),
  hbmNote: b(
    "Each dot on the map is one madrasah. Where a city repeats, dots are fanned. The table gives each city and how many madrasahs it holds.",
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
  socialTitle: b("Latest from our social media", "ہمارے سوشل میڈیا سے تازہ ترین"),
  socialIntro: b(
    "Posts from our Instagram profile. Each tile opens the original post in a new tab.",
    "ہمارے انسٹاگرام پروفائل کی پوسٹس۔ ہر ٹائل اصل پوسٹ کو نئی ونڈو میں کھولتی ہے۔",
  ),
  socialLink: b("See more on Instagram", "انسٹاگرام پر مزید دیکھیں"),
  socialPostLabel: b("Instagram post from", "انسٹاگرام پوسٹ"),
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
  tablePlace: b("City", "شہر"),
  tableCount: b("No.", null),
  everyTitle: b("Every madrasah, by city", null),
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
    "Our work is small, local and done by people who know the families. We write up a field trip after each distribution so that donors can see what was done.",
    "ہمارا کام چھوٹا، مقامی اور ایسے لوگوں کے ذریعے ہے جو خاندانوں کو جانتے ہیں۔ ہم ہر تقسیم کے بعد میدانی دورہ لکھتے ہیں تاکہ عطیہ دہندگان دیکھ سکیں کہ کیا کیا گیا۔",
  ),
  howWeWorkBody2: b(
    "Our signature programme is the Home-Based Madrasah: FI pays an educated woman to teach the Holy Quran from her home, and children are not charged.",
    null,
  ),
  howWeWorkBody3: b(
    "The work is written up as it is done, so donors can see the place and the activity.",
    "کام ہوتے ہی اس کی تحریر لکھ دی جاتی ہے، تاکہ عطیہ دہندگان مقام اور سرگرمی دیکھ سکیں۔",
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
  fieldTripTitle: b("How we write a field trip", "ہم میدانی دورہ کیسے لکھتے ہیں"),
  fieldTripBody: b(
    "A field trip can be a day trip, a visit or an event. The write-up gives the place, the date and who went, and adds only the figures and photos the trip actually holds.",
    "میدانی دورہ ایک دن کا سفر، ملاقات یا تقریب ہو سکتا ہے۔ تحریر میں مقام، تاریخ اور یہ درج ہوتا ہے کہ کون گیا، اور صرف وہی اعداد و شمار اور تصاویر شامل کی جاتی ہیں جو واقعی موجود ہوں۔",
  ),
};

export const fieldTripsPage = {
  title: nav.fieldTrips,
  lede: b(
    "Day trips, visits and events, written up by the people who went. Each trip opens onto its own page with the place, the date and whatever figures we actually hold.",
    "دن کے دورے، ملاقاتیں اور تقریبات، انہی لوگوں کی تحریر میں جو وہاں گئے۔ ہر دورہ اپنے صفحے پر کھلتا ہے، جہاں مقام، تاریخ اور وہی اعداد و شمار ہوتے ہیں جو واقعی ہمارے پاس ہیں۔",
  ),
  listTitle: b("Published field trips", "شائع شدہ میدانی دورے"),
  listIntro: b(
    "Newest first. Each card shows the date, the place, a short summary and a cover photo when there is one.",
    "نئے پہلے۔ ہر کارڈ پر تاریخ، مقام، مختصر خلاصہ اور، اگر ہو تو، سرورق کی تصویر ہوتی ہے۔",
  ),
  howTitle: b("How we write a field trip", "ہم میدانی دورہ کیسے لکھتے ہیں"),
  howBody: b(
    "A field trip write-up names the place, the date and who went. It can also carry the people and groups met, partners, photos and the figures the trip actually holds. Where a detail is not known, the field stays empty. We do not fill it with a guess.",
    "میدانی دورے کی تحریر میں مقام، تاریخ اور یہ درج ہوتا ہے کہ کون گیا۔ اس میں ملنے والے لوگ اور گروہ، شراکت دار، تصاویر اور دورے کے وہ اعداد و شمار بھی ہو سکتے ہیں جو واقعی معلوم ہوں۔ جو بات معلوم نہ ہو، وہ خالی رہتی ہے۔ ہم اسے اندازے سے نہیں بھرتے۔",
  ),
  howBody2: b(
    "Every write-up is checked against the records before it is published. If a detail is not confirmed, we say nothing about it rather than write something that might be wrong.",
    "ہر تحریر شائع ہونے سے پہلے ریکارڈ سے ملائی جاتی ہے۔ اگر کوئی بات تصدیق شدہ نہ ہو تو اس کے بارے میں کچھ نہیں لکھا جاتا، بجائے اس کے کہ کوئی غلط بات لکھ دی جائے۔",
  ),
  holdsTitle: b(
    "What a field trip page can hold",
    "میدانی دورے کے صفحے پر کیا ہو سکتا ہے",
  ),
  holdsItems: [
    b("The place the trip went to", "وہ مقام جہاں دورہ گیا"),
    b("The date of the trip", "دورے کی تاریخ"),
    b("Who went, or who organised it", "کون گیا، یا کس نے اہتمام کیا"),
    b("The people and groups met", "جن لوگوں اور گروہوں سے ملاقات ہوئی"),
    b("Partners who helped", "جن شراکت داروں نے مدد کی"),
    b("What was done, in plain words", "کیا کیا گیا، سادہ الفاظ میں"),
    b("Households reached, when we know", "گھرانے، جب معلوم ہوں"),
    b("The cost, when we know", "خرچ، جب معلوم ہو"),
    b("Photos, when they are attached", "تصاویر، جب منسلک ہوں"),
    b("The data file, when one is attached", "ڈیٹا فائل، جب منسلک ہو"),
  ],
  holdsNote: b(
    "An empty field means we do not know. It does not mean zero.",
    "خالی جگہ کا مطلب ہے کہ ہمیں معلوم نہیں۔ اس کا مطلب صفر نہیں۔",
  ),
};

export const fieldTripPage = {
  crumb: b("Field trip", "میدانی دورہ"),
  detailsTitle: b("Trip details", "دورے کی تفصیلات"),
  organiser: b("Who went", "کون گیا"),
  peopleMet: b("People and groups met", "جن سے ملاقات ہوئی"),
  partners: b("Partners", "شراکت دار"),
  households: b("Households reached", "گھرانے"),
  cost: b("Cost", "خرچ"),
  statsLabel: b("Figures from the trip", "دورے کے اعداد و شمار"),
  photosTitle: b("Photos", "تصاویر"),
  dataFile: b("Data file", "ڈیٹا فائل"),
  dataFileNote: b(
    "The file this write-up was made from.",
    "وہ فائل جس سے یہ تحریر تیار کی گئی۔",
  ),
  download: b("Download the data", "ڈیٹا ڈاؤن لوڈ کریں"),
  backToFieldTrips: b("All field trips", "تمام میدانی دورے"),
  emptyBody: b("The write-up is not attached yet.", "تحریر ابھی منسلک نہیں ہے۔"),
  languageNoteEnglish: b(
    "This field trip is written in English.",
    "یہ میدانی دورہ انگریزی میں لکھا گیا ہے۔",
  ),
  languageNoteUrdu: b(
    "This field trip is written in Urdu.",
    "یہ میدانی دورہ اردو میں لکھا گیا ہے۔",
  ),
  description: b(
    "A field trip write-up from Fazal-e-Insaaniyat Charity Works.",
    "فضلِ انسانیت چیریٹی ورکس کا ایک میدانی دورہ۔",
  ),
};

export const transparencyPage = {
  title: nav.transparency,
  lede: b(
    "Who we are, how decisions are made, and where the money goes. Where a fact is not confirmed, we say so on the page itself.",
    null,
  ),
  registrationTitle: b("Registration", null),
  registrationBody: b(
    "We are applying to be recognised in two places: as a CIO in the United Kingdom, and as an NGO in Pakistan. Both applications are in progress. Neither has been granted, so this page does not show a number, and we do not treat either application as finished.",
    null,
  ),
  registrationNote: b(
    "If you are checking us before you give, ask us directly for the current position. We will tell you what is confirmed and what is not.",
    null,
  ),
  ukCioLabel: b("UK CIO", "UK CIO"),
  pakistanNgoLabel: b("Pakistan NGO", "Pakistan NGO"),
  addressLabel: b("Charity address", "تنظیم کا پتہ"),
  inProgress: b("in progress, number pending", null),
  trusteesTitle: b("Trustees", "ٹرسٹیز"),
  trusteesBody: b(
    "The charity has trustees. Their names and roles are published only with their consent, and those names are not confirmed here yet.",
    null,
  ),
  governanceTitle: b("How decisions are made", null),
  governanceBody: b(
    "The trustees are responsible for the charity, and the work is run day to day by family members who know the places we serve. Money is agreed before it is spent. Each gift and each cost is entered in the ledger on this page, with a date and a short description.",
    null,
  ),
  moneyTitle: b("Where the money goes", null),
  moneyIntro: b("Money goes to the work itself. These are the lines it is spent on.", null),
  moneyLines: [
    b("Teacher salaries at the Home-Based Madrasahs", null),
    b("Building mosques", null),
    b("Wells and water pumps", null),
    b("Support for widows", null),
    b("Help toward rozgaar, a livelihood", null),
    b("Hunar Ghar, where women stitch clothes and earn", null),
    b("Help buying a rickshaw", null),
  ],
  moneyNote: b(
    "We do not publish a share or a percentage for each line. The ledger shows what was actually received and spent.",
    null,
  ),
  ledgerTitle: b("The ledger", null),
  ledgerIntro: b(
    "Every line records a date, whether money came in or went out, a category, a short description and the amount. Amounts stay in the currency they were held in, and we never add two currencies together.",
    null,
  ),
  figuresTitle: b("Published figures", null),
  figuresIntro: b(
    "A figure appears here only after it has been checked, with the date it is true as of.",
    null,
  ),
  askTitle: b("If something does not add up", null),
  askBody: b(
    "Ask us. We would rather answer a question than leave a gap on the page. The complaints procedure is being written, and our contact details are on the contact page.",
    null,
  ),
  askContact: b("Contact us", "ہم سے رابطہ کریں"),
  tableDate: b("Date", null),
  tableDescription: b("Description", null),
  tableCategory: b("Category", null),
  tableAmount: b("Amount", null),
  kindIncome: b("Money in", null),
  kindExpenditure: b("Money out", null),
  totalsTitle: b("Totals by currency", null),
  totalReceived: b("Received", null),
  totalSpent: b("Spent", null),
  fieldTripLink: b("Field trip", "میدانی دورہ"),
  figureAsOf: b("as of", null),
};

export const givePage = {
  title: common.give,
  lede: b(
    "Bank details, the funds you can give to, and receipts. The details on this page are still being confirmed, and we would rather say that than publish a guess.",
    null,
  ),
  bankTitle: b("Bank transfer", null),
  bankBody: b(
    "A gift by bank transfer is the way we will receive money. The account details are not published yet. They will appear here when they are confirmed.",
    null,
  ),
  accountTitleLabel: b("Account title", null),
  bankLabel: b("Bank", null),
  ibanLabel: b("IBAN or account number", null),
  branchLabel: b("Branch", null),
  referenceLabel: b("Reference to write on the transfer", null),
  safetyTitle: b("Before you send money", null),
  safetyBody: b(
    "Please use only the details shown on this page. Do not send money using details from a message, a screenshot or a forwarded image, even if it looks like it came from us. If you are unsure, ask us first.",
    null,
  ),
  fundsTitle: b("Funds", null),
  fundsIntro: b("A gift can be marked for one of these.", null),
  funds: [
    {
      name: b("Zakat", "زکوٰۃ"),
      body: b("For people who qualify under the rules of zakat.", null),
    },
    {
      name: b("Sadaqah", "صدقہ"),
      body: b("A voluntary gift, given without a condition.", null),
    },
    {
      name: b("Where it is needed most", null),
      body: b(
        "The family team decides where the need is greatest when the gift arrives.",
        null,
      ),
    },
  ],
  fundsNote: b(
    "How a gift is kept or matched to a fund is still being agreed. The zakat and sadaqah policy is being written, so please ask us before giving zakat.",
    null,
  ),
  receiptsTitle: b("Receipts", "رسیدیں"),
  receiptsBody: b(
    "A receipt for every gift is the aim. The way receipts are issued is not settled yet, so we cannot promise one today.",
    null,
  ),
  receiptsChip: b("Receipt process to be confirmed", null),
  receiptsNote: b(
    "Keep the confirmation from your bank. It is the record you have now, and it shows the date and the amount.",
    null,
  ),
  ledgerLink: b("See the ledger", null),
  fieldTripsLink: b("Read the field trips", "میدانی دورے پڑھیں"),
};

export const getHelpPage = {
  title: common.getHelp,
  lede: b(
    "If your family needs something, tell us. You do not need the right words, and you do not pay anything to ask.",
    null,
  ),
  askTitle: b("How to ask", null),
  askBody: b("You can ask in person, or through someone you trust.", null),
  steps: [
    b("Speak to a teacher at one of our madrasahs, or to a neighbour who knows our work.", null),
    b("Tell them what your family needs, in your own words.", null),
    b("Leave a name and a way to reach you, if you have one.", null),
    b("We will come back to you. If we cannot help, we will say so plainly.", null),
  ],
  channelsNote: b(
    "You can call or write to us at the phone number and email address on the contact page. Please use only the details shown there, not a number or an address from anywhere else.",
    "آپ ہمیں رابطہ صفحے پر دیے گئے فون نمبر اور ای میل پر کال یا لکھ سکتے ہیں۔ براہ کرم صرف وہی تفصیلات استعمال کریں، کسی اور جگہ سے نہیں۔",
  ),
  askAboutTitle: b("What we ask you", null),
  askAboutIntro: b(
    "We ask only what helps us decide. You can leave out anything you do not want to share.",
    null,
  ),
  askAboutItems: [
    b("Your name.", null),
    b("The town or village you live in.", null),
    b("How many people are in your household.", null),
    b("What your family needs: food, school, medicine, work, or something else.", null),
    b("The best way to reach you.", null),
  ],
  storedTitle: b("What we write down", null),
  storedBody: b(
    "We write a short note: your name, how to reach you, and what you asked for. We keep it so we can remember what we promised and check what was done.",
    null,
  ),
  storedBody2: b(
    "We do not put your name or your details on this website.",
    null,
  ),
  retentionTitle: b("How long we keep it", null),
  retentionBody: b(
    "The exact period is part of our privacy policy, which is still being written. We will publish the period here when it is agreed, and we will not keep a note longer than that.",
    null,
  ),
  retentionChip: b("Retention period to be confirmed", null),
  notAskedTitle: b("What we do not ask for", null),
  notAskedItems: [
    b("We do not ask you to pay anything, at any point, to ask for help.", null),
    b("We do not ask for your bank details.", null),
    b("We do not publish your name or your family's details.", null),
    b("We do not share your details without your permission.", null),
  ],
  dangerTitle: b("If someone is in danger", null),
  dangerBody: b(
    "If you or a child is in immediate danger, contact the emergency services where you live first. Then tell us, if you can.",
    null,
  ),
  limitTitle: b("If we cannot help", null),
  limitBody: b(
    "We are a small team and we cannot meet every request. If we cannot help, we will tell you, and where we can we will point you to someone who might.",
    null,
  ),
  contactLink: b("Other ways to reach us", null),
};

export const contactPage = {
  title: nav.contact,
  lede: b(
    "How to reach us, and how to offer your time. Our phone, WhatsApp and email are published here. We will not publish a channel that we cannot answer.",
    "ہم تک کیسے پہنچیں، اور اپنا وقت کیسے دیں۔ ہمارا فون، واٹس ایپ اور ای میل یہیں درج ہیں۔ ہم کوئی ایسا ذریعہ شائع نہیں کریں گے جس کا ہم جواب نہ دے سکیں۔",
  ),
  channelsTitle: b("How to reach us", "ہم تک کیسے پہنچیں"),
  channelsIntro: b(
    "You can call the phone number or write to the email address below. These are the only contact details we publish.",
    "آپ نیچے دیے گئے فون نمبر پر کال کر سکتے ہیں یا ای میل پر لکھ سکتے ہیں۔ ہم صرف یہی رابطے کی تفصیلات شائع کرتے ہیں۔",
  ),
  phoneLabel: b("Phone", "فون"),
  whatsappLabel: b("WhatsApp, same mobile number", "واٹس ایپ، وہی موبائل نمبر"),
  emailLabel: b("Email", "ای میل"),
  postLabel: b("Post", "ڈاک"),
  hoursLabel: b("Office hours", "دفتری اوقات"),
  channelsNote: b(
    "Only the details on this page are ours. If someone gives you a number or an address for our charity, check it here before you use it.",
    "صرف اِس صفحے پر دی گئی تفصیلات ہماری ہیں۔ اگر کوئی آپ کو ہماری چیریٹی کا نمبر یا پتہ دے، تو استعمال کرنے سے پہلے یہاں دیکھ لیں۔",
  ),
  volunteerTitle: b("Volunteer", "رضاکار بنیں"),
  volunteerBody: b(
    "Volunteers help at distribution days, carry supplies, keep the records tidy, and share skills such as stitching, teaching or building. Tell us what you can offer and how much time you have.",
    null,
  ),
  volunteerBody2: b(
    "We will ask for your name and a way to reach you. We will not publish them.",
    null,
  ),
  volunteerContact: b(
    "Tell us on the phone number or the email address above.",
    "اوپر دیے گئے فون نمبر یا ای میل پر ہمیں بتائیں۔",
  ),
  complaintsTitle: b("If something has gone wrong", null),
  complaintsBody: b(
    "We want to hear it. The complaints procedure is being written. Until it is published, tell us through any channel on this page.",
    null,
  ),
  complaintsLink: b("The complaints policy", null),
  collabTitle: b("Working with us", null),
  collabBody: b(
    "Other charities and people who want to work with us are welcome to write to the email address above.",
    "دوسری چیریٹیز اور وہ لوگ جو ہمارے ساتھ کام کرنا چاہتے ہیں، اوپر دیے گئے ای میل پتے پر لکھ سکتے ہیں۔",
  ),
};

export const policiesIndex = {
  title: footer.policies,
  lede: b(
    "The policies we are writing, and where each one has reached. None of them is published as a final policy yet.",
    null,
  ),
  intro: b(
    "A policy is published here only when it has been agreed and checked. Until then, each page says plainly that it is still being written.",
    null,
  ),
  status: b("being written", null),
};

export type PolicySlug = "privacy" | "safeguarding" | "complaints" | "zakat-sadaqah";

export const policyPages: Record<
  PolicySlug,
  {
    title: Bilingual;
    lede: Bilingual;
    covers: Bilingual[];
    now: Bilingual[];
    help: Bilingual;
    status: Bilingual;
    chip?: Bilingual;
  }
> = {
  privacy: {
    title: aboutPage.policies[0],
    lede: b(
      "This page is a placeholder. Our privacy policy is being written and is not published yet.",
      null,
    ),
    covers: [
      b("What we hold about people who ask for help, donors and volunteers.", null),
      b("How long we keep it, and how it is removed.", null),
      b("Who can see it, and when we would share it.", null),
      b("How to ask for a copy, or ask us to delete it.", null),
    ],
    now: [
      b("This website does not use analytics, advertising or third party trackers.", null),
      b("We ask for as little as we can when someone asks for help.", null),
      b("We do not publish anyone's details on this site.", null),
    ],
    help: b(
      "If you want to know what we hold about you, or you want it removed, tell us. Our contact details are listed on the contact page.",
      null,
    ),
    status: b("Being written, not published", null),
  },
  safeguarding: {
    title: aboutPage.policies[1],
    lede: b(
      "This page is a placeholder. Our safeguarding policy is being written and is not published yet.",
      null,
    ),
    covers: [
      b("Who the policy protects, including children at the Home-Based Madrasahs and people who ask us for help.", null),
      b("How to raise a concern, and who receives it.", null),
      b("How a concern is looked into, and what happens next.", null),
      b("How the charity checks the people who work with children.", null),
    ],
    now: [
      b("A concern is taken to the trustees.", null),
      b("We do not publish the name of a person who raises a concern.", null),
      b("The safeguarding lead has not been named on this page yet.", null),
    ],
    help: b(
      "If you are worried about a child or an adult at risk, tell us through a channel on the contact page. If someone is in immediate danger, contact the emergency services where you live first.",
      null,
    ),
    status: b("Being written, not published", null),
    chip: b("Safeguarding lead to be confirmed", null),
  },
  complaints: {
    title: aboutPage.policies[2],
    lede: b(
      "This page is a placeholder. Our complaints procedure is being written and is not published yet.",
      null,
    ),
    covers: [
      b("How to make a complaint, and what to include.", null),
      b("How quickly we will reply, and who replies.", null),
      b("What happens if you are not satisfied with the answer.", null),
      b("How complaints are recorded and reviewed.", null),
    ],
    now: [
      b("A complaint goes to the trustees.", null),
      b("We will tell you what we can do, even when the answer is no.", null),
      b("No complaint is published on this site.", null),
    ],
    help: b(
      "If something has gone wrong, tell us now through a channel on the contact page. You do not need to wait for this page to be finished.",
      null,
    ),
    status: b("Being written, not published", null),
  },
  "zakat-sadaqah": {
    title: aboutPage.policies[3],
    lede: b(
      "This page is a placeholder. Our zakat and sadaqah policy is being written and is not published yet.",
      null,
    ),
    covers: [
      b("How zakat is received, recorded and kept apart from other money.", null),
      b("Who can receive zakat, and how that is decided.", null),
      b("How sadaqah is used.", null),
      b("What receipt or record a giver receives.", null),
    ],
    now: [
      b("The way a gift is marked and kept is still being agreed.", null),
      b("We do not publish a share or a percentage.", null),
      b("The ledger on the transparency page records what was received and spent.", null),
    ],
    help: b(
      "Please ask us before you give zakat. Our contact details are listed on the contact page.",
      null,
    ),
    status: b("Being written, not published", null),
  },
};

export const policyPage = {
  statusTitle: b("Status", null),
  coversTitle: b("What this policy will cover", null),
  nowTitle: b("What is true today", null),
  meanwhileTitle: b("What to do meanwhile", null),
};

export const notFound = {
  title: b("Page not published yet", null),
  body: b(
    "This address is not a page on our site. The menu lists every page that is published.",
    null,
  ),
  backHome: b("Back to the home page", "ہوم پیج پر واپس جائیں"),
};
