import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import nb from './locales/nb.json'
import en from './locales/en.json'
import ur from './locales/ur.json'
import hi from './locales/hi.json'
import ar from './locales/ar.json'
import es from './locales/es.json'
import th from './locales/th.json'
import vi from './locales/vi.json'
import prs from './locales/prs.json'
import tr from './locales/tr.json'
import ku from './locales/ku.json'
import ckb from './locales/ckb.json'

export type Locale = 'nb' | 'en' | 'ur' | 'hi' | 'ar' | 'es' | 'th' | 'vi' | 'prs' | 'tr' | 'ku' | 'ckb'

/** Varsayilan dil UC yerde durur: burasi, CorporateRoutes benzeri LOCALES tablosu ve Prerender/Locales.cs. */
export const DEFAULT_LOCALE: Locale = 'nb'

/** Sirali dil tablosu - dil secici ve hreflang bu sirayi kullanir. */
export const LOCALES: { code: Locale; label: string; hreflang: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'nb',  label: 'Norsk',     hreflang: 'nb',    dir: 'ltr' },
  { code: 'en',  label: 'English',   hreflang: 'en',    dir: 'ltr' },
  { code: 'ur',  label: 'اردو',       hreflang: 'ur',    dir: 'rtl' },
  { code: 'hi',  label: 'हिन्दी',      hreflang: 'hi',    dir: 'ltr' },
  { code: 'ar',  label: 'العربية',     hreflang: 'ar',    dir: 'rtl' },
  { code: 'es',  label: 'Español',   hreflang: 'es',    dir: 'ltr' },
  { code: 'th',  label: 'ไทย',        hreflang: 'th',    dir: 'ltr' },
  { code: 'vi',  label: 'Tiếng Việt', hreflang: 'vi',   dir: 'ltr' },
  { code: 'prs', label: 'دری',        hreflang: 'fa-AF', dir: 'rtl' },
  { code: 'tr',  label: 'Türkçe',     hreflang: 'tr',    dir: 'ltr' },
  { code: 'ku',  label: 'Kurmancî',   hreflang: 'ku',    dir: 'ltr' },
  { code: 'ckb', label: 'سۆرانی',      hreflang: 'ckb',   dir: 'rtl' },
]

export const isLocale = (v: string | undefined): v is Locale =>
  !!v && LOCALES.some(l => l.code === v)

export const dirOf = (code: Locale): 'ltr' | 'rtl' =>
  LOCALES.find(l => l.code === code)?.dir ?? 'ltr'

export const hreflangOf = (code: Locale): string =>
  LOCALES.find(l => l.code === code)?.hreflang ?? code

/** Dilin yol oneki: varsayilan dil kokte durur (/), otekiler /en, /ar ... */
export const pathFor = (code: Locale): string => (code === DEFAULT_LOCALE ? '/' : `/${code}/`)

void i18n.use(initReactI18next).init({
  resources: {
    nb: { translation: nb },
    en: { translation: en },
    ur: { translation: ur },
    hi: { translation: hi },
    ar: { translation: ar },
    es: { translation: es },
    th: { translation: th },
    vi: { translation: vi },
    prs: { translation: prs },
    tr: { translation: tr },
    ku: { translation: ku },
    ckb: { translation: ckb },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
})

export default i18n
