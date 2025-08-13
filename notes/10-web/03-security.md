# Web Security

## Authentication
- Cookies (server-rendered sites) vs JWT (APIs/SPAs). External providers via OAuth/OIDC.
```csharp
builder.Services.AddAuthentication("Bearer").AddJwtBearer();
```

## Authorization
- Roles: [Authorize(Roles = "Admin")]
- Policies: configure requirements centrally.
```csharp
builder.Services.AddAuthorization(o => o.AddPolicy("AdultOnly", p => p.RequireClaim("age", "18+")));
app.MapGet("/secure", [Authorize(Policy="AdultOnly")] () => "ok");
```

## HTTPS & CORS
```csharp
app.UseHttpsRedirection();
app.UseCors(p => p.WithOrigins("https://example.com").AllowAnyHeader().AllowAnyMethod());
```

## Read More
- https://learn.microsoft.com/aspnet/core/security/
