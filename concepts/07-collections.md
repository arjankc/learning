# Collections

## Generic Collections (Recommended)

### 1. List<T>
```csharp
// Dynamic array implementation
List<string> names = new List<string>();
names.Add("Alice");
names.Add("Bob");
names.AddRange(new[] { "Charlie", "David" });

// Access and modification
names[0] = "Alice Smith";
names.Insert(1, "Betty");
names.Remove("Bob");
names.RemoveAt(2);

// Iteration
foreach (string name in names)
{
    Console.WriteLine(name);
}

// LINQ operations
var longNames = names.Where(n => n.Length > 5).ToList();
```

### 2. Dictionary<TKey, TValue>
```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    ["Alice"] = 30,
    ["Bob"] = 25
};

// Adding and accessing
ages.Add("Charlie", 35);
ages["David"] = 28; // Add or update

// Safe access
if (ages.TryGetValue("Alice", out int aliceAge))
{
    Console.WriteLine($"Alice is {aliceAge} years old");
}

// Iteration
foreach (KeyValuePair<string, int> kvp in ages)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
```

### 3. HashSet<T>
```csharp
HashSet<string> uniqueNames = new HashSet<string>();
uniqueNames.Add("Alice");
uniqueNames.Add("Bob");
uniqueNames.Add("Alice"); // Duplicate ignored

// Set operations
HashSet<string> otherNames = new HashSet<string> { "Bob", "Charlie" };
uniqueNames.UnionWith(otherNames);        // Union
uniqueNames.IntersectWith(otherNames);    // Intersection
bool contains = uniqueNames.Contains("Alice");
```

### 4. Queue<T> and Stack<T>
```csharp
// Queue (FIFO - First In, First Out)
Queue<string> taskQueue = new Queue<string>();
taskQueue.Enqueue("Task 1");
taskQueue.Enqueue("Task 2");
string nextTask = taskQueue.Dequeue(); // "Task 1"

// Stack (LIFO - Last In, First Out)
Stack<string> undoStack = new Stack<string>();
undoStack.Push("Action 1");
undoStack.Push("Action 2");
string lastAction = undoStack.Pop(); // "Action 2"
```

## Non-Generic Collections (Legacy)

### ArrayList
```csharp
// Non-generic - boxing/unboxing occurs
ArrayList list = new ArrayList();
list.Add(42);        // Boxing
list.Add("Hello");   // Reference type
int value = (int)list[0]; // Unboxing + casting required

// Problems:
// 1. No compile-time type checking
// 2. Boxing/unboxing performance overhead
// 3. Runtime errors possible
```

### Hashtable
```csharp
Hashtable table = new Hashtable();
table["key1"] = "value1";
table[42] = "number key";  // Any type as key

// Type casting required
string value = (string)table["key1"];
```

## Collection Interfaces

```csharp
// IEnumerable<T> - Basic iteration
public void ProcessItems(IEnumerable<string> items)
{
    foreach (string item in items)
    {
        Console.WriteLine(item);
    }
}

// ICollection<T> - Add/Remove operations
public void ModifyCollection(ICollection<string> items)
{
    items.Add("New Item");
    items.Remove("Old Item");
    Console.WriteLine($"Count: {items.Count}");
}

// IList<T> - Indexed access
public void AccessByIndex(IList<string> items)
{
    items[0] = "First Item";
    items.Insert(1, "Second Item");
}
```
