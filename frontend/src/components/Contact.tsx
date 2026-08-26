import { useTranslation } from 'react-i18next'
import { HOURS, PAYMENT_BRANDS, PAYMENT_TRANSLATED, SITE } from '../content/site'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section className="contact" id="kontakt">
      <div className="contact-inner">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>{t('contact.hoursTitle')}</h3>
            <div className="hours-table">
              {HOURS.map(h => (
                <div className="hours-row" key={h.key}>
                  <span className="hours-day">{t(`contact.days.${h.key}`)}</span>
                  <span className="hours-time" dir="ltr">{h.opens} – {h.closes}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-card">
            <h3>{t('contact.infoTitle')}</h3>
            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">📍</span>
              <span>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">📞</span>
              <a href={`tel:${SITE.phone}`} dir="ltr">{SITE.phoneDisplay}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">📧</span>
              <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon" aria-hidden="true">🌐</span>
              <a href={SITE.domain} dir="ltr">vartmarked.no</a>
            </div>

            <div className="social-links">
              <a href={SITE.social.facebook} className="social-link" aria-label="Facebook" target="_blank" rel="noopener">f</a>
              <a href={SITE.social.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
              <a href={SITE.social.tiktok} className="social-link" aria-label="TikTok" target="_blank" rel="noopener">tk</a>
            </div>

            <div className="payment-block">
              <p className="payment-title">{t('contact.acceptTitle')}</p>
              <div className="payment-icons">
                {PAYMENT_BRANDS.map(b => <span className="payment-badge" key={b}>{b}</span>)}
                {PAYMENT_TRANSLATED.map(k => (
                  <span className="payment-badge" key={k}>{t(`contact.payment.${k}`)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
