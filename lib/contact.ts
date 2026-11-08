/**
 * The contact channels the charity has confirmed and publishes.
 *
 * The links are built from these two values so the number a visitor reads and
 * the number a visitor dials cannot drift apart. The phone is stored in the
 * form we show on the page; the `tel:` link drops the spaces, and the WhatsApp
 * link uses the same mobile number in international digits without a plus sign.
 */
export const contact = {
  phone: "+92 312 111 4885",
  email: "info@fazaleinsaaniyat.org",
} as const;

const phoneDigits = contact.phone.replace(/\D/g, "");

export const contactLinks = {
  phone: `tel:${contact.phone.replace(/\s/g, "")}`,
  whatsapp: `https://wa.me/${phoneDigits}`,
  email: `mailto:${contact.email}`,
} as const;
