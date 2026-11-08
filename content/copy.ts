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
    "فضلِ انسانیت چیریٹی ورکس پاکستان میں ایک خاندانی ٹیم ہے۔ ہمارا سب سے بڑا پروگرام گھریلو مدرسہ ہے۔ ہم مساجد، کنویں اور واٹر پمپ بناتے ہیں، بیواؤں کی مدد کرتے ہیں اور لوگوں کو روزگار کی طرف لے جاتے ہیں۔",
  ),
};

export const nav = {
  madrasahs: b("Madrasahs", "مدرسے"),
  initiatives: b("Initiatives", "اقدامات"),
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
  seeMadrasahs: b("See every madrasah", "تمام مدرسے دیکھیں"),
  moreWork: b("More about our initiatives", "ہمارے اقدامات کی مزید تفصیل"),
  opensInNewTab: b("opens in a new tab", "نئی ونڈو میں کھلتا ہے"),
  photoNotPublished: b("Photo not published yet", "تصویر ابھی شائع نہیں ہوئی"),
  photoSourceLabel: b(
    "Opens the original photo on Facebook in a new tab",
    "اصل تصویر فیس بک پر نئی ٹیب میں کھلتی ہے",
  ),
};

export const footer = {
  registrationHeading: b("Registration", "رجسٹریشن"),
  ukCio: b(
    "UK CIO registration in progress",
    "UK CIO کی رجسٹریشن جاری ہے",
  ),
  pakistanNgo: b(
    "Pakistan NGO registration in progress",
    "پاکستان NGO کی رجسٹریشن جاری ہے",
  ),
  address: b("Address", "پتہ"),
  explore: b("Explore", "مزید"),
  policies: b("Policies", "پالیسیاں"),
  allPolicies: b("All policies", "تمام پالیسیاں"),
  fieldTrips: b("Field trips", "میدانی دورے"),
  transparency: b("Transparency", "شفافیت"),
  madrasahs: b("Madrasahs", "مدرسے"),
  initiatives: b("Initiatives", "اقدامات"),
  about: b("About", "تعارف"),
  privacy: b("Privacy", "رازداری"),
  safeguarding: b("Safeguarding", "تحفظ"),
  complaints: b("Complaints", "شکایات"),
  zakat: b("Zakat and Sadaqah", "زکوٰۃ و صدقہ"),
  followHeading: b("Follow", "ہمیں فالو کریں"),
  instagram: b("Instagram", "Instagram"),
  facebook: b("Facebook", "Facebook"),
  tiktok: b("TikTok", "TikTok"),
  lastUpdated: b("Last updated", "آخری تازہ کاری"),
  lastUpdatedDate: b("7 November 2026", "7 نومبر 2026"),
  copyright: b("© 2026 Fazal-e-Insaaniyat Charity Works", "© 2026 فضلِ انسانیت چیریٹی ورکس"),
};

export const home = {
  heroTitle: b("Insaaniyat Zinda Hai!", "انسانیت زندہ ہے"),
  heroLede: b(
    "Fazal-e-Insaaniyat Charity Works pays educated women to teach the Holy Quran from their home. We also build mosques, wells and water pumps, support widows, and help people toward a livelihood.",
    "فضلِ انسانیت چیریٹی ورکس پڑھی لکھی خواتین کو تنخواہ دیتی ہے تاکہ وہ اپنے گھر سے قرآنِ مجید پڑھائیں۔ ہم مساجد، کنویں اور واٹر پمپ بھی بناتے ہیں، بیواؤں کی مدد کرتے ہیں اور لوگوں کو روزگار کی طرف لے جاتے ہیں۔",
  ),
  verificationLabel: b("Field trips", "میدانی دورے"),
  verificationEmpty: b("No field trips yet", "ابھی کوئی میدانی دورہ نہیں"),
  verificationEmptyBody: b(
    "A field trip is a visit to a madrasah, a distribution day or a family we serve.",
    "میدانی دورہ کسی مدرسے، تقسیم کے دن یا اُس خاندان کی ملاقات ہوتا ہے جس کی ہم خدمت کرتے ہیں۔",
  ),
  pathwaysTitle: b("Where to start", "کہاں سے شروع کریں"),
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
    "No field trips published yet.",
    "ابھی کوئی میدانی دورہ شائع نہیں ہوا۔",
  ),
  howWeWriteTripsTitle: b("What a field trip records", "میدانی دورے میں کیا درج ہوتا ہے"),
  howWeWriteTripsBody: b(
    "Each write-up gives the place, the date, who went, and the figures and photos from that trip.",
    "ہر تحریر میں مقام، تاریخ، یہ کہ کون گیا، اور اُس دورے کے اعداد و شمار اور تصاویر شامل ہوتی ہیں۔",
  ),
  hbmEyebrow: b("Signature programme", "اہم ترین پروگرام"),
  hbmTitle: b("Home-Based Madrasahs", "گھریلو مدرسے"),
  hbmLead: b(
    "FI sets up the madrasah and pays the teacher's salary. The teacher, an educated woman, teaches the Holy Quran from her home. Children are not charged.",
    "فضلِ انسانیت مدرسہ قائم کرتی ہے اور استاد کی تنخواہ ادا کرتی ہے۔ استاد ایک پڑھی لکھی خاتون ہوتی ہے جو اپنے گھر سے قرآنِ مجید پڑھاتی ہے۔ بچوں سے کوئی فیس نہیں لی جاتی۔",
  ),
  hbmStatLabel: b("madrasahs across Sindh and Punjab", "سندھ اور پنجاب میں مدرسے"),
  hbmLink: b("See every madrasah", "تمام مدرسے دیکھیں"),
  initiativesTitle: b("What else we do", "ہم اور کیا کرتے ہیں"),
  initiativesIntro: b(
    "Alongside the Home-Based Madrasahs, FI supports families in other ways.",
    "گھریلو مدرسوں کے ساتھ ساتھ فضلِ انسانیت خاندانوں کی دوسرے طریقوں سے بھی مدد کرتی ہے۔",
  ),
  socialTitle: b("Latest from our social media", "ہمارے سوشل میڈیا سے تازہ ترین"),
  socialIntro: b(
    "Posts from our Instagram profile.",
    "ہمارے انسٹاگرام پروفائل کی پوسٹس۔",
  ),
  socialLink: b("See more on Instagram", "انسٹاگرام پر مزید دیکھیں"),
  socialPostLabel: b("Instagram post from", "انسٹاگرام پوسٹ از"),
  quoteEnglish: b(
    "“Deen ki taleem, har bachey ka haq.”",
    "“Deen ki taleem, har bachey ka haq.”",
  ),
  quoteUrdu: "دین کی تعلیم، ہر بچے کا حق",
  quoteCite: b("Our education principle", "ہمارا تعلیمی اصول"),
  ctaTitle: b("Give, or ask for help.", "عطیہ کریں، یا مدد مانگیں۔"),
  ctaNote: b("Two ways to start", "شروع کرنے کے دو راستے"),
};

export const madrasahsPage = {
  title: b("Home-Based Madrasahs", "گھریلو مدرسے"),
  lede: b(
    "FI pays an educated woman to teach the Holy Quran from her home. Children are not charged.",
    "فضلِ انسانیت ایک پڑھی لکھی خاتون کو تنخواہ دیتی ہے تاکہ وہ اپنے گھر سے قرآنِ مجید پڑھائے۔ بچوں سے کوئی فیس نہیں لی جاتی۔",
  ),
  conceptTitle: b("How it works", "طریقۂ کار"),
  conceptBody: b(
    "Fazal-e-Insaaniyat Charity Works sets up the madrasah and pays the teacher's salary. The teacher is an educated woman. She teaches the Holy Quran from her own home. Children are not charged.",
    "فضلِ انسانیت چیریٹی ورکس مدرسہ قائم کرتی ہے اور استاد کی تنخواہ ادا کرتی ہے۔ استاد ایک پڑھی لکھی خاتون ہیں۔ وہ اپنے ہی گھر سے قرآنِ مجید پڑھاتی ہیں۔ بچوں سے کوئی فیس نہیں لی جاتی۔",
  ),
  conceptPoints: [
    b("FI pays the teacher's salary", "فضلِ انسانیت استاد کی تنخواہ دیتی ہے"),
    b("FI sets up the madrasah", "فضلِ انسانیت مدرسہ قائم کرتی ہے"),
    b("The teacher teaches from her home", "استاد اپنے گھر سے پڑھاتی ہے"),
    b("Children are not charged", "بچوں سے کوئی فیس نہیں لی جاتی"),
  ],
  statLabel: b("madrasahs across Sindh and Punjab", "سندھ اور پنجاب میں مدرسے"),
  mapTitle: b("Where our madrasahs are", "ہمارے مدرسے کہاں ہیں"),
  mapLead: b(
    "Our madrasahs are in towns and cities across Sindh and Punjab.",
    "ہمارے مدرسے سندھ اور پنجاب کے شہروں اور قصبوں میں ہیں۔",
  ),
  mapNote: b("Each dot is one madrasah.", "ہر نقطہ ایک مدرسہ ہے۔"),
  mapAriaTitle: b(
    "Map of Pakistan showing where our madrasahs are, one dot per madrasah",
    "پاکستان کا نقشہ جس پر ہمارے مدرسے دکھائے گئے ہیں، ہر نقطہ ایک مدرسہ",
  ),
  mapAriaDescription: b(
    "The map shows the towns and cities where our madrasahs teach.",
    "نقشہ وہ شہر اور قصبے دکھاتا ہے جہاں ہمارے مدرسے پڑھاتے ہیں۔",
  ),
  tableCaption: b("Madrasahs by city", "شہر کے حساب سے مدرسے"),
  tablePlace: b("City", "شہر"),
  tableCount: b("Madrasahs", "مدرسے"),
  everyTitle: b("Every madrasah, by city", "ہر مدرسہ، شہر کے حساب سے"),
  everyLead: b(
    "Every madrasah we support, city by city.",
    "ہمارے تمام مدرسے، شہر کے حساب سے۔",
  ),
};

export const initiativesPage = {
  title: b("Initiatives", "اقدامات"),
  lede: b(
    "Mosques, water, widows, rozgaar, Hunar Ghar, rickshaws and collaboration with other charities.",
    "مساجد، پانی، بیوائیں، روزگار، ہنر گھر، رکشے اور دیگر خیراتی اداروں کے ساتھ تعاون۔",
  ),
  indexHeading: b("Every initiative", "تمام اقدامات"),
  indexIntro: b(
    "What each initiative does, who it serves and where it runs.",
    "ہر اقدام یہ بتاتا ہے کہ وہ کیا کرتا ہے، کس کی خدمت کرتا ہے اور کہاں چلتا ہے۔",
  ),
  statusLabels: {
    active: b("Active", "جاری"),
    paused: b("Paused", "معطل"),
    completed: b("Completed", "مکمل"),
  },
  about: b("About this initiative", "اس اقدام کے بارے میں"),
  statsLabel: b("Figures for this initiative", "اس اقدام کے اعداد و شمار"),
  details: b("Details", "تفصیلات"),
  location: b("Location", "مقام"),
  locations: b("Locations", "مقامات"),
  started: b("Started", "آغاز"),
  ended: b("Ended", "اختتام"),
  householdsServed: b("Households served", "خاندان مستفید"),
  cost: b("Cost", "لاگت"),
  costCovers: b("What the cost covers", "لاگت کس چیز پر آئی"),
  peopleServed: b("People served", "مستفید افراد"),
  partners: b("Partners", "شراکت دار"),
  photos: b("Photos", "تصاویر"),
  backToInitiatives: b("All initiatives", "تمام اقدامات"),
  hbmTitle: b("The signature programme", "اہم ترین پروگرام"),
  hbmBody: b(
    "The Home-Based Madrasahs are the centre of the work. FI sets up the madrasah and pays the teacher's salary.",
    "گھریلو مدرسے ہمارے کام کا مرکز ہیں۔ فضلِ انسانیت مدرسہ قائم کرتی ہے اور استاد کی تنخواہ ادا کرتی ہے۔",
  ),
  hbmLink: b("See the madrasahs", "مدرسے دیکھیں"),
  hbmStatLabel: b(
    "madrasahs across Sindh and Punjab",
    "سندھ اور پنجاب میں مدرسے",
  ),
  ctaNote: b("Two ways to start", "شروع کرنے کے دو راستے"),
};

export const aboutPage = {
  title: b("About Fazal-e-Insaaniyat", "فضلِ انسانیت کا تعارف"),
  lede: b(
    "A family team in Pakistan. Our signature programme is the Home-Based Madrasah; we also build mosques, wells and water pumps, support widows and help people toward a livelihood.",
    "پاکستان میں ایک خاندانی ٹیم۔ ہمارا اہم ترین پروگرام گھریلو مدرسہ ہے؛ ہم مساجد، کنویں اور واٹر پمپ بناتے ہیں، بیواؤں کی مدد کرتے ہیں اور لوگوں کو روزگار کی طرف لے جاتے ہیں۔",
  ),
  statement: b(
    "We are a family team serving families. We start with what is needed on the table, then what a child needs to learn.",
    "ہم ایک خاندانی ٹیم ہیں جو خاندانوں کی خدمت کرتی ہے۔ ہم پہلے دسترخوان کی ضرورت دیکھتے ہیں، پھر وہ جو بچے کو سیکھنے کے لیے چاہیے۔",
  ),
  basedIn: b("Based in", "مقام"),
  basedInValue: b("Pakistan", "پاکستان"),
  runBy: b("Run by", "کس کی طرف سے"),
  runByValue: b("A family team", "ایک خاندانی ٹیم"),
  howWeWorkTitle: b("How we work", "ہمارا طریقۂ کار"),
  howWeWorkBody: b(
    "Our work is small, local and done by people who know the families. We write up a field trip after each distribution so that donors can see what was done.",
    "ہمارا کام چھوٹا، مقامی اور ایسے لوگوں کے ذریعے ہے جو خاندانوں کو جانتے ہیں۔ ہم ہر تقسیم کے بعد میدانی دورہ لکھتے ہیں تاکہ عطیہ دہندگان دیکھ سکیں کہ کیا کیا گیا۔",
  ),
  howWeWorkBody2: b(
    "Our signature programme is the Home-Based Madrasah: FI pays an educated woman to teach the Holy Quran from her home, and children are not charged.",
    "ہمارا اہم ترین پروگرام گھریلو مدرسہ ہے: فضلِ انسانیت ایک پڑھی لکھی خاتون کو تنخواہ دیتی ہے تاکہ وہ اپنے گھر سے قرآنِ مجید پڑھائے، اور بچوں سے کوئی فیس نہیں لی جاتی۔",
  ),
  governanceTitle: b("Governance", "نظم و نسق"),
  governanceBody: b(
    "The charity has trustees in place. Names and roles are published only with consent.",
    "تنظیم کے ٹرسٹیز موجود ہیں۔ نام اور ذمہ داریاں صرف اجازت کے بعد شائع کی جاتی ہیں۔",
  ),
  governanceLink: b("Transparency", "شفافیت"),
  policyTitle: b("Policies", "پالیسیاں"),
  policies: [
    b("Privacy statement", "رازداری کا بیان"),
    b("Safeguarding policy", "تحفظ کی پالیسی"),
    b("Complaints procedure", "شکایات کا طریقہ"),
    b("Zakat and Sadaqah policy", "زکوٰۃ و صدقہ کی پالیسی"),
  ],
  fieldTripTitle: b("What a field trip records", "میدانی دورے میں کیا درج ہوتا ہے"),
  fieldTripBody: b(
    "A field trip can be a day trip, a visit or an event. The write-up gives the place, the date, who went, and the figures and photos from that trip.",
    "میدانی دورہ ایک دن کا سفر، ملاقات یا تقریب ہو سکتا ہے۔ تحریر میں مقام، تاریخ، یہ کہ کون گیا، اور اُس دورے کے اعداد و شمار اور تصاویر شامل ہوتی ہیں۔",
  ),
};

export const fieldTripsPage = {
  title: nav.fieldTrips,
  lede: b(
    "Day trips, visits and events from our work, written up by the people who went.",
    "ہمارے کام کے دن کے دورے، ملاقاتیں اور تقریبات، اُنہی لوگوں کی تحریر میں جو وہاں گئے۔",
  ),
  listTitle: b("Published field trips", "شائع شدہ میدانی دورے"),
  listIntro: b("Newest first.", "نئے پہلے۔"),
  howTitle: b("What a field trip records", "میدانی دورے میں کیا درج ہوتا ہے"),
  howBody: b(
    "Each write-up gives the place, the date, who went, and the figures and photos from that trip.",
    "ہر تحریر میں مقام، تاریخ، یہ کہ کون گیا، اور اُس دورے کے اعداد و شمار اور تصاویر شامل ہوتی ہیں۔",
  ),
  holdsTitle: b("In each write-up", "ہر تحریر میں"),
  holdsItems: [
    b("The place the trip went to", "وہ مقام جہاں دورہ گیا"),
    b("The date of the trip", "دورے کی تاریخ"),
    b("Who went, or who organised it", "کون گیا، یا کس نے اہتمام کیا"),
    b("The people and groups met", "جن لوگوں اور گروہوں سے ملاقات ہوئی"),
    b("Partners who helped", "جن شراکت داروں نے مدد کی"),
    b("What was done", "کیا کیا گیا"),
    b("Households reached", "کتنے گھرانے پہنچے"),
    b("The cost", "خرچ"),
    b("Photos", "تصاویر"),
  ],
  fieldTitle: b("From the field", "میدان سے"),
  fieldIntro: b(
    "Photographs from our Facebook page.",
    "ہمارے فیس بک پیج کی تصاویر۔",
  ),
  fieldSource: b("Facebook page", "فیس بک پیج"),
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
    "The file behind this write-up.",
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
    "Who we are, how decisions are made, and where the money goes.",
    "ہم کون ہیں، فیصلے کیسے ہوتے ہیں، اور پیسہ کہاں جاتا ہے۔",
  ),
  registrationTitle: b("Registration", "رجسٹریشن"),
  registrationBody: b(
    "We are applying for registration in two places: as a CIO in the United Kingdom, and as an NGO in Pakistan. Both applications are in progress.",
    "ہم دو جگہوں پر رجسٹریشن کے لیے درخواست دے رہے ہیں: برطانیہ میں CIO کے طور پر، اور پاکستان میں NGO کے طور پر۔ دونوں درخواستیں جاری ہیں۔",
  ),
  ukCioLabel: b("UK CIO", "UK CIO"),
  pakistanNgoLabel: b("Pakistan NGO", "پاکستان NGO"),
  addressLabel: b("Charity address", "تنظیم کا پتہ"),
  inProgress: b("registration in progress", "رجسٹریشن جاری ہے"),
  governanceTitle: b("How decisions are made", "فیصلے کیسے ہوتے ہیں"),
  governanceBody: b(
    "The trustees are responsible for the charity, and the work is run day to day by family members who know the places we serve. Money is agreed before it is spent. Each gift and each cost is entered in the ledger below, with a date and a short description.",
    "ٹرسٹیز تنظیم کے ذمہ دار ہیں، اور روزمرہ کام خاندان کے اُن افراد کے ہاتھ میں ہے جو ہماری خدمت کے علاقوں کو جانتے ہیں۔ خرچ کرنے سے پہلے رقم طے کی جاتی ہے۔ ہر عطیہ اور ہر خرچ اِس صفحے کے کھاتے میں تاریخ اور مختصر تفصیل کے ساتھ درج ہوتا ہے۔",
  ),
  moneyTitle: b("Where the money goes", "پیسہ کہاں جاتا ہے"),
  moneyIntro: b(
    "Money goes to the work itself. These are the lines it is spent on.",
    "پیسہ کام پر جاتا ہے۔ یہ وہ مد ہیں جن پر خرچ ہوتا ہے۔",
  ),
  moneyLines: [
    b("Teacher salaries at the Home-Based Madrasahs", "گھریلو مدرسوں میں استاد کی تنخواہ"),
    b("Building mosques", "مساجد کی تعمیر"),
    b("Wells and water pumps", "کنویں اور واٹر پمپ"),
    b("Support for widows", "بیواؤں کی مدد"),
    b("Help toward rozgaar, a livelihood", "روزگار کی طرف مدد"),
    b("Hunar Ghar, where women stitch clothes and earn", "ہنر گھر، جہاں خواتین کپڑے سلائی کر کے کماتی ہیں"),
    b("Help buying a rickshaw", "رکشہ خریدنے میں مدد"),
  ],
  moneyNote: b(
    "The ledger shows what was received and spent.",
    "کھاتہ دکھاتا ہے کہ کیا وصول ہوا اور کیا خرچ ہوا۔",
  ),
  ledgerTitle: b("The ledger", "کھاتہ"),
  ledgerIntro: b(
    "Every line carries a date, a description, whether money came in or went out, and the amount, in the currency it was held in.",
    "ہر سطر میں تاریخ، تفصیل، یہ کہ رقم آئی یا گئی، اور رقم اُسی کرنسی میں درج ہے جس میں رکھی گئی۔",
  ),
  figuresTitle: b("Published figures", "شائع شدہ اعداد"),
  figuresIntro: b(
    "Each figure carries the date it is true as of.",
    "ہر عدد کے ساتھ وہ تاریخ درج ہے جس تک وہ درست ہے۔",
  ),
  askTitle: b("If something does not add up", "اگر کوئی حساب نہ ملے"),
  askBody: b(
    "Ask us. Our contact details are on the contact page, and the complaints procedure is being written.",
    "ہم سے پوچھیں۔ ہماری رابطے کی تفصیلات رابطہ صفحے پر ہیں، اور شکایات کا طریقہ لکھا جا رہا ہے۔",
  ),
  askContact: b("Contact us", "ہم سے رابطہ کریں"),
  tableDate: b("Date", "تاریخ"),
  tableDescription: b("Description", "تفصیل"),
  tableCategory: b("Category", "مد"),
  tableAmount: b("Amount", "رقم"),
  kindIncome: b("Money in", "رقم آئی"),
  kindExpenditure: b("Money out", "رقم گئی"),
  totalsTitle: b("Totals by currency", "کرنسی کے حساب سے میزان"),
  totalReceived: b("Received", "وصول"),
  totalSpent: b("Spent", "خرچ"),
  fieldTripLink: b("Field trip", "میدانی دورہ"),
  figureAsOf: b("as of", "بمطابق"),
};

export const givePage = {
  title: common.give,
  lede: b(
    "Bank details, the funds you can give to, and receipts.",
    "بینک کی تفصیلات، وہ فنڈز جنہیں آپ عطیہ کر سکتے ہیں، اور رسیدیں۔",
  ),
  bankTitle: b("Bank transfer", "بینک ٹرانسفر"),
  bankBody: b(
    "Bank transfer is how we receive gifts. The account details are not published yet.",
    "عطیہ ہمیں بینک ٹرانسفر سے ملتا ہے۔ اکاؤنٹ کی تفصیلات ابھی شائع نہیں ہوئیں۔",
  ),
  safetyTitle: b("Before you send money", "رقم بھیجنے سے پہلے"),
  safetyBody: b(
    "Please use only the details shown on this page. Do not send money using details from a message, a screenshot or a forwarded image, even if it looks like it came from us. If you are unsure, ask us first.",
    "براہ کرم صرف اِس صفحے پر دی گئی تفصیلات استعمال کریں۔ کسی پیغام، اسکرین شاٹ یا فارورڈ کی گئی تصویر سے ملنے والی تفصیلات پر رقم نہ بھیجیں، چاہے وہ ہماری ہی لگے۔ اگر شک ہو تو پہلے ہم سے پوچھیں۔",
  ),
  fundsTitle: b("Funds", "فنڈز"),
  fundsIntro: b(
    "A gift can be marked for one of these.",
    "عطیہ اِن میں سے کسی ایک کے لیے مختص کیا جا سکتا ہے۔",
  ),
  funds: [
    {
      name: b("Zakat", "زکوٰۃ"),
      body: b(
        "For people who qualify under the rules of zakat.",
        "اُن لوگوں کے لیے جو زکوٰۃ کے شرعی احکام کے مطابق حقدار ہیں۔",
      ),
    },
    {
      name: b("Sadaqah", "صدقہ"),
      body: b(
        "A voluntary gift, given without a condition.",
        "ایک رضاکارانہ عطیہ، بغیر کسی شرط کے۔",
      ),
    },
    {
      name: b("Where it is needed most", "جہاں سب سے زیادہ ضرورت ہو"),
      body: b(
        "The family team decides where the need is greatest when the gift arrives.",
        "عطیہ آنے پر خاندانی ٹیم طے کرتی ہے کہ کہاں سب سے زیادہ ضرورت ہے۔",
      ),
    },
  ],
  fundsNote: b(
    "The zakat and sadaqah policy is being written. Please ask us before giving zakat.",
    "زکوٰۃ و صدقہ کی پالیسی لکھی جا رہی ہے۔ زکوٰۃ دینے سے پہلے ہم سے پوچھیں۔",
  ),
  receiptsTitle: b("Receipts", "رسیدیں"),
  receiptsBody: b(
    "We aim to send a receipt for every gift. Receipts are not being issued yet, so please ask us when you give.",
    "ہماری کوشش ہے کہ ہر عطیے کی رسید ہو۔ رسیدیں ابھی جاری نہیں ہو رہیں، اِس لیے عطیہ دیتے وقت ہم سے پوچھ لیں۔",
  ),
  receiptsNote: b(
    "Keep your bank confirmation. It shows the date and the amount.",
    "بینک کی تصدیق سنبھال کر رکھیں۔ اُس پر تاریخ اور رقم درج ہے۔",
  ),
  ledgerLink: b("See the ledger", "کھاتہ دیکھیں"),
  fieldTripsLink: b("Read the field trips", "میدانی دورے پڑھیں"),
};

export const getHelpPage = {
  title: common.getHelp,
  lede: b(
    "If your family needs something, tell us. You do not need the right words, and you do not pay anything to ask.",
    "اگر آپ کے خاندان کو کسی چیز کی ضرورت ہے تو ہمیں بتائیں۔ درست الفاظ کی ضرورت نہیں، اور مدد مانگنے کے لیے کچھ نہیں دینا پڑتا۔",
  ),
  askTitle: b("How to ask", "مدد کیسے مانگیں"),
  askBody: b(
    "You can ask in person, or through someone you trust.",
    "آپ خود آ کر مانگ سکتے ہیں، یا کسی ایسے شخص کے ذریعے جو آپ کا بھروسہ ہو۔",
  ),
  steps: [
    b(
      "Speak to a teacher at one of our madrasahs, or to a neighbour who knows our work.",
      "ہمارے کسی مدرسے کی استاد سے بات کریں، یا کسی ایسے پڑوسی سے جو ہمارا کام جانتا ہو۔",
    ),
    b(
      "Tell them what your family needs, in your own words.",
      "اُنہیں اپنے الفاظ میں بتائیں کہ آپ کے خاندان کو کیا چاہیے۔",
    ),
    b(
      "Leave a name and a way to reach you, if you have one.",
      "اگر ممکن ہو تو اپنا نام اور پہنچنے کا کوئی ذریعہ چھوڑ دیں۔",
    ),
    b(
      "We will come back to you. If we cannot help, we will say so plainly.",
      "ہم آپ سے رابطہ کریں گے۔ اگر ہم مدد نہ کر سکیں تو صاف بتا دیں گے۔",
    ),
  ],
  channelsNote: b(
    "You can call or write to us at the phone number and email address on the contact page. Please use only the details shown there, not a number or an address from anywhere else.",
    "آپ ہمیں رابطہ صفحے پر دیے گئے فون نمبر اور ای میل پر کال یا لکھ سکتے ہیں۔ براہ کرم صرف وہی تفصیلات استعمال کریں، کسی اور جگہ سے نہیں۔",
  ),
  askAboutTitle: b("What we ask you", "ہم آپ سے کیا پوچھتے ہیں"),
  askAboutIntro: b(
    "We ask only what helps us decide. You can leave out anything you do not want to share.",
    "ہم صرف وہی پوچھتے ہیں جو فیصلے میں مدد دے۔ جو بات آپ نہ بتانا چاہیں، وہ چھوڑ سکتے ہیں۔",
  ),
  askAboutItems: [
    b("Your name.", "آپ کا نام۔"),
    b("The town or village you live in.", "آپ کا شہر یا گاؤں۔"),
    b("How many people are in your household.", "آپ کے گھر میں کتنے افراد ہیں۔"),
    b(
      "What your family needs: food, school, medicine, work, or something else.",
      "آپ کے خاندان کو کیا چاہیے: کھانا، تعلیم، دوا، کام، یا کچھ اور۔",
    ),
    b("The best way to reach you.", "آپ تک پہنچنے کا بہترین ذریعہ۔"),
  ],
  storedTitle: b("What we write down", "ہم کیا لکھتے ہیں"),
  storedBody: b(
    "We write a short note: your name, how to reach you, and what you asked for. We keep it so we can remember what we promised and check what was done.",
    "ہم ایک مختصر نوٹ لکھتے ہیں: آپ کا نام، آپ تک پہنچنے کا ذریعہ، اور آپ کی درخواست۔ ہم اُسے سنبھال کر رکھتے ہیں تاکہ ہمیں یاد رہے کہ کیا وعدہ کیا تھا اور کیا کیا گیا۔",
  ),
  storedBody2: b(
    "We never publish your name or your details.",
    "ہم آپ کا نام یا آپ کی تفصیلات کبھی شائع نہیں کرتے۔",
  ),
  retentionTitle: b("How long we keep it", "ہم اُسے کتنا عرصہ رکھتے ہیں"),
  retentionBody: b(
    "We keep the note only as long as we need it to help. The exact period is set out in our privacy policy, which is being written.",
    "ہم نوٹ اُتنی دیر رکھتے ہیں جتنی مدد کے لیے ضروری ہو۔ درست مدت ہماری رازداری کی پالیسی میں ہے، جو لکھی جا رہی ہے۔",
  ),
  notAskedTitle: b("What we do not ask for", "ہم کیا نہیں مانگتے"),
  notAskedItems: [
    b(
      "We do not ask you to pay anything, at any point, to ask for help.",
      "مدد مانگنے کے لیے ہم کبھی کچھ دینے کو نہیں کہتے۔",
    ),
    b("We do not ask for your bank details.", "ہم آپ کی بینک تفصیلات نہیں مانگتے۔"),
    b(
      "We do not publish your name or your family's details.",
      "ہم آپ کا نام یا آپ کے خاندان کی تفصیلات شائع نہیں کرتے۔",
    ),
    b(
      "We do not share your details without your permission.",
      "ہم آپ کی اجازت کے بغیر آپ کی تفصیلات کہیں نہیں بھیجتے۔",
    ),
  ],
  dangerTitle: b("If someone is in danger", "اگر کوئی خطرے میں ہو"),
  dangerBody: b(
    "If you or a child is in immediate danger, contact the emergency services where you live first. Then tell us, if you can.",
    "اگر آپ یا کوئی بچہ فوری خطرے میں ہو تو پہلے اپنے علاقے کے ایمرجنسی نمبر پر رابطہ کریں۔ پھر، اگر ممکن ہو، ہمیں بتائیں۔",
  ),
  limitTitle: b("If we cannot help", "اگر ہم مدد نہ کر سکیں"),
  limitBody: b(
    "We are a small team and we cannot meet every request. If we cannot help, we will tell you, and where we can we will point you to someone who might.",
    "ہم ایک چھوٹی ٹیم ہیں اور ہر درخواست پوری نہیں کر سکتے۔ اگر مدد نہ کر سکیں تو بتا دیں گے، اور جہاں ممکن ہو کسی اور کا پتہ بتا دیں گے۔",
  ),
  contactLink: b("Other ways to reach us", "ہم تک پہنچنے کے دوسرے ذرائع"),
};

export const contactPage = {
  title: nav.contact,
  lede: b(
    "How to reach us, and how to offer your time.",
    "ہم تک کیسے پہنچیں، اور اپنا وقت کیسے دیں۔",
  ),
  channelsTitle: b("How to reach us", "ہم تک کیسے پہنچیں"),
  channelsIntro: b(
    "Call, message or write to us. You can also find us on Instagram, Facebook and TikTok.",
    "کال کریں، پیغام بھیجیں یا لکھیں۔ ہمیں انسٹاگرام، فیس بک اور ٹک ٹاک پر بھی پایا جا سکتا ہے۔",
  ),
  phoneLabel: b("Phone", "فون"),
  whatsappLabel: b("WhatsApp, same mobile number", "واٹس ایپ، وہی موبائل نمبر"),
  emailLabel: b("Email", "ای میل"),
  addressLabel: b("Address", "پتہ"),
  socialLabel: b("Instagram, Facebook and TikTok", "انسٹاگرام، فیس بک اور ٹک ٹاک"),
  channelsNote: b(
    "Only the details on this page are ours. If someone gives you a number or an address for our charity, check it here before you use it.",
    "صرف اِس صفحے پر دی گئی تفصیلات ہماری ہیں۔ اگر کوئی آپ کو ہماری چیریٹی کا نمبر یا پتہ دے، تو استعمال کرنے سے پہلے یہاں دیکھ لیں۔",
  ),
  volunteerTitle: b("Volunteer", "رضاکار بنیں"),
  volunteerBody: b(
    "Volunteers help at distribution days, carry supplies, keep the records tidy, and share skills such as stitching, teaching or building. Tell us what you can offer and how much time you have.",
    "رضاکار تقسیم کے دنوں میں مدد کرتے ہیں، سامان اٹھاتے ہیں، ریکارڈ سنبھالتے ہیں، اور سلائی، تدریس یا تعمیر جیسے ہنر بانٹتے ہیں۔ ہمیں بتائیں کہ آپ کیا دے سکتے ہیں اور کتنا وقت دے سکتے ہیں۔",
  ),
  volunteerBody2: b(
    "We will ask for your name and a way to reach you. We will not publish them.",
    "ہم آپ کا نام اور پہنچنے کا ذریعہ پوچھیں گے۔ ہم اُنہیں شائع نہیں کریں گے۔",
  ),
  volunteerContact: b(
    "Tell us on the phone number or the email address above.",
    "اوپر دیے گئے فون نمبر یا ای میل پر ہمیں بتائیں۔",
  ),
  complaintsTitle: b("If something has gone wrong", "اگر کوئی بات غلط ہو گئی ہو"),
  complaintsBody: b(
    "We want to hear it. The complaints procedure is being written. Until it is published, tell us through any channel on this page.",
    "ہم اُسے سننا چاہتے ہیں۔ شکایات کا طریقہ لکھا جا رہا ہے۔ جب تک وہ شائع نہ ہو، اِس صفحے کے کسی بھی ذریعے سے ہمیں بتائیں۔",
  ),
  complaintsLink: b("The complaints policy", "شکایات کی پالیسی"),
  collabTitle: b("Working with us", "ہمارے ساتھ کام کرنا"),
  collabBody: b(
    "Other charities and people who want to work with us are welcome to write to the email address above.",
    "دوسری چیریٹیز اور وہ لوگ جو ہمارے ساتھ کام کرنا چاہتے ہیں، اوپر دیے گئے ای میل پتے پر لکھ سکتے ہیں۔",
  ),
};

export const policiesIndex = {
  title: footer.policies,
  lede: b(
    "The policies we are writing. None of them is published as a final policy yet.",
    "وہ پالیسیاں جو ہم لکھ رہے ہیں۔ اِن میں سے کوئی بھی ابھی حتمی پالیسی کے طور پر شائع نہیں ہوئی۔",
  ),
  intro: b(
    "Each page says what the policy will cover and what we do now.",
    "ہر صفحہ بتاتا ہے کہ پالیسی کس چیز کا احاطہ کرے گی اور اب ہم کیا کرتے ہیں۔",
  ),
  status: b("being written", "لکھی جا رہی ہے"),
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
  }
> = {
  privacy: {
    title: aboutPage.policies[0],
    lede: b(
      "Our privacy policy is being written and is not published yet.",
      "ہماری رازداری کی پالیسی لکھی جا رہی ہے اور ابھی شائع نہیں ہوئی۔",
    ),
    covers: [
      b(
        "What we hold about people who ask for help, donors and volunteers.",
        "مدد مانگنے والوں، عطیہ دہندگان اور رضاکاروں کے بارے میں ہمارے پاس کیا محفوظ ہوتا ہے۔",
      ),
      b(
        "How long we keep it, and how it is removed.",
        "ہم اُسے کتنا عرصہ رکھتے ہیں، اور وہ کیسے مٹایا جاتا ہے۔",
      ),
      b(
        "Who can see it, and when we would share it.",
        "اُسے کون دیکھ سکتا ہے، اور ہم کب اُسے کہیں بھیجتے ہیں۔",
      ),
      b(
        "How to ask for a copy, or ask us to delete it.",
        "نقل کیسے مانگیں، یا اُسے مٹانے کو کیسے کہیں۔",
      ),
    ],
    now: [
      b(
        "This website does not use analytics, advertising or third party trackers.",
        "یہ ویب سائٹ کوئی تجزیہ، اشتہار یا کسی تیسرے فریق کا ٹریکر استعمال نہیں کرتی۔",
      ),
      b(
        "We ask for as little as we can when someone asks for help.",
        "جب کوئی مدد مانگتا ہے تو ہم جتنا کم پوچھ سکیں، اُتنا ہی پوچھتے ہیں۔",
      ),
      b(
        "We do not publish anyone's details on this site.",
        "ہم کسی کی تفصیلات اِس ویب سائٹ پر شائع نہیں کرتے۔",
      ),
    ],
    help: b(
      "If you want to know what we hold about you, or you want it removed, tell us. Our contact details are listed on the contact page.",
      "اگر آپ جاننا چاہیں کہ آپ کے بارے میں ہمارے پاس کیا ہے، یا اُسے مٹوانا چاہیں، تو ہمیں بتائیں۔ ہماری رابطے کی تفصیلات رابطہ صفحے پر ہیں۔",
    ),
    status: b("Being written, not published", "لکھی جا رہی ہے، شائع نہیں ہوئی"),
  },
  safeguarding: {
    title: aboutPage.policies[1],
    lede: b(
      "Our safeguarding policy is being written and is not published yet.",
      "ہماری تحفظ کی پالیسی لکھی جا رہی ہے اور ابھی شائع نہیں ہوئی۔",
    ),
    covers: [
      b(
        "Who the policy protects, including children at the Home-Based Madrasahs and people who ask us for help.",
        "پالیسی کس کی حفاظت کرتی ہے، بشمول گھریلو مدرسوں کے بچوں اور مدد مانگنے والوں کے۔",
      ),
      b(
        "How to raise a concern, and who receives it.",
        "تشویش کیسے بتائی جائے، اور وہ کس تک پہنچتی ہے۔",
      ),
      b(
        "How a concern is looked into, and what happens next.",
        "تشویش کی جانچ کیسے ہوتی ہے، اور آگے کیا ہوتا ہے۔",
      ),
      b(
        "How the charity checks the people who work with children.",
        "تنظیم بچوں کے ساتھ کام کرنے والوں کی جانچ کیسے کرتی ہے۔",
      ),
    ],
    now: [
      b("A concern is taken to the trustees.", "تشویش ٹرسٹیز تک پہنچائی جاتی ہے۔"),
      b(
        "We do not publish the name of a person who raises a concern.",
        "ہم تشویش بتانے والے کا نام شائع نہیں کرتے۔",
      ),
    ],
    help: b(
      "If you are worried about a child or an adult at risk, tell us through a channel on the contact page. If someone is in immediate danger, contact the emergency services where you live first.",
      "اگر آپ کو کسی بچے یا کسی خطرے میں گھرے شخص کی فکر ہو تو رابطہ صفحے کے کسی ذریعے سے ہمیں بتائیں۔ اگر کوئی فوری خطرے میں ہو تو پہلے اپنے علاقے کے ایمرجنسی نمبر پر رابطہ کریں۔",
    ),
    status: b("Being written, not published", "لکھی جا رہی ہے، شائع نہیں ہوئی"),
  },
  complaints: {
    title: aboutPage.policies[2],
    lede: b(
      "Our complaints procedure is being written and is not published yet.",
      "شکایات کا طریقہ لکھا جا رہا ہے اور ابھی شائع نہیں ہوا۔",
    ),
    covers: [
      b(
        "How to make a complaint, and what to include.",
        "شکایت کیسے کی جائے، اور اُس میں کیا لکھا جائے۔",
      ),
      b(
        "How quickly we will reply, and who replies.",
        "ہم کتنی جلدی جواب دیں گے، اور کون جواب دے گا۔",
      ),
      b(
        "What happens if you are not satisfied with the answer.",
        "اگر آپ جواب سے مطمئن نہ ہوں تو کیا ہوگا۔",
      ),
      b(
        "How complaints are recorded and reviewed.",
        "شکایات کیسے درج اور جانچی جاتی ہیں۔",
      ),
    ],
    now: [
      b("A complaint goes to the trustees.", "شکایت ٹرسٹیز تک جاتی ہے۔"),
      b(
        "We will tell you what we can do, even when the answer is no.",
        "ہم بتا دیں گے کہ ہم کیا کر سکتے ہیں، چاہے جواب نہ ہی ہو۔",
      ),
      b("No complaint is published on this site.", "اِس ویب سائٹ پر کوئی شکایت شائع نہیں ہوتی۔"),
    ],
    help: b(
      "If something has gone wrong, tell us now through a channel on the contact page.",
      "اگر کوئی بات غلط ہو گئی ہو تو رابطہ صفحے کے کسی ذریعے سے ابھی ہمیں بتائیں۔",
    ),
    status: b("Being written, not published", "لکھی جا رہی ہے، شائع نہیں ہوئی"),
  },
  "zakat-sadaqah": {
    title: aboutPage.policies[3],
    lede: b(
      "Our zakat and sadaqah policy is being written and is not published yet.",
      "زکوٰۃ و صدقہ کی پالیسی لکھی جا رہی ہے اور ابھی شائع نہیں ہوئی۔",
    ),
    covers: [
      b(
        "How zakat is received, recorded and kept apart from other money.",
        "زکوٰۃ کیسے وصول، درج اور دوسری رقم سے الگ رکھی جاتی ہے۔",
      ),
      b(
        "Who can receive zakat, and how that is decided.",
        "زکوٰۃ کون لے سکتا ہے، اور یہ فیصلہ کیسے ہوتا ہے۔",
      ),
      b("How sadaqah is used.", "صدقہ کہاں استعمال ہوتا ہے۔"),
      b(
        "What receipt or record a giver receives.",
        "دینے والے کو کون سی رسید یا ریکارڈ ملتا ہے۔",
      ),
    ],
    now: [
      b(
        "The way a gift is marked and kept is still being agreed.",
        "عطیے کو نشان زد کرنے اور رکھنے کا طریقہ ابھی طے ہو رہا ہے۔",
      ),
      b(
        "The ledger on the transparency page records what was received and spent.",
        "شفافیت کے صفحے کا کھاتہ درج کرتا ہے کہ کیا وصول ہوا اور کیا خرچ ہوا۔",
      ),
    ],
    help: b(
      "Please ask us before you give zakat. Our contact details are listed on the contact page.",
      "زکوٰۃ دینے سے پہلے ہم سے پوچھیں۔ ہماری رابطے کی تفصیلات رابطہ صفحے پر ہیں۔",
    ),
    status: b("Being written, not published", "لکھی جا رہی ہے، شائع نہیں ہوئی"),
  },
};

export const policyPage = {
  statusTitle: b("Status", "حالت"),
  coversTitle: b("What this policy will cover", "یہ پالیسی کس چیز کا احاطہ کرے گی"),
  nowTitle: b("What is true today", "آج کیا درست ہے"),
  meanwhileTitle: b("What to do meanwhile", "اِس دوران کیا کریں"),
};

export const notFound = {
  title: b("Page not published yet", "یہ صفحہ ابھی شائع نہیں ہوا"),
  body: b(
    "This address is not a page on our site. The menu lists every page that is published.",
    "یہ پتہ ہماری ویب سائٹ کا کوئی صفحہ نہیں۔ مینو میں ہر شائع شدہ صفحہ درج ہے۔",
  ),
  backHome: b("Back to the home page", "ہوم پیج پر واپس جائیں"),
};
