import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAQ_KEYS, SITE } from '../content/site'
import { useOpenState } from '../hooks/useOpenState'
import logoMark from '../assets/logo-mark.png'

type Mesaj = { kimden: 'bot' | 'musteri'; metin: string }

/**
 * Site ici sohbet balonu.
 *
 * Gercek bir WhatsApp botu degildir - olmasi da gerekmiyor: en cok sorulan uc soruyu
 * (acik misiniz, helal var mi, neredesiniz) aninda yanitlar, cozemedigini WhatsApp'a
 * soruyla birlikte devreder. Sunucu istemez, statik hostingde calisir, 9 dilde.
 */
export default function ChatWidget() {
  const { t } = useTranslation()
  const acikDurum = useOpenState()
  const [acik, setAcik] = useState(false)
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const son = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!acik) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setAcik(false) }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [acik])

  useEffect(() => { son.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [mesajlar])

  const sor = (anahtar: string) => {
    setMesajlar(m => [
      ...m,
      { kimden: 'musteri', metin: t(`faq.${anahtar}.q`) },
      { kimden: 'bot', metin: t(`faq.${anahtar}.a`) },
    ])
  }

  // Sohbette konusulanlar WhatsApp'a tasinir ki musteri bastan anlatmasin
  const waMetni = mesajlar.length
    ? `${t('whatsapp.message')}\n\n${mesajlar.filter(m => m.kimden === 'musteri').map(m => `– ${m.metin}`).join('\n')}`
    : t('whatsapp.message')
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMetni)}`

  const durumMetni = acikDurum === null
    ? null
    : acikDurum.durum === 'acik'
      ? t('chat.openNow', { time: acikDurum.saat })
      : t('chat.closedNow', { day: t(`contact.days.${acikDurum.gunAnahtari}`), time: acikDurum.saat })

  return (
    <>
      <button
        type="button"
        className={`chat-fab${acik ? ' acik' : ''}`}
        aria-label={acik ? t('chat.close') : t('chat.open')}
        aria-expanded={acik}
        onClick={() => setAcik(a => !a)}
      >
        {acik ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
            <path d="M16.04 3C8.9 3 3.1 8.8 3.1 15.94c0 2.28.6 4.5 1.74 6.46L3 29.4l7.16-1.8a12.9 12.9 0 0 0 5.88 1.42h.01c7.13 0 12.93-5.8 12.93-12.94A12.86 12.86 0 0 0 25.2 6.8 12.86 12.86 0 0 0 16.04 3zm0 2.18c2.87 0 5.57 1.12 7.6 3.15a10.7 10.7 0 0 1 3.15 7.61c0 5.94-4.83 10.76-10.76 10.76-1.8 0-3.58-.46-5.14-1.32l-.37-.2-3.82.96 1-3.73-.24-.4a10.66 10.66 0 0 1-1.64-5.7c0-5.93 4.83-10.76 10.76-10.76zm-4.9 4.98c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.53 3.87 6.14 5.29 2.99 1.18 3.6.95 4.25.89.65-.06 2.1-.86 2.4-1.69.3-.83.3-1.54.21-1.69-.09-.15-.33-.24-.69-.42-.36-.18-2.1-1.04-2.43-1.16-.33-.12-.57-.18-.8.18-.25.36-.93 1.16-1.14 1.4-.21.24-.42.27-.78.09-.36-.18-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.79-1.96-1.1-2.68-.28-.68-.57-.59-.79-.6h-.67z" />
          </svg>
        )}
      </button>

      {acik && (
        <div className="chat-panel" ref={panel} role="dialog" aria-label={SITE.name}>
          <header className="chat-head">
            <img src={logoMark} alt="" width={40} height={40} />
            <div>
              <strong>{SITE.name}</strong>
              {durumMetni && (
                <span className={`chat-durum ${acikDurum?.durum}`}>
                  <i aria-hidden="true" />{durumMetni}
                </span>
              )}
            </div>
          </header>

          <div className="chat-govde">
            <p className="chat-balon bot">{t('chat.greeting')}</p>
            {mesajlar.map((m, i) => (
              <p className={`chat-balon ${m.kimden}`} key={i}>{m.metin}</p>
            ))}
            <div ref={son} />
          </div>

          <div className="chat-secenekler">
            <p className="chat-ipucu">{mesajlar.length ? t('chat.more') : t('chat.pick')}</p>
            {FAQ_KEYS.filter(k => !mesajlar.some(m => m.kimden === 'musteri' && m.metin === t(`faq.${k}.q`))).map(k => (
              <button type="button" className="chat-soru" key={k} onClick={() => sor(k)}>
                {t(`faq.${k}.q`)}
              </button>
            ))}
            <a className="chat-wa" href={waUrl} target="_blank" rel="noopener">
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M16.04 3C8.9 3 3.1 8.8 3.1 15.94c0 2.28.6 4.5 1.74 6.46L3 29.4l7.16-1.8a12.9 12.9 0 0 0 5.88 1.42c7.13 0 12.93-5.8 12.93-12.94A12.86 12.86 0 0 0 16.04 3zm0 2.18c2.87 0 5.57 1.12 7.6 3.15a10.7 10.7 0 0 1 3.15 7.61c0 5.94-4.83 10.76-10.76 10.76-1.8 0-3.58-.46-5.14-1.32l-.37-.2-3.82.96 1-3.73-.24-.4a10.66 10.66 0 0 1-1.64-5.7c0-5.93 4.83-10.76 10.76-10.76z" />
              </svg>
              {t('chat.whatsapp')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
