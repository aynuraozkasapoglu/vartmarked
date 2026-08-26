import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const KEY = 'vm-cerez'
export type Onay = 'kabul' | 'ret' | null

type Ctx = {
  onay: Onay
  hazir: boolean
  kabulEt: () => void
  reddet: () => void
  yenidenSor: () => void
}

const ConsentContext = createContext<Ctx | null>(null)

const oku = (): Onay => {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'kabul' || v === 'ret' ? v : null
  } catch {
    return null
  }
}

/**
 * Cerez onayi TEK yerde durur: banner, harita ve footer ayni durumu paylasir.
 * Zorunlu olmayan tek sey Google Maps gomulusu (Google'a istek atar) - onay yoksa yuklenmez.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [onay, setOnay] = useState<Onay>(null)
  const [hazir, setHazir] = useState(false)

  // localStorage yalniz istemcide okunur; prerender ciktisi ile ilk render ayni kalsin diye baslangic null
  useEffect(() => {
    setOnay(oku())
    setHazir(true)
  }, [])

  const yaz = useCallback((v: Exclude<Onay, null>) => {
    try { localStorage.setItem(KEY, v) } catch { /* gizli mod */ }
    setOnay(v)
  }, [])

  const deger = useMemo<Ctx>(() => ({
    onay,
    hazir,
    kabulEt: () => yaz('kabul'),
    reddet: () => yaz('ret'),
    yenidenSor: () => {
      try { localStorage.removeItem(KEY) } catch { /* gizli mod */ }
      setOnay(null)
    },
  }), [onay, hazir, yaz])

  return <ConsentContext.Provider value={deger}>{children}</ConsentContext.Provider>
}

export function useConsent(): Ctx {
  const c = useContext(ConsentContext)
  if (!c) throw new Error('useConsent ConsentProvider icinde cagrilmali')
  return c
}
