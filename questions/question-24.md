# Question 24: Write a program to create a thread along with main thread.

```csharp
using System;
using System.Threading;

public class ThreadDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Threading Demonstration ===\n");
        
        // Show main thread information
        ShowMainThreadInfo();
        
        // Basic thread creation
        BasicThreadCreation();
        
        // Thread with parameters
        ThreadWithParameters();
        
        // Multiple threads
        MultipleThreadsDemo();
        
        // Thread synchronization
        ThreadSynchronizationDemo();
        
        // Background vs Foreground threads
        BackgroundThreadDemo();
        
        Console.WriteLine("\n=== Main thread ending ===");
    }
    
    public static void ShowMainThreadInfo()
    {
        Thread mainThread = Thread.CurrentThread;
        Console.WriteLine("MAIN THREAD INFORMATION:");
        Console.WriteLine($"Thread ID: {mainThread.ManagedThreadId}");
        Console.WriteLine($"Thread Name: {mainThread.Name ?? "Not Set"}");
        Console.WriteLine($"Is Background: {mainThread.IsBackground}");
        Console.WriteLine($"Thread State: {mainThread.ThreadState}");
        Console.WriteLine($"Priority: {mainThread.Priority}");
        Console.WriteLine();
        
        // Set main thread name
        mainThread.Name = "MainThread";
    }
    
    public static void BasicThreadCreation()
    {
        Console.WriteLine("1. BASIC THREAD CREATION:");
        
        // Create and start a new thread
        Thread workerThread = new Thread(WorkerMethod);
        workerThread.Name = "WorkerThread1";
        
        Console.WriteLine($"Main thread: Creating worker thread...");
        workerThread.Start();
        
        // Main thread continues its work
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"Main thread: Working step {i + 1}");
            Thread.Sleep(500); // Sleep for 500ms
        }
        
        // Wait for worker thread to complete
        workerThread.Join();
        Console.WriteLine("Main thread: Worker thread completed\n");
    }
    
    public static void WorkerMethod()
    {
        Thread currentThread = Thread.CurrentThread;
        Console.WriteLine($"Worker thread started - ID: {currentThread.ManagedThreadId}, Name: {currentThread.Name}");
        
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"  Worker thread: Task {i + 1} executing...");
            Thread.Sleep(700); // Simulate work
        }
        
        Console.WriteLine("Worker thread finished");
    }
    
    public static void ThreadWithParameters()
    {
        Console.WriteLine("2. THREAD WITH PARAMETERS:");
        
        // Using ParameterizedThreadStart
        Thread paramThread = new Thread(ParameterizedWorker);
        paramThread.Name = "ParameterThread";
        
        // Pass parameter to thread
        string message = "Hello from parameterized thread!";
        paramThread.Start(message);
        
        // Using lambda expression with captured variables
        int count = 3;
        string prefix = "Lambda";
        
        Thread lambdaThread = new Thread(() => LambdaWorker(count, prefix));
        lambdaThread.Name = "LambdaThread";
        lambdaThread.Start();
        
        // Wait for both threads
        paramThread.Join();
        lambdaThread.Join();
        
        Console.WriteLine();
    }
    
    public static void ParameterizedWorker(object parameter)
    {
        string message = parameter as string;
        Thread currentThread = Thread.CurrentThread;
        
        Console.WriteLine($"Parameterized worker started - Thread: {currentThread.Name}");
        Console.WriteLine($"Received parameter: {message}");
        
        for (int i = 0; i < 3; i++)
        {
            Console.WriteLine($"  {currentThread.Name}: Processing {i + 1}");
            Thread.Sleep(400);
        }
    }
    
    public static void LambdaWorker(int count, string prefix)
    {
        Thread currentThread = Thread.CurrentThread;
        Console.WriteLine($"Lambda worker started - Thread: {currentThread.Name}");
        
        for (int i = 0; i < count; i++)
        {
            Console.WriteLine($"  {prefix} thread: Item {i + 1}");
            Thread.Sleep(300);
        }
    }
    
    public static void MultipleThreadsDemo()
    {
        Console.WriteLine("3. MULTIPLE THREADS:");
        
        // Create array of threads
        Thread[] threads = new Thread[3];
        
        for (int i = 0; i < threads.Length; i++)
        {
            int threadNumber = i + 1; // Capture loop variable
            threads[i] = new Thread(() => MultiWorker(threadNumber));
            threads[i].Name = $"MultiThread{threadNumber}";
            threads[i].Start();
        }
        
        Console.WriteLine("Main thread: All worker threads started");
        
        // Wait for all threads to complete
        foreach (Thread thread in threads)
        {
            thread.Join();
        }
        
        Console.WriteLine("Main thread: All worker threads completed\n");
    }
    
    public static void MultiWorker(int threadNumber)
    {
        Thread currentThread = Thread.CurrentThread;
        
        for (int i = 0; i < 4; i++)
        {
            Console.WriteLine($"  Thread {threadNumber}: Step {i + 1} (ID: {currentThread.ManagedThreadId})");
            Thread.Sleep(200 * threadNumber); // Different sleep times
        }
    }
    
    // Shared resource for synchronization demo
    private static int sharedCounter = 0;
    private static readonly object lockObject = new object();
    
    public static void ThreadSynchronizationDemo()
    {
        Console.WriteLine("4. THREAD SYNCHRONIZATION:");
        
        sharedCounter = 0;
        
        // Create threads that access shared resource
        Thread[] syncThreads = new Thread[3];
        
        for (int i = 0; i < syncThreads.Length; i++)
        {
            int threadId = i + 1;
            syncThreads[i] = new Thread(() => SynchronizedWorker(threadId));
            syncThreads[i].Name = $"SyncThread{threadId}";
            syncThreads[i].Start();
        }
        
        // Wait for all threads
        foreach (Thread thread in syncThreads)
        {
            thread.Join();
        }
        
        Console.WriteLine($"Final shared counter value: {sharedCounter}");
        Console.WriteLine();
    }
    
    public static void SynchronizedWorker(int threadId)
    {
        for (int i = 0; i < 5; i++)
        {
            // Synchronize access to shared resource
            lock (lockObject)
            {
                int currentValue = sharedCounter;
                Console.WriteLine($"  Thread {threadId}: Reading counter = {currentValue}");
                
                // Simulate some processing time
                Thread.Sleep(10);
                
                sharedCounter = currentValue + 1;
                Console.WriteLine($"  Thread {threadId}: Updated counter = {sharedCounter}");
            }
            
            // Do some work outside the lock
            Thread.Sleep(50);
        }
    }
    
    public static void BackgroundThreadDemo()
    {
        Console.WriteLine("5. BACKGROUND vs FOREGROUND THREADS:");
        
        // Foreground thread (default)
        Thread foregroundThread = new Thread(LongRunningTask);
        foregroundThread.Name = "ForegroundThread";
        foregroundThread.IsBackground = false;
        
        // Background thread
        Thread backgroundThread = new Thread(LongRunningTask);
        backgroundThread.Name = "BackgroundThread";
        backgroundThread.IsBackground = true;
        
        Console.WriteLine("Starting foreground and background threads...");
        
        foregroundThread.Start();
        backgroundThread.Start();
        
        // Wait for foreground thread only
        // Background thread will be terminated when main thread ends
        foregroundThread.Join();
        
        Console.WriteLine("Foreground thread completed");
    }
    
    public static void LongRunningTask()
    {
        Thread currentThread = Thread.CurrentThread;
        
        for (int i = 0; i < 10; i++)
        {
            Console.WriteLine($"  {currentThread.Name}: Long task step {i + 1}");
            Thread.Sleep(200);
            
            // Check if thread should abort
            if (currentThread.IsBackground && i > 5)
            {
                Console.WriteLine($"  {currentThread.Name}: Background thread may be terminated soon");
            }
        }
        
        Console.WriteLine($"  {currentThread.Name}: Long task completed");
    }
}

// Advanced threading examples
public class AdvancedThreadingDemo
{
    private static AutoResetEvent autoEvent = new AutoResetEvent(false);
    private static ManualResetEvent manualEvent = new ManualResetEvent(false);
    
    public static void WaitHandleDemo()
    {
        Console.WriteLine("\n6. WAIT HANDLES DEMONSTRATION:");
        
        // AutoResetEvent example
        Thread autoResetThread = new Thread(AutoResetWorker);
        autoResetThread.Name = "AutoResetThread";
        autoResetThread.Start();
        
        Thread.Sleep(1000);
        Console.WriteLine("Main: Signaling AutoResetEvent");
        autoEvent.Set(); // Signal the waiting thread
        
        autoResetThread.Join();
        
        // ManualResetEvent example
        Thread[] manualResetThreads = new Thread[3];
        
        for (int i = 0; i < manualResetThreads.Length; i++)
        {
            int threadNum = i + 1;
            manualResetThreads[i] = new Thread(() => ManualResetWorker(threadNum));
            manualResetThreads[i].Name = $"ManualResetThread{threadNum}";
            manualResetThreads[i].Start();
        }
        
        Thread.Sleep(1000);
        Console.WriteLine("Main: Signaling ManualResetEvent (all threads will proceed)");
        manualEvent.Set(); // Signal all waiting threads
        
        foreach (Thread thread in manualResetThreads)
        {
            thread.Join();
        }
        
        Console.WriteLine();
    }
    
    public static void AutoResetWorker()
    {
        Console.WriteLine("AutoReset worker: Waiting for signal...");
        autoEvent.WaitOne(); // Wait for signal
        Console.WriteLine("AutoReset worker: Received signal, continuing work");
        
        Thread.Sleep(500);
        Console.WriteLine("AutoReset worker: Work completed");
    }
    
    public static void ManualResetWorker(int threadNumber)
    {
        Console.WriteLine($"ManualReset worker {threadNumber}: Waiting for signal...");
        manualEvent.WaitOne(); // Wait for signal
        Console.WriteLine($"ManualReset worker {threadNumber}: Received signal, doing work");
        
        Thread.Sleep(300 * threadNumber);
        Console.WriteLine($"ManualReset worker {threadNumber}: Work completed");
    }
}

// Producer-Consumer pattern example
public class ProducerConsumerDemo
{
    private static Queue<int> queue = new Queue<int>();
    private static readonly object queueLock = new object();
    private static bool stopProducing = false;
    
    public static void RunDemo()
    {
        Console.WriteLine("\n7. PRODUCER-CONSUMER PATTERN:");
        
        // Create producer thread
        Thread producer = new Thread(Producer);
        producer.Name = "Producer";
        producer.Start();
        
        // Create consumer threads
        Thread consumer1 = new Thread(Consumer);
        Thread consumer2 = new Thread(Consumer);
        consumer1.Name = "Consumer1";
        consumer2.Name = "Consumer2";
        
        consumer1.Start();
        consumer2.Start();
        
        // Let them run for a while
        Thread.Sleep(3000);
        
        // Signal to stop producing
        stopProducing = true;
        
        // Wait for all threads
        producer.Join();
        consumer1.Join();
        consumer2.Join();
        
        Console.WriteLine("Producer-Consumer demo completed\n");
    }
    
    public static void Producer()
    {
        int item = 1;
        
        while (!stopProducing)
        {
            lock (queueLock)
            {
                queue.Enqueue(item);
                Console.WriteLine($"Producer: Produced item {item}");
                item++;
            }
            
            Thread.Sleep(100); // Produce every 100ms
        }
        
        Console.WriteLine("Producer: Stopped producing");
    }
    
    public static void Consumer()
    {
        Thread currentThread = Thread.CurrentThread;
        
        while (!stopProducing || queue.Count > 0)
        {
            int item = -1;
            bool hasItem = false;
            
            lock (queueLock)
            {
                if (queue.Count > 0)
                {
                    item = queue.Dequeue();
                    hasItem = true;
                }
            }
            
            if (hasItem)
            {
                Console.WriteLine($"{currentThread.Name}: Consumed item {item}");
                Thread.Sleep(150); // Simulate processing time
            }
            else
            {
                Thread.Sleep(50); // Wait a bit before checking again
            }
        }
        
        Console.WriteLine($"{currentThread.Name}: Stopped consuming");
    }
}
```

## Key Threading Concepts:

| Concept | Description | Example Usage |
|---------|-------------|---------------|
| **Thread Creation** | `new Thread(method)` | Basic thread creation |
| **Thread.Start()** | Begin thread execution | Start the thread |
| **Thread.Join()** | Wait for thread completion | Synchronize threads |
| **Thread.Sleep()** | Pause thread execution | Delay operations |
| **Lock statement** | Synchronize access | Protect shared resources |
| **Background threads** | Die with main thread | Service operations |

## Thread States:
- **Unstarted**: Created but not started
- **Running**: Currently executing
- **WaitSleepJoin**: Waiting or sleeping
- **Stopped**: Execution completed
- **Aborted**: Thread was aborted

## Best Practices:
1. **Use `Thread.Join()`** to wait for thread completion
2. **Synchronize access** to shared resources with `lock`
3. **Set meaningful thread names** for debugging
4. **Handle exceptions** within thread methods
5. **Consider using `Task`** instead of `Thread` for newer applications
6. **Use background threads** for cleanup operations

