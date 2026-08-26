import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LOCALE, LOCALES, type Locale, dirOf, hreflangOf, isLocale } from './i18n'
import { ConsentProvider } from './consent'
import { GALERI } from './content/gallery'
import Seo from './components/Seo'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import About from './components/About'
import Products from './components/Products'
import Gallery from './components/Gallery'
import Faq from './components/Faq'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ChatWidget from './components/ChatWidget'

/**
 * Dil yoldan cozulur: / -> nb, /en/ -> en ...
 * Router yok - dil degistirmek tam sayfa gezinmesidir, boylece prerender edilmis
 * statik HTML dogrudan servis edilir ve tarayicilar dogru dili ilk istekte alir.
 */
export function localeFromPath(pathname: string): Locale {
  const ilk = pathname.split('/').filter(Boolean)[0]
  return isLocale(ilk) ? ilk : DEFAULT_LOCALE
}

export default function App({ locale }: { locale?: Locale }) {
  const dil = locale ?? localeFromPath(typeof window === 'undefined' ? '/' : window.location.pathname)
  const { i18n } = useTranslation()
  const galeriVar = GALERI.length > 0

  useEffect(() => {
    if (i18n.language !== dil) void i18n.changeLanguage(dil)
    document.documentElement.lang = hreflangOf(dil)
    document.documentElement.dir = dirOf(dil)
  }, [dil, i18n])

  return (
    <ConsentProvider>
      <Seo locale={dil} />
      <Header locale={dil} galeriVar={galeriVar} />
      <main>
        <Hero />
        <Stats />
        <Features />
        <About />
        <Products />
        <Gallery />
        <Faq />
        <Contact />
        <MapSection />
      </main>
      <Footer galeriVar={galeriVar} />
      <ChatWidget />
      <CookieConsent />
    </ConsentProvider>
  )
}

export { LOCALES }
