import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LOCALES, type Locale, pathFor } from '../i18n'

/** Dil secici. <a> kullanir ki JS kapaliyken ve tarayici tarayicilarinda da gezilebilsin. */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const [acik, setAcik] = useState(false)
  const kutu = useRef<HTMLDivElement>(null)
  const aktif = LOCALES.find(l => l.code === locale)!

  useEffect(() => {
    if (!acik) return
    const disariTikla = (e: MouseEvent) => {
      if (kutu.current && !kutu.current.contains(e.target as Node)) setAcik(false)
    }
    const escBas = (e: KeyboardEvent) => { if (e.key === 'Escape') setAcik(false) }
    document.addEventListener('mousedown', disariTikla)
    document.addEventListener('keydown', escBas)
    return () => {
      document.removeEventListener('mousedown', disariTikla)
      document.removeEventListener('keydown', escBas)
    }
  }, [acik])

  return (
    <div className="lang-switch" ref={kutu}>
      <button
        type="button"
        className="lang-button"
        aria-label={t('nav.language')}
        aria-expanded={acik}
        aria-haspopup="true"
        onClick={() => setAcik(a => !a)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9s1.3-6.3 3.8-9z" />
        </svg>
        <span className="lang-current">{aktif.label}</span>
      </button>
      {acik && (
        <ul className="lang-menu" role="menu">
          {LOCALES.map(l => (
            <li key={l.code} role="none">
              <a
                role="menuitem"
                href={pathFor(l.code)}
                lang={l.hreflang}
                dir={l.dir}
                className={l.code === locale ? 'active' : undefined}
                aria-current={l.code === locale ? 'true' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
