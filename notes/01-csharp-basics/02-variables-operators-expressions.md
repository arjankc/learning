# C# Basics: Variables, Operators, and Expressions

## Variables
Variables are named storage locations in memory that hold data. In C#, you must declare a variable with a specific data type before using it. This helps the compiler allocate the right amount of memory and enforce type safety.

### Key Points:
- Variables must be declared before use.
- The data type determines what kind of data the variable can store.
- Variable names should be descriptive and follow C# naming conventions (camelCase for local variables).

## Operators
Operators are symbols that perform operations on variables and values. C# includes several types of operators:
- Arithmetic Operators: For mathematical operations (e.g., +, -, *, /, %)
- Assignment Operators: For assigning values (e.g., =, +=, -=)
- Comparison Operators: For comparing values (e.g., ==, !=, <, >, <=, >=)
- Logical Operators: For logical operations (e.g., &&, ||, !)

## Expressions
An expression is a combination of variables, values, and operators that produces a result. For example, a + b is an expression that adds two variables.

### Examples
Declarations and arithmetic:

```csharp
int x = 10, y = 3;
int sum = x + y;     // 13
int product = x * y; // 30
int quotient = x / y;  // 3 (integer division)
int remainder = x % y; // 1
```

Comparison and logical:

```csharp
bool isGreater = x > y;              // true
bool bothPositive = (x > 0) && (y > 0); // true
bool eitherLarge = (x >= 10) || (y >= 10); // true
```

Precedence and grouping:

```csharp
int result = x + y * 2;   // 10 + 3*2 = 16
int clearer = (x + y) * 2; // 26
```

## Best Practices
- Use meaningful variable names.
- Keep expressions simple and readable.
- Use parentheses to clarify complex expressions.

## Further Reading
- Microsoft Docs: Variables: https://learn.microsoft.com/dotnet/csharp/programming-guide/variables/
- Microsoft Docs: Operators: https://learn.microsoft.com/dotnet/csharp/language-reference/operators/
- Microsoft Docs: Expressions: https://learn.microsoft.com/dotnet/csharp/language-reference/operators/expressions
