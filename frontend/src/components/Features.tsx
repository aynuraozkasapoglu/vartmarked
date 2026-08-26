import { useTranslation } from 'react-i18next'
import { FEATURES } from '../content/site'

export default function Features() {
  const { t } = useTranslation()
  return (
    <section className="features">
      <div className="features-grid">
        {FEATURES.map(f => (
          <div className="feature-card" key={f.key}>
            <div className="feature-icon" aria-hidden="true">{f.icon}</div>
            <h3>{t(`features.${f.key}.title`)}</h3>
            <p>{t(`features.${f.key}.body`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
