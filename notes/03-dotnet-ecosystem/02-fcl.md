# .NET Framework Class Library (BCL/FCL)

The BCL/FCL is the standard library for .NET: collections, IO, networking, threading, numerics, etc. Learn its surface area to avoid reinventing wheels.

## Common namespaces and anchors
- System, System.Collections.Generic (List<T>, Dictionary<TKey,TValue>, HashSet<T>)
- System.Linq (operators for querying in-memory collections)
- System.IO (File, Directory, streams)
- System.Net.Http (HttpClient)
- System.Text.Json (JSON serialization)
- System.Threading / Tasks (Task, CancellationToken)

## Handy examples
```csharp
// Collections
var counts = new Dictionary<string,int>(StringComparer.OrdinalIgnoreCase);
foreach (var w in new[] { "a", "b", "A" }) counts[w] = counts.GetValueOrDefault(w) + 1;

// IO
File.WriteAllText("demo.txt", "hello");
var text = File.ReadAllText("demo.txt");

// LINQ
var evens = Enumerable.Range(1, 10).Where(n => n % 2 == 0).ToArray();

// JSON
var json = System.Text.Json.JsonSerializer.Serialize(new { Name = "Ada" });
var obj = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string,string>>(json);

// Tasks & cancellation
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
try { await Task.Delay(5000, cts.Token); }
catch (TaskCanceledException) { /* expected */ }
```

## Tips
- Prefer BCL types first; they’re well-tested and supported across runtimes.
- Check for `TryXxx` methods to avoid exceptions for common failure paths.
