using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Input;

namespace Examples.WpfApp;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new MainViewModel();
    }
}

public sealed class MainViewModel : INotifyPropertyChanged
{
    private string _name = string.Empty;
    public string Name { get => _name; set { if (_name!=value){ _name=value; OnPropertyChanged(); } } }
    public ObservableCollection<string> Items { get; } = new();
    public ICommand AddItem { get; }
    public MainViewModel()
    {
        AddItem = new RelayCommand(() => {
            if (!string.IsNullOrWhiteSpace(Name)) { Items.Add(Name); Name = string.Empty; }
        });
    }
    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string? n=null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(n));
}

public sealed class RelayCommand : ICommand
{
    private readonly Action _execute;
    private readonly Func<bool>? _canExecute;
    public RelayCommand(Action execute, Func<bool>? canExecute = null) { _execute = execute; _canExecute = canExecute; }
    public bool CanExecute(object? parameter) => _canExecute?.Invoke() ?? true;
    public void Execute(object? parameter) => _execute();
    public event EventHandler? CanExecuteChanged { add { CommandManager.RequerySuggested += value; } remove { CommandManager.RequerySuggested -= value; } }
}
