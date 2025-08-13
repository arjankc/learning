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

## Theory
### Visual vs Logical Tree
- Logical tree is used by resources and data binding; visual tree shows rendered element composition.
- Inspect with Live Visual Tree or tools like Snoop.

### Dependency Properties
- Provide WPF-level property system: default values, change callbacks, styling/animation, value precedence.
- Register via `DependencyProperty.Register` and expose CLR wrappers.

### Data Templates & Virtualization
- Use DataTemplate to define item visuals; prefer virtualization for large item sources.
- Enable `VirtualizingStackPanel.IsVirtualizing="True"` and recycling mode for performance.

### Performance tips
- Freeze Freezables (Brush, Transform) when immutable.
- Reduce layout complexity; flatten hierarchies; avoid heavy triggers.
