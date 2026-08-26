import { useTranslation } from 'react-i18next'
import { useConsent } from '../consent'

export default function CookieConsent() {
  const { t } = useTranslation()
  const { onay, hazir, kabulEt, reddet } = useConsent()

  // hazir=false iken cizme: prerender ciktisi ile istemcinin ilk render'i ayni olsun
  if (!hazir || onay !== null) return null

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t('cookie.title')}>
      <div className="cookie-text">
        <strong>{t('cookie.title')}</strong>
        <p>{t('cookie.body')}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="btn btn-secondary" onClick={reddet}>{t('cookie.reject')}</button>
        <button type="button" className="btn btn-primary" onClick={kabulEt}>{t('cookie.accept')}</button>
      </div>
    </div>
  )
}
