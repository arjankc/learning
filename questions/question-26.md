# Question 26: What is the use of using block in C#?

## What is the Using Block?

The **using block** in C# provides a convenient syntax to ensure that resources are properly disposed of when they go out of scope. It automatically calls the `Dispose()` method on objects that implement the `IDisposable` interface.

```csharp
using System;
using System.IO;
using System.Data.SqlClient;

public class UsingBlockDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Using Block Demonstration ===\n");
        
        // File operations with using block
        FileOperationsDemo();
        
        // Database operations with using block
        DatabaseOperationsDemo();
        
        // Multiple resources in using block
        MultipleResourcesDemo();
        
        // Custom disposable resources
        CustomDisposableDemo();
        
        // Nested using blocks
        NestedUsingDemo();
        
        // Using block vs manual disposal
        ComparisonDemo();
    }
    
    public static void FileOperationsDemo()
    {
        Console.WriteLine("1. FILE OPERATIONS WITH USING BLOCK:");
        
        string fileName = "using_demo.txt";
        
        // WRITING to file with using block
        using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
        using (StreamWriter writer = new StreamWriter(fileStream))
        {
            writer.WriteLine("This file was created using 'using' block");
            writer.WriteLine($"Created at: {DateTime.Now}");
            writer.WriteLine("The file stream will be automatically disposed");
            
            Console.WriteLine("✓ File written successfully");
            // FileStream and StreamWriter automatically disposed here
        }
        
        // READING from file with using block
        using (FileStream fileStream = new FileStream(fileName, FileMode.Open))
        using (StreamReader reader = new StreamReader(fileStream))
        {
            Console.WriteLine("File contents:");
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine($"  {line}");
            }
            // FileStream and StreamReader automatically disposed here
        }
        
        // Cleanup
        if (File.Exists(fileName))
            File.Delete(fileName);
        
        Console.WriteLine();
    }
    
    public static void DatabaseOperationsDemo()
    {
        Console.WriteLine("2. DATABASE OPERATIONS WITH USING BLOCK:");
        
        // Note: This example shows the pattern, actual connection string would be needed
        string connectionString = "Server=localhost;Database=TestDB;Integrated Security=true;";
        
        try
        {
            // Database connection with using block
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                Console.WriteLine("✓ Database connection opened");
                
                using (SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM Users", connection))
                {
                    // Simulate database operation
                    Console.WriteLine("✓ Executing SQL command");
                    
                    // In real scenario, you would execute the command
                    // object result = command.ExecuteScalar();
                    
                    Console.WriteLine("✓ Command executed successfully");
                    // SqlCommand automatically disposed here
                }
                
                Console.WriteLine("✓ Database operations completed");
                // SqlConnection automatically disposed here (connection closed)
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Database error: {ex.Message}");
        }
        
        Console.WriteLine();
    }
    
    public static void MultipleResourcesDemo()
    {
        Console.WriteLine("3. MULTIPLE RESOURCES WITH USING BLOCK:");
        
        string sourceFile = "source.txt";
        string targetFile = "target.txt";
        
        try
        {
            // Create source file
            File.WriteAllText(sourceFile, "This content will be copied to another file.");
            
            // Multiple using statements for file copying
            using (FileStream source = new FileStream(sourceFile, FileMode.Open))
            using (FileStream target = new FileStream(targetFile, FileMode.Create))
            using (StreamReader reader = new StreamReader(source))
            using (StreamWriter writer = new StreamWriter(target))
            {
                string content = reader.ReadToEnd();
                writer.Write(content);
                
                Console.WriteLine("✓ File copied successfully using multiple using statements");
                // All four resources automatically disposed here
            }
            
            // Verify copy
            string copiedContent = File.ReadAllText(targetFile);
            Console.WriteLine($"Copied content: {copiedContent}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"File operation error: {ex.Message}");
        }
        finally
        {
            // Cleanup
            if (File.Exists(sourceFile)) File.Delete(sourceFile);
            if (File.Exists(targetFile)) File.Delete(targetFile);
        }
        
        Console.WriteLine();
    }
    
    public static void CustomDisposableDemo()
    {
        Console.WriteLine("4. CUSTOM DISPOSABLE RESOURCES:");
        
        // Using custom disposable class
        using (var resource = new CustomResource("ResourceA"))
        {
            resource.DoWork();
            resource.ProcessData("Important data");
            
            Console.WriteLine("✓ Custom resource work completed");
            // CustomResource.Dispose() automatically called here
        }
        
        // Nested using with custom resources
        using (var resource1 = new CustomResource("Resource1"))
        using (var resource2 = new CustomResource("Resource2"))
        {
            resource1.DoWork();
            resource2.DoWork();
            
            Console.WriteLine("✓ Multiple custom resources used");
            // Both resources automatically disposed in reverse order
        }
        
        Console.WriteLine();
    }
    
    public static void NestedUsingDemo()
    {
        Console.WriteLine("5. NESTED USING BLOCKS:");
        
        string outerFile = "outer.txt";
        string innerFile = "inner.txt";
        
        try
        {
            using (var outerStream = new FileStream(outerFile, FileMode.Create))
            using (var outerWriter = new StreamWriter(outerStream))
            {
                outerWriter.WriteLine("Outer file content");
                
                using (var innerStream = new FileStream(innerFile, FileMode.Create))
                using (var innerWriter = new StreamWriter(innerStream))
                {
                    innerWriter.WriteLine("Inner file content");
                    
                    Console.WriteLine("✓ Both files written in nested using blocks");
                    
                    // Inner resources disposed first, then outer resources
                }
                
                outerWriter.WriteLine("Back to outer file");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in nested operations: {ex.Message}");
        }
        finally
        {
            if (File.Exists(outerFile)) File.Delete(outerFile);
            if (File.Exists(innerFile)) File.Delete(innerFile);
        }
        
        Console.WriteLine();
    }
    
    public static void ComparisonDemo()
    {
        Console.WriteLine("6. USING BLOCK vs MANUAL DISPOSAL:");
        
        // WITHOUT using block (manual disposal)
        Console.WriteLine("Manual disposal approach:");
        FileStream manualStream = null;
        StreamWriter manualWriter = null;
        
        try
        {
            manualStream = new FileStream("manual.txt", FileMode.Create);
            manualWriter = new StreamWriter(manualStream);
            
            manualWriter.WriteLine("Manually managed resources");
            Console.WriteLine("✓ Manual approach - resources created and used");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            // Must manually dispose in finally block
            manualWriter?.Dispose();
            manualStream?.Dispose();
            Console.WriteLine("✓ Manual approach - resources manually disposed");
        }
        
        // WITH using block (automatic disposal)
        Console.WriteLine("\nUsing block approach:");
        using (var autoStream = new FileStream("auto.txt", FileMode.Create))
        using (var autoWriter = new StreamWriter(autoStream))
        {
            autoWriter.WriteLine("Automatically managed resources");
            Console.WriteLine("✓ Using block approach - resources created and used");
            // Automatic disposal happens here, even if exception occurs
        }
        Console.WriteLine("✓ Using block approach - resources automatically disposed");
        
        // Cleanup
        if (File.Exists("manual.txt")) File.Delete("manual.txt");
        if (File.Exists("auto.txt")) File.Delete("auto.txt");
        
        Console.WriteLine();
    }
}

// Custom disposable class for demonstration
public class CustomResource : IDisposable
{
    private string resourceName;
    private bool disposed = false;
    
    public CustomResource(string name)
    {
        resourceName = name;
        Console.WriteLine($"  {resourceName} created");
    }
    
    public void DoWork()
    {
        if (disposed)
            throw new ObjectDisposedException(resourceName);
        
        Console.WriteLine($"  {resourceName} is doing work");
    }
    
    public void ProcessData(string data)
    {
        if (disposed)
            throw new ObjectDisposedException(resourceName);
        
        Console.WriteLine($"  {resourceName} processing: {data}");
    }
    
    // IDisposable implementation
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // Prevent finalizer from running
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
                Console.WriteLine($"  {resourceName} disposed (managed resources cleaned up)");
            }
            
            // Dispose unmanaged resources
            // (None in this example)
            
            disposed = true;
        }
    }
    
    // Finalizer (destructor)
    ~CustomResource()
    {
        Dispose(false);
    }
}

// Advanced using block examples
public class AdvancedUsingExamples
{
    public static void UsingWithVariableDeclaration()
    {
        Console.WriteLine("7. USING WITH VARIABLE DECLARATION:");
        
        // C# 8.0+ using declaration (without block)
        using var file = new FileStream("declaration.txt", FileMode.Create);
        using var writer = new StreamWriter(file);
        
        writer.WriteLine("Using declaration syntax");
        Console.WriteLine("✓ Resources declared with 'using' keyword");
        
        // Resources automatically disposed at end of enclosing scope
        // No explicit block needed
        
        if (File.Exists("declaration.txt")) 
            File.Delete("declaration.txt");
    }
    
    public static void UsingWithExceptionHandling()
    {
        Console.WriteLine("8. USING WITH EXCEPTION HANDLING:");
        
        try
        {
            using (var resource = new CustomResource("ExceptionResource"))
            {
                resource.DoWork();
                
                // Simulate an exception
                throw new InvalidOperationException("Simulated error");
                
                // This line won't execute
                resource.ProcessData("This won't be processed");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  Exception caught: {ex.Message}");
            Console.WriteLine("  Resource was still properly disposed despite exception");
        }
        
        Console.WriteLine();
    }
    
    public static void UsingReturnEarly()
    {
        Console.WriteLine("9. USING WITH EARLY RETURN:");
        
        using (var resource = new CustomResource("EarlyReturnResource"))
        {
            resource.DoWork();
            
            if (DateTime.Now.Millisecond > 500)
            {
                Console.WriteLine("  Early return condition met");
                return; // Resource still gets disposed
            }
            
            resource.ProcessData("Additional processing");
        }
        // Resource disposed here if no early return
        
        Console.WriteLine();
    }
}
```

## Key Benefits of Using Block:

| Benefit | Description | Example |
|---------|-------------|---------|
| **Automatic Disposal** | Resources disposed automatically | `using (var file = ...) { }` |
| **Exception Safety** | Disposal happens even if exception occurs | Resources cleaned up in finally |
| **Cleaner Code** | No need for explicit try-finally blocks | Less boilerplate code |
| **Deterministic Cleanup** | Resources released immediately | Not dependent on GC timing |

## What Using Block Does:

```csharp
// Using block syntax:
using (FileStream fs = new FileStream("file.txt", FileMode.Create))
{
    // Use the resource
}

// Is equivalent to:
FileStream fs = new FileStream("file.txt", FileMode.Create);
try
{
    // Use the resource
}
finally
{
    fs?.Dispose(); // Always called, even if exception occurs
}
```

## Common Use Cases:

1. **File Operations**: FileStream, StreamReader, StreamWriter
2. **Database Connections**: SqlConnection, SqlCommand
3. **Network Streams**: NetworkStream, TcpClient
4. **Graphics Resources**: Bitmap, Graphics objects
5. **Custom Resources**: Any class implementing IDisposable

## Best Practices:
- **Always use `using` blocks** for IDisposable objects
- **Prefer using blocks over manual disposal** for exception safety
- **Use multiple using statements** for multiple resources
- **Consider using declarations (C# 8+)** for simpler syntax
- **Implement IDisposable properly** in custom classes

The using block ensures that resources are always properly cleaned up, making your code more reliable and preventing resource leaks.

