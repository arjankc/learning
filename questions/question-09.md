# Question 9: Explain difference between value type and reference type in CLR with example.

## Value Types vs Reference Types in CLR:

| Aspect | Value Type | Reference Type |
|--------|------------|----------------|
| **Storage** | Stack (for local variables) | Heap |
| **Memory Allocation** | Direct value storage | Reference to heap location |
| **Assignment** | Creates a copy | Copies the reference |
| **Null Values** | Cannot be null (except nullable) | Can be null |
| **Performance** | Faster access | Slower due to indirection |
| **Garbage Collection** | No GC needed for stack allocation | Subject to garbage collection |
| **Default Values** | Zero/false for primitives | null for references |

## CLR Memory Management Example:

```csharp
public class ValueVsReferenceTypeDemo
{
    // Value type struct
    public struct Point
    {
        public int X, Y;
        public Point(int x, int y) { X = x; Y = y; }
        public override string ToString() => $"({X}, {Y})";
    }
    
    // Reference type class
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Person(string name, int age) { Name = name; Age = age; }
        public override string ToString() => $"{Name}, {Age}";
    }
    
    public static void Main()
    {
        Console.WriteLine("=== Value Type Behavior ===");
        ValueTypeExample();
        
        Console.WriteLine("\n=== Reference Type Behavior ===");
        ReferenceTypeExample();
        
        Console.WriteLine("\n=== Boxing and Unboxing ===");
        BoxingUnboxingExample();
    }
    
    public static void ValueTypeExample()
    {
        // Value types - stored on stack
        int a = 10;
        int b = a;    // Copy of value
        a = 20;       // Only 'a' changes
        
        Console.WriteLine($"a = {a}, b = {b}"); // a = 20, b = 10
        
        // Struct example
        Point p1 = new Point(5, 10);
        Point p2 = p1;    // Copy created
        p1.X = 15;        // Only p1 changes
        
        Console.WriteLine($"p1 = {p1}, p2 = {p2}"); // p1 = (15, 10), p2 = (5, 10)
    }
    
    public static void ReferenceTypeExample()
    {
        // Reference types - stored on heap
        Person person1 = new Person("Alice", 25);
        Person person2 = person1;    // Copy of reference, not object
        person1.Age = 30;            // Both references point to same object
        
        Console.WriteLine($"person1: {person1}"); // Alice, 30
        Console.WriteLine($"person2: {person2}"); // Alice, 30 (same object)
    }
    
    public static void BoxingUnboxingExample()
    {
        // Boxing: Value type to object (heap allocation)
        int valueType = 42;
        object boxed = valueType;    // Boxing occurs
        
        Console.WriteLine($"Original: {valueType}");
        Console.WriteLine($"Boxed: {boxed}");
        
        // Unboxing: Object back to value type
        int unboxed = (int)boxed;    // Unboxing occurs
        Console.WriteLine($"Unboxed: {unboxed}");
    }
}
```
