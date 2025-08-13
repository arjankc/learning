# Advanced OOP

Dive deeper into design choices and trade-offs.

## SOLID (at a glance)
- Single Responsibility: one reason to change per module.
- Open/Closed: extend via composition/abstractions, avoid modifying stable code.
- Liskov Substitution: derived types must honor base contracts/invariants.
- Interface Segregation: prefer small, focused interfaces.
- Dependency Inversion: depend on abstractions, not concretions.

## Structs vs Classes
- Structs are value types; copied by value, allocated inline when possible.
- Prefer for small, immutable data (e.g., 2–3 fields). Avoid large or mutable structs.
```csharp
public readonly struct Money
{
	public decimal Amount { get; }
	public string Currency { get; }
	public Money(decimal amount, string currency) { Amount = amount; Currency = currency; }
	public override string ToString() => $"{Amount} {Currency}";
}
```

## Enums & Flags
```csharp
[Flags]
public enum FileAccessRights { None = 0, Read = 1, Write = 2, Execute = 4 }
var rights = FileAccessRights.Read | FileAccessRights.Write;
bool canWrite = rights.HasFlag(FileAccessRights.Write);
```

## Nested types
Keep helpers close to usage; avoid overexposure of internals.
```csharp
public class Parser
{
	public sealed class Result { public bool Success { get; init; } public string? Error { get; init; } }
}
```

## Partial types/members
Split large types across files or generate parts via source generators.
```csharp
public partial class UserService { partial void OnCreated(); }
public partial class UserService { partial void OnCreated() { /* hook */ } }
```

## Operator overloads (use judiciously)
```csharp
public readonly record struct Vector2(double X, double Y)
{
	public static Vector2 operator +(Vector2 a, Vector2 b) => new(a.X + b.X, a.Y + b.Y);
}
```

## Equality semantics
- Classes default to reference equality; override `Equals/GetHashCode` or use records for value semantics.
```csharp
public record Person(string First, string Last);
var a = new Person("Ada","Lovelace");
var b = new Person("Ada","Lovelace");
Console.WriteLine(a == b); // true (value-based)
```

## Best practices
- Favor immutability where practical.
- Keep constructors simple; use factories/builders if setup is complex.
- Keep inheritance shallow; prefer interfaces + composition.

## Virtual dispatch and performance
- Virtual/interface calls can inhibit inlining; sealing methods/types enables devirtualization.
- Measure before optimizing; prefer clarity, optimize verified hot paths only.

## Domain modeling tips
- Keep entities small and cohesive; make invariants explicit.
- Use aggregate roots to guard invariants; expose behavior, not settable state.
- Persistence-ignorant domain: no data access in entities; use repositories/services for IO.
