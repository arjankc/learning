# Question 4: What is the authentication and authorization in ASP.NET? Explain with example.

## Authentication vs Authorization:

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Definition** | Verifying user identity | Determining user permissions |
| **Question** | "Who are you?" | "What can you do?" |
| **Process** | Login process | Access control |
| **Example** | Username/Password | Admin vs User roles |

## Authentication Types in ASP.NET:
1. **Windows Authentication** - Uses Windows accounts
2. **Forms Authentication** - Custom login forms
3. **Identity Authentication** - ASP.NET Identity system
4. **JWT Authentication** - Token-based authentication

## Example Implementation:

```csharp
// Startup.cs (ASP.NET Core)
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Add Identity services
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));
        
        services.AddDefaultIdentity<IdentityUser>(options =>
        {
            // Password requirements
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
        })
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>();
        
        services.AddControllersWithViews();
    }
    
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        
        app.UseRouting();
        
        // Authentication middleware
        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            endpoints.MapRazorPages();
        });
    }
}

// Controllers with Authentication and Authorization
[Authorize] // Requires authentication
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
    
    [Authorize(Roles = "Admin")] // Requires Admin role
    public IActionResult AdminPanel()
    {
        return View();
    }
    
    [Authorize(Policy = "MinimumAge")] // Custom policy
    public IActionResult RestrictedContent()
    {
        return View();
    }
    
    [AllowAnonymous] // Allows anonymous access
    public IActionResult PublicInfo()
    {
        return View();
    }
}

// Account Controller for Authentication
public class AccountController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    
    public AccountController(UserManager<IdentityUser> userManager, 
                           SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }
    
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(
                model.Email, model.Password, model.RememberMe, false);
            
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
            
            ModelState.AddModelError("", "Invalid login attempt.");
        }
        
        return View(model);
    }
    
    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Index", "Home");
    }
    
    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new IdentityUser 
            { 
                UserName = model.Email, 
                Email = model.Email 
            };
            
            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToAction("Index", "Home");
            }
            
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }
        
        return View(model);
    }
}

// ViewModels
public class LoginViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    public bool RememberMe { get; set; }
}

public class RegisterViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Passwords don't match.")]
    public string ConfirmPassword { get; set; }
}
```

