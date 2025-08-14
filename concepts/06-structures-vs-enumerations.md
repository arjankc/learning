# Structures vs Enumerations

## Structures (struct)

### Definition
Structures are value types that can contain data members and function members.

### Key Characteristics
- **Value Type**: Stored on stack
- **No Inheritance**: Cannot inherit from other types
- **Immutable Recommended**: Should be immutable for best practices
- **Default Constructor**: Always available

```csharp
public struct Point
{
    public int X { get; }
    public int Y { get; }
    
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    public double DistanceFromOrigin()
    {
        return Math.Sqrt(X * X + Y * Y);
    }
    
    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

// Usage
Point p1 = new Point(3, 4);
Point p2 = new Point(); // Default constructor (0, 0)
Console.WriteLine(p1.DistanceFromOrigin()); // 5
```

## Enumerations (enum)

### Definition
Enumerations define a set of named constants of the underlying integral numeric type.

### Key Characteristics
- **Named Constants**: Improve code readability
- **Type Safe**: Prevents invalid values
- **Underlying Type**: Default is int, can be changed
- **Flags Support**: Can be combined using bitwise operations

```csharp
// Basic enumeration
public enum OrderStatus
{
    Pending,      // 0
    Processing,   // 1
    Shipped,      // 2
    Delivered,    // 3
    Cancelled     // 4
}

// Custom underlying type and values
public enum Priority : byte
{
    Low = 1,
    Medium = 5,
    High = 10,
    Critical = 20
}

// Flags enumeration
[Flags]
public enum FilePermissions
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}

// Usage examples
OrderStatus status = OrderStatus.Processing;

// Enum methods
string statusName = status.ToString();              // "Processing"
OrderStatus parsed = Enum.Parse<OrderStatus>("Shipped");
bool isValid = Enum.IsDefined(typeof(OrderStatus), 3); // true

// Flags usage
FilePermissions permissions = FilePermissions.Read | FilePermissions.Write;
bool canRead = permissions.HasFlag(FilePermissions.Read);    // true
bool canExecute = permissions.HasFlag(FilePermissions.Execute); // false
```

## Comparison Table

| Feature | struct | enum |
|---------|--------|------|
| **Purpose** | Data containers | Named constants |
| **Type** | Value type | Value type (integral) |
| **Memory** | Stack | Constant value |
| **Inheritance** | No inheritance | No inheritance |
| **Methods** | Can have methods | Only predefined methods |
| **Mutability** | Should be immutable | Immutable |
