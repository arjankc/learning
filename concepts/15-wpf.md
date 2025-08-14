# WPF

## Definition
Windows Presentation Foundation (WPF) is Microsoft's latest approach to a GUI framework, used with the .NET Framework and .NET Core/5+.

## XAML Basics

### Basic Window Structure
```xml
<!-- MainWindow.xaml -->
<Window x:Class="WpfApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="My WPF Application" 
        Height="450" 
        Width="800"
        WindowStartupLocation="CenterScreen">
    
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
            <RowDefinition Height="Auto"/>
        </Grid.RowDefinitions>
        
        <!-- Header -->
        <TextBlock Grid.Row="0" 
                   Text="Welcome to WPF" 
                   FontSize="24" 
                   FontWeight="Bold"
                   HorizontalAlignment="Center"
                   Margin="10"/>
        
        <!-- Content Area -->
        <StackPanel Grid.Row="1" 
                    Orientation="Vertical" 
                    Margin="20">
            
            <Label Content="Enter your name:" 
                   FontWeight="Bold"/>
            
            <TextBox x:Name="NameTextBox" 
                     Width="200" 
                     HorizontalAlignment="Left"
                     Margin="0,5,0,10"/>
            
            <Button x:Name="GreetButton" 
                    Content="Greet Me" 
                    Width="100"
                    HorizontalAlignment="Left"
                    Click="GreetButton_Click"/>
            
            <TextBlock x:Name="ResultTextBlock" 
                       FontSize="16"
                       Margin="0,10,0,0"
                       Foreground="Blue"/>
            
        </StackPanel>
        
        <!-- Status Bar -->
        <StatusBar Grid.Row="2">
            <StatusBarItem Content="Ready"/>
        </StatusBar>
        
    </Grid>
</Window>
```

### Code-Behind
```csharp
// MainWindow.xaml.cs
using System.Windows;

namespace WpfApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        
        private void GreetButton_Click(object sender, RoutedEventArgs e)
        {
            string name = NameTextBox.Text;
            if (string.IsNullOrWhiteSpace(name))
            {
                MessageBox.Show("Please enter your name!", "Warning", 
                    MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            
            ResultTextBlock.Text = $"Hello, {name}! Welcome to WPF.";
        }
    }
}
```

## WPF Data Binding

### Simple Data Binding
```csharp
// Person model
public class Person : INotifyPropertyChanged
{
    private string firstName;
    private string lastName;
    private int age;
    
    public string FirstName
    {
        get { return firstName; }
        set
        {
            firstName = value;
            OnPropertyChanged();
            OnPropertyChanged(nameof(FullName)); // Update computed property
        }
    }
    
    public string LastName
    {
        get { return lastName; }
        set
        {
            lastName = value;
            OnPropertyChanged();
            OnPropertyChanged(nameof(FullName));
        }
    }
    
    public int Age
    {
        get { return age; }
        set
        {
            age = value;
            OnPropertyChanged();
        }
    }
    
    public string FullName => $"{FirstName} {LastName}";
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

```xml
<!-- Data Binding XAML -->
<Window x:Class="WpfApp.DataBindingWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    
    <StackPanel Margin="20">
        
        <!-- Two-way binding -->
        <Label Content="First Name:"/>
        <TextBox Text="{Binding FirstName, UpdateSourceTrigger=PropertyChanged}" 
                 Margin="0,0,0,10"/>
        
        <Label Content="Last Name:"/>
        <TextBox Text="{Binding LastName, UpdateSourceTrigger=PropertyChanged}" 
                 Margin="0,0,0,10"/>
        
        <Label Content="Age:"/>
        <TextBox Text="{Binding Age, UpdateSourceTrigger=PropertyChanged}" 
                 Margin="0,0,0,10"/>
        
        <!-- One-way binding (computed property) -->
        <Label Content="Full Name:"/>
        <TextBlock Text="{Binding FullName}" 
                   FontWeight="Bold" 
                   FontSize="16"
                   Margin="0,0,0,10"/>
        
        <!-- Binding with conversion -->
        <TextBlock Margin="0,10,0,0">
            <TextBlock.Text>
                <MultiBinding StringFormat="Person: {0}, Age: {1}">
                    <Binding Path="FullName"/>
                    <Binding Path="Age"/>
                </MultiBinding>
            </TextBlock.Text>
        </TextBlock>
        
    </StackPanel>
</Window>
```

```csharp
// Code-behind for data binding
public partial class DataBindingWindow : Window
{
    public DataBindingWindow()
    {
        InitializeComponent();
        
        // Set DataContext
        DataContext = new Person
        {
            FirstName = "John",
            LastName = "Doe",
            Age = 30
        };
    }
}
```

### Collection Binding with ListBox
```xml
<Window x:Class="WpfApp.EmployeeListWindow">
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="300"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <!-- Employee List -->
        <ListBox Grid.Column="0" 
                 ItemsSource="{Binding Employees}"
                 SelectedItem="{Binding SelectedEmployee}"
                 DisplayMemberPath="FullName"
                 Margin="10"/>
        
        <!-- Employee Details -->
        <StackPanel Grid.Column="1" 
                    DataContext="{Binding SelectedEmployee}"
                    Margin="10">
            
            <Label Content="Employee Details" 
                   FontWeight="Bold" 
                   FontSize="16"/>
            
            <Label Content="First Name:"/>
            <TextBox Text="{Binding FirstName, UpdateSourceTrigger=PropertyChanged}"/>
            
            <Label Content="Last Name:"/>
            <TextBox Text="{Binding LastName, UpdateSourceTrigger=PropertyChanged}"/>
            
            <Label Content="Department:"/>
            <ComboBox ItemsSource="{Binding DataContext.Departments, 
                                   RelativeSource={RelativeSource AncestorType=Window}}"
                      SelectedItem="{Binding Department}"
                      DisplayMemberPath="Name"/>
            
            <Label Content="Salary:"/>
            <TextBox Text="{Binding Salary, StringFormat=C, UpdateSourceTrigger=PropertyChanged}"/>
            
        </StackPanel>
    </Grid>
</Window>
```

## Commands and MVVM Pattern

### RelayCommand Implementation
```csharp
public class RelayCommand : ICommand
{
    private readonly Action<object> execute;
    private readonly Func<object, bool> canExecute;
    
    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        this.execute = execute ?? throw new ArgumentNullException(nameof(execute));
        this.canExecute = canExecute;
    }
    
    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }
    
    public bool CanExecute(object parameter)
    {
        return canExecute == null || canExecute(parameter);
    }
    
    public void Execute(object parameter)
    {
        execute(parameter);
    }
}
```

### ViewModel Example
```csharp
public class MainViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Employee> employees;
    private Employee selectedEmployee;
    private string searchText;
    
    public MainViewModel()
    {
        Employees = new ObservableCollection<Employee>();
        LoadEmployees();
        
        // Initialize commands
        AddEmployeeCommand = new RelayCommand(AddEmployee);
        DeleteEmployeeCommand = new RelayCommand(DeleteEmployee, CanDeleteEmployee);
        SearchCommand = new RelayCommand(Search);
    }
    
    public ObservableCollection<Employee> Employees
    {
        get { return employees; }
        set
        {
            employees = value;
            OnPropertyChanged();
        }
    }
    
    public Employee SelectedEmployee
    {
        get { return selectedEmployee; }
        set
        {
            selectedEmployee = value;
            OnPropertyChanged();
            CommandManager.InvalidateRequerySuggested(); // Update command states
        }
    }
    
    public string SearchText
    {
        get { return searchText; }
        set
        {
            searchText = value;
            OnPropertyChanged();
        }
    }
    
    // Commands
    public ICommand AddEmployeeCommand { get; }
    public ICommand DeleteEmployeeCommand { get; }
    public ICommand SearchCommand { get; }
    
    private void AddEmployee(object parameter)
    {
        var newEmployee = new Employee
        {
            FirstName = "New",
            LastName = "Employee",
            Salary = 50000
        };
        Employees.Add(newEmployee);
        SelectedEmployee = newEmployee;
    }
    
    private void DeleteEmployee(object parameter)
    {
        if (SelectedEmployee != null)
        {
            Employees.Remove(SelectedEmployee);
            SelectedEmployee = null;
        }
    }
    
    private bool CanDeleteEmployee(object parameter)
    {
        return SelectedEmployee != null;
    }
    
    private void Search(object parameter)
    {
        // Implement search logic
        if (string.IsNullOrWhiteSpace(SearchText))
        {
            LoadEmployees(); // Show all
        }
        else
        {
            var filtered = employees.Where(e => 
                e.FirstName.Contains(SearchText, StringComparison.OrdinalIgnoreCase) ||
                e.LastName.Contains(SearchText, StringComparison.OrdinalIgnoreCase)).ToList();
            
            Employees.Clear();
            foreach (var emp in filtered)
            {
                Employees.Add(emp);
            }
        }
    }
    
    private void LoadEmployees()
    {
        // Load from database or service
        Employees.Clear();
        // Add sample data
        Employees.Add(new Employee { FirstName = "John", LastName = "Doe", Salary = 60000 });
        Employees.Add(new Employee { FirstName = "Jane", LastName = "Smith", Salary = 65000 });
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```
