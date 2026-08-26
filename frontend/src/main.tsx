import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import i18n, { hreflangOf } from './i18n'
import App, { localeFromPath } from './App'
import './styles/site.css'
import './styles/ek.css'

const dil = localeFromPath(window.location.pathname)
void i18n.changeLanguage(dil)
document.documentElement.lang = hreflangOf(dil)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App locale={dil} />
  </StrictMode>,
)
