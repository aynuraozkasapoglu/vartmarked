import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Locale } from '../i18n'
import { SITE } from '../content/site'
import { useTheme } from '../hooks/useTheme'
import LanguageSwitcher from './LanguageSwitcher'
import logo from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'

export default function Header({ locale, galeriVar }: { locale: Locale; galeriVar: boolean }) {
  const { t } = useTranslation()
  const { tema, degistir } = useTheme()
  const [menuAcik, setMenuAcik] = useState(false)
  const [kaydirildi, setKaydirildi] = useState(false)

  useEffect(() => {
    const f = () => setKaydirildi(window.scrollY > 20)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const temaEtiketi = tema === 'dark' ? t('theme.toLight') : t('theme.toDark')

  return (
    <header id="header" className={kaydirildi ? 'scrolled' : undefined}>
      <nav>
        <a href="#" className="logo" aria-label={t('nav.home')}>
          <img className="logo-light" src={logo} alt={`${SITE.name} – Kvalitet til lave priser`} width={856} height={193} />
          <img className="logo-dark" src={logoDark} alt="" aria-hidden="true" width={856} height={193} />
        </a>
        <div className="nav-right">
          <ul className={`nav-links${menuAcik ? ' active' : ''}`} id="navLinks" onClick={() => setMenuAcik(false)}>
            <li><a href="#om-oss">{t('nav.about')}</a></li>
            <li><a href="#produkter">{t('nav.products')}</a></li>
            {galeriVar && <li><a href="#bilder">{t('nav.gallery')}</a></li>}
            <li><a href="#kontakt">{t('nav.contact')}</a></li>
            <li><a href={`tel:${SITE.phone}`} className="nav-cta">{SITE.phoneDisplay}</a></li>
          </ul>
          <LanguageSwitcher locale={locale} />
          <button className="theme-toggle" type="button" aria-label={temaEtiketi} title={temaEtiketi} onClick={degistir}>
            <svg className="ico ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <svg className="ico ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
          <button
            className="mobile-toggle"
            type="button"
            aria-label={t('nav.menu')}
            aria-expanded={menuAcik}
            onClick={() => setMenuAcik(a => !a)}
          >
            {menuAcik ? '✕' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  )
}
