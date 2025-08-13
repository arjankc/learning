# WPF: XAML Basics

## Layouts
```xml
<Grid>
	<Grid.RowDefinitions>
		<RowDefinition Height="Auto"/>
		<RowDefinition Height="*"/>
	</Grid.RowDefinitions>
	<StackPanel Orientation="Horizontal" Margin="8">
		<TextBlock Text="Name:" Margin="0,0,8,0"/>
		<TextBox Width="200" Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}"/>
	</StackPanel>
	<ListBox Grid.Row="1" ItemsSource="{Binding Items}"/>
	</Grid>
```

## Data Binding with INotifyPropertyChanged
```csharp
public class MainViewModel : INotifyPropertyChanged
{
		private string _name = string.Empty;
		public string Name { get => _name; set { if (_name!=value){ _name=value; OnPropertyChanged(); } } }
		public ObservableCollection<string> Items { get; } = new();
		public event PropertyChangedEventHandler? PropertyChanged;
		void OnPropertyChanged([CallerMemberName] string? n=null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(n));
}
```

## Commands (basic)
```csharp
public class RelayCommand : ICommand
{
		private readonly Action _exec; private readonly Func<bool>? _can;
		public RelayCommand(Action exec, Func<bool>? can=null){_exec=exec;_can=can;}
		public event EventHandler? CanExecuteChanged;
		public bool CanExecute(object? p)=>_can?.Invoke()??true;
		public void Execute(object? p)=>_exec();
		public void RaiseCanExecuteChanged()=>CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
```

## Binding modes and validation
- Modes: OneTime, OneWay, TwoWay (default for TextBox.Text), OneWayToSource.
- Validation: IDataErrorInfo/INotifyDataErrorInfo; ValidationRules on bindings.

## Practice
- Bind a Slider to a numeric property (TwoWay) and display its value.
- Add validation to disallow empty names and show a red adornment.
