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

## Theory
### Dependency Injection
- Built-in DI supports Singleton, Scoped (per-request), and Transient lifetimes.
- Prefer constructor injection; avoid static/service locator patterns.

### Model Binding & Validation
- Binds from route, query, headers, and body. Use `[FromBody]`, `[FromQuery]` etc. to be explicit.
- Validate with data annotations; check `ModelState.IsValid` or rely on automatic 400 with ApiController.

### Configuration & Options
- Combine appsettings.json, environment variables, and secrets. Bind strongly-typed settings via `IOptions<T>`.

### Logging & Observability
- Use `ILogger<T>` for structured logs. Add correlation IDs and health checks.
- Consider OpenTelemetry for traces/metrics, and Serilog/Sinks for log shipping.
