# Question 17: What are the access modifiers in C#? Explain each of them in brief.

## Access Modifiers in C#:

C# provides several access modifiers that control the visibility and accessibility of classes, methods, fields, and other members.

```csharp
using System;

// Demonstration of all access modifiers
public class AccessModifierDemo
{
    // PUBLIC - Accessible from anywhere
    public string PublicField = "I'm accessible from anywhere";
    
    // PRIVATE - Accessible only within the same class
    private string privateField = "I'm only accessible within this class";
    
    // PROTECTED - Accessible within the same class and derived classes
    protected string protectedField = "I'm accessible in this class and derived classes";
    
    // INTERNAL - Accessible within the same assembly
    internal string internalField = "I'm accessible within the same assembly";
    
    // PROTECTED INTERNAL - Accessible within same assembly OR derived classes
    protected internal string protectedInternalField = "I'm accessible within assembly or derived classes";
    
    // PRIVATE PROTECTED - Accessible within same assembly AND derived classes only
    private protected string privateProtectedField = "I'm accessible in derived classes within same assembly";
    
    public AccessModifierDemo()
    {
        // All fields are accessible within the same class
        Console.WriteLine("=== Inside AccessModifierDemo Constructor ===");
        Console.WriteLine($"Public: {PublicField}");
        Console.WriteLine($"Private: {privateField}");
        Console.WriteLine($"Protected: {protectedField}");
        Console.WriteLine($"Internal: {internalField}");
        Console.WriteLine($"Protected Internal: {protectedInternalField}");
        Console.WriteLine($"Private Protected: {privateProtectedField}");
    }
    
    // PUBLIC method
    public void PublicMethod()
    {
        Console.WriteLine("Public method - accessible from anywhere");
        PrivateMethod(); // Can call private method from within same class
    }
    
    // PRIVATE method
    private void PrivateMethod()
    {
        Console.WriteLine("Private method - only accessible within this class");
    }
    
    // PROTECTED method
    protected void ProtectedMethod()
    {
        Console.WriteLine("Protected method - accessible in derived classes");
    }
    
    // INTERNAL method
    internal void InternalMethod()
    {
        Console.WriteLine("Internal method - accessible within same assembly");
    }
    
    // PROTECTED INTERNAL method
    protected internal void ProtectedInternalMethod()
    {
        Console.WriteLine("Protected Internal method");
    }
    
    // PRIVATE PROTECTED method
    private protected void PrivateProtectedMethod()
    {
        Console.WriteLine("Private Protected method");
    }
}

// DERIVED CLASS - demonstrating inherited access
public class DerivedClass : AccessModifierDemo
{
    public void TestInheritedAccess()
    {
        Console.WriteLine("\n=== Inside Derived Class ===");
        
        // Accessible in derived class
        Console.WriteLine($"Public: {PublicField}");
        // Console.WriteLine($"Private: {privateField}"); // ERROR: Not accessible
        Console.WriteLine($"Protected: {protectedField}");
        Console.WriteLine($"Internal: {internalField}");
        Console.WriteLine($"Protected Internal: {protectedInternalField}");
        Console.WriteLine($"Private Protected: {privateProtectedField}");
        
        // Method calls
        PublicMethod();
        // PrivateMethod(); // ERROR: Not accessible
        ProtectedMethod();
        InternalMethod();
        ProtectedInternalMethod();
        PrivateProtectedMethod();
    }
}

// SEPARATE CLASS in same assembly
public class SeparateClass
{
    public void TestExternalAccess()
    {
        Console.WriteLine("\n=== Inside Separate Class (Same Assembly) ===");
        
        AccessModifierDemo obj = new AccessModifierDemo();
        
        // Accessible from separate class in same assembly
        Console.WriteLine($"Public: {obj.PublicField}");
        // Console.WriteLine($"Private: {obj.privateField}"); // ERROR: Not accessible
        // Console.WriteLine($"Protected: {obj.protectedField}"); // ERROR: Not accessible (not derived)
        Console.WriteLine($"Internal: {obj.internalField}");
        Console.WriteLine($"Protected Internal: {obj.protectedInternalField}");
        // Console.WriteLine($"Private Protected: {obj.privateProtectedField}"); // ERROR: Not accessible (not derived)
        
        // Method calls
        obj.PublicMethod();
        // obj.PrivateMethod(); // ERROR: Not accessible
        // obj.ProtectedMethod(); // ERROR: Not accessible (not derived)
        obj.InternalMethod();
        obj.ProtectedInternalMethod();
        // obj.PrivateProtectedMethod(); // ERROR: Not accessible (not derived)
    }
}

// CLASS ACCESS MODIFIERS
public class PublicClass
{
    public void Method() { Console.WriteLine("Public class method"); }
}

internal class InternalClass
{
    public void Method() { Console.WriteLine("Internal class method"); }
}

// NESTED CLASS ACCESS MODIFIERS
public class OuterClass
{
    private int outerPrivateField = 100;
    
    // Public nested class
    public class PublicNestedClass
    {
        public void AccessOuter(OuterClass outer)
        {
            // Nested class can access private members of outer class
            Console.WriteLine($"Accessing outer private field: {outer.outerPrivateField}");
        }
    }
    
    // Private nested class
    private class PrivateNestedClass
    {
        public void Method()
        {
            Console.WriteLine("Private nested class method");
        }
    }
    
    // Protected nested class
    protected class ProtectedNestedClass
    {
        public void Method()
        {
            Console.WriteLine("Protected nested class method");
        }
    }
    
    public void CreateNestedInstances()
    {
        var publicNested = new PublicNestedClass();
        var privateNested = new PrivateNestedClass();
        var protectedNested = new ProtectedNestedClass();
        
        publicNested.AccessOuter(this);
        privateNested.Method();
        protectedNested.Method();
    }
}

// INTERFACE ACCESS MODIFIERS
public interface IPublicInterface
{
    void PublicInterfaceMethod();
}

internal interface IInternalInterface
{
    void InternalInterfaceMethod();
}

// PROPERTY ACCESS MODIFIERS
public class PropertyAccessDemo
{
    private string _name;
    
    // Property with different access levels for get/set
    public string Name
    {
        get { return _name; }
        private set { _name = value; } // Private setter
    }
    
    // Auto-property with private setter
    public int Id { get; private set; }
    
    // Protected setter
    public DateTime CreatedDate { get; protected set; }
    
    public PropertyAccessDemo(string name, int id)
    {
        Name = name; // Can set within same class
        Id = id;
        CreatedDate = DateTime.Now;
    }
}

// MAIN PROGRAM
public class Program
{
    public static void Main()
    {
        Console.WriteLine("=== C# Access Modifiers Demonstration ===");
        
        // Test base class
        AccessModifierDemo baseObj = new AccessModifierDemo();
        baseObj.PublicMethod();
        // baseObj.PrivateMethod(); // ERROR: Not accessible
        baseObj.InternalMethod();
        
        // Test derived class
        DerivedClass derivedObj = new DerivedClass();
        derivedObj.TestInheritedAccess();
        
        // Test separate class
        SeparateClass separateObj = new SeparateClass();
        separateObj.TestExternalAccess();
        
        // Test nested classes
        Console.WriteLine("\n=== Nested Classes ===");
        OuterClass outerObj = new OuterClass();
        outerObj.CreateNestedInstances();
        
        var publicNested = new OuterClass.PublicNestedClass();
        // var privateNested = new OuterClass.PrivateNestedClass(); // ERROR: Not accessible
        
        // Test property access
        Console.WriteLine("\n=== Property Access ===");
        PropertyAccessDemo propObj = new PropertyAccessDemo("Test", 123);
        Console.WriteLine($"Name: {propObj.Name}");
        Console.WriteLine($"ID: {propObj.Id}");
        // propObj.Name = "New Name"; // ERROR: Setter is private
        // propObj.Id = 456; // ERROR: Setter is private
    }
}
```

## Summary of Access Modifiers:

| Access Modifier | Class Level | Member Level | Accessibility |
|----------------|-------------|--------------|---------------|
| **public** | ✓ | ✓ | Everywhere |
| **private** | ✗ | ✓ | Same class only |
| **protected** | ✗ | ✓ | Same class + derived classes |
| **internal** | ✓ | ✓ | Same assembly |
| **protected internal** | ✗ | ✓ | Same assembly OR derived classes |
| **private protected** | ✗ | ✓ | Same assembly AND derived classes |

## Key Points:

1. **Default Access Levels:**
   - Classes: `internal`
   - Class members: `private`
   - Interface members: `public`

2. **Most Restrictive to Least Restrictive:**
   - private -> private protected -> protected -> internal -> protected internal -> public

3. **Best Practices:**
   - Use the most restrictive access level possible
   - Prefer `private` for implementation details
   - Use `public` only for intended API
   - Use `protected` for extensibility in inheritance
   - Use `internal` for assembly-level collaboration
