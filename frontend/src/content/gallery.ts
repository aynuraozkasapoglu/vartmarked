// Galeri: src/assets/bilder/ klasorune atilan her gorsel otomatik galeriye girer.
// Manifest tutulmaz - dosyayi koy, build alinca listede.
const modules = import.meta.glob<{ default: string }>('../assets/bilder/*.{jpg,jpeg,png,webp,avif}', { eager: true })

export type GaleriGorseli = { src: string; ad: string }

export const GALERI: GaleriGorseli[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, 'nb'))
  .map(([yol, mod]) => ({
    src: mod.default,
    ad: yol.split('/').pop()!.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
  }))
