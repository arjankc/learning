# Event-Driven Programming

## Definition
Event-driven programming is a paradigm where program flow is determined by events such as user actions, sensor outputs, or message passing.

## Key Concepts
1. **Events**: Notifications that something has happened
2. **Event Handlers**: Methods that respond to events
3. **Event Loop**: Continuously monitors for events
4. **Delegates**: Type-safe function pointers in C#

## Example in C#
```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        
        // Subscribe to button click event
        myButton.Click += MyButton_Click;
    }
    
    // Event handler method
    private void MyButton_Click(object sender, RoutedEventArgs e)
    {
        MessageBox.Show("Button was clicked!");
    }
}

// Custom event example
public class Publisher
{
    // Declare event using delegate
    public event Action<string> OnMessagePublished;
    
    public void PublishMessage(string message)
    {
        // Raise the event
        OnMessagePublished?.Invoke(message);
    }
}

public class Subscriber
{
    public void Subscribe(Publisher pub)
    {
        // Subscribe to event
        pub.OnMessagePublished += HandleMessage;
    }
    
    private void HandleMessage(string message)
    {
        Console.WriteLine($"Received: {message}");
    }
}
```
