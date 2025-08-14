# ASP.NET & ASP.NET Core

## ASP.NET Core MVC Architecture

### Model-View-Controller Pattern
```
+-------------+    +-------------+    +-------------+
|   Browser   |--->| Controller  |--->|    Model    |
|             |    |             |    |             |
+-------------+    +-------------+    +-------------+
       ^                   |                  |
       |                   V                  |
       |            +-------------+           |
       +------------+    View     +<----------+
                    |             |
                    +-------------+
```

**MVC Flow:**
1. **Browser** sends request to **Controller**
2. **Controller** processes request, interacts with **Model**
3. **Model** returns data to **Controller**
4. **Controller** passes data to **View** for rendering
5. **View** sends rendered HTML back to **Browser**

### Model Example
```csharp
public class Product
{
    public int Id { get; set; }
    
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, ErrorMessage = "Product name cannot exceed 100 characters")]
    public string Name { get; set; }
    
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }
    
    [Required(ErrorMessage = "Price is required")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }
    
    [Required(ErrorMessage = "Category is required")]
    public int CategoryId { get; set; }
    
    public Category Category { get; set; }
    
    [DataType(DataType.Date)]
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    
    public bool IsActive { get; set; } = true;
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; } = new List<Product>();
}
```

### Controller Example
```csharp
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService productService;
    private readonly ILogger<ProductsController> logger;
    
    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        this.productService = productService;
        this.logger = logger;
    }
    
    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            var products = await productService.GetAllProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error retrieving products");
            return StatusCode(500, "Internal server error");
        }
    }
    
    // GET: api/products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await productService.GetProductByIdAsync(id);
        
        if (product == null)
        {
            return NotFound($"Product with ID {id} not found");
        }
        
        return Ok(product);
    }
    
    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            var createdProduct = await productService.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProduct), 
                new { id = createdProduct.Id }, createdProduct);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error creating product");
            return StatusCode(500, "Internal server error");
        }
    }
    
    // PUT: api/products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    {
        if (id != product.Id)
        {
            return BadRequest("Product ID mismatch");
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            await productService.UpdateProductAsync(product);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound($"Product with ID {id} not found");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error updating product");
            return StatusCode(500, "Internal server error");
        }
    }
    
    // DELETE: api/products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            await productService.DeleteProductAsync(id);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound($"Product with ID {id} not found");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting product");
            return StatusCode(500, "Internal server error");
        }
    }
}
```

## Middleware in ASP.NET Core

### Definition
Middleware is software that's assembled into an app pipeline to handle requests and responses.

### Custom Middleware
```csharp
// Custom middleware class
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger<RequestLoggingMiddleware> logger;
    
    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        this.next = next;
        this.logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        var startTime = DateTime.UtcNow;
        var requestId = Guid.NewGuid().ToString();
        
        // Log request
        logger.LogInformation($"[{requestId}] Request started: {context.Request.Method} {context.Request.Path}");
        
        try
        {
            // Call the next middleware in the pipeline
            await next(context);
        }
        finally
        {
            var duration = DateTime.UtcNow - startTime;
            logger.LogInformation($"[{requestId}] Request completed: {context.Response.StatusCode} in {duration.TotalMilliseconds:F2}ms");
        }
    }
}

// Extension method for easier registration
public static class RequestLoggingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestLoggingMiddleware>();
    }
}
```

### Startup/Program Configuration
```csharp
// Program.cs (ASP.NET Core 6+)
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add custom services
builder.Services.AddScoped<IProductService, ProductService>();

// Add authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Custom middleware
app.UseRequestLogging();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

## CRUD Operations using Razor Pages

### Page Model
```csharp
// Pages/Products/Index.cshtml.cs
public class IndexModel : PageModel
{
    private readonly IProductService productService;
    
    public IndexModel(IProductService productService)
    {
        this.productService = productService;
    }
    
    public IList<Product> Products { get; set; }
    
    [BindProperty(SupportsGet = true)]
    public string SearchString { get; set; }
    
    public async Task OnGetAsync()
    {
        Products = await productService.GetProductsAsync(SearchString);
    }
}
```

```html
<!-- Pages/Products/Index.cshtml -->
@page
@model IndexModel
@{
    ViewData["Title"] = "Products";
}

<h1>Products</h1>

<div class="row">
    <div class="col-md-6">
        <a asp-page="Create" class="btn btn-primary">Create New Product</a>
    </div>
    <div class="col-md-6">
        <form method="get">
            <div class="input-group">
                <input asp-for="SearchString" class="form-control" placeholder="Search products..."/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </div>
        </form>
    </div>
</div>

<table class="table table-striped mt-3">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var product in Model.Products)
        {
            <tr>
                <td>@product.Name</td>
                <td>@product.Description</td>
                <td>@product.Price.ToString("C")</td>
                <td>@product.Category?.Name</td>
                <td>
                    <a asp-page="Details" asp-route-id="@product.Id" class="btn btn-sm btn-info">Details</a>
                    <a asp-page="Edit" asp-route-id="@product.Id" class="btn btn-sm btn-warning">Edit</a>
                    <a asp-page="Delete" asp-route-id="@product.Id" class="btn btn-sm btn-danger">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>
```

### Create Page
```csharp
// Pages/Products/Create.cshtml.cs
public class CreateModel : PageModel
{
    private readonly IProductService productService;
    
    public CreateModel(IProductService productService)
    {
        this.productService = productService;
    }
    
    [BindProperty]
    public Product Product { get; set; }
    
    public SelectList Categories { get; set; }
    
    public async Task<IActionResult> OnGetAsync()
    {
        await LoadCategoriesAsync();
        return Page();
    }
    
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            await LoadCategoriesAsync();
            return Page();
        }
        
        await productService.CreateProductAsync(Product);
        
        TempData["SuccessMessage"] = "Product created successfully!";
        return RedirectToPage("./Index");
    }
    
    private async Task LoadCategoriesAsync()
    {
        var categories = await productService.GetCategoriesAsync();
        Categories = new SelectList(categories, "Id", "Name");
    }
}
```

## Authentication and Authorization

### JWT Authentication
```csharp
// Services/AuthService.cs
public class AuthService : IAuthService
{
    private readonly IConfiguration configuration;
    private readonly IUserService userService;
    
    public AuthService(IConfiguration configuration, IUserService userService)
    {
        this.configuration = configuration;
        this.userService = userService;
    }
    
    public async Task<AuthResult> LoginAsync(LoginModel model)
    {
        var user = await userService.ValidateUserAsync(model.Email, model.Password);
        if (user == null)
        {
            return new AuthResult { Success = false, Message = "Invalid credentials" };
        }
        
        var token = GenerateJwtToken(user);
        return new AuthResult 
        { 
            Success = true, 
            Token = token,
            User = user
        };
    }
    
    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Email, user.Email)
        };
        
        // Add role claims
        foreach (var role in user.Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(24),
            Issuer = configuration["Jwt:Issuer"],
            Audience = configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), 
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
```

### Authorization Policies
```csharp
// Program.cs - Authorization setup
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    
    options.AddPolicy("ManageProducts", policy => 
        policy.RequireClaim("Permission", "ManageProducts"));
    
    options.AddPolicy("MinimumAge", policy => 
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

// Custom authorization requirement
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    
    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}

public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var birthDate = context.User.FindFirst(ClaimTypes.DateOfBirth)?.Value;
        
        if (DateTime.TryParse(birthDate, out DateTime dateOfBirth))
        {
            var age = DateTime.Today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > DateTime.Today.AddYears(-age))
                age--;
            
            if (age >= requirement.MinimumAge)
            {
                context.Succeed(requirement);
            }
        }
        
        return Task.CompletedTask;
    }
}
```

## Deployment Methods

### Docker Deployment
```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyApp/MyApp.csproj", "MyApp/"]
RUN dotnet restore "MyApp/MyApp.csproj"
COPY . .
WORKDIR "/src/MyApp"
RUN dotnet build "MyApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=MyAppDb;User=sa;Password=YourPassword123;
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      - db
  
  db:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPassword123
    ports:
      - "1433:1433"
    volumes:
      - sqldata:/var/opt/mssql

volumes:
  sqldata:
```
