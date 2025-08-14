# Question 27: Differentiate between using block and using statement.

## Using Block vs Using Statement in C#

While often confused, "using block" and "using statement" refer to different concepts in C#. Let me clarify the differences:

```csharp
using System;           // <- Using STATEMENT (directive)
using System.IO;        // <- Using STATEMENT (directive)
using MyAlias = System.Collections.Generic.List<string>; // <- Using STATEMENT (alias)

public class UsingComparison
{
    public static void Main()
    {
        Console.WriteLine("=== Using Block vs Using Statement Comparison ===\n");
        
        // Demonstrate using statements (directives)
        UsingStatementDemo();
        
        // Demonstrate using blocks
        UsingBlockDemo();
        
        // Demonstrate using declarations (C# 8+)
        UsingDeclarationDemo();
        
        // Show practical differences
        PracticalDifferencesDemo();
    }
    
    public static void UsingStatementDemo()
    {
        Console.WriteLine("1. USING STATEMENTS (Directives):");
        Console.WriteLine("   - Located at the top of source files");
        Console.WriteLine("   - Import namespaces or create aliases");
        Console.WriteLine("   - Compile-time feature");
        Console.WriteLine("   - Examples:");
        Console.WriteLine("     using System;");
        Console.WriteLine("     using System.IO;");
        Console.WriteLine("     using MyList = System.Collections.Generic.List<int>;");
        Console.WriteLine();
        
        // Using an alias defined with using statement
        MyAlias stringList = new MyAlias { "Item1", "Item2", "Item3" };
        Console.WriteLine($"   Using alias: MyAlias contains {stringList.Count} items");
        Console.WriteLine();
    }
    
    public static void UsingBlockDemo()
    {
        Console.WriteLine("2. USING BLOCKS:");
        Console.WriteLine("   - Used within method bodies");
        Console.WriteLine("   - Ensures automatic disposal of resources");
        Console.WriteLine("   - Runtime feature");
        Console.WriteLine("   - Example:");
        
        string fileName = "using_block_example.txt";
        
        // This is a USING BLOCK
        using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
        using (StreamWriter writer = new StreamWriter(fileStream))
        {
            writer.WriteLine("This demonstrates a using BLOCK");
            writer.WriteLine("Resources are automatically disposed");
            Console.WriteLine("   ✓ File written using using block");
        } // <- Resources automatically disposed here
        
        // Cleanup
        if (File.Exists(fileName))
        {
            File.Delete(fileName);
            Console.WriteLine("   ✓ Temporary file cleaned up");
        }
        
        Console.WriteLine();
    }
    
    public static void UsingDeclarationDemo()
    {
        Console.WriteLine("3. USING DECLARATIONS (C# 8.0+):");
        Console.WriteLine("   - Simplified syntax without explicit block");
        Console.WriteLine("   - Resources disposed at end of enclosing scope");
        Console.WriteLine("   - Example:");
        
        string fileName = "using_declaration_example.txt";
        
        // This is a USING DECLARATION (no explicit block)
        using var fileStream = new FileStream(fileName, FileMode.Create);
        using var writer = new StreamWriter(fileStream);
        
        writer.WriteLine("This demonstrates a using DECLARATION");
        writer.WriteLine("No explicit block needed");
        Console.WriteLine("   ✓ File written using using declaration");
        
        // Resources automatically disposed at end of method
        
        // Cleanup
        if (File.Exists(fileName))
        {
            File.Delete(fileName);
            Console.WriteLine("   ✓ Temporary file cleaned up");
        }
        
        Console.WriteLine();
    }
    
    public static void PracticalDifferencesDemo()
    {
        Console.WriteLine("4. PRACTICAL DIFFERENCES:");
        
        DemonstrateNamespaceImport();
        DemonstrateAliasCreation();
        DemonstrateResourceManagement();
        DemonstrateGlobalUsings();
    }
    
    public static void DemonstrateNamespaceImport()
    {
        Console.WriteLine("   a) Namespace Import with Using Statements:");
        
        // Without using statement, you would need to write:
        // System.DateTime now = System.DateTime.Now;
        // System.Console.WriteLine("Full namespace required");
        
        // With using statement at top of file:
        DateTime now = DateTime.Now; // 'using System;' allows this
        Console.WriteLine($"   Current time: {now:HH:mm:ss}");
        
        // Using alias for long namespace names
        var list = new MyAlias(); // MyAlias = List<string> defined at top
        list.Add("Demonstration");
        Console.WriteLine($"   Alias usage: {list[0]}");
        Console.WriteLine();
    }
    
    public static void DemonstrateAliasCreation()
    {
        Console.WriteLine("   b) Alias Creation with Using Statements:");
        
        // Example of using statement for alias
        // using StringDictionary = System.Collections.Generic.Dictionary<string, string>;
        
        var dict = new System.Collections.Generic.Dictionary<string, string>
        {
            {"Key1", "Value1"},
            {"Key2", "Value2"}
        };
        
        Console.WriteLine($"   Dictionary contains {dict.Count} items");
        Console.WriteLine("   (Would be simpler with alias: using StringDict = Dictionary<string, string>)");
        Console.WriteLine();
    }
    
    public static void DemonstrateResourceManagement()
    {
        Console.WriteLine("   c) Resource Management with Using Blocks:");
        
        // Demonstrate proper resource disposal
        string tempFile = "resource_demo.tmp";
        
        try
        {
            // Using block ensures disposal
            using (var resource = new DisposableResource("ResourceA"))
            {
                resource.UseResource();
                Console.WriteLine("   ✓ Resource used within using block");
                
                // Even if exception occurs, resource is disposed
                if (DateTime.Now.Millisecond > 900) // Rare condition
                {
                    throw new Exception("Simulated exception");
                }
            } // Resource automatically disposed here
            
            Console.WriteLine("   ✓ Resource automatically disposed");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"   Exception handled: {ex.Message}");
            Console.WriteLine("   ✓ Resource still disposed despite exception");
        }
        
        Console.WriteLine();
    }
    
    public static void DemonstrateGlobalUsings()
    {
        Console.WriteLine("   d) Global Using Statements (C# 10+):");
        Console.WriteLine("   - Can use 'global using' for project-wide imports");
        Console.WriteLine("   - Example: global using System;");
        Console.WriteLine("   - Available in all files in the project");
        Console.WriteLine("   - Reduces repetitive using statements");
        Console.WriteLine();
    }
}

// Custom disposable class for demonstration
public class DisposableResource : IDisposable
{
    private string resourceName;
    private bool disposed = false;
    
    public DisposableResource(string name)
    {
        resourceName = name;
        Console.WriteLine($"     {resourceName} created");
    }
    
    public void UseResource()
    {
        if (disposed)
            throw new ObjectDisposedException(resourceName);
        
        Console.WriteLine($"     {resourceName} is being used");
    }
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            Console.WriteLine($"     {resourceName} disposed");
            disposed = true;
        }
    }
}

// Demonstrate different using scenarios
public class AdvancedUsingScenarios
{
    // Using statements at different levels
    using System.Text; // <- Using statement (namespace import)
    
    public static void ComprehensiveDemo()
    {
        Console.WriteLine("5. COMPREHENSIVE USING SCENARIOS:");
        
        // Scenario 1: Multiple using blocks
        Console.WriteLine("   Scenario 1: Multiple using blocks");
        using (var resource1 = new DisposableResource("Resource1"))
        using (var resource2 = new DisposableResource("Resource2"))
        {
            resource1.UseResource();
            resource2.UseResource();
            // Both disposed in reverse order
        }
        
        // Scenario 2: Nested using blocks
        Console.WriteLine("\n   Scenario 2: Nested using blocks");
        using (var outer = new DisposableResource("Outer"))
        {
            outer.UseResource();
            
            using (var inner = new DisposableResource("Inner"))
            {
                inner.UseResource();
                // Inner disposed first
            }
            // Outer disposed after inner
        }
        
        // Scenario 3: Using declarations
        Console.WriteLine("\n   Scenario 3: Using declarations");
        using var declaration1 = new DisposableResource("Declaration1");
        using var declaration2 = new DisposableResource("Declaration2");
        
        declaration1.UseResource();
        declaration2.UseResource();
        
        // Both disposed at end of method in reverse order
        Console.WriteLine("   End of method - declarations will be disposed");
    }
}
```

## Detailed Comparison Table:

| Aspect | Using Statement (Directive) | Using Block | Using Declaration |
|--------|---------------------------|-------------|-------------------|
| **Location** | Top of source file | Inside method body | Inside method body |
| **Purpose** | Import namespaces/create aliases | Resource management | Resource management |
| **Syntax** | `using System;` | `using (var x = ...) { }` | `using var x = ...;` |
| **When Applied** | Compile time | Runtime | Runtime |
| **Scope** | Entire file | Block only | Method/scope |
| **Disposal** | N/A | Automatic at end of block | Automatic at end of scope |
| **C# Version** | C# 1.0+ | C# 1.0+ | C# 8.0+ |

## Real Examples:

```csharp
// USING STATEMENTS (at top of file)
using System;                    // Namespace import
using System.IO;                 // Namespace import
using FileStream = System.IO.FileStream;  // Alias
global using System.Collections.Generic;  // Global using (C# 10+)

public class Examples
{
    public void DemonstrateAll()
    {
        // USING BLOCK
        using (var stream = new FileStream("file.txt", FileMode.Create))
        {
            // Use stream
        } // stream.Dispose() called automatically
        
        // USING DECLARATION (C# 8+)
        using var reader = new StreamReader("file.txt");
        // Use reader
        // reader.Dispose() called at end of method
    }
}
```

## Key Takeaways:

1. **Using Statement**: Compile-time directive for namespace imports and aliases
2. **Using Block**: Runtime construct for automatic resource disposal with explicit scope
3. **Using Declaration**: Modern syntax for resource disposal without explicit blocks
4. **Different Purposes**: Statements are for namespaces, blocks/declarations are for resource management
5. **Choose Based on Need**: Use statements for imports, blocks/declarations for IDisposable objects

The confusion often arises because both use the `using` keyword, but they serve completely different purposes in the language.
