import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GALERI } from '../content/gallery'

/** Galeri. Klasor bossa hic cizilmez - fotograflar gelince kendiliginden gorunur. */
export default function Gallery() {
  const { t } = useTranslation()
  const [acikIndex, setAcikIndex] = useState<number | null>(null)

  const kapat = useCallback(() => setAcikIndex(null), [])
  const git = useCallback((yon: number) => {
    setAcikIndex(i => (i === null ? i : (i + yon + GALERI.length) % GALERI.length))
  }, [])

  useEffect(() => {
    if (acikIndex === null) return
    const tus = (e: KeyboardEvent) => {
      if (e.key === 'Escape') kapat()
      if (e.key === 'ArrowRight') git(1)
      if (e.key === 'ArrowLeft') git(-1)
    }
    document.addEventListener('keydown', tus)
    const eskiOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tus)
      document.body.style.overflow = eskiOverflow
    }
  }, [acikIndex, kapat, git])

  if (GALERI.length === 0) return null

  return (
    <section className="gallery" id="bilder">
      <div className="gallery-inner">
        <h2 className="section-title">{t('gallery.title')}</h2>
        <p className="section-subtitle">{t('gallery.subtitle')}</p>
        <div className="gallery-grid">
          {GALERI.map((g, i) => (
            <button
              type="button"
              className="gallery-item"
              key={g.src}
              onClick={() => setAcikIndex(i)}
              aria-label={`${t('gallery.open')}: ${g.ad}`}
            >
              <img src={g.src} alt={g.ad} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>

      {acikIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={kapat}>
          <button type="button" className="lightbox-close" aria-label={t('gallery.close')} onClick={kapat}>✕</button>
          {GALERI.length > 1 && (
            <button
              type="button" className="lightbox-nav prev" aria-label={t('gallery.prev')}
              onClick={e => { e.stopPropagation(); git(-1) }}
            >‹</button>
          )}
          <img
            className="lightbox-img"
            src={GALERI[acikIndex].src}
            alt={GALERI[acikIndex].ad}
            onClick={e => e.stopPropagation()}
          />
          {GALERI.length > 1 && (
            <button
              type="button" className="lightbox-nav next" aria-label={t('gallery.next')}
              onClick={e => { e.stopPropagation(); git(1) }}
            >›</button>
          )}
        </div>
      )}
    </section>
  )
}
