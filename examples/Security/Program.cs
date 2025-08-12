using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

const string Issuer = "DemoIssuer";
const string Audience = "DemoAudience";
const string Secret = "super_secret_demo_key_1234567890"; // demo only
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Issuer,
            ValidAudience = Audience,
            IssuerSigningKey = key
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminsOnly", policy => policy.RequireRole("admin"));
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/token", (string username) =>
{
    var claims = new List<Claim>
    {
        new(JwtRegisteredClaimNames.Sub, username),
        new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };
    if (username.Equals("admin", StringComparison.OrdinalIgnoreCase))
    {
        claims.Add(new Claim(ClaimTypes.Role, "admin"));
    }

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var token = new JwtSecurityToken(Issuer, Audience, claims,
        expires: DateTime.UtcNow.AddHours(1), signingCredentials: creds);

    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
    return Results.Ok(new { access_token = jwt });
});

app.MapGet("/secure", (ClaimsPrincipal user) =>
{
    var name = user.Identity?.Name ?? user.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? "unknown";
    return Results.Ok(new { message = $"Hello, {name}" });
}).RequireAuthorization();

app.MapGet("/admin", () => Results.Text("Welcome admin"))
    .RequireAuthorization("AdminsOnly");

app.Run();
