import { useTranslation } from 'react-i18next'
import { STATS } from '../content/site'

export default function Stats() {
  const { t } = useTranslation()
  return (
    <section className="stats">
      <div className="stats-grid">
        {STATS.map(s => (
          <div className="stat-item" key={s.key}>
            <h3>{s.value}</h3>
            <p>{t(`stats.${s.key}`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
