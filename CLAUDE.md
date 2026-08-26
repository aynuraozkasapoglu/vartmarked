# CLAUDE.md

Bu dosya Claude Code'a (claude.ai/code) bu depoda çalışırken yol gösterir.

Vårt Marked (`vartmarked.no`) — Oslo Fossumveien'de bir bakkalın kurumsal sitesi.
Tek sayfalık, 9 dilli, statik olarak yayınlanan React + .NET 8 projesi. Kod yorumları Türkçe yazılır.

## En önemli kısıt: canlıda .NET YOKTUR

Site **Domeneshop paylaşımlı webhotelinde** durur (nginx + PHP). Orada uzun ömürlü bir .NET süreci
koşamaz. Bu yüzden mimari şöyledir:

- **React** arayüzü yazar.
- **Node** (`entry-server.tsx` → `render.mjs`) her dil için gövde HTML'ini üretir — React'i ancak React render eder.
- **C# (`VartMarked.Prerender`)** head'i (title/description/canonical/hreflang/OG/JSON-LD), `sitemap.xml` ve
  `robots.txt`'i üretir, gövdeyi şablona yerleştirir ve dil başına statik HTML yazar.
- **`VartMarked.Web`** yalnız yerel önizleme sunucusudur (Rider'dan F5). Canlıya gitmez.

Çıktı `frontend/dist`, Domeneshop'ta `/www` klasörüne olduğu gibi yüklenir.

Sunucu olmadığı için **iletişim formu yoktur**: iletişim WhatsApp + `tel:` + `mailto:` üzerinden yürür.
Sağ alttaki sohbet balonu (`ChatWidget.tsx`) gerçek bir WhatsApp botu değildir — SSS'i anında
yanıtlayıp çözemediğini WhatsApp'a devreder. Gerçek Cloud API botu ayrı bir telefon numarası ve
Meta işletme doğrulaması ister; webhook'u PHP olarak bu hostingde koşabilir (PHP 8.2 + curl test edildi).

## Komutlar

```bash
# Geliştirme (Vite, http://localhost:5173)
cd frontend && npm install && npm run dev

# Tam üretim çıktısı (build + SSR + head/sitemap/robots)
dotnet run --project backend/VartMarked.Prerender -- --build

# Üretilmiş çıktıyı canlıdaki gibi gez (http://localhost:5180)
dotnet run --project backend/VartMarked.Web

# Yalnız derleme doğrulaması
cd frontend && npm run build
dotnet build VartMarked.sln -c Release
```

## Diller

9 dil: `nb` (varsayılan, kökte), `en`, `ur`, `hi`, `ar`, `es`, `th`, `vi`, `prs` (Dari). `ur`/`ar`/`prs` RTL.

**Dil tablosu İKİ yerde durur** — yeni dil eklerken ikisini birden güncelle, yoksa dil ya sitemap'e
girmez ya da hreflang'i eksik kalır:
- `frontend/src/i18n.ts` → `LOCALES`
- `backend/VartMarked.Prerender/Locales.cs` → `Locales.All`

Çeviri dosyaları `frontend/src/locales/*.json`. Anahtar yapısı **hepsinde birebir aynı olmalı**;
`nb.json` kaynak dildir. Eksik anahtar ekranda anahtar olarak görünür (`fallbackLng` varsayılan dile düşer).

## URL düzeni

Varsayılan dil kökte (`/`), ötekiler `/en/`, `/ar/` … Router **yoktur**: dil değiştirmek tam sayfa
gezinmesidir. Böylece her dil kendi statik HTML'ini ilk istekte alır ve tarayıcılar (arama motoru, AI)
JS çalıştırmadan doğru dili görür.

## Tuzaklar

- **`site.css` eski elle yazılmış sitenin birebir kopyasıdır** — tasarım oradan gelir, dokunma.
  Yeni bileşen stilleri `ek.css`'e yazılır, aynı CSS jetonlarını kullanır.
- **Google Maps çerez onayına bağlıdır**: onay yokken iframe hiç basılmaz (yerine yer tutucu çizilir).
  Bu GDPR gereğidir; `MapSection.tsx`'i "basitleştirip" iframe'i koşulsuz basma.
- Çerez onayı **tek bir context'te** durur (`consent.tsx`) — banner, harita ve footer aynı durumu paylaşır.
  Ayrı `useState` ile çoğaltılırsa kabul tıklaması haritayı açmaz.
- **Galeri klasör tabanlıdır**: `frontend/src/assets/bilder/` içine atılan görsel `import.meta.glob` ile
  otomatik galeriye girer. Klasör boşsa galeri bölümü ve nav bağlantısı hiç çizilmez.
- Head etiketleri **yalnız C# tarafında** üretilir. `Seo.tsx` sadece `document.title` günceller;
  oraya meta etiketi eklemek mantığı iki dilde kopyalamak olur.
- **Açık/kapalı durumu yalnız istemcide hesaplanır** (`useOpenState.ts`, `Europe/Oslo`). Prerender
  çıktısına yazılsaydı site sonsuza kadar build anındaki durumu gösterirdi; bu yüzden ilk render'da
  `null` döner. Aynı kural çerez banner'ı için de geçerli.
- **`site.css`'te `.footer-links` flex ama `flex-wrap` yok** — footer'a bağlantı eklerken mobilde
  yatay taşma yapar. Düzeltmesi `ek.css`'te duruyor; yeni bağlantı eklersen mobilde ölç.
- Kök dizindeki `index.html` **eski elle yazılmış sitedir** (2026-08-26'ya kadar canlıdaydı, GitHub Pages
  hâlâ onu servis eder). Tasarım referansı olarak duruyor, build'e girmez.

## Yayınlama

Çıktı `frontend/dist` → Domeneshop `/www`. SFTP: kullanıcı `vartmarked` @ `sftp.domeneshop.no`.
`sftp -b` varsayılan olarak `BatchMode=yes` yapar ve şifre sormayı kapatır — **`-o BatchMode=no` şart**.
Eski 2017 park sayfası sunucuda `/www/index-2017-yedek.html` olarak duruyor, silinmedi.
