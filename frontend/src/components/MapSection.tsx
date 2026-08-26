import { useTranslation } from 'react-i18next'
import { SITE } from '../content/site'
import { useConsent } from '../consent'

/**
 * Google Maps gomulu haritasi Google'a istek atar; onay verilmeden YUKLENMEZ.
 * Onay yoksa yerine aciklama + "haritayi goster" dugmesi cizilir.
 */
export default function MapSection() {
  const { t } = useTranslation()
  const { onay, kabulEt } = useConsent()

  return (
    <section className="map-section">
      {onay === 'kabul' ? (
        <iframe
          src={SITE.mapEmbed}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('contact.mapTitle')}
        />
      ) : (
        <div className="map-placeholder">
          <p>{t('cookie.mapBlocked')}</p>
          <button type="button" className="btn btn-primary" onClick={kabulEt}>{t('cookie.mapEnable')}</button>
          <a
            className="map-external"
            href={`https://www.google.com/maps/search/?api=1&query=${SITE.address.lat},${SITE.address.lng}`}
            target="_blank"
            rel="noopener"
          >
            {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
          </a>
        </div>
      )}
    </section>
  )
}
