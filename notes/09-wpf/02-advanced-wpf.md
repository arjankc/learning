# WPF: Advanced

## Styles and Templates
```xml
<Window.Resources>
	<Style TargetType="Button">
		<Setter Property="Margin" Value="4"/>
	</Style>
	<DataTemplate DataType="{x:Type vm:Person}">
		<StackPanel Orientation="Horizontal">
			<TextBlock Text="{Binding First}"/>
			<TextBlock Text=" "/>
			<TextBlock Text="{Binding Last}"/>
		</StackPanel>
	</DataTemplate>
 </Window.Resources>
```

## Commands and MVVM
```csharp
public class MainViewModel
{
		public ObservableCollection<Person> People { get; } = new();
		public ICommand AddPerson { get; }
		public MainViewModel(){ AddPerson = new RelayCommand(() => People.Add(new Person("Ada","Lovelace"))); }
}
```

## Binding diagnostics
- Use PresentationTraceSources for binding debug.
- Enable exceptions on binding failures in dev.

## Read More
- https://learn.microsoft.com/dotnet/desktop/wpf/get-started/create-app-visual-studio
