# Question 21: What are the roles of C# Compiler and JIT compiler?

## C# Compiler vs JIT Compiler

C# compilation involves a two-step process: **C# Compiler** compiles source code to Intermediate Language (IL), and **JIT Compiler** compiles IL to native machine code at runtime.

```csharp
using System;
using System.Reflection;
using System.Reflection.Emit;

public class CompilerDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# Compiler vs JIT Compiler Demonstration ===\n");
        
        // Demonstrate compilation process
        DemonstrateCompilationProcess();
        
        // Show JIT compilation in action
        DemonstrateJITCompilation();
        
        // Show runtime code generation
        DemonstrateRuntimeCodeGeneration();
        
        // Performance comparison
        DemonstrateJITPerformance();
    }
    
    public static void DemonstrateCompilationProcess()
    {
        Console.WriteLine("1. COMPILATION PROCESS:");
        Console.WriteLine("   Source Code (.cs) -> C# Compiler -> IL Code (.dll/.exe) -> JIT Compiler -> Native Code");
        Console.WriteLine();
        
        // Get information about current assembly
        Assembly currentAssembly = Assembly.GetExecutingAssembly();
        Console.WriteLine($"Assembly: {currentAssembly.GetName().Name}");
        Console.WriteLine($"Location: {currentAssembly.Location}");
        Console.WriteLine($"Runtime Version: {currentAssembly.ImageRuntimeVersion}");
        Console.WriteLine();
    }
    
    public static void DemonstrateJITCompilation()
    {
        Console.WriteLine("2. JIT COMPILATION DEMONSTRATION:");
        
        // First call - method gets JIT compiled
        Console.WriteLine("First call to SampleMethod (JIT compilation occurs):");
        var start = DateTime.UtcNow;
        int result1 = SampleMethod(10, 20);
        var duration1 = DateTime.UtcNow - start;
        Console.WriteLine($"Result: {result1}, Duration: {duration1.TotalMilliseconds:F4} ms");
        
        // Second call - method already compiled
        Console.WriteLine("Second call to SampleMethod (already JIT compiled):");
        start = DateTime.UtcNow;
        int result2 = SampleMethod(30, 40);
        var duration2 = DateTime.UtcNow - start;
        Console.WriteLine($"Result: {result2}, Duration: {duration2.TotalMilliseconds:F4} ms");
        
        Console.WriteLine($"Performance improvement: {(duration1.TotalMilliseconds / duration2.TotalMilliseconds):F2}x faster");
        Console.WriteLine();
    }
    
    // Sample method for JIT demonstration
    public static int SampleMethod(int a, int b)
    {
        // Simulate some computation
        int result = 0;
        for (int i = 0; i < 1000; i++)
        {
            result += (a * b) + (i % 10);
        }
        return result;
    }
    
    public static void DemonstrateRuntimeCodeGeneration()
    {
        Console.WriteLine("3. RUNTIME CODE GENERATION (Reflection.Emit):");
        
        // Create dynamic assembly
        AssemblyName assemblyName = new AssemblyName("DynamicAssembly");
        AssemblyBuilder assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly(
            assemblyName, AssemblyBuilderAccess.Run);
        
        // Create dynamic module
        ModuleBuilder moduleBuilder = assemblyBuilder.DefineDynamicModule("DynamicModule");
        
        // Create dynamic type
        TypeBuilder typeBuilder = moduleBuilder.DefineType("DynamicCalculator", 
            TypeAttributes.Public);
        
        // Create dynamic method
        MethodBuilder methodBuilder = typeBuilder.DefineMethod("Add",
            MethodAttributes.Public | MethodAttributes.Static,
            typeof(int), new Type[] { typeof(int), typeof(int) });
        
        // Generate IL code
        ILGenerator il = methodBuilder.GetILGenerator();
        il.Emit(OpCodes.Ldarg_0);  // Load first argument
        il.Emit(OpCodes.Ldarg_1);  // Load second argument
        il.Emit(OpCodes.Add);      // Add them
        il.Emit(OpCodes.Ret);      // Return result
        
        // Create type and get method
        Type dynamicType = typeBuilder.CreateType();
        MethodInfo dynamicMethod = dynamicType.GetMethod("Add");
        
        // Invoke dynamically generated method
        object result = dynamicMethod.Invoke(null, new object[] { 15, 25 });
        Console.WriteLine($"Dynamic method result: 15 + 25 = {result}");
        Console.WriteLine();
    }
    
    public static void DemonstrateJITPerformance()
    {
        Console.WriteLine("4. JIT PERFORMANCE IMPACT:");
        
        const int iterations = 1000000;
        
        // Warm up JIT
        for (int i = 0; i < 1000; i++)
        {
            MathOperations.ComplexCalculation(i);
        }
        
        // Measure performance after JIT compilation
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        for (int i = 0; i < iterations; i++)
        {
            MathOperations.ComplexCalculation(i);
        }
        
        stopwatch.Stop();
        
        Console.WriteLine($"Executed {iterations:N0} operations in {stopwatch.ElapsedMilliseconds} ms");
        Console.WriteLine($"Average per operation: {(double)stopwatch.ElapsedTicks / iterations:F2} ticks");
        Console.WriteLine();
    }
}

// Class for performance testing
public static class MathOperations
{
    public static double ComplexCalculation(int input)
    {
        double result = Math.Sqrt(input);
        result = Math.Sin(result) + Math.Cos(result);
        result *= Math.PI;
        return Math.Abs(result);
    }
}

// IL Code inspection utility
public class ILInspection
{
    public static void InspectMethodIL()
    {
        Console.WriteLine("5. IL CODE INSPECTION:");
        
        MethodInfo method = typeof(CompilerDemo).GetMethod("SampleMethod");
        MethodBody methodBody = method.GetMethodBody();
        
        if (methodBody != null)
        {
            Console.WriteLine($"Method: {method.Name}");
            Console.WriteLine($"IL Code Size: {methodBody.GetILAsByteArray().Length} bytes");
            Console.WriteLine($"Max Stack Size: {methodBody.MaxStackSize}");
            Console.WriteLine($"Local Variables: {methodBody.LocalVariables.Count}");
            
            foreach (var localVar in methodBody.LocalVariables)
            {
                Console.WriteLine($"  Local {localVar.LocalIndex}: {localVar.LocalType}");
            }
        }
        Console.WriteLine();
    }
}

// Custom JIT optimization demonstration
public class JITOptimizationDemo
{
    public static void DemonstrateOptimizations()
    {
        Console.WriteLine("6. JIT OPTIMIZATIONS:");
        
        // Method inlining demonstration
        Console.WriteLine("Testing method inlining...");
        
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        for (int i = 0; i < 10000000; i++)
        {
            int result = AddNumbers(i, i + 1); // Small method likely to be inlined
        }
        
        stopwatch.Stop();
        Console.WriteLine($"Method calls completed in {stopwatch.ElapsedMilliseconds} ms");
        
        // Loop optimization
        Console.WriteLine("Testing loop optimization...");
        
        stopwatch.Restart();
        
        int sum = 0;
        for (int i = 0; i < 10000000; i++)
        {
            sum += i; // JIT will optimize this loop
        }
        
        stopwatch.Stop();
        Console.WriteLine($"Loop optimization completed in {stopwatch.ElapsedMilliseconds} ms");
        Console.WriteLine($"Sum: {sum}");
        Console.WriteLine();
    }
    
    // Small method that may be inlined by JIT
    private static int AddNumbers(int a, int b)
    {
        return a + b;
    }
}
```

## Detailed Comparison:

| Aspect | C# Compiler (csc.exe/Roslyn) | JIT Compiler |
|--------|------------------------------|--------------|
| **Input** | C# source code (.cs files) | IL code (.dll/.exe files) |
| **Output** | Intermediate Language (IL) code | Native machine code |
| **When** | Compile time (before execution) | Runtime (during execution) |
| **Platform** | Platform independent | Platform specific |
| **Optimization** | High-level optimizations | Low-level, runtime optimizations |
| **Speed** | Slower (full analysis) | Faster (targeted compilation) |

## C# Compiler Role:

```csharp
// Example showing what C# compiler does:

// 1. SYNTAX ANALYSIS
public class CompilerTasks
{
    // Compiler checks syntax, semantics, types
    public void CompilerResponsibilities()
    {
        // Syntax validation
        int number = 42; // ✓ Valid syntax
        // int number = ; // ✗ Compiler error: syntax error
        
        // Type checking
        string text = "Hello"; // ✓ Valid type assignment
        // int wrongType = "Hello"; // ✗ Compiler error: type mismatch
        
        // Method resolution
        Console.WriteLine(text); // ✓ Compiler finds correct overload
        
        // Constant folding
        const int result = 10 + 20; // Compiler calculates at compile time
    }
}

// 2. IL CODE GENERATION
/*
Original C# code:
public int Add(int a, int b)
{
    return a + b;
}

Generated IL code (simplified):
.method public hidebysig instance int32 Add(int32 a, int32 b)
{
    .maxstack 2
    ldarg.1     // Load argument 'a'
    ldarg.2     // Load argument 'b'  
    add         // Add them
    ret         // Return result
}
*/
```

## JIT Compiler Role:

```csharp
public class JITCompilerTasks
{
    public static void JITResponsibilities()
    {
        Console.WriteLine("JIT Compiler Tasks:");
        Console.WriteLine("1. Convert IL to native machine code");
        Console.WriteLine("2. Perform runtime optimizations");
        Console.WriteLine("3. Handle platform-specific details");
        Console.WriteLine("4. Manage method compilation on-demand");
        Console.WriteLine("5. Apply processor-specific optimizations");
        
        // JIT compilation happens here (first call)
        PerformanceTestMethod();
        
        // Subsequent calls use already compiled native code
        PerformanceTestMethod();
    }
    
    private static void PerformanceTestMethod()
    {
        // JIT will optimize this based on:
        // - CPU architecture (x86, x64, ARM)
        // - Available CPU features (SSE, AVX)
        // - Runtime profiling data
        
        for (int i = 0; i < 1000; i++)
        {
            double result = Math.Sqrt(i) * Math.PI;
        }
    }
}
```

## JIT Optimization Examples:

```csharp
public class JITOptimizations
{
    // 1. METHOD INLINING
    public static void InliningDemo()
    {
        // Small methods like GetConstant() may be inlined
        int value = GetConstant() * 2;
        Console.WriteLine(value);
    }
    
    private static int GetConstant() => 42; // Likely to be inlined
    
    // 2. DEAD CODE ELIMINATION
    public static void DeadCodeDemo()
    {
        bool condition = false; // JIT knows this is always false
        
        if (condition) // JIT will eliminate this entire block
        {
            Console.WriteLine("This code will be eliminated");
            ExpensiveOperation();
        }
        
        Console.WriteLine("This code remains");
    }
    
    // 3. LOOP OPTIMIZATION
    public static void LoopOptimizationDemo()
    {
        int[] array = new int[1000];
        
        // JIT will optimize bounds checking and loop structure
        for (int i = 0; i < array.Length; i++)
        {
            array[i] = i * 2; // Bounds check may be eliminated
        }
    }
    
    // 4. REGISTER ALLOCATION
    public static int RegisterDemo(int a, int b, int c)
    {
        // JIT will efficiently allocate CPU registers for variables
        int temp1 = a + b;
        int temp2 = temp1 * c;
        int result = temp2 + a;
        return result;
    }
    
    private static void ExpensiveOperation()
    {
        System.Threading.Thread.Sleep(1000);
    }
}
```

## Key Differences Summary:

**C# Compiler (Compile-time):**
- Converts source code to IL
- Performs syntax and semantic analysis
- Type checking and method resolution
- High-level optimizations
- Generates metadata
- Platform independent output

**JIT Compiler (Runtime):**
- Converts IL to native code
- Just-in-time compilation (on first method call)
- Platform-specific optimizations
- Runtime profiling and adaptive optimization
- Processor-specific code generation
- Memory layout optimization

This two-stage compilation allows C# to be both platform-independent (IL) and highly optimized (native code).
