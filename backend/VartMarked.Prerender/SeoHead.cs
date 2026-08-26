using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace VartMarked.Prerender;

/// <summary>
/// Sayfa head'ini uretir: title, description, canonical, hreflang, OG/Twitter ve JSON-LD.
/// Bunlar SPA'da degil BURADA uretilir - JS calistirmayan arama motorlari ve AI tarayicilari
/// yalniz statik HTML'i gorur.
/// </summary>
public static class SeoHead
{
    private static readonly JsonSerializerOptions JsonAyar = new()
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    };

    public static string Build(Locale locale, JsonNode ceviri)
    {
        var title = Metin(ceviri, "meta", "title");
        var description = Metin(ceviri, "meta", "description");
        var canonical = Site.Domain + locale.Path;

        var sb = new StringBuilder();
        void Satir(string s) => sb.Append("    ").Append(s).Append('\n');

        Satir($"<title>{Kacir(title)}</title>");
        Satir($"<meta name=\"description\" content=\"{Kacir(description)}\">");
        Satir($"<link rel=\"canonical\" href=\"{canonical}\">");

        // hreflang: her dil butun dilleri isaret eder + x-default
        foreach (var l in Locales.All)
            Satir($"<link rel=\"alternate\" hreflang=\"{l.Hreflang}\" href=\"{Site.Domain}{l.Path}\">");
        Satir($"<link rel=\"alternate\" hreflang=\"x-default\" href=\"{Site.Domain}/\">");

        Satir($"<meta property=\"og:type\" content=\"website\">");
        Satir($"<meta property=\"og:site_name\" content=\"{Kacir(Site.Name)}\">");
        Satir($"<meta property=\"og:title\" content=\"{Kacir(title)}\">");
        Satir($"<meta property=\"og:description\" content=\"{Kacir(description)}\">");
        Satir($"<meta property=\"og:url\" content=\"{canonical}\">");
        Satir($"<meta property=\"og:locale\" content=\"{locale.Hreflang.Replace('-', '_')}\">");
        foreach (var l in Locales.All.Where(l => l.Code != locale.Code))
            Satir($"<meta property=\"og:locale:alternate\" content=\"{l.Hreflang.Replace('-', '_')}\">");
        Satir($"<meta property=\"og:image\" content=\"{Site.Domain}/og-image.jpg\">");
        Satir($"<meta property=\"og:image:width\" content=\"1200\">");
        Satir($"<meta property=\"og:image:height\" content=\"630\">");
        Satir($"<meta name=\"twitter:card\" content=\"summary_large_image\">");
        Satir($"<meta name=\"twitter:image\" content=\"{Site.Domain}/og-image.jpg\">");

        Satir("<script type=\"application/ld+json\">");
        sb.Append(JsonSerializer.Serialize(JsonLd(locale, description), JsonAyar)).Append('\n');
        Satir("</script>");

        Satir("<script type=\"application/ld+json\">");
        sb.Append(JsonSerializer.Serialize(FaqJsonLd(locale, ceviri), JsonAyar)).Append('\n');
        Satir("</script>");

        return sb.ToString();
    }

    /// <summary>Sozluk kullaniliyor cunku C# anonim tipi "@context"/"@type" adlarini uretemez.</summary>
    private static Dictionary<string, object?> JsonLd(Locale locale, string description) => new()
    {
        ["@context"] = "https://schema.org",
        ["@type"] = "GroceryStore",
        // Sabit @id: butun dillerde AYNI isletme oldugunu soyler, yoksa Google 9 ayri isletme gorebilir
        ["@id"] = $"{Site.Domain}/#isletme",
        ["name"] = Site.Name,
        ["description"] = description,
        ["url"] = Site.Domain + locale.Path,
        ["telephone"] = Site.Phone,
        ["email"] = Site.Email,
        ["image"] = $"{Site.Domain}/og-image.jpg",
        ["logo"] = $"{Site.Domain}/logo.png",
        ["priceRange"] = "$$",
        ["currenciesAccepted"] = "NOK",
        ["paymentAccepted"] = new[] { "Cash", "Credit Card", "Debit Card", "NFC Mobile Payment", "Visa", "Mastercard", "American Express" },
        ["address"] = new Dictionary<string, object?>
        {
            ["@type"] = "PostalAddress",
            ["streetAddress"] = Site.Street,
            ["postalCode"] = Site.PostalCode,
            ["addressLocality"] = Site.City,
            ["addressCountry"] = Site.Country,
        },
        ["geo"] = new Dictionary<string, object?>
        {
            ["@type"] = "GeoCoordinates",
            ["latitude"] = Site.Lat,
            ["longitude"] = Site.Lng,
        },
        ["openingHoursSpecification"] = Site.Hours.Select(h => new Dictionary<string, object?>
        {
            ["@type"] = "OpeningHoursSpecification",
            ["dayOfWeek"] = h.Day,
            ["opens"] = h.Opens,
            ["closes"] = h.Closes,
        }).ToArray(),
        ["hasMap"] = $"https://www.google.com/maps/search/?api=1&query={Site.Lat},{Site.Lng}",
        ["areaServed"] = Site.AreaServed.Select(a => new Dictionary<string, object?>
        {
            ["@type"] = "Place",
            ["name"] = a,
        }).ToArray(),
        ["knowsLanguage"] = Locales.All.Select(l => l.Hreflang).ToArray(),
        ["publicAccess"] = true,
        ["sameAs"] = Site.SameAs,
        ["inLanguage"] = Locales.All.Select(l => l.Hreflang).ToArray(),
    };

    /// <summary>
    /// FAQPage semasi. Google'in one cikan yanitlari ve AI arama motorlari icin en etkili yapi:
    /// soru-cevap ciftleri dogrudan yanit olarak gosterilebilir.
    /// </summary>
    private static Dictionary<string, object?> FaqJsonLd(Locale locale, JsonNode ceviri) => new()
    {
        ["@context"] = "https://schema.org",
        ["@type"] = "FAQPage",
        ["@id"] = $"{Site.Domain}{locale.Path}#sss",
        ["inLanguage"] = locale.Hreflang,
        ["mainEntity"] = Site.FaqKeys.Select(k => new Dictionary<string, object?>
        {
            ["@type"] = "Question",
            ["name"] = Metin(ceviri, "faq", k, "q"),
            ["acceptedAnswer"] = new Dictionary<string, object?>
            {
                ["@type"] = "Answer",
                ["text"] = Metin(ceviri, "faq", k, "a"),
            },
        }).ToArray(),
    };

    private static string Metin(JsonNode kok, params string[] yol)
    {
        JsonNode? n = kok;
        foreach (var p in yol) n = n?[p];
        return n?.GetValue<string>() ?? throw new InvalidOperationException($"Ceviri anahtari eksik: {string.Join('.', yol)}");
    }

    private static string Kacir(string s) =>
        s.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;");
}
