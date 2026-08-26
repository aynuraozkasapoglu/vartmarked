import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Locale } from '../i18n'

/**
 * Istemci tarafinda YALNIZ baslik guncellenir.
 *
 * Butun SEO head'i (description, canonical, hreflang, OG, JSON-LD) build zamaninda
 * VartMarked.Prerender tarafindan uretilip statik HTML'e basilir - tek kaynak orasidir.
 * Burada meta etiketi uretilseydi ayni mantik iki dilde (C# + TS) kopyalanmis olurdu.
 */
export default function Seo({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  useEffect(() => { document.title = t('meta.title') }, [locale, t])
  return null
}
