# Xamarin

## Xamarin vs Xamarin.Forms

| Feature | Xamarin.iOS/Android | Xamarin.Forms |
|---------|-------------------|---------------|
| **UI** | Platform-specific UI | Shared UI across platforms |
| **Performance** | Native performance | Near-native performance |
| **Code Sharing** | Business logic only | UI + Business logic |
| **Learning Curve** | Requires platform knowledge | Easier for beginners |
| **Customization** | Full platform control | Limited to Forms controls |
| **Use Case** | Complex, platform-specific apps | Cross-platform business apps |

## MVC and MVVM Design Patterns

### MVC Pattern in Xamarin
```csharp
// Model
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

// Controller (in Xamarin, this is often the Page code-behind)
public partial class ProductListPage : ContentPage
{
    private readonly ProductService productService;
    private List<Product> products;
    
    public ProductListPage()
    {
        InitializeComponent();
        productService = new ProductService();
        LoadProducts();
    }
    
    private async void LoadProducts()
    {
        try
        {
            products = await productService.GetProductsAsync();
            ProductListView.ItemsSource = products;
        }
        catch (Exception ex)
        {
            await DisplayAlert("Error", $"Failed to load products: {ex.Message}", "OK");
        }
    }
    
    private async void OnProductSelected(object sender, SelectedItemChangedEventArgs e)
    {
        if (e.SelectedItem is Product product)
        {
            await Navigation.PushAsync(new ProductDetailPage(product));
        }
    }
}
```

### MVVM Pattern in Xamarin.Forms
```csharp
// ViewModel
public class ProductListViewModel : INotifyPropertyChanged
{
    private readonly ProductService productService;
    private ObservableCollection<Product> products;
    private Product selectedProduct;
    private bool isLoading;
    private string searchText;
    
    public ProductListViewModel()
    {
        productService = DependencyService.Get<ProductService>();
        Products = new ObservableCollection<Product>();
        
        LoadProductsCommand = new Command(async () => await LoadProducts());
        SearchCommand = new Command<string>(async (searchText) => await SearchProducts(searchText));
        SelectProductCommand = new Command<Product>(async (product) => await SelectProduct(product));
        
        LoadProductsCommand.Execute(null);
    }
    
    public ObservableCollection<Product> Products
    {
        get => products;
        set
        {
            products = value;
            OnPropertyChanged();
        }
    }
    
    public Product SelectedProduct
    {
        get => selectedProduct;
        set
        {
            selectedProduct = value;
            OnPropertyChanged();
        }
    }
    
    public bool IsLoading
    {
        get => isLoading;
        set
        {
            isLoading = value;
            OnPropertyChanged();
        }
    }
    
    public string SearchText
    {
        get => searchText;
        set
        {
            searchText = value;
            OnPropertyChanged();
            SearchCommand.Execute(value);
        }
    }
    
    public ICommand LoadProductsCommand { get; }
    public ICommand SearchCommand { get; }
    public ICommand SelectProductCommand { get; }
    
    private async Task LoadProducts()
    {
        IsLoading = true;
        try
        {
            var productList = await productService.GetProductsAsync();
            Products.Clear();
            foreach (var product in productList)
            {
                Products.Add(product);
            }
        }
        catch (Exception ex)
        {
            // Handle error
            await Application.Current.MainPage.DisplayAlert("Error", ex.Message, "OK");
        }
        finally
        {
            IsLoading = false;
        }
    }
    
    private async Task SearchProducts(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
        {
            await LoadProducts();
            return;
        }
        
        var filtered = await productService.SearchProductsAsync(searchText);
        Products.Clear();
        foreach (var product in filtered)
        {
            Products.Add(product);
        }
    }
    
    private async Task SelectProduct(Product product)
    {
        if (product != null)
        {
            await Shell.Current.GoToAsync($"productdetail?productId={product.Id}");
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## XAML and Key Elements

### Basic XAML Structure
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.Views.ProductListPage"
             Title="Products">
    
    <ContentPage.BindingContext>
        <vm:ProductListViewModel />
    </ContentPage.BindingContext>
    
    <ContentPage.ToolbarItems>
        <ToolbarItem Text="Add" 
                     IconImageSource="add_icon.png"
                     Command="{Binding AddProductCommand}" />
    </ContentPage.ToolbarItems>
    
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
        </Grid.RowDefinitions>
        
        <!-- Search Bar -->
        <SearchBar Grid.Row="0"
                   Placeholder="Search products..."
                   Text="{Binding SearchText}"
                   SearchCommand="{Binding SearchCommand}"
                   Margin="10" />
        
        <!-- Product List -->
        <CollectionView Grid.Row="1"
                        ItemsSource="{Binding Products}"
                        SelectedItem="{Binding SelectedProduct}"
                        SelectionMode="Single">
            
            <CollectionView.ItemTemplate>
                <DataTemplate>
                    <Grid Padding="15">
                        <Grid.ColumnDefinitions>
                            <ColumnDefinition Width="80" />
                            <ColumnDefinition Width="*" />
                            <ColumnDefinition Width="Auto" />
                        </Grid.ColumnDefinitions>
                        
                        <Image Grid.Column="0"
                               Source="{Binding ImageUrl}"
                               Aspect="AspectFill"
                               HeightRequest="60"
                               WidthRequest="60" />
                        
                        <StackLayout Grid.Column="1" 
                                     Spacing="5"
                                     Margin="10,0">
                            <Label Text="{Binding Name}"
                                   FontSize="16"
                                   FontAttributes="Bold" />
                            <Label Text="{Binding Description}"
                                   FontSize="14"
                                   TextColor="Gray" />
                        </StackLayout>
                        
                        <Label Grid.Column="2"
                               Text="{Binding Price, StringFormat='{0:C}'}"
                               FontSize="16"
                               FontAttributes="Bold"
                               VerticalOptions="Center" />
                    </Grid>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>
        
        <!-- Loading Indicator -->
        <ActivityIndicator Grid.RowSpan="2"
                          IsVisible="{Binding IsLoading}"
                          IsRunning="{Binding IsLoading}"
                          Color="Blue"
                          HorizontalOptions="Center"
                          VerticalOptions="Center" />
    </Grid>
</ContentPage>
```

## SQLite.NET in Xamarin Apps

### Database Model
```csharp
[Table("Products")]
public class Product
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    
    [MaxLength(100), NotNull]
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    [NotNull]
    public decimal Price { get; set; }
    
    [MaxLength(50)]
    public string Category { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    
    public bool IsActive { get; set; } = true;
    
    // Foreign key
    public int CategoryId { get; set; }
}

[Table("Categories")]
public class Category
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    
    [MaxLength(50), NotNull]
    public string Name { get; set; }
    
    public string Description { get; set; }
}
```

### Database Service
```csharp
public class DatabaseService
{
    private SQLiteAsyncConnection database;
    private readonly string databasePath;
    
    public DatabaseService()
    {
        databasePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Products.db3");
    }
    
    private async Task InitializeDatabaseAsync()
    {
        if (database is not null)
            return;
        
        database = new SQLiteAsyncConnection(databasePath);
        
        await database.CreateTableAsync<Product>();
        await database.CreateTableAsync<Category>();
        
        // Seed data if needed
        await SeedDataAsync();
    }
    
    // CRUD Operations for Products
    public async Task<List<Product>> GetProductsAsync()
    {
        await InitializeDatabaseAsync();
        return await database.Table<Product>()
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }
    
    public async Task<Product> GetProductByIdAsync(int id)
    {
        await InitializeDatabaseAsync();
        return await database.Table<Product>()
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();
    }
    
    public async Task<int> SaveProductAsync(Product product)
    {
        await InitializeDatabaseAsync();
        
        if (product.Id != 0)
        {
            return await database.UpdateAsync(product);
        }
        else
        {
            return await database.InsertAsync(product);
        }
    }
    
    public async Task<int> DeleteProductAsync(Product product)
    {
        await InitializeDatabaseAsync();
        return await database.DeleteAsync(product);
    }
    
    public async Task<List<Product>> SearchProductsAsync(string searchText)
    {
        await InitializeDatabaseAsync();
        return await database.Table<Product>()
            .Where(p => p.IsActive && 
                   (p.Name.Contains(searchText) || p.Description.Contains(searchText)))
            .ToListAsync();
    }
    
    // Category operations
    public async Task<List<Category>> GetCategoriesAsync()
    {
        await InitializeDatabaseAsync();
        return await database.Table<Category>().ToListAsync();
    }
    
    private async Task SeedDataAsync()
    {
        var categoryCount = await database.Table<Category>().CountAsync();
        if (categoryCount == 0)
        {
            var categories = new List<Category>
            {
                new Category { Name = "Electronics", Description = "Electronic devices" },
                new Category { Name = "Clothing", Description = "Apparel and accessories" },
                new Category { Name = "Books", Description = "Books and literature" }
            };
            
            await database.InsertAllAsync(categories);
        }
    }
}
```

## Navigation Patterns in Xamarin.Forms

### Shell Navigation
```csharp
// AppShell.xaml
<?xml version="1.0" encoding="UTF-8"?>
<Shell xmlns="http://xamarin.com/schemas/2014/forms" 
       xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
       xmlns:views="clr-namespace:MyApp.Views"
       x:Class="MyApp.AppShell">

    <TabBar>
        <ShellContent Title="Products" 
                      Icon="products_icon.png"
                      ContentTemplate="{DataTemplate views:ProductListPage}" />
        
        <ShellContent Title="Categories" 
                      Icon="categories_icon.png"
                      ContentTemplate="{DataTemplate views:CategoriesPage}" />
        
        <ShellContent Title="Profile" 
                      Icon="profile_icon.png"
                      ContentTemplate="{DataTemplate views:ProfilePage}" />
    </TabBar>

</Shell>
```

```csharp
// Registering routes
public partial class AppShell : Shell
{
    public AppShell()
    {
        InitializeComponent();
        
        // Register routes for navigation
        Routing.RegisterRoute("productdetail", typeof(ProductDetailPage));
        Routing.RegisterRoute("editproduct", typeof(EditProductPage));
        Routing.RegisterRoute("addproduct", typeof(AddProductPage));
    }
}

// Navigation in ViewModels
public class ProductListViewModel : BaseViewModel
{
    private async Task NavigateToProductDetail(Product product)
    {
        var route = $"productdetail?productId={product.Id}";
        await Shell.Current.GoToAsync(route);
    }
    
    private async Task NavigateToAddProduct()
    {
        await Shell.Current.GoToAsync("addproduct");
    }
    
    private async Task NavigateBack()
    {
        await Shell.Current.GoToAsync("..");
    }
}

// Receiving parameters
[QueryProperty(nameof(ProductId), "productId")]
public partial class ProductDetailPage : ContentPage
{
    public string ProductId
    {
        set
        {
            if (int.TryParse(value, out int id))
            {
                ((ProductDetailViewModel)BindingContext).LoadProduct(id);
            }
        }
    }
}
```

### Traditional Navigation
```csharp
public class NavigationService : INavigationService
{
    public async Task NavigateToAsync(string pageName, object parameter = null)
    {
        Page page = pageName switch
        {
            "ProductDetail" => new ProductDetailPage(),
            "EditProduct" => new EditProductPage(),
            "AddProduct" => new AddProductPage(),
            _ => throw new ArgumentException($"Unknown page: {pageName}")
        };
        
        if (page.BindingContext is BaseViewModel viewModel && parameter != null)
        {
            await viewModel.InitializeAsync(parameter);
        }
        
        await Application.Current.MainPage.Navigation.PushAsync(page);
    }
    
    public async Task NavigateBackAsync()
    {
        await Application.Current.MainPage.Navigation.PopAsync();
    }
    
    public async Task NavigateToModalAsync(string pageName, object parameter = null)
    {
        Page page = CreatePage(pageName);
        
        if (page.BindingContext is BaseViewModel viewModel && parameter != null)
        {
            await viewModel.InitializeAsync(parameter);
        }
        
        await Application.Current.MainPage.Navigation.PushModalAsync(new NavigationPage(page));
    }
}
```
