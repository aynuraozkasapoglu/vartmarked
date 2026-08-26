import { useCallback, useEffect, useState } from 'react'

const KEY = 'vm-tema'
type Tema = 'light' | 'dark'

const sistemTemasi = (): Tema =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const kayitliTema = (): Tema | null => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/** Tema secimi: sistem tercihi varsayilan, kullanici secimi hatirlanir (eski index.html ile ayni davranis). */
export function useTheme() {
  const [tema, setTema] = useState<Tema>(() => kayitliTema() ?? sistemTemasi())
  const [secimVar, setSecimVar] = useState(() => kayitliTema() !== null)

  useEffect(() => {
    const root = document.documentElement
    if (secimVar) root.setAttribute('data-theme', tema)
    else root.removeAttribute('data-theme')

    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove())
    const m = document.createElement('meta')
    m.name = 'theme-color'
    m.content = tema === 'dark' ? '#14171a' : '#ffffff'
    document.head.appendChild(m)
  }, [tema, secimVar])

  // Kullanici secim yapmadiysa sistem temasini takip etmeye devam et
  useEffect(() => {
    if (secimVar) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const f = () => setTema(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [secimVar])

  const degistir = useCallback(() => {
    setTema(o => {
      const yeni: Tema = o === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(KEY, yeni) } catch { /* gizli mod */ }
      return yeni
    })
    setSecimVar(true)
  }, [])

  return { tema, degistir }
}
