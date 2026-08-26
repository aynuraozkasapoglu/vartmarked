using System.Text;

namespace VartMarked.Prerender;

/// <summary>sitemap.xml + robots.txt. Her dil ayri URL, hepsi birbirinin alternatifi olarak isaretlenir.</summary>
public static class Sitemap
{
    public static string Xml()
    {
        var sb = new StringBuilder();
        sb.AppendLine("""<?xml version="1.0" encoding="UTF-8"?>""");
        sb.AppendLine("""<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">""");

        foreach (var l in Locales.All)
        {
            sb.AppendLine("  <url>");
            sb.AppendLine($"    <loc>{Site.Domain}{l.Path}</loc>");
            foreach (var alt in Locales.All)
                sb.AppendLine($"""    <xhtml:link rel="alternate" hreflang="{alt.Hreflang}" href="{Site.Domain}{alt.Path}"/>""");
            sb.AppendLine($"""    <xhtml:link rel="alternate" hreflang="x-default" href="{Site.Domain}/"/>""");
            sb.AppendLine("    <changefreq>weekly</changefreq>");
            sb.AppendLine(l.Code == Locales.Default ? "    <priority>1.0</priority>" : "    <priority>0.8</priority>");
            sb.AppendLine("  </url>");
        }

        sb.AppendLine("</urlset>");
        return sb.ToString();
    }

    public static string Robots() =>
        $"""
        User-agent: *
        Allow: /

        Sitemap: {Site.Domain}/sitemap.xml

        """;

    /// <summary>
    /// llms.txt - AI tarayicilari icin duz metin ozet. Sitemap gibi zorunlu bir standart degil,
    /// ama ChatGPT/Perplexity gibi motorlarin isletmeyi dogru ozetlemesini kolaylastirir.
    /// </summary>
    public static string LlmsTxt() =>
        $"""
        # {Site.Name}

        > Dagligvarebutikk i {Site.Street}, {Site.PostalCode} {Site.City} - rett ved Stovner senter i Groruddalen.
        > Over 3000 varer: ferske gronnsaker, frukt, halal kjott, fisk, meieri, bakevarer og
        > internasjonale spesialiteter fra Tyrkia, Thailand, Iran, Russland, Hellas, Pakistan og India.

        ## Fakta
        - Adresse: {Site.Street}, {Site.PostalCode} {Site.City}, Norge
        - Telefon / WhatsApp: {Site.Phone}
        - E-post: {Site.Email}
        - Org.nr: {Site.OrgNr}
        - Apningstider: mandag-lordag 08:00-21:00, sondag 10:00-19:00 (apent alle dager)
        - Naromrade: {string.Join(", ", Site.AreaServed)}
        - Betaling: Visa, Mastercard, Amex, kontaktlos, kontant

        ## Sider
        {string.Join("\n", Locales.All.Select(l => $"- [{l.Label}]({Site.Domain}{l.Path}): {Site.Name} pa {l.Label}"))}

        ## Kilder
        - Sitemap: {Site.Domain}/sitemap.xml
        {string.Join("\n", Site.SameAs.Select(s => $"- {s}"))}

        """;
}
