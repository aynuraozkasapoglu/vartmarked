using Microsoft.Extensions.FileProviders;

// ---------------------------------------------------------------------------
//  Vart Marked - yerel onizleme sunucusu
//
//  Canlida .NET YOKTUR: Domeneshop paylasimli hosting nginx+PHP servis eder ve
//  uzun omurlu bir .NET sureci kosamaz. Bu proje yalniz gelistirme icindir -
//  uretilmis statik ciktiyi canlidaki gibi (dizin basina index.html, bilinmeyen
//  yol 404) servis eder ki Rider'dan F5 ile gezilebilsin.
// ---------------------------------------------------------------------------

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var kok = KokBul();
var dist = Path.Combine(kok, "frontend", "dist");

if (!Directory.Exists(dist))
{
    Console.Error.WriteLine($"HATA: {dist} yok. Once `dotnet run --project backend/VartMarked.Prerender -- --build` calistir.");
    return 1;
}

var saglayici = new PhysicalFileProvider(dist);

app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = saglayici,
    DefaultFileNames = ["index.html"],
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = saglayici,
    ServeUnknownFileTypes = false,
});

// Statik hostingle ayni davranis: eslesmeyen yol SPA'ya dusmez, 404 doner.
app.Run(async ctx =>
{
    ctx.Response.StatusCode = StatusCodes.Status404NotFound;
    ctx.Response.ContentType = "text/html; charset=utf-8";
    await ctx.Response.WriteAsync("<!doctype html><meta charset=\"utf-8\"><title>404</title><h1>404</h1>");
});

Console.WriteLine($"Onizleme: {dist}");
app.Run();
return 0;

static string KokBul()
{
    var d = new DirectoryInfo(AppContext.BaseDirectory);
    while (d is not null && !File.Exists(Path.Combine(d.FullName, "VartMarked.sln"))) d = d.Parent;
    return d?.FullName ?? throw new InvalidOperationException("VartMarked.sln bulunamadi.");
}
