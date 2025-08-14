# Question 2: What is an event in C#? Explain how to implement event using delegate in C#.NET?

## What is an Event?
An event in C# is a special kind of multicast delegate that provides notifications when something of interest happens. Events enable a class to notify other classes when something occurs, following the publisher-subscriber pattern.

**Key Characteristics:**
- Based on delegates
- Encapsulated (cannot be directly invoked from outside the class)
- Supports multiple subscribers
- Provides loose coupling between publisher and subscriber

## Event Implementation Using Delegates

### Step 1: Define Delegate and Event
```csharp
// Define delegate for event handler
public delegate void NotificationEventHandler(string message);

public class Publisher
{
    // Declare event based on delegate
    public event NotificationEventHandler OnNotification;
    
    // Method to raise the event
    protected virtual void RaiseNotification(string message)
    {
        // Check if there are subscribers before raising event
        OnNotification?.Invoke(message);
    }
    
    // Method that triggers the event
    public void DoSomething()
    {
        Console.WriteLine("Publisher: Doing some work...");
        
        // Trigger the event
        RaiseNotification("Work completed successfully!");
    }
}
```

### Step 2: Create Subscribers
```csharp
public class Subscriber1
{
    public void Subscribe(Publisher pub)
    {
        // Subscribe to the event
        pub.OnNotification += HandleNotification;
    }
    
    public void Unsubscribe(Publisher pub)
    {
        // Unsubscribe from the event
        pub.OnNotification -= HandleNotification;
    }
    
    private void HandleNotification(string message)
    {
        Console.WriteLine($"Subscriber1 received: {message}");
    }
}

public class Subscriber2
{
    public void Subscribe(Publisher pub)
    {
        pub.OnNotification += HandleNotification;
    }
    
    private void HandleNotification(string message)
    {
        Console.WriteLine($"Subscriber2 received: {message}");
    }
}
```

### Step 3: Usage Example
```csharp
public class EventDemo
{
    public static void Main()
    {
        // Create publisher and subscribers
        Publisher publisher = new Publisher();
        Subscriber1 sub1 = new Subscriber1();
        Subscriber2 sub2 = new Subscriber2();
        
        // Subscribe to events
        sub1.Subscribe(publisher);
        sub2.Subscribe(publisher);
        
        // Trigger event
        publisher.DoSomething();
        
        // Output:
        // Publisher: Doing some work...
        // Subscriber1 received: Work completed successfully!
        // Subscriber2 received: Work completed successfully!
        
        // Unsubscribe one subscriber
        sub1.Unsubscribe(publisher);
        
        // Trigger event again
        publisher.DoSomething();
        
        // Output:
        // Publisher: Doing some work...
        // Subscriber2 received: Work completed successfully!
    }
}
```

## Advanced Event Example with EventArgs
```csharp
// Custom EventArgs class
public class OrderEventArgs : EventArgs
{
    public string OrderId { get; set; }
    public decimal Amount { get; set; }
    public DateTime OrderDate { get; set; }
}

// Publisher class
public class OrderProcessor
{
    // Event using EventHandler<T> generic delegate
    public event EventHandler<OrderEventArgs> OrderProcessed;
    
    public void ProcessOrder(string orderId, decimal amount)
    {
        Console.WriteLine($"Processing order {orderId}...");
        
        // Simulate processing
        Thread.Sleep(1000);
        
        // Raise event with custom data
        OnOrderProcessed(new OrderEventArgs
        {
            OrderId = orderId,
            Amount = amount,
            OrderDate = DateTime.Now
        });
    }
    
    protected virtual void OnOrderProcessed(OrderEventArgs e)
    {
        OrderProcessed?.Invoke(this, e);
    }
}

// Subscriber classes
public class EmailNotificationService
{
    public void Subscribe(OrderProcessor processor)
    {
        processor.OrderProcessed += OnOrderProcessed;
    }
    
    private void OnOrderProcessed(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Email: Order {e.OrderId} for ${e.Amount} processed at {e.OrderDate}");
    }
}

public class InventoryService
{
    public void Subscribe(OrderProcessor processor)
    {
        processor.OrderProcessed += OnOrderProcessed;
    }
    
    private void OnOrderProcessed(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"Inventory: Updating stock for order {e.OrderId}");
    }
}
```
