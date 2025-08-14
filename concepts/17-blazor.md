# Blazor

## Definition
Blazor is a free and open-source web framework that enables developers to create web apps using C# and HTML, running either on the server or in the browser via WebAssembly.

## Server-side vs Client-side Blazor

| Feature | Blazor Server | Blazor WebAssembly |
|---------|---------------|-------------------|
| **Execution** | Runs on server | Runs in browser |
| **Connection** | Requires SignalR connection | Works offline |
| **Performance** | Fast startup, server processing | Slow startup, client processing |
| **Scalability** | Limited by server resources | Scales with client devices |
| **Security** | Code stays on server | Code downloaded to client |
| **Network** | Requires constant connection | Works with intermittent connection |

## Blazor Components

### Basic Component Structure
```csharp
@* Components/Counter.razor *@
@page "/counter"

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

### Component with Parameters
```csharp
@* Components/ProductCard.razor *@
<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">@Product.Name</h5>
        <p class="card-text">@Product.Description</p>
        <p class="card-text">
            <strong>Price: @Product.Price.ToString("C")</strong>
        </p>
        <button class="btn btn-primary" @onclick="OnPurchaseClick">
            Buy Now
        </button>
    </div>
</div>

@code {
    [Parameter] public Product Product { get; set; }
    [Parameter] public EventCallback<Product> OnPurchase { get; set; }

    private async Task OnPurchaseClick()
    {
        await OnPurchase.InvokeAsync(Product);
    }
}
```

### Component Creating Process
```csharp
// 1. Define the component class
@inherits ComponentBase
@implements IDisposable

// 2. Add parameters and properties
@code {
    [Parameter] public string Title { get; set; }
    [Parameter] public RenderFragment ChildContent { get; set; }
    [Parameter] public EventCallback<string> OnValueChanged { get; set; }
    
    [Inject] public IJSRuntime JSRuntime { get; set; }
    [Inject] public IProductService ProductService { get; set; }
    
    private string inputValue = "";
    private List<Product> products = new();
    private Timer timer;

    // 3. Lifecycle methods
    protected override async Task OnInitializedAsync()
    {
        products = await ProductService.GetProductsAsync();
        timer = new Timer(UpdateTime, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
    }

    protected override async Task OnParametersSetAsync()
    {
        // Called when parameters change
        if (!string.IsNullOrEmpty(Title))
        {
            await JSRuntime.InvokeVoidAsync("console.log", $"Title changed to: {Title}");
        }
    }

    protected override bool ShouldRender()
    {
        // Control when component re-renders
        return !string.IsNullOrEmpty(Title);
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JSRuntime.InvokeVoidAsync("initializeComponent");
        }
    }

    // 4. Event handlers
    private async Task OnInputChange(ChangeEventArgs e)
    {
        inputValue = e.Value?.ToString() ?? "";
        await OnValueChanged.InvokeAsync(inputValue);
    }

    private void UpdateTime(object state)
    {
        InvokeAsync(StateHasChanged); // Re-render component
    }

    // 5. Cleanup
    public void Dispose()
    {
        timer?.Dispose();
    }
}
```

## Data Binding in Blazor

### One-way and Two-way Binding
```csharp
@* Pages/DataBindingDemo.razor *@
@page "/databinding"

<h3>Data Binding Demo</h3>

<div class="row">
    <div class="col-md-6">
        <!-- One-way binding -->
        <h4>One-way Binding</h4>
        <p>Current time: @DateTime.Now.ToString("HH:mm:ss")</p>
        <p>User name: @user.Name</p>
        <p>Is active: @user.IsActive</p>
        
        <!-- Two-way binding -->
        <h4>Two-way Binding</h4>
        <div class="form-group">
            <label>Name:</label>
            <input @bind="user.Name" class="form-control" />
        </div>
        
        <div class="form-group">
            <label>Email:</label>
            <input @bind="user.Email" @bind:event="oninput" class="form-control" />
        </div>
        
        <div class="form-group">
            <label>Age:</label>
            <input @bind="user.Age" type="number" class="form-control" />
        </div>
        
        <div class="form-group">
            <label>
                <input type="checkbox" @bind="user.IsActive" />
                Is Active
            </label>
        </div>
        
        <div class="form-group">
            <label>Country:</label>
            <select @bind="user.Country" class="form-control">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
            </select>
        </div>
    </div>
    
    <div class="col-md-6">
        <h4>Live Preview</h4>
        <div class="card">
            <div class="card-body">
                <h5>@user.Name</h5>
                <p>Email: @user.Email</p>
                <p>Age: @user.Age</p>
                <p>Country: @user.Country</p>
                <p>Status: @(user.IsActive ? "Active" : "Inactive")</p>
            </div>
        </div>
    </div>
</div>

@code {
    private User user = new User { Name = "John Doe", Age = 30, IsActive = true };
    
    public class User
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public int Age { get; set; }
        public bool IsActive { get; set; }
        public string Country { get; set; } = "";
    }
}
```

### Form Validation
```csharp
@* Pages/UserForm.razor *@
@page "/userform"
@using System.ComponentModel.DataAnnotations

<EditForm Model="user" OnValidSubmit="HandleValidSubmit" OnInvalidSubmit="HandleInvalidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    
    <div class="form-group">
        <label>First Name:</label>
        <InputText @bind-Value="user.FirstName" class="form-control" />
        <ValidationMessage For="@(() => user.FirstName)" />
    </div>
    
    <div class="form-group">
        <label>Email:</label>
        <InputText @bind-Value="user.Email" class="form-control" />
        <ValidationMessage For="@(() => user.Email)" />
    </div>
    
    <div class="form-group">
        <label>Birth Date:</label>
        <InputDate @bind-Value="user.BirthDate" class="form-control" />
        <ValidationMessage For="@(() => user.BirthDate)" />
    </div>
    
    <div class="form-group">
        <label>Salary:</label>
        <InputNumber @bind-Value="user.Salary" class="form-control" />
        <ValidationMessage For="@(() => user.Salary)" />
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
</EditForm>

@if (isSubmitted)
{
    <div class="alert alert-success mt-3">
        Form submitted successfully!
    </div>
}

@code {
    private UserModel user = new UserModel();
    private bool isSubmitted = false;
    
    private void HandleValidSubmit()
    {
        isSubmitted = true;
        // Process valid form
    }
    
    private void HandleInvalidSubmit()
    {
        isSubmitted = false;
        // Handle invalid form
    }
    
    public class UserModel
    {
        [Required(ErrorMessage = "First name is required")]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters")]
        public string FirstName { get; set; } = "";
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = "";
        
        [Required(ErrorMessage = "Birth date is required")]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; } = DateTime.Today.AddYears(-18);
        
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be positive")]
        public decimal Salary { get; set; }
    }
}
```

## JavaScript Interop
```csharp
@* Components/JSInteropDemo.razor *@
@inject IJSRuntime JSRuntime

<h3>JavaScript Interop Demo</h3>

<button @onclick="ShowAlert">Show Alert</button>
<button @onclick="CallJSFunction">Call JS Function</button>
<button @onclick="GetUserLocation">Get Location</button>

<div id="map" style="height: 300px; width: 100%; margin-top: 20px;"></div>

@code {
    private async Task ShowAlert()
    {
        await JSRuntime.InvokeVoidAsync("alert", "Hello from Blazor!");
    }
    
    private async Task CallJSFunction()
    {
        var result = await JSRuntime.InvokeAsync<string>("prompt", "Enter your name:");
        if (!string.IsNullOrEmpty(result))
        {
            await JSRuntime.InvokeVoidAsync("console.log", $"User entered: {result}");
        }
    }
    
    private async Task GetUserLocation()
    {
        try
        {
            var location = await JSRuntime.InvokeAsync<LocationData>("getUserLocation");
            await JSRuntime.InvokeVoidAsync("initializeMap", location.Latitude, location.Longitude);
        }
        catch (Exception ex)
        {
            await JSRuntime.InvokeVoidAsync("console.error", $"Error getting location: {ex.Message}");
        }
    }
    
    public class LocationData
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
```

```javascript
// wwwroot/js/site.js
window.getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => reject(error)
            );
        } else {
            reject(new Error("Geolocation is not supported"));
        }
    });
};

window.initializeMap = (lat, lng) => {
    // Initialize map with given coordinates
    console.log(`Initializing map at ${lat}, ${lng}`);
};
```

## Razor Class Library

### Creating a Razor Class Library
```xml
<!-- MyBlazorLibrary.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Razor">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <SupportedPlatform Include="browser" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.Web" Version="6.0.0" />
  </ItemGroup>

</Project>
```

### Shared Components in Library
```csharp
@* Components/SharedButton.razor *@
@namespace MyBlazorLibrary.Components

<button class="btn @CssClass" @onclick="OnClick">
    @if (!string.IsNullOrEmpty(Icon))
    {
        <i class="@Icon"></i>
    }
    @Text
</button>

@code {
    [Parameter] public string Text { get; set; } = "Button";
    [Parameter] public string Icon { get; set; } = "";
    [Parameter] public string CssClass { get; set; } = "btn-primary";
    [Parameter] public EventCallback OnClick { get; set; }
}
```

### Using Library in Main Project
```csharp
@* Add to _Imports.razor *@
@using MyBlazorLibrary.Components

@* Use in components *@
<SharedButton Text="Save" 
              Icon="fas fa-save" 
              CssClass="btn-success"
              OnClick="SaveData" />
```

## State Management
```csharp
// Services/AppStateService.cs
public class AppStateService
{
    private string currentUser = "";
    private Dictionary<string, object> state = new();
    
    public event Action OnChange;
    
    public string CurrentUser
    {
        get => currentUser;
        set
        {
            currentUser = value;
            NotifyStateChanged();
        }
    }
    
    public T GetState<T>(string key, T defaultValue = default)
    {
        if (state.TryGetValue(key, out var value) && value is T)
        {
            return (T)value;
        }
        return defaultValue;
    }
    
    public void SetState<T>(string key, T value)
    {
        state[key] = value;
        NotifyStateChanged();
    }
    
    private void NotifyStateChanged() => OnChange?.Invoke();
}

// Program.cs
builder.Services.AddScoped<AppStateService>();

// Component usage
@inject AppStateService AppState
@implements IDisposable

@code {
    protected override void OnInitialized()
    {
        AppState.OnChange += StateHasChanged;
    }
    
    public void Dispose()
    {
        AppState.OnChange -= StateHasChanged;
    }
}
```
