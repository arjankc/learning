# Question 16: What is event in C#? Explain briefly about event source and event listener. How are delegate and event related?

## What is an Event?

An **event** in C# is a special kind of multicast delegate that provides notifications when something of interest happens. Events follow the publisher-subscriber pattern where:
- **Event Source (Publisher)**: The class that raises the event
- **Event Listener (Subscriber)**: The class that handles the event

## Event Source and Event Listener:

```csharp
using System;

// Event arguments class
public class TemperatureChangedEventArgs : EventArgs
{
    public double OldTemperature { get; }
    public double NewTemperature { get; }
    public DateTime TimeStamp { get; }
    
    public TemperatureChangedEventArgs(double oldTemp, double newTemp)
    {
        OldTemperature = oldTemp;
        NewTemperature = newTemp;
        TimeStamp = DateTime.Now;
    }
}

// Event Source (Publisher)
public class TemperatureSensor
{
    private double temperature;
    
    // Declare event using delegate
    public event EventHandler<TemperatureChangedEventArgs> TemperatureChanged;
    
    public double Temperature
    {
        get { return temperature; }
        set
        {
            if (Math.Abs(temperature - value) > 0.1) // Only fire if significant change
            {
                double oldTemp = temperature;
                temperature = value;
                OnTemperatureChanged(oldTemp, temperature);
            }
        }
    }
    
    // Protected virtual method to raise the event
    protected virtual void OnTemperatureChanged(double oldTemp, double newTemp)
    {
        TemperatureChanged?.Invoke(this, new TemperatureChangedEventArgs(oldTemp, newTemp));
    }
    
    // Method to simulate temperature reading
    public void StartMonitoring()
    {
        Console.WriteLine("Temperature monitoring started...");
        Random random = new Random();
        
        for (int i = 0; i < 10; i++)
        {
            Temperature = 20 + random.NextDouble() * 15; // Random temp between 20-35
            System.Threading.Thread.Sleep(1000);
        }
    }
}

// Event Listeners (Subscribers)
public class TemperatureDisplay
{
    private string deviceName;
    
    public TemperatureDisplay(string name)
    {
        deviceName = name;
    }
    
    // Event handler method
    public void OnTemperatureChanged(object sender, TemperatureChangedEventArgs e)
    {
        Console.WriteLine($"[{deviceName}] Temperature changed from {e.OldTemperature:F1}°C to {e.NewTemperature:F1}°C at {e.TimeStamp:HH:mm:ss}");
    }
}

public class TemperatureAlarm
{
    private double alertThreshold;
    
    public TemperatureAlarm(double threshold)
    {
        alertThreshold = threshold;
    }
    
    public void OnTemperatureChanged(object sender, TemperatureChangedEventArgs e)
    {
        if (e.NewTemperature > alertThreshold)
        {
            Console.WriteLine($"🚨 ALERT: Temperature {e.NewTemperature:F1}°C exceeds threshold {alertThreshold:F1}°C!");
        }
    }
}

public class TemperatureLogger
{
    public void OnTemperatureChanged(object sender, TemperatureChangedEventArgs e)
    {
        string logEntry = $"[LOG] {e.TimeStamp:yyyy-MM-dd HH:mm:ss} - Temperature: {e.NewTemperature:F2}°C";
        Console.WriteLine(logEntry);
        
        // In real application, write to file or database
        System.IO.File.AppendAllText("temperature.log", logEntry + Environment.NewLine);
    }
}

// Main program demonstrating events
public class EventDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Event Demonstration ===\n");
        
        // Create event source
        TemperatureSensor sensor = new TemperatureSensor();
        
        // Create event listeners
        TemperatureDisplay display = new TemperatureDisplay("Main Display");
        TemperatureAlarm alarm = new TemperatureAlarm(30.0);
        TemperatureLogger logger = new TemperatureLogger();
        
        // Subscribe to events (register event handlers)
        sensor.TemperatureChanged += display.OnTemperatureChanged;
        sensor.TemperatureChanged += alarm.OnTemperatureChanged;
        sensor.TemperatureChanged += logger.OnTemperatureChanged;
        
        // Add anonymous event handler
        sensor.TemperatureChanged += (sender, e) =>
        {
            if (e.NewTemperature < 22)
            {
                Console.WriteLine("❄️ Temperature is getting cold!");
            }
        };
        
        // Start monitoring (this will trigger events)
        sensor.StartMonitoring();
        
        Console.WriteLine("\n--- Unsubscribing some handlers ---");
        
        // Unsubscribe some handlers
        sensor.TemperatureChanged -= alarm.OnTemperatureChanged;
        
        Console.WriteLine("Setting final temperature...");
        sensor.Temperature = 25.5;
        
        DemonstrateCustomEvents();
    }
    
    public static void DemonstrateCustomEvents()
    {
        Console.WriteLine("\n=== Custom Event Example ===");
        
        var player = new MusicPlayer();
        var display = new MusicDisplay();
        var notification = new MusicNotification();
        
        // Subscribe to events
        player.SongStarted += display.OnSongStarted;
        player.SongStarted += notification.OnSongStarted;
        player.SongEnded += display.OnSongEnded;
        
        // Play some songs
        player.PlaySong("Bohemian Rhapsody", "Queen");
        player.PlaySong("Hotel California", "Eagles");
    }
}

// Custom event example - Music Player
public class SongEventArgs : EventArgs
{
    public string SongTitle { get; }
    public string Artist { get; }
    public DateTime EventTime { get; }
    
    public SongEventArgs(string title, string artist)
    {
        SongTitle = title;
        Artist = artist;
        EventTime = DateTime.Now;
    }
}

public class MusicPlayer
{
    public event EventHandler<SongEventArgs> SongStarted;
    public event EventHandler<SongEventArgs> SongEnded;
    
    public void PlaySong(string title, string artist)
    {
        Console.WriteLine($"🎵 Playing: {title} by {artist}");
        
        // Raise SongStarted event
        OnSongStarted(new SongEventArgs(title, artist));
        
        // Simulate song playing
        System.Threading.Thread.Sleep(2000);
        
        // Raise SongEnded event
        OnSongEnded(new SongEventArgs(title, artist));
    }
    
    protected virtual void OnSongStarted(SongEventArgs e)
    {
        SongStarted?.Invoke(this, e);
    }
    
    protected virtual void OnSongEnded(SongEventArgs e)
    {
        SongEnded?.Invoke(this, e);
    }
}

public class MusicDisplay
{
    public void OnSongStarted(object sender, SongEventArgs e)
    {
        Console.WriteLine($"📺 Now Playing: {e.SongTitle} - {e.Artist}");
    }
    
    public void OnSongEnded(object sender, SongEventArgs e)
    {
        Console.WriteLine($"📺 Finished: {e.SongTitle}");
    }
}

public class MusicNotification
{
    public void OnSongStarted(object sender, SongEventArgs e)
    {
        Console.WriteLine($"🔔 Notification: Started playing {e.SongTitle}");
    }
}
```

## Relationship between Delegates and Events:

| Aspect | Delegate | Event |
|--------|----------|-------|
| **Definition** | Type-safe function pointer | Special form of multicast delegate |
| **Access** | Can be called directly from outside | Can only be raised from within the class |
| **Assignment** | Supports = operator | Only supports += and -= operators |
| **Security** | Less secure (external classes can invoke) | More secure (encapsulated) |
| **Purpose** | General callback mechanism | Notification mechanism |

```csharp
// Delegate vs Event comparison
public class DelegateVsEventDemo
{
    // Regular delegate
    public Action<string> MyDelegate;
    
    // Event based on delegate
    public event Action<string> MyEvent;
    
    public void DemonstrateRelationship()
    {
        // Delegate usage
        MyDelegate = msg => Console.WriteLine($"Delegate: {msg}");
        MyDelegate += msg => Console.WriteLine($"Delegate 2: {msg}");
        
        // Event usage
        MyEvent += msg => Console.WriteLine($"Event: {msg}");
        
        // Calling delegate directly (allowed)
        MyDelegate?.Invoke("Hello from delegate");
        
        // Calling event directly (NOT allowed from outside class)
        // MyEvent?.Invoke("Hello from event"); // Would cause compile error if called from outside
        
        // Proper way to raise event
        OnMyEvent("Hello from event");
    }
    
    protected virtual void OnMyEvent(string message)
    {
        MyEvent?.Invoke(message); // Can only be called from within the class
    }
}
```

**Key Points:**
1. **Events are built on delegates** - They use delegates internally
2. **Events provide encapsulation** - Only the class that declares the event can raise it
3. **Events follow conventions** - Usually named with verbs (Started, Changed, Completed)
4. **Event handlers follow pattern** - `EventHandler<T>` or custom delegate types
5. **Events support += and -= only** - Cannot be assigned directly with = operator

