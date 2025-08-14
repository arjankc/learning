# Exception Handling

## Definition
Exception handling is a programming construct that allows programs to respond to exceptional circumstances during execution.

## Try-Catch-Finally Structure

```csharp
public class ExceptionHandlingExamples
{
    public static void BasicExceptionHandling()
    {
        try
        {
            // Code that might throw an exception
            Console.Write("Enter a number: ");
            string input = Console.ReadLine();
            int number = int.Parse(input);
            int result = 100 / number;
            Console.WriteLine($"Result: {result}");
        }
        catch (FormatException ex)
        {
            // Handle specific exception type
            Console.WriteLine($"Invalid format: {ex.Message}");
        }
        catch (DivideByZeroException ex)
        {
            // Handle specific exception type
            Console.WriteLine($"Division by zero: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Handle any other exception
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
        finally
        {
            // Always executes (cleanup code)
            Console.WriteLine("Operation completed.");
        }
    }
}
```

## Multiple Catch Blocks
```csharp
public class FileProcessor
{
    public void ProcessFile(string filePath)
    {
        FileStream fileStream = null;
        StreamReader reader = null;
        
        try
        {
            fileStream = new FileStream(filePath, FileMode.Open);
            reader = new StreamReader(fileStream);
            
            string content = reader.ReadToEnd();
            int lineCount = content.Split('\n').Length;
            
            Console.WriteLine($"File processed. Line count: {lineCount}");
        }
        catch (FileNotFoundException ex)
        {
            Console.WriteLine($"File not found: {ex.FileName}");
        }
        catch (UnauthorizedAccessException ex)
        {
            Console.WriteLine($"Access denied: {ex.Message}");
        }
        catch (IOException ex)
        {
            Console.WriteLine($"I/O error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
            // Log the full exception for debugging
            Console.WriteLine($"Stack trace: {ex.StackTrace}");
        }
        finally
        {
            // Cleanup resources
            reader?.Dispose();
            fileStream?.Dispose();
            Console.WriteLine("Resources cleaned up.");
        }
    }
}
```

## Custom Exceptions
```csharp
// Custom exception class
public class InsufficientFundsException : Exception
{
    public decimal RequiredAmount { get; }
    public decimal AvailableAmount { get; }
    
    public InsufficientFundsException() : base() { }
    
    public InsufficientFundsException(string message) : base(message) { }
    
    public InsufficientFundsException(string message, Exception innerException) 
        : base(message, innerException) { }
    
    public InsufficientFundsException(decimal required, decimal available)
        : base($"Insufficient funds. Required: {required:C}, Available: {available:C}")
    {
        RequiredAmount = required;
        AvailableAmount = available;
    }
}

// Usage of custom exception
public class BankAccountWithExceptions
{
    private decimal balance;
    
    public decimal Balance => balance;
    
    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive", nameof(amount));
        
        if (amount > balance)
            throw new InsufficientFundsException(amount, balance);
        
        balance -= amount;
    }
    
    public void ProcessWithdrawal(decimal amount)
    {
        try
        {
            Withdraw(amount);
            Console.WriteLine($"Withdrawal successful. New balance: {balance:C}");
        }
        catch (InsufficientFundsException ex)
        {
            Console.WriteLine($"Withdrawal failed: {ex.Message}");
            Console.WriteLine($"You need {ex.RequiredAmount - ex.AvailableAmount:C} more.");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Invalid amount: {ex.Message}");
        }
    }
}
```

## Exception Propagation and Rethrowing
```csharp
public class ExceptionPropagation
{
    public void MethodA()
    {
        try
        {
            MethodB();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Caught in MethodA: {ex.Message}");
            // Log and rethrow
            throw; // Preserves original stack trace
        }
    }
    
    public void MethodB()
    {
        try
        {
            MethodC();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Caught in MethodB: {ex.Message}");
            // Wrap and throw new exception
            throw new InvalidOperationException("Error in MethodB", ex);
        }
    }
    
    public void MethodC()
    {
        throw new ArgumentException("Something went wrong in MethodC");
    }
}
```

## Using Statement for Resource Management
```csharp
public class ResourceManagement
{
    // Using statement automatically calls Dispose()
    public void ReadFileWithUsing(string filePath)
    {
        try
        {
            using (var fileStream = new FileStream(filePath, FileMode.Open))
            using (var reader = new StreamReader(fileStream))
            {
                string content = reader.ReadToEnd();
                Console.WriteLine($"File content length: {content.Length}");
                // fileStream and reader are automatically disposed
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
    }
    
    // Multiple using statements (C# 8+ syntax)
    public void ReadFileWithMultipleUsing(string filePath)
    {
        try
        {
            using var fileStream = new FileStream(filePath, FileMode.Open);
            using var reader = new StreamReader(fileStream);
            
            string content = reader.ReadToEnd();
            Console.WriteLine($"File content length: {content.Length}");
            // Automatic disposal at end of method
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
    }
}
```

## Best Practices
```csharp
public class ExceptionBestPractices
{
    // DON'T: Catch and ignore exceptions
    public void BadExample1()
    {
        try
        {
            // Some operation
            int result = int.Parse("abc");
        }
        catch
        {
            // Silently ignoring exception - BAD!
        }
    }
    
    // DON'T: Catch Exception when you should catch specific types
    public void BadExample2()
    {
        try
        {
            // Some operation
        }
        catch (Exception ex)
        {
            // Too broad - might catch unexpected exceptions
            Console.WriteLine("Something went wrong");
        }
    }
    
    // DO: Catch specific exceptions and handle appropriately
    public bool TryParseNumber(string input, out int result)
    {
        result = 0;
        try
        {
            result = int.Parse(input);
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
        catch (OverflowException)
        {
            return false;
        }
    }
    
    // DO: Use Try* methods when available
    public bool SafeParseNumber(string input, out int result)
    {
        return int.TryParse(input, out result); // No exception throwing
    }
    
    // DO: Provide meaningful error messages
    public void ValidateAge(int age)
    {
        if (age < 0)
            throw new ArgumentOutOfRangeException(nameof(age), age, "Age cannot be negative");
        
        if (age > 150)
            throw new ArgumentOutOfRangeException(nameof(age), age, "Age cannot exceed 150 years");
    }
}
```
