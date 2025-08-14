# Question 10: What are two types of delegate? Explain each with an example.

## Types of Delegates in C#:

1. **Single-cast Delegate (Simple Delegate)**
2. **Multi-cast Delegate**

## 1. Single-cast Delegate:
A delegate that holds reference to a single method.

```csharp
public class SingleCastDelegateDemo
{
    // Declare delegate type
    public delegate int CalculateDelegate(int x, int y);
    public delegate void PrintDelegate(string message);
    
    public static void Main()
    {
        Console.WriteLine("=== Single-cast Delegate Examples ===");
        
        // Create delegate instance pointing to a method
        CalculateDelegate calc = Add;
        
        // Call delegate
        int result = calc(10, 5);
        Console.WriteLine($"Addition result: {result}");
        
        // Change delegate to point to different method
        calc = Multiply;
        result = calc(10, 5);
        Console.WriteLine($"Multiplication result: {result}");
        
        // Using lambda expression
        calc = (x, y) => x / y;
        result = calc(10, 5);
        Console.WriteLine($"Division result: {result}");
    }
    
    public static int Add(int x, int y)
    {
        Console.WriteLine($"Adding {x} + {y}");
        return x + y;
    }
    
    public static int Multiply(int x, int y)
    {
        Console.WriteLine($"Multiplying {x} * {y}");
        return x * y;
    }
}
```

## 2. Multi-cast Delegate:
A delegate that can hold references to multiple methods and call them in sequence.

```csharp
public class MultiCastDelegateDemo
{
    public delegate void NotificationDelegate(string message);
    
    public static void Main()
    {
        Console.WriteLine("=== Multi-cast Delegate Examples ===");
        
        // Create multi-cast delegate
        NotificationDelegate notification = EmailNotification;
        notification += SmsNotification;        // Add another method
        notification += PushNotification;      // Add third method
        
        // Call all methods in the delegate
        Console.WriteLine("Sending notification...");
        notification("System maintenance scheduled");
        
        Console.WriteLine("\n--- Removing Methods ---");
        notification -= EmailNotification;    // Remove method
        notification("Emergency alert");
    }
    
    public static void EmailNotification(string message)
    {
        Console.WriteLine($"EMAIL: {message}");
    }
    
    public static void SmsNotification(string message)
    {
        Console.WriteLine($"SMS: {message}");
    }
    
    public static void PushNotification(string message)
    {
        Console.WriteLine($"PUSH: {message}");
    }
}
```

