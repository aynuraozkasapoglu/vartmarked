namespace VartMarked.Prerender;

/// <summary>
/// Dil tablosu. DIKKAT: Ayni tablo frontend'de <c>src/i18n.ts</c> icindeki LOCALES'te de durur.
/// Yeni dil eklerken IKISINI BIRDEN guncelle, yoksa dil ya sitemap'e girmez ya da hreflang'i eksik kalir.
/// </summary>
public sealed record Locale(string Code, string Hreflang, string Dir, string Label)
{
    /// <summary>Varsayilan dil kokte durur: / . Otekiler /en/, /ar/ ...</summary>
    public string Path => Code == Locales.Default ? "/" : $"/{Code}/";

    /// <summary>Ciktinin diskteki yeri: varsayilan dil dist/index.html, otekiler dist/&lt;kod&gt;/index.html</summary>
    public string OutputFile => Code == Locales.Default ? "index.html" : System.IO.Path.Combine(Code, "index.html");
}

public static class Locales
{
    public const string Default = "nb";

    public static readonly IReadOnlyList<Locale> All =
    [
        new("nb",  "nb",    "ltr", "Norsk"),
        new("en",  "en",    "ltr", "English"),
        new("ur",  "ur",    "rtl", "اردو"),
        new("hi",  "hi",    "ltr", "हिन्दी"),
        new("ar",  "ar",    "rtl", "العربية"),
        new("es",  "es",    "ltr", "Español"),
        new("th",  "th",    "ltr", "ไทย"),
        new("vi",  "vi",    "ltr", "Tiếng Việt"),
        new("prs", "fa-AF", "rtl", "دری"),
    ];
}
