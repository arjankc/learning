# Question 20: Explain Garbage collection.

## What is Garbage Collection?

**Garbage Collection (GC)** in C# is an automatic memory management feature that automatically frees memory occupied by objects that are no longer reachable or referenced by the application. It's handled by the .NET runtime's Garbage Collector.

## How Garbage Collection Works:

```csharp
using System;
using System.Collections.Generic;

public class GarbageCollectionDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Garbage Collection Demonstration ===\n");
        
        // Show initial memory state
        ShowMemoryInfo("Initial state");
        
        // Create objects that will become eligible for GC
        CreateObjectsForGC();
        
        // Force garbage collection
        Console.WriteLine("Forcing garbage collection...");
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        
        ShowMemoryInfo("After forced GC");
        
        // Demonstrate different generations
        DemonstrateGenerations();
        
        // Demonstrate finalizers
        DemonstrateFinalization();
        
        // Demonstrate weak references
        DemonstrateWeakReferences();
    }
    
    public static void CreateObjectsForGC()
    {
        Console.WriteLine("Creating objects that will become garbage...");
        
        // Create many objects in local scope
        for (int i = 0; i < 100000; i++)
        {
            var tempObject = new TempClass($"Object {i}");
            var tempList = new List<int> { 1, 2, 3, 4, 5 };
            var tempString = $"Temporary string {i}";
        }
        // Objects go out of scope here and become eligible for GC
        
        ShowMemoryInfo("After creating temporary objects");
    }
    
    public static void ShowMemoryInfo(string label)
    {
        long memoryBefore = GC.GetTotalMemory(false);
        
        Console.WriteLine($"\n--- {label} ---");
        Console.WriteLine($"Total Memory: {memoryBefore:N0} bytes");
        Console.WriteLine($"Gen 0 Collections: {GC.CollectionCount(0)}");
        Console.WriteLine($"Gen 1 Collections: {GC.CollectionCount(1)}");
        Console.WriteLine($"Gen 2 Collections: {GC.CollectionCount(2)}");
        Console.WriteLine($"Max Generation: {GC.MaxGeneration}");
    }
    
    public static void DemonstrateGenerations()
    {
        Console.WriteLine("\n=== Generation Demonstration ===");
        
        // Create objects of different lifespans
        var shortLived = new TempClass("Short-lived");
        var mediumLived = new TempClass("Medium-lived");
        var longLived = new TempClass("Long-lived");
        
        // Check generations
        Console.WriteLine($"Short-lived generation: {GC.GetGeneration(shortLived)}");
        Console.WriteLine($"Medium-lived generation: {GC.GetGeneration(mediumLived)}");
        Console.WriteLine($"Long-lived generation: {GC.GetGeneration(longLived)}");
        
        // Create pressure to trigger Gen 0 collection
        for (int i = 0; i < 10000; i++)
        {
            var temp = new TempClass($"Pressure {i}");
        }
        
        Console.WriteLine($"\nAfter memory pressure:");
        Console.WriteLine($"Medium-lived generation: {GC.GetGeneration(mediumLived)}");
        Console.WriteLine($"Long-lived generation: {GC.GetGeneration(longLived)}");
        
        // Keep references to prevent collection
        GC.KeepAlive(mediumLived);
        GC.KeepAlive(longLived);
    }
    
    public static void DemonstrateFinalization()
    {
        Console.WriteLine("\n=== Finalization Demonstration ===");
        
        // Create objects with finalizers
        for (int i = 0; i < 5; i++)
        {
            var finalizableObject = new FinalizableClass(i);
        }
        
        Console.WriteLine("Objects with finalizers created");
        
        // Force collection and finalization
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        
        Console.WriteLine("Finalization completed");
    }
    
    public static void DemonstrateWeakReferences()
    {
        Console.WriteLine("\n=== Weak References Demonstration ===");
        
        // Create object and weak reference
        var strongRef = new TempClass("Strong Reference");
        var weakRef = new WeakReference(strongRef);
        
        Console.WriteLine($"Strong ref alive: {strongRef != null}");
        Console.WriteLine($"Weak ref alive: {weakRef.IsAlive}");
        Console.WriteLine($"Weak ref target: {weakRef.Target}");
        
        // Remove strong reference
        strongRef = null;
        
        Console.WriteLine("\nAfter removing strong reference:");
        Console.WriteLine($"Weak ref alive (before GC): {weakRef.IsAlive}");
        
        // Force garbage collection
        GC.Collect();
        GC.WaitForPendingFinalizers();
        
        Console.WriteLine($"Weak ref alive (after GC): {weakRef.IsAlive}");
        Console.WriteLine($"Weak ref target: {weakRef.Target}");
    }
}

// Example class for GC demonstration
public class TempClass
{
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    private byte[] data; // Some data to make object larger
    
    public TempClass(string name)
    {
        Name = name;
        CreatedAt = DateTime.Now;
        data = new byte[1024]; // 1KB of data
    }
    
    public override string ToString()
    {
        return $"TempClass: {Name} (Created: {CreatedAt:HH:mm:ss})";
    }
}

// Class with finalizer (destructor)
public class FinalizableClass : IDisposable
{
    private int id;
    private bool disposed = false;
    
    public FinalizableClass(int id)
    {
        this.id = id;
        Console.WriteLine($"FinalizableClass {id} created");
    }
    
    // Finalizer (destructor) - called by GC
    ~FinalizableClass()
    {
        Console.WriteLine($"FinalizableClass {id} finalized");
        Dispose(false);
    }
    
    // IDisposable implementation
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // Don't call finalizer if disposed manually
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
                Console.WriteLine($"FinalizableClass {id} disposing managed resources");
            }
            
            // Dispose unmanaged resources
            Console.WriteLine($"FinalizableClass {id} disposing unmanaged resources");
            disposed = true;
        }
    }
}

// Advanced GC concepts demonstration
public class AdvancedGCDemo
{
    private static List<object> keepAlive = new List<object>();
    
    public static void DemonstrateGCPressure()
    {
        Console.WriteLine("\n=== GC Pressure Demonstration ===");
        
        // Create memory pressure
        for (int i = 0; i < 1000; i++)
        {
            var largeObject = new byte[85000]; // Large Object Heap (LOH)
            if (i % 100 == 0)
            {
                keepAlive.Add(largeObject); // Keep some alive
            }
        }
        
        ShowMemoryInfo("After creating large objects");
        
        // Clear references
        keepAlive.Clear();
        
        GC.Collect();
        GC.WaitForPendingFinalizers();
        
        ShowMemoryInfo("After clearing references and GC");
    }
    
    public static void DemonstrateGCNotifications()
    {
        Console.WriteLine("\n=== GC Notifications ===");
        
        // Register for GC notifications
        GC.RegisterForFullGCNotification(10, 10);
        
        // Create memory pressure to trigger GC
        for (int i = 0; i < 50000; i++)
        {
            var temp = new byte[1024];
        }
        
        // Check for GC notification
        var status = GC.WaitForFullGCApproach(1000);
        if (status == GCNotificationStatus.Succeeded)
        {
            Console.WriteLine("Full GC is approaching");
        }
    }
    
    private static void ShowMemoryInfo(string label)
    {
        Console.WriteLine($"\n{label}:");
        Console.WriteLine($"Total Memory: {GC.GetTotalMemory(false):N0} bytes");
        Console.WriteLine($"Collections - Gen0: {GC.CollectionCount(0)}, Gen1: {GC.CollectionCount(1)}, Gen2: {GC.CollectionCount(2)}");
    }
}

// Resource management best practices
public class ProperResourceManagement : IDisposable
{
    private System.IO.FileStream fileStream;
    private bool disposed = false;
    
    public ProperResourceManagement(string filename)
    {
        fileStream = new System.IO.FileStream(filename, System.IO.FileMode.Create);
    }
    
    public void WriteData(string data)
    {
        if (disposed) throw new ObjectDisposedException(nameof(ProperResourceManagement));
        
        byte[] bytes = System.Text.Encoding.UTF8.GetBytes(data);
        fileStream.Write(bytes, 0, bytes.Length);
    }
    
    // Proper dispose pattern
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
                fileStream?.Dispose();
            }
            
            disposed = true;
        }
    }
    
    // Finalizer as safety net
    ~ProperResourceManagement()
    {
        Dispose(false);
    }
}
```

## Garbage Collection Process:

| Phase | Description | Action |
|-------|-------------|--------|
| **Mark** | Identify reachable objects | GC walks object graph from roots |
| **Sweep** | Free unreachable objects | Deallocate memory of unmarked objects |
| **Compact** | Defragment heap | Move objects to eliminate fragmentation |

## Generation-Based Collection:

```csharp
public class GenerationDemo
{
    public static void ExplainGenerations()
    {
        Console.WriteLine("=== Generation-Based Collection ===");
        
        /*
         * Generation 0: New objects, collected frequently
         * Generation 1: Objects that survived one GC, collected less frequently  
         * Generation 2: Long-lived objects, collected rarely
         * Large Object Heap (LOH): Objects >= 85KB, collected with Gen 2
         */
        
        // Gen 0 objects (short-lived)
        for (int i = 0; i < 1000; i++)
        {
            var temp = new StringBuilder($"Temp {i}");
            // These become eligible for collection immediately
        }
        
        // Gen 1/2 objects (longer-lived)
        var persistent = new List<string>();
        for (int i = 0; i < 100; i++)
        {
            persistent.Add($"Persistent {i}");
        }
        
        Console.WriteLine($"List generation: {GC.GetGeneration(persistent)}");
        
        // Trigger collections to promote objects
        GC.Collect(0); // Collect Gen 0 only
        GC.Collect(1); // Collect Gen 0 and 1
        GC.Collect(2); // Full collection (all generations)
        
        Console.WriteLine($"List generation after GC: {GC.GetGeneration(persistent)}");
    }
}
```

## Key Points about Garbage Collection:

1. **Automatic**: No manual memory deallocation needed
2. **Generational**: Different generations collected at different frequencies
3. **Mark and Sweep**: Identifies and frees unreachable objects
4. **Compacting**: Reduces heap fragmentation
5. **Concurrent**: Can run concurrently with application (in some modes)
6. **Tunable**: Various GC modes available (Workstation, Server, Concurrent, etc.)

## Best Practices:
- **Implement IDisposable** for resources that need deterministic cleanup
- **Use `using` statements** for automatic disposal
- **Avoid unnecessary object creation** in tight loops
- **Be careful with event handlers** - they can prevent garbage collection
- **Use weak references** when appropriate to avoid memory leaks
- **Don't call GC.Collect() manually** unless absolutely necessary

