# C# Basics: Data Types (Primitive, Value vs Reference)

## What are Data Types?
Data types define the kind of data a variable can hold in a programming language. In C#, data types are crucial because they determine how much memory is allocated and what operations can be performed on the data.

## Categories of Data Types in C#
1. Primitive (Built-in) Types: These are basic types provided by the language, such as int, double, char, and bool.
2. Value Types: These types store data directly. Examples include all primitive types (except string), structs, and enums. Value types are usually stored on the stack.
3. Reference Types: These types store a reference (address) to the actual data. Examples include string, arrays, classes, and delegates. Reference types are stored on the heap, and variables hold a reference to the memory location.

## Value vs Reference Types
- Value Types: When you assign a value type variable to another, a copy of the value is made. Changes to one variable do not affect the other.
- Reference Types: When you assign a reference type variable to another, both variables refer to the same object in memory. Changes to one variable affect the other.

## Why is this important?
Understanding the difference helps you predict how your data will behave when passed to methods or assigned to new variables, which is essential for writing bug-free code.

## Examples
Value copy vs reference sharing:

```csharp
// Value types: copy the value
int a = 42;
int b = a;    // copy
b++;
// a == 42, b == 43

// Reference types: copy the reference
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;  // same reference
arr2[0] = 99;
// arr1[0] == 99 and arr2[0] == 99

// Strings are reference types but immutable
string s1 = "hello";
string s2 = s1;
s2 = s2.ToUpperInvariant();
// s1 == "hello" (unchanged), s2 == "HELLO"
```

Tip: prefer small, immutable structs for simple data; use classes for entities with identity and shared references.

## Further Reading
- Microsoft Docs: Types in C#: https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/built-in-types
- Microsoft Docs: Value Types and Reference Types: https://learn.microsoft.com/dotnet/csharp/programming-guide/types/
