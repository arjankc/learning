# Web Security

## Authentication
- Cookies (server-rendered sites) vs JWT (APIs/SPAs). External providers via OAuth/OIDC.
```csharp
builder.Services.AddAuthentication("Bearer").AddJwtBearer();
```

## Authorization
## Security checklist (practical)
- Enforce HTTPS; add HSTS in production.
- Validate and encode all inputs/outputs to prevent XSS/SQLi.
- Use ASP.NET Core Data Protection for key management.
- Store secrets outside source control (User Secrets/Azure Key Vault).
- Implement proper CORS policy (allow only known origins, methods, headers).
- Add rate limiting for public endpoints.
- Log auth failures and suspicious activities; monitor with alerts.
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
