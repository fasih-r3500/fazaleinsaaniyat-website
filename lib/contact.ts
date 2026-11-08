/**
 * The contact channels and social profiles the charity publishes.
 *
 * The phone number and email are the source for both the value a visitor reads
 * and the link a visitor follows, so the two cannot drift apart. The address is
 * written once here and rendered in Latin script in both language trees. The
 * three social profiles sit in one object, so a handle change is one edit.
 */
export const contact = {
  phone: "+92 312 111 4885",
  email: "info@fazaleinsaaniyat.org",
  address: "F-13/14, Alpine Homes, Block 5, Clifton, Karachi",
} as const;

const phoneDigits = contact.phone.replace(/\D/g, "");

export const contactLinks = {
  phone: `tel:${contact.phone.replace(/\s/g, "")}`,
  whatsapp: `https://wa.me/${phoneDigits}`,
  email: `mailto:${contact.email}`,
} as const;

export type SocialNetwork = "instagram" | "facebook" | "tiktok";

export const socialProfiles = {
  instagram: {
    name: "Instagram",
    handle: "@fazaleinsaaniyat",
    url: "https://www.instagram.com/fazaleinsaaniyat/",
  },
  facebook: {
    name: "Facebook",
    handle: "/Fazal-e-Insaaniyat-Charity-Works",
    url: "https://www.facebook.com/p/Fazal-e-Insaaniyat-Charity-Works-61575559845175/",
  },
  tiktok: {
    name: "TikTok",
    handle: "@fazaleinsaaniyat",
    url: "https://www.tiktok.com/@fazaleinsaaniyat",
  },
} as const;

export const socialOrder: SocialNetwork[] = ["instagram", "facebook", "tiktok"];
