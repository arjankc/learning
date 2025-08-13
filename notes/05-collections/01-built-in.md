# Built-in Collections

Choose the right structure for performance and clarity. Know the complexity and common pitfalls.

## Core types and when to use
- Array (T[]): fixed size, contiguous memory, fastest indexing.
- List<T>: dynamic array, amortized O(1) append, O(1) index.
- Dictionary<TKey,TValue>: hash map, O(1) average lookup/insert.
- HashSet<T>: uniqueness set, O(1) average contains/add.
- Queue<T>, Stack<T>: FIFO/LIFO with O(1) enqueue/dequeue/push/pop.
- LinkedList<T>: O(1) insert/remove with node, O(n) indexing; niche use.
- Concurrent collections: thread-safe data structures for multi-producer/consumer.

## Idiomatic examples
```csharp
// List
var nums = new List<int> { 1, 2, 3 };
nums.Add(4);
nums.RemoveAll(n => n % 2 == 0); // 1,3

// Dictionary
var counts = new Dictionary<string,int>(StringComparer.OrdinalIgnoreCase);
foreach (var w in new[] { "A", "b", "a" })
	counts[w] = counts.GetValueOrDefault(w) + 1;

// HashSet
var unique = new HashSet<int> { 1, 2, 2, 3 }; // 1,2,3

// Queue/Stack
var q = new Queue<string>(); q.Enqueue("first"); q.Enqueue("second"); var head = q.Dequeue();
var s = new Stack<string>(); s.Push("x"); s.Push("y"); var top = s.Pop();
```

## Concurrent collections
```csharp
var bag = new System.Collections.Concurrent.ConcurrentBag<int>();
Parallel.For(0, 1000, bag.Add);
int count = bag.Count; // thread-safe aggregation pattern differs

var queue = new System.Collections.Concurrent.BlockingCollection<int>();
var prod = Task.Run(() => { for (int i = 0; i < 10; i++) queue.Add(i); queue.CompleteAdding(); });
var cons = Task.Run(() => { foreach (var item in queue.GetConsumingEnumerable()) Console.WriteLine(item); });
await Task.WhenAll(prod, cons);
```
When to use which:
- Use ConcurrentDictionary when multiple threads update shared counters/state per key.
- Use BlockingCollection for producer/consumer pipelines with backpressure.
- Prefer immutable snapshots (e.g., ImmutableArray) for many-readers/few-writers patterns.

## Complexity cheatsheet (typical)
- List<T>: index O(1), append amortized O(1), remove by value O(n).
- Dictionary/HashSet: add/contains O(1) average; O(n) worst-case.
- Queue/Stack: O(1) enqueue/dequeue/push/pop.

## Tips
- Prefer `TryGetValue`/`GetValueOrDefault` to avoid exceptions on missing keys.
- Use `StringComparer.OrdinalIgnoreCase` when keys are case-insensitive.
- Avoid repeated `List<T>.Remove(item)` in a loop; filter with `Where`/`RemoveAll`.

## Further reading
- https://learn.microsoft.com/dotnet/standard/collections/
