# Iterators and `yield`

Iterators generate sequence elements on demand with minimal memory and clear code. In C#, you implement iterators with `yield return` and `yield break`, and the compiler builds the underlying state machine for `IEnumerable`/`IEnumerator`.

## When to use
- Stream large or expensive data lazily (avoid loading everything into memory).
- Compose pipelines (filter, map) without intermediate allocations.
- Model infinite or open-ended sequences safely.

## The iterator contract
- `IEnumerable<T>.GetEnumerator()` returns an `IEnumerator<T>`.
- `IEnumerator<T>` has `bool MoveNext()`, `T Current { get; }`, and `void Reset()` (rarely used), plus `IDisposable`.
- An iterator method that uses `yield` implicitly implements this contract for you.

## Basics: `yield return` and `yield break`
```csharp
IEnumerable<int> FirstN(int count)
{
    for (int i = 1; i <= count; i++)
        yield return i; // execution suspends here until next MoveNext()
}

// End a sequence early
IEnumerable<int> OddsUntil(int limit)
{
    for (int i = 1; ; i += 2)
    {
        if (i > limit) yield break;
        yield return i;
    }
}
```

Usage:
```csharp
foreach (var n in FirstN(3))
    Console.WriteLine(n); // 1 2 3

Console.WriteLine(string.Join(", ", OddsUntil(7))); // 1, 3, 5, 7
```

## Real-world: lazy file processing
Prefer `File.ReadLines` (lazy) to `ReadAllLines` (eager) for large files.
```csharp
IEnumerable<string> ErrorLines(string path)
{
    foreach (var line in File.ReadLines(path)) // streams lines lazily
        if (line.Contains("ERROR"))
            yield return line;
}

// Consumers can bail early without reading the whole file
var firstError = ErrorLines("app.log").FirstOrDefault();
```

## Composing iterators
```csharp
IEnumerable<int> Range(int start, int count)
{
    for (int i = 0; i < count; i++)
        yield return start + i;
}

IEnumerable<int> Squares(IEnumerable<int> numbers)
{
    foreach (var n in numbers)
        yield return n * n;
}

var firstFiveSquares = Squares(Range(1, 5)); // 1, 4, 9, 16, 25
```

## State, exceptions, and cleanup
- State machine: Local variables are preserved between `yield return`s.
- Exceptions thrown inside the iterator surface at enumeration time (when `MoveNext()` runs).
- Use `try/finally` to guarantee cleanup at the end of enumeration.
```csharp
IEnumerable<string> ReadLinesWithFooter(string path)
{
    using var reader = new StreamReader(path);
    string? line;
    try
    {
        while ((line = reader.ReadLine()) is not null)
            yield return line;
    }
    finally
    {
        yield return "-- EOF --"; // allowed: finally runs on normal or early termination
    }
}
```

Note: In iterators, `using` translates to `try/finally` so the resource is disposed when enumeration completes or is abandoned.

## Common pitfalls and tips
- Multiple enumeration repeats work. If you need to iterate multiple times, materialize once: `var cache = source.ToList();`.
- Side effects happen on enumeration, not declaration. Be mindful when passing an `IEnumerable<T>` around.
- Don’t capture mutable outer variables you later change; it can lead to confusing results.
- Prefer returning `IEnumerable<T>` over concrete collections when laziness is desired.

## Async streams (brief)
For async producers/consumers, use `IAsyncEnumerable<T>` with `await foreach` and `yield return` in `async` iterator methods.
```csharp
async IAsyncEnumerable<int> Tick(int intervalMs, [EnumeratorCancellation] CancellationToken ct = default)
{
    int i = 0;
    while (!ct.IsCancellationRequested)
    {
        await Task.Delay(intervalMs, ct);
        yield return ++i;
    }
}
```
