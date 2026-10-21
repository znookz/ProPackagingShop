/**
 * Shop contact details. Fill these in once and every phone / LINE / email link on the site is wired up.
 * While a value is empty the matching button falls back to the Contact page.
 */
export const contact = {
  phone: '', // e.g. '+66812345678' (digits with country code)
  lineId: '', // e.g. '@foldwork' (LINE Official Account id, with the @)
  email: '', // e.g. 'hello@foldwork.example'
};

export function telHref(fallback: string): string {
  return contact.phone ? `tel:${contact.phone}` : fallback;
}

export function lineHref(fallback: string): string {
  return contact.lineId ? `https://line.me/R/ti/p/${encodeURIComponent(contact.lineId)}` : fallback;
}

export function mailHref(fallback: string): string {
  return contact.email ? `mailto:${contact.email}` : fallback;
}
