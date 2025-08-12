# Branching in C# (if/else, switch)

## What and Why
Branching lets a program choose different execution paths based on conditions. It’s fundamental to decision-making logic and input validation.

## if / else
- Evaluate a boolean condition to choose a path.
- Chain with else if for multiple cases; prefer early returns (guard clauses) for readability.

Example:

```csharp
int score = 78;
if (score < 0 || score > 100)
{
	throw new ArgumentOutOfRangeException(nameof(score));
}
else if (score >= 90)
{
	Console.WriteLine("A");
}
else if (score >= 80)
{
	Console.WriteLine("B");
}
else
{
	Console.WriteLine("C or below");
}
```

## switch
- Good for discrete choices based on a single value.
- Pattern matching unlocks matching on types, ranges, and conditions.

Examples:

```csharp
string GradeCategory(int score) => score switch
{
	>= 90 => "Excellent",
	>= 80 => "Good",
	>= 70 => "Fair",
	_ => "Needs Improvement"
};

// Type pattern example
string Describe(object o) => o switch
{
	null => "null",
	string s when s.Length == 0 => "empty string",
	string s => $"string of length {s.Length}",
	int n => $"int {n}",
	_ => o.GetType().Name
};
```

## Best Practices
- Keep conditions simple and intention-revealing.
- Prefer switch for many discrete cases; avoid long if/else chains.
- Extract complex conditions into well-named helpers for readability and reuse.
- Avoid duplication: compute a value once and reuse it.
- Use guard clauses to fail fast when inputs are invalid.

## Read More
- Microsoft Docs: if-else: https://learn.microsoft.com/dotnet/csharp/language-reference/statements/selection-statements
- Microsoft Docs: switch and pattern matching: https://learn.microsoft.com/dotnet/csharp/language-reference/operators/switch-expression
