import { useEffect, useState } from 'react'
import { HOURS } from '../content/site'

export type AcikDurum =
  | { durum: 'acik'; saat: string }
  | { durum: 'kapali'; gunAnahtari: string; saat: string }

const SIRA = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

/** Oslo'daki yerel gun/dakika - ziyaretcinin saat dilimi ne olursa olsun dukkanin saati esas alinir. */
function osloZamani(): { gun: number; dakika: number } {
  const parcalar = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const al = (t: string) => parcalar.find(p => p.type === t)?.value ?? ''
  const kisaltmalar = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const gun = kisaltmalar.indexOf(al('weekday'))
  return { gun: gun < 0 ? 0 : gun, dakika: Number(al('hour')) * 60 + Number(al('minute')) }
}

const dakikaya = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5))
const gunKaydi = (gunIndeksi: number) => HOURS.find(h => h.key === SIRA[gunIndeksi % 7])!

function hesapla(): AcikDurum {
  const { gun, dakika } = osloZamani()
  const bugun = gunKaydi(gun)

  if (dakika >= dakikaya(bugun.opens) && dakika < dakikaya(bugun.closes))
    return { durum: 'acik', saat: bugun.closes }

  // Bugun henuz acilmadiysa bugunu, acilip kapandiysa sonraki gunu goster
  if (dakika < dakikaya(bugun.opens))
    return { durum: 'kapali', gunAnahtari: bugun.key, saat: bugun.opens }

  const yarin = gunKaydi(gun + 1)
  return { durum: 'kapali', gunAnahtari: yarin.key, saat: yarin.opens }
}

/**
 * Dukkan su an acik mi?
 *
 * null doner ta ki istemcide ilk render bitene kadar - prerender ciktisina
 * build anindaki durum yazilsaydi site sonsuza kadar "acik" derdi.
 * Dakikada bir yenilenir ki kapanis saatinde ekran kendiliginden guncellensin.
 */
export function useOpenState(): AcikDurum | null {
  const [durum, setDurum] = useState<AcikDurum | null>(null)

  useEffect(() => {
    setDurum(hesapla())
    const t = setInterval(() => setDurum(hesapla()), 60_000)
    return () => clearInterval(t)
  }, [])

  return durum
}
