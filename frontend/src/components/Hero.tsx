import { Trans, useTranslation } from 'react-i18next'
import { SITE } from '../content/site'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-badge">{t('hero.badge')}</span>
        <h1><Trans i18nKey="hero.title" components={{ 1: <span /> }} /></h1>
        <p>{t('hero.lead')}</p>
        <div className="hero-buttons">
          <a href="#kontakt" className="btn btn-primary">{t('hero.ctaVisit')}</a>
          <a href={`tel:${SITE.phone}`} className="btn btn-secondary">{SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>
  )
}
