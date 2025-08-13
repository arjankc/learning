# ASP.NET Core Fundamentals

## Middleware pipeline
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Use(async (ctx, next) => { Console.WriteLine($"{ctx.Request.Path}"); await next(); });
app.MapGet("/hello", () => "world");
app.Run();
```

## Razor Pages vs MVC
- Razor Pages: page-focused, good for simple apps.
- MVC: controllers/views, better for larger apps and separation concerns.

## Minimal APIs
```csharp
app.MapPost("/sum", (int a, int b) => Results.Ok(new { sum = a + b }));
```

## Web API essentials
- Model binding, validation attributes, filters, content negotiation (JSON by default).

## Read More
- https://learn.microsoft.com/aspnet/core/
