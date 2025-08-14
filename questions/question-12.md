# Question 12: What is TPL? And write a program to create multiple threads along with main thread.

## TPL (Task Parallel Library):
TPL is a set of public types and APIs in the System.Threading and System.Threading.Tasks namespaces that simplifies the process of adding parallelism and concurrency to applications.

**Benefits of TPL:**
- Simplified thread management
- Automatic work distribution
- Better performance on multi-core systems
- Built-in cancellation support
- Exception handling across threads

## Complete Program Example:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class TPLDemo
{
    public static void Main()
    {
        Console.WriteLine($"Main thread ID: {Thread.CurrentThread.ManagedThreadId}");
        Console.WriteLine("=== TPL (Task Parallel Library) Demo ===\n");
        
        // 1. Basic Task creation
        BasicTaskExample();
        
        // 2. Multiple tasks
        MultipleTasksExample();
        
        // 3. Task with return values
        TaskWithReturnValueExample();
        
        // 4. Parallel loops
        ParallelLoopsExample();
        
        // 5. Task continuation
        TaskContinuationExample();
        
        Console.WriteLine($"\nMain thread {Thread.CurrentThread.ManagedThreadId} completed.");
    }
    
    public static void BasicTaskExample()
    {
        Console.WriteLine("1. Basic Task Example:");
        
        // Create and start a task
        Task task1 = Task.Run(() =>
        {
            Console.WriteLine($"Task 1 running on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(2000);
            Console.WriteLine("Task 1 completed");
        });
        
        // Wait for task to complete
        task1.Wait();
        Console.WriteLine("Basic task example finished\n");
    }
    
    public static void MultipleTasksExample()
    {
        Console.WriteLine("2. Multiple Tasks Example:");
        
        // Create multiple tasks
        Task[] tasks = new Task[5];
        
        for (int i = 0; i < 5; i++)
        {
            int taskId = i + 1; // Capture loop variable
            tasks[i] = Task.Run(() =>
            {
                Console.WriteLine($"Task {taskId} started on thread {Thread.CurrentThread.ManagedThreadId}");
                Thread.Sleep(1000 * taskId); // Different sleep times
                Console.WriteLine($"Task {taskId} completed");
            });
        }
        
        // Wait for all tasks to complete
        Task.WaitAll(tasks);
        Console.WriteLine("All tasks completed\n");
    }
    
    public static void TaskWithReturnValueExample()
    {
        Console.WriteLine("3. Task with Return Values:");
        
        // Tasks that return values
        Task<int>[] calculationTasks = new Task<int>[3];
        
        calculationTasks[0] = Task.Run(() =>
        {
            Console.WriteLine($"Calculating factorial on thread {Thread.CurrentThread.ManagedThreadId}");
            return CalculateFactorial(5);
        });
        
        calculationTasks[1] = Task.Run(() =>
        {
            Console.WriteLine($"Calculating sum on thread {Thread.CurrentThread.ManagedThreadId}");
            return CalculateSum(1, 100);
        });
        
        calculationTasks[2] = Task.Run(() =>
        {
            Console.WriteLine($"Calculating power on thread {Thread.CurrentThread.ManagedThreadId}");
            return CalculatePower(2, 10);
        });
        
        // Wait for all tasks and get results
        Task.WaitAll(calculationTasks);
        
        Console.WriteLine($"Factorial result: {calculationTasks[0].Result}");
        Console.WriteLine($"Sum result: {calculationTasks[1].Result}");
        Console.WriteLine($"Power result: {calculationTasks[2].Result}\n");
    }
    
    public static void ParallelLoopsExample()
    {
        Console.WriteLine("4. Parallel Loops Example:");
        
        // Parallel.For example
        Console.WriteLine("Parallel.For processing:");
        Parallel.For(1, 6, i =>
        {
            Console.WriteLine($"Processing item {i} on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(500);
        });
        
        // Parallel.ForEach example
        Console.WriteLine("\nParallel.ForEach processing:");
        string[] data = { "File1.txt", "File2.txt", "File3.txt", "File4.txt" };
        
        Parallel.ForEach(data, file =>
        {
            Console.WriteLine($"Processing {file} on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(800);
            Console.WriteLine($"Completed {file}");
        });
        
        Console.WriteLine("Parallel loops completed\n");
    }
    
    public static void TaskContinuationExample()
    {
        Console.WriteLine("5. Task Continuation Example:");
        
        Task<string> downloadTask = Task.Run(() =>
        {
            Console.WriteLine($"Downloading data on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(2000);
            return "Downloaded data content";
        });
        
        Task processTask = downloadTask.ContinueWith(antecedent =>
        {
            Console.WriteLine($"Processing data on thread {Thread.CurrentThread.ManagedThreadId}");
            string data = antecedent.Result;
            Console.WriteLine($"Processing: {data}");
            Thread.Sleep(1000);
            Console.WriteLine("Data processing completed");
        });
        
        // Wait for the continuation task
        processTask.Wait();
        Console.WriteLine("Task continuation example completed\n");
    }
    
    // Helper methods for calculations
    public static int CalculateFactorial(int n)
    {
        Thread.Sleep(1000); // Simulate work
        if (n <= 1) return 1;
        return n * CalculateFactorial(n - 1);
    }
    
    public static int CalculateSum(int start, int end)
    {
        Thread.Sleep(1000); // Simulate work
        int sum = 0;
        for (int i = start; i <= end; i++)
        {
            sum += i;
        }
        return sum;
    }
    
    public static int CalculatePower(int baseNum, int exponent)
    {
        Thread.Sleep(1000); // Simulate work
        return (int)Math.Pow(baseNum, exponent);
    }
}

// Advanced TPL example with cancellation
public class AdvancedTPLDemo
{
    public static void CancellationExample()
    {
        Console.WriteLine("=== Cancellation Example ===");
        
        CancellationTokenSource cts = new CancellationTokenSource();
        
        // Start a long-running task
        Task longRunningTask = Task.Run(() =>
        {
            for (int i = 1; i <= 10; i++)
            {
                // Check for cancellation
                cts.Token.ThrowIfCancellationRequested();
                
                Console.WriteLine($"Working... Step {i}/10 on thread {Thread.CurrentThread.ManagedThreadId}");
                Thread.Sleep(1000);
            }
        }, cts.Token);
        
        // Cancel after 3 seconds
        cts.CancelAfter(3000);
        
        try
        {
            longRunningTask.Wait();
            Console.WriteLine("Task completed successfully");
        }
        catch (AggregateException ex)
        {
            if (ex.InnerException is OperationCanceledException)
            {
                Console.WriteLine("Task was cancelled");
            }
        }
    }
    
    public static void ExceptionHandlingExample()
    {
        Console.WriteLine("=== Exception Handling Example ===");
        
        Task[] tasks = new Task[3];
        
        tasks[0] = Task.Run(() =>
        {
            Console.WriteLine("Task 1: Running normally");
            Thread.Sleep(1000);
        });
        
        tasks[1] = Task.Run(() =>
        {
            Console.WriteLine("Task 2: About to throw exception");
            throw new InvalidOperationException("Something went wrong in Task 2");
        });
        
        tasks[2] = Task.Run(() =>
        {
            Console.WriteLine("Task 3: Running normally");
            Thread.Sleep(1500);
        });
        
        try
        {
            Task.WaitAll(tasks);
        }
        catch (AggregateException ex)
        {
            Console.WriteLine($"Caught {ex.InnerExceptions.Count} exceptions:");
            foreach (var innerEx in ex.InnerExceptions)
            {
                Console.WriteLine($"- {innerEx.Message}");
            }
        }
    }
}
```

}
```

