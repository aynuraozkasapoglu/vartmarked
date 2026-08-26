import { renderToStaticMarkup } from 'react-dom/server'
import i18n from './i18n'
import type { Locale } from './i18n'
import App from './App'

/** Prerender icin: verilen dilde govde HTML'ini uretir. Head'i C# tarafi basar. */
export function render(locale: Locale): string {
  i18n.changeLanguage(locale)
  return renderToStaticMarkup(<App locale={locale} />)
}

export { LOCALES } from './i18n'
