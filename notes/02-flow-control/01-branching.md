# Branching in C# (if/else, switch)

## When to Branch
Branching selects different execution paths based on conditions.

## if / else
- Evaluate a boolean condition to choose a path.
- Multiple else-if blocks support more than two choices.

## switch
- Good for discrete choices based on a single value.
- Pattern matching expands switch power (types, ranges, conditions) while staying readable.

## Best Practices
- Keep conditions simple and intention-revealing.
- Prefer switch for many discrete cases; avoid long if/else chains.
- Extract complex conditions into well-named helpers for readability and reuse.

## Read More
- Microsoft Docs: if-else: https://learn.microsoft.com/dotnet/csharp/language-reference/statements/selection-statements
- Microsoft Docs: switch and pattern matching: https://learn.microsoft.com/dotnet/csharp/language-reference/operators/switch-expression
