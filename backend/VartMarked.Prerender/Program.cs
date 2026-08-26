using System.Diagnostics;
using System.Text;
using System.Text.Json.Nodes;
using VartMarked.Prerender;

// ---------------------------------------------------------------------------
//  Vart Marked - statik site ureteci
//
//  Sirasiyla: (istege bagli) npm build -> React govdeleri -> head + sitemap + robots
//  Cikti frontend/dist; Domeneshop'un /www klasorune oldugu gibi yuklenir.
// ---------------------------------------------------------------------------

var kok = KokBul();
var frontend = Path.Combine(kok, "frontend");
var dist = Path.Combine(frontend, "dist");
var govdeler = Path.Combine(frontend, "dist-ssr", "govde");
var derle = args.Contains("--build");

Console.WriteLine($"Proje koku : {kok}");

if (derle)
{
    Calistir("npm", "run build", frontend);
    Calistir("npm", "run build:ssr", frontend);
    Calistir("npm", "run render", frontend);
}

if (!File.Exists(Path.Combine(dist, "index.html")))
    return Hata($"dist/index.html yok. Once `npm run build` calistir ya da --build ile cagir.");
if (!Directory.Exists(govdeler))
    return Hata($"dist-ssr/govde yok. Once `npm run build:ssr && npm run render` calistir ya da --build ile cagir.");

var sablon = await File.ReadAllTextAsync(Path.Combine(dist, "index.html"));

foreach (var locale in Locales.All)
{
    var ceviriYolu = Path.Combine(frontend, "src", "locales", $"{locale.Code}.json");
    var govdeYolu = Path.Combine(govdeler, $"{locale.Code}.html");

    if (!File.Exists(ceviriYolu)) return Hata($"ceviri dosyasi yok: {ceviriYolu}");
    if (!File.Exists(govdeYolu)) return Hata($"govde uretilmemis: {govdeYolu}");

    var ceviri = JsonNode.Parse(await File.ReadAllTextAsync(ceviriYolu))!;
    var govde = await File.ReadAllTextAsync(govdeYolu);
    var head = SeoHead.Build(locale, ceviri);

    var html = Sablonla(sablon, locale, head, govde);

    var hedef = Path.Combine(dist, locale.OutputFile);
    Directory.CreateDirectory(Path.GetDirectoryName(hedef)!);
    await File.WriteAllTextAsync(hedef, html, new UTF8Encoding(false));
    Console.WriteLine($"  {locale.Code,-4} -> {locale.OutputFile,-16} ({html.Length / 1024} KB)");
}

await File.WriteAllTextAsync(Path.Combine(dist, "sitemap.xml"), Sitemap.Xml(), new UTF8Encoding(false));
await File.WriteAllTextAsync(Path.Combine(dist, "robots.txt"), Sitemap.Robots(), new UTF8Encoding(false));
await File.WriteAllTextAsync(Path.Combine(dist, "llms.txt"), Sitemap.LlmsTxt(), new UTF8Encoding(false));
Console.WriteLine("  sitemap.xml + robots.txt + llms.txt yazildi");
Console.WriteLine($"\nTamam. Cikti: {dist}");
return 0;

// ---------------------------------------------------------------------------

/// <summary>Sablondaki head'i ve #root'u doldurur; lang/dir dogru dile ayarlanir.</summary>
static string Sablonla(string sablon, Locale locale, string head, string govde)
{
    var html = sablon
        .Replace("<html lang=\"nb\">", $"<html lang=\"{locale.Hreflang}\" dir=\"{locale.Dir}\">")
        .Replace("<title>Vårt Marked</title>", head.TrimEnd())
        .Replace("<div id=\"root\"></div>", $"<div id=\"root\">{govde}</div>");

    if (!html.Contains($"lang=\"{locale.Hreflang}\""))
        throw new InvalidOperationException($"{locale.Code}: <html lang> degistirilemedi - index.html sablonu degismis olabilir.");
    if (!html.Contains("<div id=\"root\">" + govde[..Math.Min(40, govde.Length)]))
        throw new InvalidOperationException($"{locale.Code}: govde #root icine yerlestirilemedi.");

    return html;
}

static string KokBul()
{
    var d = new DirectoryInfo(AppContext.BaseDirectory);
    while (d is not null && !File.Exists(Path.Combine(d.FullName, "VartMarked.sln"))) d = d.Parent;
    return d?.FullName ?? throw new InvalidOperationException("VartMarked.sln bulunamadi.");
}

static void Calistir(string dosya, string arg, string klasor)
{
    Console.WriteLine($"$ {dosya} {arg}");
    var p = Process.Start(new ProcessStartInfo(dosya, arg) { WorkingDirectory = klasor, UseShellExecute = false })
            ?? throw new InvalidOperationException($"baslatilamadi: {dosya}");
    p.WaitForExit();
    if (p.ExitCode != 0) throw new InvalidOperationException($"`{dosya} {arg}` {p.ExitCode} ile dondu.");
}

static int Hata(string mesaj)
{
    Console.Error.WriteLine($"HATA: {mesaj}");
    return 1;
}
