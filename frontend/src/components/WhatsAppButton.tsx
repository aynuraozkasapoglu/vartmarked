import { useTranslation } from 'react-i18next'
import { SITE } from '../content/site'

/** Sabit WhatsApp dugmesi. Sunucu olmadigi icin iletisim bu kanaldan yurur. */
export default function WhatsAppButton() {
  const { t } = useTranslation()
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t('whatsapp.message'))}`

  return (
    <a className="whatsapp-fab" href={url} target="_blank" rel="noopener" aria-label={t('whatsapp.label')} title={t('whatsapp.label')}>
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C8.9 3 3.1 8.8 3.1 15.94c0 2.28.6 4.5 1.74 6.46L3 29.4l7.16-1.8a12.9 12.9 0 0 0 5.88 1.42h.01c7.13 0 12.93-5.8 12.93-12.94A12.86 12.86 0 0 0 25.2 6.8 12.86 12.86 0 0 0 16.04 3zm0 2.18c2.87 0 5.57 1.12 7.6 3.15a10.7 10.7 0 0 1 3.15 7.61c0 5.94-4.83 10.76-10.76 10.76-1.8 0-3.58-.46-5.14-1.32l-.37-.2-3.82.96 1-3.73-.24-.4a10.66 10.66 0 0 1-1.64-5.7c0-5.93 4.83-10.76 10.76-10.76zm-4.9 4.98c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.53 3.87 6.14 5.29 2.99 1.18 3.6.95 4.25.89.65-.06 2.1-.86 2.4-1.69.3-.83.3-1.54.21-1.69-.09-.15-.33-.24-.69-.42-.36-.18-2.1-1.04-2.43-1.16-.33-.12-.57-.18-.8.18-.25.36-.93 1.16-1.14 1.4-.21.24-.42.27-.78.09-.36-.18-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.79-1.96-1.1-2.68-.28-.68-.57-.59-.79-.6h-.67z" />
      </svg>
    </a>
  )
}
