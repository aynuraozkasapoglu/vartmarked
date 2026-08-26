// Prerender'in Node ayagi: her dil icin React govdesini uretip dist-ssr/govde-<dil>.html'e yazar.
// VartMarked.Prerender bu betigi cagirir, sonra head'i kendisi ekleyip son HTML'i birlestirir.
import { mkdirSync, writeFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'
import { LOCALES } from './dist-ssr/entry-server.js'

mkdirSync('dist-ssr/govde', { recursive: true })
for (const l of LOCALES) {
  writeFileSync(`dist-ssr/govde/${l.code}.html`, render(l.code), 'utf8')
  console.log(`govde uretildi: ${l.code}`)
}
