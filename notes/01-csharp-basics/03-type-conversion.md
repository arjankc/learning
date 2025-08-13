# Type Conversion in C# (Implicit/Explicit, Boxing/Unboxing)

## Why Conversion Matters
C# is statically typed, so types must match. Conversions let values move between compatible types with predictable behavior.

## Implicit vs Explicit Conversion
- Implicit conversions are safe and lossless (e.g., smaller numeric type to larger). The compiler applies them automatically.
- Explicit conversions require intent because information may be lost or the conversion may fail at runtime.

## Numeric Conversions
- Widening (safe): smaller range/precision to larger range/precision.
- Narrowing (risky): larger to smaller; may overflow, truncate, or throw at runtime if checked.

## Reference Conversions
- Upcast (derived to base) is safe conceptually.
- Downcast (base to derived) requires runtime type compatibility.

## Boxing/Unboxing
- Boxing: wrapping a value type instance as an object to treat it as a reference type.
- Unboxing: extracting the value type from an object; requires the exact original value type.
- Performance note: boxing allocates on the heap and can pressure GC; avoid in hot paths.

## Best Practices
- Prefer implicit conversions when they are guaranteed safe.
- Be explicit and intentional with narrowing conversions; validate ranges.
- Minimize boxing by using generics and avoiding APIs that require object.

## Examples
Implicit vs explicit and overflow checking:

```csharp
int small = 123;
long bigger = small; // implicit widening

double pi = 3.14;
int truncated = (int)pi; // explicit narrowing => 3

try
{
	checked
	{
		int max = int.MaxValue;
		int overflow = max + 1; // throws OverflowException in checked context
	}
}
catch (OverflowException)
{
	// handle
}

// Boxing/unboxing
object boxed = small;         // boxing
int unboxed = (int)boxed;     // unboxing
```
