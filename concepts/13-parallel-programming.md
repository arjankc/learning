# Parallel Programming

## Definition
Parallel programming involves executing multiple computations simultaneously to improve performance on multi-core processors.

## Task Parallel Library (TPL)

### Basic Task Usage
```csharp
using System.Threading.Tasks;

public class TaskExamples
{
    public static async Task BasicTaskExample()
    {
        // Creating and starting a task
        Task task1 = Task.Run(() =>
        {
            Console.WriteLine($"Task 1 running on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(2000);
            Console.WriteLine("Task 1 completed");
        });
        
        // Task with return value
        Task<int> task2 = Task.Run(() =>
        {
            Console.WriteLine($"Task 2 running on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(1000);
            return 42;
        });
        
        // Wait for tasks to complete
        await task1;
        int result = await task2;
        Console.WriteLine($"Task 2 result: {result}");
        
        // Alternative: Wait for all tasks
        await Task.WhenAll(task1, task2);
    }
    
    public static void TaskWithContinuation()
    {
        Task<string> downloadTask = Task.Run(() =>
        {
            Thread.Sleep(2000);
            return "Downloaded data";
        });
        
        // Continuation task
        Task processTask = downloadTask.ContinueWith(antecedent =>
        {
            string data = antecedent.Result;
            Console.WriteLine($"Processing: {data}");
        });
        
        processTask.Wait();
    }
}
```

### Parallel Loops
```csharp
public class ParallelLoopExamples
{
    public static void ParallelForExample()
    {
        // Sequential version
        Console.WriteLine("Sequential processing:");
        var stopwatch = Stopwatch.StartNew();
        for (int i = 0; i < 10; i++)
        {
            ProcessNumber(i);
        }
        stopwatch.Stop();
        Console.WriteLine($"Sequential time: {stopwatch.ElapsedMilliseconds}ms");
        
        // Parallel version
        Console.WriteLine("\nParallel processing:");
        stopwatch.Restart();
        Parallel.For(0, 10, i =>
        {
            ProcessNumber(i);
        });
        stopwatch.Stop();
        Console.WriteLine($"Parallel time: {stopwatch.ElapsedMilliseconds}ms");
    }
    
    public static void ParallelForEachExample()
    {
        var numbers = Enumerable.Range(1, 1000).ToList();
        var results = new ConcurrentBag<int>();
        
        Parallel.ForEach(numbers, number =>
        {
            int result = ExpensiveCalculation(number);
            results.Add(result);
        });
        
        Console.WriteLine($"Processed {results.Count} numbers");
    }
    
    private static void ProcessNumber(int number)
    {
        Thread.Sleep(100); // Simulate work
        Console.WriteLine($"Processed {number} on thread {Thread.CurrentThread.ManagedThreadId}");
    }
    
    private static int ExpensiveCalculation(int number)
    {
        // Simulate expensive calculation
        Thread.Sleep(10);
        return number * number;
    }
}
```

### PLINQ (Parallel LINQ)
```csharp
public class PLinqExamples
{
    public static void BasicPLinqExample()
    {
        var numbers = Enumerable.Range(1, 1000000).ToArray();
        
        // Sequential LINQ
        var sequentialStopwatch = Stopwatch.StartNew();
        var sequentialResult = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .Sum();
        sequentialStopwatch.Stop();
        
        // Parallel LINQ
        var parallelStopwatch = Stopwatch.StartNew();
        var parallelResult = numbers
            .AsParallel()
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .Sum();
        parallelStopwatch.Stop();
        
        Console.WriteLine($"Sequential result: {sequentialResult}, Time: {sequentialStopwatch.ElapsedMilliseconds}ms");
        Console.WriteLine($"Parallel result: {parallelResult}, Time: {parallelStopwatch.ElapsedMilliseconds}ms");
    }
    
    public static void PLinqWithOptions()
    {
        var data = Enumerable.Range(1, 1000).ToArray();
        
        var result = data
            .AsParallel()
            .WithDegreeOfParallelism(4) // Limit to 4 threads
            .WithExecutionMode(ParallelExecutionMode.ForceParallelism)
            .Where(n => ExpensiveFilter(n))
            .Select(n => ExpensiveTransform(n))
            .OrderBy(n => n) // This forces sequential execution
            .ToArray();
        
        Console.WriteLine($"Processed {result.Length} items");
    }
    
    private static bool ExpensiveFilter(int number)
    {
        Thread.Sleep(1); // Simulate work
        return number % 3 == 0;
    }
    
    private static int ExpensiveTransform(int number)
    {
        Thread.Sleep(1); // Simulate work
        return number * 2;
    }
}
```

## Thread-Safe Collections
```csharp
public class ThreadSafeCollectionsExample
{
    public static void ConcurrentCollectionsExample()
    {
        // ConcurrentBag - Thread-safe collection of objects
        var bag = new ConcurrentBag<int>();
        
        Parallel.For(0, 100, i =>
        {
            bag.Add(i);
        });
        
        Console.WriteLine($"Bag contains {bag.Count} items");
        
        // ConcurrentDictionary - Thread-safe dictionary
        var dictionary = new ConcurrentDictionary<string, int>();
        
        Parallel.For(0, 100, i =>
        {
            dictionary.TryAdd($"key{i}", i);
        });
        
        // Safe operations
        dictionary.AddOrUpdate("key1", 1, (key, oldValue) => oldValue + 1);
        int value = dictionary.GetOrAdd("newKey", 999);
        
        Console.WriteLine($"Dictionary contains {dictionary.Count} items");
        
        // ConcurrentQueue - Thread-safe FIFO collection
        var queue = new ConcurrentQueue<string>();
        
        Task producer = Task.Run(() =>
        {
            for (int i = 0; i < 10; i++)
            {
                queue.Enqueue($"Item {i}");
                Thread.Sleep(100);
            }
        });
        
        Task consumer = Task.Run(() =>
        {
            while (!producer.IsCompleted || !queue.IsEmpty)
            {
                if (queue.TryDequeue(out string item))
                {
                    Console.WriteLine($"Consumed: {item}");
                }
                Thread.Sleep(50);
            }
        });
        
        Task.WaitAll(producer, consumer);
    }
}
```

## Async/Await Pattern
```csharp
public class AsyncAwaitExamples
{
    public static async Task AsyncMethodExample()
    {
        Console.WriteLine("Starting async operations...");
        
        // Start multiple async operations
        Task<string> download1 = DownloadDataAsync("https://api1.example.com");
        Task<string> download2 = DownloadDataAsync("https://api2.example.com");
        Task<string> download3 = DownloadDataAsync("https://api3.example.com");
        
        // Wait for all to complete
        string[] results = await Task.WhenAll(download1, download2, download3);
        
        foreach (string result in results)
        {
            Console.WriteLine($"Downloaded: {result}");
        }
    }
    
    private static async Task<string> DownloadDataAsync(string url)
    {
        using (var client = new HttpClient())
        {
            // Simulate network delay
            await Task.Delay(Random.Shared.Next(1000, 3000));
            return $"Data from {url}";
        }
    }
    
    public static async Task CancellationExample()
    {
        using var cts = new CancellationTokenSource();
        
        // Cancel after 5 seconds
        cts.CancelAfter(TimeSpan.FromSeconds(5));
        
        try
        {
            await LongRunningOperationAsync(cts.Token);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Operation was cancelled");
        }
    }
    
    private static async Task LongRunningOperationAsync(CancellationToken cancellationToken)
    {
        for (int i = 0; i < 100; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            // Simulate work
            await Task.Delay(100, cancellationToken);
            Console.WriteLine($"Step {i + 1}/100");
        }
    }
}
```

## Synchronization Primitives
```csharp
public class SynchronizationExamples
{
    private static readonly object lockObject = new object();
    private static int sharedCounter = 0;
    
    public static void LockExample()
    {
        Task[] tasks = new Task[10];
        
        for (int i = 0; i < 10; i++)
        {
            tasks[i] = Task.Run(() =>
            {
                for (int j = 0; j < 1000; j++)
                {
                    lock (lockObject)
                    {
                        sharedCounter++;
                    }
                }
            });
        }
        
        Task.WaitAll(tasks);
        Console.WriteLine($"Final counter value: {sharedCounter}"); // Should be 10000
    }
    
    private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(3); // Allow 3 concurrent operations
    
    public static async Task SemaphoreExample()
    {
        Task[] tasks = new Task[10];
        
        for (int i = 0; i < 10; i++)
        {
            int taskId = i;
            tasks[i] = AccessResourceAsync(taskId);
        }
        
        await Task.WhenAll(tasks);
    }
    
    private static async Task AccessResourceAsync(int id)
    {
        await semaphore.WaitAsync();
        try
        {
            Console.WriteLine($"Task {id} accessing resource at {DateTime.Now:HH:mm:ss.fff}");
            await Task.Delay(2000); // Simulate work
            Console.WriteLine($"Task {id} finished at {DateTime.Now:HH:mm:ss.fff}");
        }
        finally
        {
            semaphore.Release();
        }
    }
}
```
