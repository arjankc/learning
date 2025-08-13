# Looping in C# (for, while, foreach)

## What and Why
Loops repeat work over a sequence or until a condition changes. They help process collections, perform retries, and implement state machines.

## for / while
- for: use when you control an index and have clear start/stop/step.
- while: use when you loop until a condition becomes false.

Examples:

```csharp
int total = 0;
for (int i = 1; i <= 3; i++)
{
	total += i; // 1+2+3
}

int n = 3;
while (n > 0)
{
	n--; // 3,2,1 -> stop when 0
}
```

## foreach
- Iterates elements of a collection in sequence order.
- Emphasizes the element rather than index bookkeeping.

```csharp
var items = new[] { "a", "b", "c" };
foreach (var it in items)
{
	Console.WriteLine(it);
}
```

## Pitfalls and Tips
- Avoid off-by-one errors by defining inclusive/exclusive bounds explicitly.
- Ensure loop termination; mutate conditions correctly.
- Prefer foreach for readability when indexing isn't needed.
- Use break/continue judiciously; they can simplify control flow but overuse harms clarity.

```csharp
foreach (var word in words)
{
	if (string.IsNullOrWhiteSpace(word)) continue; // skip blanks
	if (word == "STOP") break;                    // early exit
	Console.WriteLine(word);
}
```
