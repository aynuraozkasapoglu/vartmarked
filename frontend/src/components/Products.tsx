import { useTranslation } from 'react-i18next'
import { PRODUCTS } from '../content/site'

export default function Products() {
  const { t } = useTranslation()
  return (
    <section className="products" id="produkter">
      <div className="products-inner">
        <h2 className="section-title">{t('products.title')}</h2>
        <p className="section-subtitle">{t('products.subtitle')}</p>
        <div className="products-grid">
          {PRODUCTS.map(p => (
            <div className="product-card" key={p.key}>
              <div className="product-emoji" aria-hidden="true">{p.icon}</div>
              <h3>{t(`products.${p.key}.title`)}</h3>
              <p>{t(`products.${p.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
