namespace VartMarked.Prerender;

/// <summary>Dile bagli olmayan sabitler - frontend'deki src/content/site.ts ile ayni degerler.</summary>
public static class Site
{
    public const string Name = "Vårt Marked";
    public const string Domain = "https://vartmarked.no";
    public const string Phone = "+4792249005";
    public const string Email = "post@vartmarked.no";
    public const string OrgNr = "915 026 915";
    public const string Street = "Fossumveien 60";
    public const string PostalCode = "0988";
    public const string City = "Oslo";
    public const string Country = "NO";
    public const double Lat = 59.962428;
    public const double Lng = 10.9224773;

    public static readonly string[] SameAs =
    [
        "https://www.facebook.com/vaartmarked",
        "https://www.instagram.com/vaartmarked/",
        "https://www.tiktok.com/@vaartmarked",
    ];

    public static readonly (string Day, string Opens, string Closes)[] Hours =
    [
        ("Monday", "08:00", "21:00"),
        ("Tuesday", "08:00", "21:00"),
        ("Wednesday", "08:00", "21:00"),
        ("Thursday", "08:00", "21:00"),
        ("Friday", "08:00", "21:00"),
        ("Saturday", "08:00", "21:00"),
        ("Sunday", "10:00", "19:00"),
    ];

    /// <summary>Hizmet verilen mahalleler - Groruddalen. Yerel aramada esleme gucunu artirir.</summary>
    public static readonly string[] AreaServed =
    [
        "Stovner", "Fossum", "Vestli", "Rommen", "Romsås", "Haugenstua", "Groruddalen", "Oslo",
    ];

    /// <summary>SSS anahtarlari - frontend'deki FAQ_KEYS ile ayni sirada olmali.</summary>
    public static readonly string[] FaqKeys = ["hvor", "apent", "halal", "land", "bestille"];
}
