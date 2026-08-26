import { useTranslation } from 'react-i18next'
import { FAQ_KEYS } from '../content/site'

/**
 * SSS. Google'in one cikan yanitlari ve AI arama motorlari bu yapiyi okur;
 * karsiligi olan FAQPage JSON-LD'si build zamaninda C# tarafinda basilir.
 */
export default function Faq() {
  const { t } = useTranslation()
  return (
    <section className="faq" id="sporsmal">
      <div className="faq-inner">
        <h2 className="section-title">{t('faq.title')}</h2>
        <div className="faq-list">
          {FAQ_KEYS.map(k => (
            <details className="faq-item" key={k}>
              <summary>{t(`faq.${k}.q`)}</summary>
              <p>{t(`faq.${k}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
