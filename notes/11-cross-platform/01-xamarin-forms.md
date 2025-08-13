# Xamarin.Forms

Note: .NET MAUI is the modern successor; concepts are similar.

## XAML Layouts
```xml
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
						 xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
						 x:Class="Sample.MainPage">
	<StackLayout Padding="20">
		<Label Text="Hello"/>
		<Entry Text="{Binding Name}"/>
		<Button Text="Click" Command="{Binding SayHello}"/>
	</StackLayout>
 </ContentPage>
```

## Navigation
```csharp
await Navigation.PushAsync(new DetailsPage());
```

## MVVM
- Bind View to ViewModel properties/commands via INotifyPropertyChanged and ICommand.

## Read More
- https://learn.microsoft.com/xamarin/xamarin-forms/
