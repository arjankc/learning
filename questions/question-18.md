# Question 18: What do we mean by exceptions? Write basic C# code using try catch to catch an arithmetic exception.

## What are Exceptions?

**Exceptions** are runtime errors that occur during program execution. They represent unexpected or exceptional circumstances that disrupt the normal flow of a program. C# uses a structured exception handling mechanism with try-catch-finally blocks.

## Exception Handling with Try-Catch:

```csharp
using System;

public class ExceptionHandlingDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Exception Handling Demonstration ===\n");
        
        // Basic arithmetic exception handling
        BasicArithmeticExceptionDemo();
        
        // Multiple exception types
        MultipleExceptionDemo();
        
        // Finally block demonstration
        FinallyBlockDemo();
        
        // Custom exception handling
        CustomExceptionDemo();
        
        // Nested try-catch
        NestedTryCatchDemo();
    }
    
    // Basic arithmetic exception handling
    public static void BasicArithmeticExceptionDemo()
    {
        Console.WriteLine("1. Basic Arithmetic Exception Handling:");
        
        try
        {
            Console.Write("Enter first number: ");
            int number1 = int.Parse(Console.ReadLine());
            
            Console.Write("Enter second number: ");
            int number2 = int.Parse(Console.ReadLine());
            
            // This can throw DivideByZeroException
            int result = number1 / number2;
            Console.WriteLine($"Result: {number1} / {number2} = {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Arithmetic Error: Cannot divide by zero!");
            Console.WriteLine($"Exception Message: {ex.Message}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Input Error: Please enter valid integers!");
            Console.WriteLine($"Exception Message: {ex.Message}");
        }
        catch (OverflowException ex)
        {
            Console.WriteLine($"Overflow Error: Number is too large!");
            Console.WriteLine($"Exception Message: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General Error: {ex.Message}");
        }
        
        Console.WriteLine();
    }
    
    // Multiple arithmetic operations with exception handling
    public static void MultipleExceptionDemo()
    {
        Console.WriteLine("2. Multiple Arithmetic Operations:");
        
        int[] numbers = { 10, 5, 0, -3 };
        int divisor = 0;
        
        for (int i = 0; i < numbers.Length; i++)
        {
            try
            {
                Console.WriteLine($"Processing number: {numbers[i]}");
                
                // Division by zero exception
                int division = numbers[i] / divisor;
                Console.WriteLine($"Division result: {division}");
                
                // Array index out of bounds
                int nextNumber = numbers[i + 10]; // Will throw IndexOutOfRangeException
                
                // Arithmetic overflow (if using checked context)
                checked
                {
                    int overflow = int.MaxValue + 1;
                }
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("  ❌ Division by zero detected!");
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("  ❌ Array index out of range!");
            }
            catch (OverflowException)
            {
                Console.WriteLine("  ❌ Arithmetic overflow occurred!");
            }
            catch (ArithmeticException ex)
            {
                Console.WriteLine($"  ❌ Arithmetic exception: {ex.Message}");
            }
        }
        
        Console.WriteLine();
    }
    
    // Finally block demonstration
    public static void FinallyBlockDemo()
    {
        Console.WriteLine("3. Finally Block Demonstration:");
        
        System.IO.FileStream fileStream = null;
        
        try
        {
            // Simulate file operations that might fail
            Console.WriteLine("Opening file...");
            fileStream = new System.IO.FileStream("test.txt", System.IO.FileMode.Create);
            
            Console.Write("Enter a number to write to file: ");
            int number = int.Parse(Console.ReadLine());
            
            // Potential arithmetic exception
            int result = 100 / number;
            
            byte[] data = System.Text.Encoding.UTF8.GetBytes($"Result: {result}");
            fileStream.Write(data, 0, data.Length);
            
            Console.WriteLine("File written successfully!");
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("❌ Cannot divide by zero while writing to file!");
        }
        catch (FormatException)
        {
            Console.WriteLine("❌ Invalid number format!");
        }
        catch (System.IO.IOException ex)
        {
            Console.WriteLine($"❌ File I/O error: {ex.Message}");
        }
        finally
        {
            // This block always executes, even if exception occurs
            Console.WriteLine("Executing finally block...");
            
            if (fileStream != null)
            {
                fileStream.Close();
                Console.WriteLine("File stream closed.");
            }
            
            // Clean up temporary file
            if (System.IO.File.Exists("test.txt"))
            {
                System.IO.File.Delete("test.txt");
                Console.WriteLine("Temporary file deleted.");
            }
        }
        
        Console.WriteLine();
    }
    
    // Custom exception handling
    public static void CustomExceptionDemo()
    {
        Console.WriteLine("4. Custom Exception Handling:");
        
        try
        {
            Calculator calculator = new Calculator();
            
            // Operations that might throw custom exceptions
            Console.WriteLine("Testing calculator operations:");
            
            double result1 = calculator.Divide(10, 2);
            Console.WriteLine($"10 / 2 = {result1}");
            
            double result2 = calculator.Divide(10, 0); // Will throw custom exception
        }
        catch (CalculatorException ex)
        {
            Console.WriteLine($"❌ Calculator Error: {ex.Message}");
            Console.WriteLine($"Error Code: {ex.ErrorCode}");
        }
        catch (ArithmeticException ex)
        {
            Console.WriteLine($"❌ Arithmetic Error: {ex.Message}");
        }
        
        Console.WriteLine();
    }
    
    // Nested try-catch blocks
    public static void NestedTryCatchDemo()
    {
        Console.WriteLine("5. Nested Try-Catch Blocks:");
        
        try
        {
            Console.WriteLine("Outer try block");
            
            try
            {
                Console.WriteLine("Inner try block");
                
                Console.Write("Enter a number for nested operation: ");
                int number = int.Parse(Console.ReadLine());
                
                // Nested arithmetic operation
                int result = 1000 / number;
                
                // Array operation that might fail
                int[] array = new int[number];
                array[number] = 42; // Index out of bounds if number > 0
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Inner catch: Division by zero handled");
                throw; // Re-throw to outer catch
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("Inner catch: Array index error handled locally");
                // Not re-throwing, so outer catch won't see this
            }
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Outer catch: Handling re-thrown division by zero");
        }
        catch (FormatException)
        {
            Console.WriteLine("Outer catch: Invalid input format");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Outer catch: General exception - {ex.Message}");
        }
        
        Console.WriteLine();
    }
}

// Custom Exception Class
public class CalculatorException : ArithmeticException
{
    public int ErrorCode { get; }
    
    public CalculatorException(string message, int errorCode) : base(message)
    {
        ErrorCode = errorCode;
    }
    
    public CalculatorException(string message, int errorCode, Exception innerException) 
        : base(message, innerException)
    {
        ErrorCode = errorCode;
    }
}

// Calculator class with custom exception handling
public class Calculator
{
    public double Add(double a, double b)
    {
        try
        {
            checked
            {
                return a + b;
            }
        }
        catch (OverflowException)
        {
            throw new CalculatorException("Addition overflow occurred", 1001);
        }
    }
    
    public double Subtract(double a, double b)
    {
        try
        {
            checked
            {
                return a - b;
            }
        }
        catch (OverflowException)
        {
            throw new CalculatorException("Subtraction overflow occurred", 1002);
        }
    }
    
    public double Multiply(double a, double b)
    {
        try
        {
            checked
            {
                return a * b;
            }
        }
        catch (OverflowException)
        {
            throw new CalculatorException("Multiplication overflow occurred", 1003);
        }
    }
    
    public double Divide(double dividend, double divisor)
    {
        if (divisor == 0)
        {
            throw new CalculatorException("Division by zero is not allowed", 1004);
        }
        
        if (double.IsInfinity(dividend / divisor))
        {
            throw new CalculatorException("Division result is infinity", 1005);
        }
        
        return dividend / divisor;
    }
    
    public double SquareRoot(double number)
    {
        if (number < 0)
        {
            throw new CalculatorException("Cannot calculate square root of negative number", 1006);
        }
        
        return Math.Sqrt(number);
    }
}

// Exception hierarchy demonstration
public class MathUtilities
{
    public static void DemonstrateExceptionHierarchy()
    {
        Console.WriteLine("6. Exception Hierarchy Demonstration:");
        
        try
        {
            // Different types of arithmetic exceptions
            ThrowDifferentExceptions(1); // DivideByZeroException
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Specific: DivideByZeroException - {ex.Message}");
        }
        catch (ArithmeticException ex)
        {
            Console.WriteLine($"General: ArithmeticException - {ex.Message}");
        }
        catch (SystemException ex)
        {
            Console.WriteLine($"System: SystemException - {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Base: Exception - {ex.Message}");
        }
    }
    
    public static void ThrowDifferentExceptions(int type)
    {
        switch (type)
        {
            case 1:
                throw new DivideByZeroException("Division by zero occurred");
            case 2:
                throw new OverflowException("Arithmetic overflow occurred");
            case 3:
                throw new ArithmeticException("General arithmetic error");
            default:
                throw new InvalidOperationException("Invalid operation");
        }
    }
}
```

## Common Arithmetic Exceptions:

| Exception Type | Description | Common Causes |
|----------------|-------------|---------------|
| **DivideByZeroException** | Division by zero | `x / 0`, `x % 0` |
| **OverflowException** | Arithmetic overflow | Result exceeds data type limits |
| **ArithmeticException** | Base class for arithmetic errors | Parent of above exceptions |
| **InvalidOperationException** | Invalid operation for current state | Math operations on invalid data |

## Exception Handling Best Practices:

```csharp
public class ExceptionBestPractices
{
    // ✅ GOOD: Specific exception handling
    public static int SafeDivide(int dividend, int divisor)
    {
        try
        {
            return dividend / divisor;
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Warning: Division by zero, returning 0");
            return 0;
        }
    }
    
    // ✅ GOOD: Input validation to prevent exceptions
    public static int ValidatedDivide(int dividend, int divisor)
    {
        if (divisor == 0)
        {
            throw new ArgumentException("Divisor cannot be zero", nameof(divisor));
        }
        
        return dividend / divisor;
    }
    
    // ✅ GOOD: Using finally for cleanup
    public static void ProcessWithCleanup()
    {
        System.IO.FileStream stream = null;
        try
        {
            stream = new System.IO.FileStream("data.txt", System.IO.FileMode.Create);
            // Process file
        }
        catch (System.IO.IOException ex)
        {
            Console.WriteLine($"File error: {ex.Message}");
        }
        finally
        {
            stream?.Close(); // Always cleanup
        }
    }
    
    // ✅ GOOD: Using 'using' statement for automatic disposal
    public static void ProcessWithUsing()
    {
        try
        {
            using (var stream = new System.IO.FileStream("data.txt", System.IO.FileMode.Create))
            {
                // Process file - automatic cleanup
            }
        }
        catch (System.IO.IOException ex)
        {
            Console.WriteLine($"File error: {ex.Message}");
        }
    }
}
```

## Key Points:
- **Exception handling is for exceptional circumstances**, not normal control flow
- **Catch specific exceptions** before general ones
- **Use finally blocks** for cleanup code that must run
- **Consider using 'using' statements** for automatic resource disposal
- **Don't catch exceptions you can't handle meaningfully**
- **Log exceptions** for debugging and monitoring

