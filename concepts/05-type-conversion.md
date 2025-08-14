# Type Conversion

## Types of Conversion

### 1. Implicit Conversion (Automatic)
```csharp
int intValue = 42;
long longValue = intValue;    // Implicit conversion (safe)
double doubleValue = intValue; // Implicit conversion (safe)

// Implicit conversions for numeric types
byte b = 100;
short s = b;     // byte to short
int i = s;       // short to int
long l = i;      // int to long
float f = l;     // long to float
double d = f;    // float to double
```

### 2. Explicit Conversion (Manual)
```csharp
double doubleValue = 42.7;
int intValue = (int)doubleValue;  // Explicit cast (data loss possible)

// Explicit conversions
long longValue = 123456789;
int intValue2 = (int)longValue;   // Potential overflow

// Using Convert class
string numberString = "123";
int converted = Convert.ToInt32(numberString);
double convertedDouble = Convert.ToDouble("123.45");
```

### 3. Boxing and Unboxing
```csharp
// Boxing: Value type to reference type
int value = 42;
object boxed = value;         // Boxing

// Unboxing: Reference type to value type
object boxedValue = 42;
int unboxed = (int)boxedValue; // Unboxing

// Performance consideration
List<object> mixedList = new List<object>();
mixedList.Add(42);           // Boxing occurs
mixedList.Add("Hello");      // No boxing (already reference type)
```

### 4. Parse and TryParse Methods
```csharp
// Parse (throws exception on failure)
string input = "123";
int parsed = int.Parse(input);

// TryParse (returns false on failure)
string userInput = "abc";
if (int.TryParse(userInput, out int result))
{
    Console.WriteLine($"Parsed: {result}");
}
else
{
    Console.WriteLine("Invalid input");
}

// DateTime parsing
string dateString = "2023-12-25";
if (DateTime.TryParse(dateString, out DateTime parsedDate))
{
    Console.WriteLine($"Date: {parsedDate:yyyy-MM-dd}");
}
```
