# Looping in C# (for, while, foreach)

## Why Loops
Loops repeat work over a sequence or until a condition changes.

## for / while
- for: use when you control an index and have clear start/stop/step.
- while: use when you loop until a condition becomes false.

## foreach
- Iterates elements of a collection in sequence order.
- Emphasizes the element rather than index bookkeeping.

## Pitfalls and Tips
- Avoid off-by-one errors by defining inclusive/exclusive bounds explicitly.
- Ensure loop termination; mutate conditions correctly.
- Prefer foreach for readability when indexing isn't needed.

## Read More
- Microsoft Docs: Iteration statements: https://learn.microsoft.com/dotnet/csharp/language-reference/statements/iteration-statements
