import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return (
    <section className="about" id="om-oss">
      <div className="about-inner">
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="about-text">
          {t('about.p1')}<br /><br />
          {t('about.p2')}<br /><br />
          {t('about.p3')}<br /><br />
          <strong>{t('about.p4')}</strong>
        </p>
      </div>
    </section>
  )
}
