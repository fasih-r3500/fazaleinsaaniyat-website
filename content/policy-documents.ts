import type { Bilingual, PolicySlug } from "./copy";

/**
 * Every policy the site publishes, in full. They are kept apart from the page
 * furniture in `copy.ts` because they are long-form prose, and because every
 * sentence here has to describe what the charity actually does: no cookies,
 * no analytics, no third party requests, and no stored visitor data.
 */
export type PolicySection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
  /** Render the contact channels from `lib/contact` after the paragraphs. */
  contact?: boolean;
};

export type PolicyDocument = {
  sections: PolicySection[];
};

/**
 * The anchor id for a section, built from its English heading so that the same
 * link works in both languages. The contents list and the section headings read
 * their id from here, so a link can never point at a heading that is not there.
 */
export function policySectionId(heading: Bilingual): string {
  return heading.en
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const policyDocuments: Record<PolicySlug, PolicyDocument> = {
  privacy: {
    sections: [
      {
        heading: b("Who we are", "ہم کون ہیں"),
        contact: true,
        paragraphs: [
          b(
            "Fazal-e-Insaaniyat Charity Works is a small family charity in Karachi, Pakistan. We pay educated women to teach the Holy Quran from their homes, and we also build mosques, wells and water pumps, support widows and help people toward a livelihood.",
            "فضلِ انسانیت چیریٹی ورکس کراچی، پاکستان کی ایک چھوٹی خاندانی چیریٹی ہے۔ ہم پڑھی لکھی خواتین کو تنخواہ دیتے ہیں تاکہ وہ اپنے گھروں سے قرآنِ مجید پڑھائیں۔ ہم مساجد، کنویں اور واٹر پمپ بھی بناتے ہیں، بیواؤں کی مدد کرتے ہیں اور لوگوں کو روزگار کی طرف لے جاتے ہیں۔",
          ),
          b(
            "This policy is about this website, fazaleinsaaniyat.org. You can reach us on the phone, by email, or by post at the address below.",
            "یہ پالیسی اِس ویب سائٹ، fazaleinsaaniyat.org، کے بارے میں ہے۔ آپ ہمیں فون پر، ای میل پر، یا نیچے دیے گئے پتے پر خط کے ذریعے پہنچ سکتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("What this website does not do", "یہ ویب سائٹ کیا نہیں کرتی"),
        paragraphs: [
          b(
            "The website sets no cookies. There is no cookie banner because there is nothing to switch off.",
            "یہ ویب سائٹ کوئی کوکی نہیں رکھتی۔ کوکی بینر بھی نہیں، کیونکہ بند کرنے کے لیے کچھ نہیں۔",
          ),
          b(
            "It runs no analytics, no advertising and no tracking of any kind. We do not count visitors, and we do not follow anyone from one page to the next.",
            "یہ کوئی تجزیہ، اشتہار یا کسی بھی طرح کی ٹریکنگ نہیں کرتی۔ ہم زائرین کی گنتی نہیں کرتے، اور کسی کو ایک صفحے سے دوسرے صفحے تک نہیں دیکھتے۔",
          ),
          b(
            "It makes no third party requests. The fonts, the images and the scripts all come from this site, so no other company learns that you visited.",
            "یہ کسی تیسرے فریق سے کچھ نہیں منگواتی۔ فونٹ، تصاویر اور اسکرپٹ سب اِسی ویب سائٹ سے آتے ہیں، اِس لیے کوئی دوسری کمپنی نہیں جانتی کہ آپ نے یہاں آ کر دیکھا۔",
          ),
          b(
            "There are no accounts, no sign up and no contact form. Every page can be read without giving your name, your email address or anything else.",
            "یہاں کوئی اکاؤنٹ نہیں، کوئی رجسٹریشن نہیں اور کوئی رابطہ فارم نہیں۔ ہر صفحہ آپ کے نام، ای میل پتے یا کسی اور تفصیل کے بغیر پڑھا جا سکتا ہے۔",
          ),
        ],
      },
      {
        heading: b("What the website holds about you", "ویب سائٹ آپ کے بارے میں کیا رکھتی ہے"),
        paragraphs: [
          b(
            "Nothing that identifies you. We do not ask for, and we do not store, a name, an email address or a phone number on this website, and there is no database of visitors.",
            "کچھ بھی نہیں جو آپ کی شناخت بتائے۔ ہم اِس ویب سائٹ پر نام، ای میل پتہ یا فون نمبر نہیں مانگتے اور نہ محفوظ کرتے ہیں، اور زائرین کا کوئی ڈیٹا بیس نہیں ہے۔",
          ),
        ],
      },
      {
        heading: b("What the server records", "سرور کیا درج کرتا ہے"),
        paragraphs: [
          b(
            "Our hosting provider keeps ordinary access logs for every website it serves. A log line holds the page that was asked for, the date and time, the type of browser, and the IP address the request came from. That is how a web server works, not a choice we make about you.",
            "ہماری ہوسٹنگ کمپنی ہر ویب سائٹ کے لیے عام رسائی لاگ رکھتی ہے۔ ایک سطر میں یہ درج ہوتا ہے: کون سا صفحہ مانگا گیا، تاریخ اور وقت، براؤزر کی قسم، اور وہ IP پتہ جہاں سے درخواست آئی۔ یہ ویب سرور کے کام کرنے کا طریقہ ہے، آپ کے بارے میں ہمارا کوئی فیصلہ نہیں۔",
          ),
          b(
            "We use those logs only to keep the site running and to spot abuse. We do not use them to build a picture of anyone, and we do not combine them with anything else.",
            "ہم اِن لاگوں کو صرف ویب سائٹ چلانے اور غلط استعمال روکنے کے لیے دیکھتے ہیں۔ ہم اِن سے کسی کا خاکہ نہیں بناتے اور نہ اِنہیں کسی اور چیز سے جوڑتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("When you email or call us", "جب آپ ای میل یا کال کریں"),
        paragraphs: [
          b(
            "If you write to us or phone us, we see your email address or your number and whatever you tell us. We use it only to answer you and to do what you asked.",
            "اگر آپ ہمیں لکھیں یا فون کریں تو ہمیں آپ کا ای میل پتہ یا نمبر اور جو کچھ آپ بتائیں، نظر آتا ہے۔ ہم اُسے صرف آپ کو جواب دینے اور آپ کی بات پوری کرنے کے لیے استعمال کرتے ہیں۔",
          ),
          b(
            "If you ask for help, we write a short note: your name, how to reach you, and what you asked for. The get help page explains what we ask and why.",
            "اگر آپ مدد مانگیں تو ہم ایک مختصر نوٹ لکھتے ہیں: آپ کا نام، آپ تک پہنچنے کا ذریعہ، اور آپ کی درخواست۔ مدد حاصل کریں والا صفحہ بتاتا ہے کہ ہم کیا پوچھتے ہیں اور کیوں۔",
          ),
          b(
            "We do not add you to a mailing list. We do not send newsletters or appeals because someone once wrote to us.",
            "ہم آپ کو کسی میلنگ لسٹ میں شامل نہیں کرتے۔ کسی کے ایک بار لکھنے کی وجہ سے ہم نیوز لیٹر یا اپیل نہیں بھیجتے۔",
          ),
          b(
            "If a parent or guardian wants to know what we hold about a child, they can ask us in the same way.",
            "اگر کسی والد یا سرپرست کو جاننا ہو کہ ہمارے پاس کسی بچے کے بارے میں کیا ہے، تو وہ اِسی طرح پوچھ سکتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("How long we keep a note", "ہم نوٹ کتنا عرصہ رکھتے ہیں"),
        paragraphs: [
          b(
            "We keep a note only while it is needed: while we are helping, and for a while afterwards so that we remember what we promised and can check what was done.",
            "ہم نوٹ صرف اُتنی دیر رکھتے ہیں جتنی ضرورت ہو: جب تک مدد جاری ہے، اور اُس کے بعد کچھ عرصہ، تاکہ ہمیں یاد رہے کہ کیا وعدہ کیا تھا اور کیا کیا گیا۔",
          ),
          b(
            "We have not set a fixed number of years. When a note is no longer needed, we delete it. If you want to know how long your own note will be kept, ask us and we will tell you what we do.",
            "ہم نے سالوں کی کوئی مقررہ مدت طے نہیں کی۔ جب نوٹ کی ضرورت نہ رہے تو ہم اُسے مٹا دیتے ہیں۔ اگر آپ جاننا چاہیں کہ آپ کا نوٹ کتنا عرصہ رکھا جائے گا تو ہم سے پوچھیں، ہم بتا دیں گے کہ ہم کیا کرتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("Sharing", "کسی اور کے ساتھ بتانا"),
        paragraphs: [
          b(
            "We do not sell your details, and we do not share them for marketing. Nobody pays us for information about the people who contact us, and we do not pass details to advertisers.",
            "ہم آپ کی تفصیلات نہیں بیچتے اور نہ مارکیٹنگ کے لیے کسی کو دیتے ہیں۔ ہمیں رابطہ کرنے والوں کی معلومات کے بدلے کوئی رقم نہیں ملتی، اور ہم تفصیلات اشتہار دینے والوں کو نہیں بھیجتے۔",
          ),
          b(
            "We pass on what you tell us only if you ask us to, or if the law requires it.",
            "ہم آپ کی بات صرف اُس وقت کسی اور کو بتاتے ہیں جب آپ کہیں، یا جب قانون ہمیں ایسا کرنے کا پابند کرے۔",
          ),
        ],
      },
      {
        heading: b("A copy, or deletion", "نقل، یا مٹانے کی درخواست"),
        paragraphs: [
          b(
            "Write to info@fazaleinsaaniyat.org or call +92 312 111 4885 and say what you sent us and when. A name and a date is usually enough for us to find it.",
            "info@fazaleinsaaniyat.org پر لکھیں یا +92 312 111 4885 پر کال کریں، اور بتائیں کہ آپ نے کیا بھیجا تھا اور کب۔ عام طور پر نام اور تاریخ ہی کافی ہوتی ہے۔",
          ),
          b(
            "We will tell you what we hold, and we will delete what you ask us to delete. If we cannot delete something, we will say what it is and why.",
            "ہم بتا دیں گے کہ ہمارے پاس کیا ہے، اور جو آپ مٹانے کو کہیں گے وہ مٹا دیں گے۔ اگر کوئی چیز مٹانا ممکن نہ ہو تو ہم بتا دیں گے کہ وہ کیا ہے اور کیوں۔",
          ),
          b(
            "There is no special form to fill in, and we do not charge for this.",
            "اِس کے لیے کوئی خاص فارم نہیں بھرنا، اور ہم اِس کا کوئی معاوضہ نہیں لیتے۔",
          ),
        ],
      },
      {
        heading: b("Changes to this page", "اِس صفحے میں تبدیلی"),
        paragraphs: [
          b(
            "If what we do changes, we change this page, and the date at the foot of the page shows when it last changed. There is no need to check often: this policy is short, and it changes rarely.",
            "اگر ہمارا طریقۂ کار بدلے تو ہم یہ صفحہ بدل دیتے ہیں، اور صفحے کے آخر کی تاریخ بتاتی ہے کہ یہ آخری بار کب بدلا۔ بار بار دیکھنے کی ضرورت نہیں: یہ پالیسی مختصر ہے اور کم بدلتی ہے۔",
          ),
        ],
      },
    ],
  },
  terms: {
    sections: [
      {
        heading: b("What this site is for", "یہ ویب سائٹ کس لیے ہے"),
        paragraphs: [
          b(
            "This website tells you about Fazal-e-Insaaniyat Charity Works: the Home-Based Madrasahs, our other work, the field trips where we write up what was done, and the ledger of money received and spent.",
            "یہ ویب سائٹ آپ کو فضلِ انسانیت چیریٹی ورکس کے بارے میں بتاتی ہے: گھریلو مدرسے، ہمارا دوسرا کام، وہ میدانی دورے جن میں ہم لکھتے ہیں کہ کیا کیا گیا، اور آنے اور جانے والی رقم کا کھاتہ۔",
          ),
          b(
            "It is also how you can ask for help, offer your time, or get in touch with us.",
            "اِسی ویب سائٹ سے آپ مدد مانگ سکتے ہیں، اپنا وقت دے سکتے ہیں، یا ہم سے رابطہ کر سکتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("The information on it", "اِس پر دی گئی معلومات"),
        paragraphs: [
          b(
            "We write this site in good faith, and we try to keep it right and up to date. Details change: a place, a date or a figure may be out of date by the time you read it.",
            "ہم یہ ویب سائٹ نیک نیتی سے لکھتے ہیں اور کوشش کرتے ہیں کہ یہ درست اور تازہ رہے۔ تفصیلات بدلتی ہیں: کوئی جگہ، تاریخ یا عدد آپ کے پڑھنے تک پرانا ہو سکتا ہے۔",
          ),
          b(
            "Nothing here is a promise about the future. If a detail matters to you, for example before you travel to a madrasah or before you give, check it with us first.",
            "یہاں کچھ بھی مستقبل کا وعدہ نہیں ہے۔ اگر کوئی تفصیل آپ کے لیے اہم ہو، مثلاً کسی مدرسے تک سفر سے پہلے یا عطیہ دینے سے پہلے، تو پہلے ہم سے تصدیق کر لیں۔",
          ),
          b(
            "Where we do not know something, we say so rather than guess.",
            "جہاں ہمیں کوئی بات معلوم نہ ہو، ہم اندازہ لگانے کے بجائے صاف بتا دیتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("Giving", "عطیہ دینا"),
        paragraphs: [
          b(
            "Giving is voluntary. You are never under an obligation to give, and asking for help is free.",
            "عطیہ دینا رضاکارانہ ہے۔ عطیہ دینے کی کوئی پابندی نہیں، اور مدد مانگنے کے لیے کچھ نہیں دینا پڑتا۔",
          ),
          b(
            "This website does not process payments. There is no card form here, and bank details are not published on the site at present.",
            "یہ ویب سائٹ ادائیگی کا عمل نہیں چلاتی۔ یہاں کارڈ کا کوئی فارم نہیں، اور ابھی ویب سائٹ پر بینک کی تفصیلات شائع نہیں ہیں۔",
          ),
          b(
            "When bank details are ready they will be published on the give page. Until then, please ask us, and send money only using details you have checked with us directly.",
            "جب بینک کی تفصیلات تیار ہوں گی تو وہ عطیہ کریں والے صفحے پر شائع ہوں گی۔ اُس وقت تک ہم سے پوچھیں، اور رقم صرف اُنہی تفصیلات پر بھیجیں جو آپ نے ہم سے براہِ راست تصدیق کی ہوں۔",
          ),
        ],
      },
      {
        heading: b("Our words and photographs", "ہمارے الفاظ اور تصاویر"),
        paragraphs: [
          b(
            "The text and photographs on this site belong to the charity or are used with permission. Please do not copy them for another website, a poster or an advertisement without asking us.",
            "اِس ویب سائٹ کی تحریر اور تصاویر تنظیم کی ملکیت ہیں یا اجازت سے استعمال ہوتی ہیں۔ براہ کرم اِنہیں کسی دوسری ویب سائٹ، پوسٹر یا اشتہار کے لیے ہم سے پوچھے بغیر نقل نہ کریں۔",
          ),
          b(
            "You are welcome to share a link to any page, and to quote a sentence or two with a link back to us.",
            "آپ کسی بھی صفحے کا لنک شیئر کر سکتے ہیں، اور ایک آدھ جملہ ہمارے لنک کے ساتھ نقل کر سکتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("Links to other organisations", "دوسری تنظیموں کے لنک"),
        paragraphs: [
          b(
            "Some pages link to other websites, for example a madrasah's own page or a partner organisation. A link is not an endorsement, and we do not control what those sites say or do.",
            "کچھ صفحوں پر دوسری ویب سائٹس کے لنک ہیں، مثلاً کسی مدرسے کا اپنا صفحہ یا کوئی ساتھی تنظیم۔ لنک کسی کی حمایت کا مطلب نہیں، اور اُن ویب سائٹس پر کیا لکھا یا ہوتا ہے، وہ ہمارے اختیار میں نہیں۔",
          ),
          b(
            "Once you follow a link, that site's own rules apply, including its privacy policy.",
            "لنک کھولنے کے بعد اُس ویب سائٹ کے اپنے قواعد لاگو ہوتے ہیں، بشمول اُس کی رازداری کی پالیسی۔",
          ),
        ],
      },
      {
        heading: b("If something is wrong", "اگر کچھ غلط ہو"),
        paragraphs: [
          b(
            "If a page is wrong or out of date, or you think a photograph should not be on the site, tell us and we will look at it. The contact page lists every way to reach us.",
            "اگر کوئی صفحہ غلط یا پرانا ہو، یا آپ کو لگے کہ کوئی تصویر ویب سائٹ پر نہیں ہونی چاہیے، تو ہمیں بتائیں، ہم اُسے دیکھیں گے۔ رابطہ صفحہ ہم تک پہنچنے کے تمام ذرائع بتاتا ہے۔",
          ),
          b(
            "For a complaint about our work rather than about this website, the complaints page explains what happens.",
            "اگر شکایت اِس ویب سائٹ کے بجائے ہمارے کام کے بارے میں ہو تو شکایات کا صفحہ بتاتا ہے کہ آگے کیا ہوتا ہے۔",
          ),
        ],
      },
    ],
  },
  safeguarding: {
    sections: [
      {
        heading: b("Who this policy protects", "یہ پالیسی کس کی حفاظت کرتی ہے"),
        paragraphs: [
          b(
            "Every child at our Home-Based Madrasahs, and every adult who asks us for help. Children are not charged, and the teacher is an educated woman paid by the charity to teach from her own home.",
            "ہمارے گھریلو مدرسوں کا ہر بچہ، اور ہر وہ بڑا جو ہم سے مدد مانگے۔ بچوں سے کوئی فیس نہیں لی جاتی، اور استاد ایک پڑھی لکھی خاتون ہیں جنہیں تنظیم تنخواہ دیتی ہے تاکہ وہ اپنے گھر سے پڑھائیں۔",
          ),
        ],
      },
      {
        heading: b("How to raise a concern", "تشویش کیسے بتائیں"),
        paragraphs: [
          b(
            "Tell us through any channel on the contact page. A concern is taken to the trustees, and we do not publish the name of the person who raised it.",
            "رابطہ صفحے کے کسی بھی ذریعے سے ہمیں بتائیں۔ تشویش ٹرسٹیز تک پہنچائی جاتی ہے، اور ہم تشویش بتانے والے کا نام شائع نہیں کرتے۔",
          ),
          b(
            "If a child or an adult is in immediate danger, contact the emergency services where you live first. Then tell us, if you can.",
            "اگر کوئی بچہ یا کوئی بڑا فوری خطرے میں ہو تو پہلے اپنے علاقے کے ایمرجنسی نمبر پر رابطہ کریں۔ پھر، اگر ممکن ہو، ہمیں بتائیں۔",
          ),
        ],
      },
      {
        heading: b("How a concern is looked into", "تشویش کی جانچ کیسے ہوتی ہے"),
        paragraphs: [
          b(
            "The trustees look into the concern and decide what happens next. We will tell you what we can do, even when the answer is no.",
            "ٹرسٹیز تشویش کی جانچ کرتے ہیں اور طے کرتے ہیں کہ آگے کیا ہوگا۔ ہم بتا دیں گے کہ ہم کیا کر سکتے ہیں، چاہے جواب نہ ہی ہو۔",
          ),
        ],
      },
      {
        heading: b("The people who work with children", "بچوں کے ساتھ کام کرنے والے"),
        paragraphs: [
          b(
            "Our teachers are women from the neighbourhood, and the family team knows each one before she is paid. A concern about a teacher is taken to the trustees in the same way as any other concern.",
            "ہماری استانیں محلے کی خواتین ہیں، اور خاندانی ٹیم ہر ایک کو تنخواہ دینے سے پہلے جانتی ہے۔ کسی استانی کے بارے میں تشویش بھی اِسی طرح ٹرسٹیز تک پہنچائی جاتی ہے۔",
          ),
        ],
      },
    ],
  },
  complaints: {
    sections: [
      {
        heading: b("How to make a complaint", "شکایت کیسے کریں"),
        paragraphs: [
          b(
            "Tell us through any channel on the contact page. Say what happened, when it happened, and what you would like us to do.",
            "رابطہ صفحے کے کسی بھی ذریعے سے ہمیں بتائیں۔ بتائیں کہ کیا ہوا، کب ہوا، اور آپ کیا چاہتے ہیں کہ ہم کریں۔",
          ),
          b(
            "A complaint goes to the trustees. Nothing you tell us is published on this site.",
            "شکایت ٹرسٹیز تک جاتی ہے۔ آپ جو کچھ بتاتے ہیں، اُس میں سے کچھ بھی اِس ویب سائٹ پر شائع نہیں ہوتا۔",
          ),
        ],
      },
      {
        heading: b("Who replies, and how quickly", "جواب کون دیتا ہے، اور کتنی جلدی"),
        paragraphs: [
          b(
            "The trustees read every complaint and reply to it. We are a small team, so we cannot promise a fixed number of days; we reply as soon as we can.",
            "ہر شکایت ٹرسٹیز پڑھتے ہیں اور اُس کا جواب دیتے ہیں۔ ہم ایک چھوٹی ٹیم ہیں، اِس لیے دنوں کی مقررہ تعداد کا وعدہ نہیں کر سکتے؛ ہم جتنی جلدی ممکن ہو جواب دیتے ہیں۔",
          ),
        ],
      },
      {
        heading: b("If you are not satisfied with the answer", "اگر جواب سے مطمئن نہ ہوں"),
        paragraphs: [
          b(
            "Tell us again, and say what is still wrong. We will tell you what we can do, even when the answer is no.",
            "ہمیں دوبارہ بتائیں، اور بتائیں کہ اب بھی کیا بات غلط ہے۔ ہم بتا دیں گے کہ ہم کیا کر سکتے ہیں، چاہے جواب نہ ہی ہو۔",
          ),
        ],
      },
      {
        heading: b("How complaints are recorded", "شکایات کیسے درج ہوتی ہیں"),
        paragraphs: [
          b(
            "The trustees keep a record of each complaint and of what was done about it. No complaint is published on this site.",
            "ٹرسٹیز ہر شکایت اور اُس پر کیے گئے کام کا ریکارڈ رکھتے ہیں۔ اِس ویب سائٹ پر کوئی شکایت شائع نہیں ہوتی۔",
          ),
        ],
      },
    ],
  },
  "zakat-sadaqah": {
    sections: [
      {
        heading: b("How zakat is received and recorded", "زکوٰۃ کیسے وصول اور درج ہوتی ہے"),
        paragraphs: [
          b(
            "A gift can be marked for zakat, for sadaqah, or for wherever the need is greatest. A gift marked for zakat is recorded as zakat in the ledger, with its date and amount.",
            "عطیہ زکوٰۃ کے لیے، صدقے کے لیے، یا وہاں کے لیے مختص کیا جا سکتا ہے جہاں سب سے زیادہ ضرورت ہو۔ زکوٰۃ کے لیے مختص عطیہ کھاتے میں زکوٰۃ کے طور پر تاریخ اور رقم کے ساتھ درج ہوتا ہے۔",
          ),
          b(
            "The ledger on the transparency page shows what was received and spent.",
            "شفافیت کے صفحے کا کھاتہ دکھاتا ہے کہ کیا وصول ہوا اور کیا خرچ ہوا۔",
          ),
        ],
      },
      {
        heading: b("Who receives zakat", "زکوٰۃ کون لے سکتا ہے"),
        paragraphs: [
          b(
            "Zakat goes to people who qualify under the rules of zakat. Please ask us before you give zakat, so that the gift reaches someone who qualifies.",
            "زکوٰۃ اُن لوگوں کو جاتی ہے جو زکوٰۃ کے شرعی احکام کے مطابق حقدار ہیں۔ زکوٰۃ دینے سے پہلے ہم سے پوچھیں، تاکہ عطیہ کسی حقدار تک پہنچے۔",
          ),
        ],
      },
      {
        heading: b("How sadaqah is used", "صدقہ کہاں استعمال ہوتا ہے"),
        paragraphs: [
          b(
            "Sadaqah is a voluntary gift, given without a condition. It is spent on the work listed on this site: teacher salaries, mosques, wells and water pumps, widows, Hunar Ghar, rickshaws and help toward a livelihood.",
            "صدقہ ایک رضاکارانہ عطیہ ہے، جو بغیر کسی شرط کے دیا جاتا ہے۔ یہ اِس ویب سائٹ پر درج کام پر خرچ ہوتا ہے: استاد کی تنخواہ، مساجد، کنویں اور واٹر پمپ، بیوائیں، ہنر گھر، رکشے اور روزگار کی طرف مدد۔",
          ),
        ],
      },
      {
        heading: b("The receipt a giver receives", "دینے والے کو کیا رسید ملتی ہے"),
        paragraphs: [
          b(
            "A receipt is issued for every gift, and today it comes through WhatsApp. Ask us and we will send it on the same number.",
            "ہر عطیے کی رسید جاری کی جاتی ہے، اور آج کل وہ واٹس ایپ پر آتی ہے۔ ہم سے کہیں، ہم اُسی نمبر پر بھیج دیں گے۔",
          ),
          b(
            "Keep your bank confirmation as well. It shows the date and the amount.",
            "بینک کی تصدیق بھی سنبھال کر رکھیں۔ اُس پر تاریخ اور رقم درج ہے۔",
          ),
        ],
      },
    ],
  },
};

function b(en: string, ur: string): Bilingual {
  return { en, ur };
}
