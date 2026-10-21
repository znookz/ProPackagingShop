import th from './th.json';
import en from './en.json';

export type Lang = 'th' | 'en';
export type Dict = typeof th;

const dicts: Record<Lang, Dict> = { th, en: en as unknown as Dict };

export const languages: Record<Lang, string> = { th: 'TH', en: 'EN' };
export const defaultLang: Lang = 'th';

/** Page keys map to the same path in both languages: Thai at /, English under /en/. */
export type PageKey = 'home' | 'history' | 'service' | 'product' | 'contact';

const slugs: Record<PageKey, string> = {
  home: '',
  history: 'history/',
  service: 'service/',
  product: 'product/',
  contact: 'contact/',
};

export function getDict(lang: Lang): Dict {
  return dicts[lang];
}

export function pagePath(lang: Lang, page: PageKey): string {
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  return base + slugs[page];
}

/** Pick the localized string from a { th, en } pair. */
export function pick<T>(value: { th: T; en: T }, lang: Lang): T {
  return value[lang];
}

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
