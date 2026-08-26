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
}
