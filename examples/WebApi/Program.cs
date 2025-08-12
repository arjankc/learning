var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => Results.Text("Hello from ASP.NET Core!"));
app.MapGet("/time", () => new { Utc = DateTime.UtcNow });

app.Run();
