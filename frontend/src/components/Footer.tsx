import { useTranslation } from 'react-i18next'
import { SITE } from '../content/site'
import logoMark from '../assets/logo-mark.png'
import { useConsent } from '../consent'

export default function Footer({ galeriVar }: { galeriVar: boolean }) {
  const { t } = useTranslation()
  const { yenidenSor } = useConsent()
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-logo">
          <img src={logoMark} alt="" width={193} height={193} loading="lazy" />
          {SITE.name}
        </span>
        <ul className="footer-links">
          <li><a href="#om-oss">{t('nav.about')}</a></li>
          <li><a href="#produkter">{t('nav.products')}</a></li>
          {galeriVar && <li><a href="#bilder">{t('nav.gallery')}</a></li>}
          <li><a href="#kontakt">{t('nav.contact')}</a></li>
          <li>
            <button type="button" className="footer-linkbutton" onClick={yenidenSor}>
              {t('cookie.openSettings')}
            </button>
          </li>
        </ul>
        <ul className="footer-social">
          <li><a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook">fb</a></li>
          <li><a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram">ig</a></li>
          <li><a href={SITE.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok">tk</a></li>
        </ul>
        <p className="footer-copy" dir="ltr">
          {t('footer.copy')} | {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city} | {t('footer.orgNr')}: {SITE.orgNr}
        </p>
      </div>
    </footer>
  )
}
