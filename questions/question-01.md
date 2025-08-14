# Question 1: What is the difference between 'for loop' and 'foreach loop'? Explain with Example in C#.

## Differences:

| Aspect | for loop | foreach loop |
|--------|----------|--------------|
| **Purpose** | General-purpose iteration with index control | Iterating through collections |
| **Index Access** | Provides index access | No direct index access |
| **Performance** | Slightly faster for arrays | Optimized for collections |
| **Flexibility** | Can modify iteration pattern | Fixed iteration pattern |
| **Collection Modification** | Can modify collection during iteration | Cannot modify collection during iteration |

## Examples:

```csharp
public class LoopComparison
{
    public static void ForLoopExample()
    {
        int[] numbers = { 1, 2, 3, 4, 5 };
        
        // for loop - provides index access
        Console.WriteLine("For loop:");
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.WriteLine($"Index {i}: {numbers[i]}");
            // Can modify array elements
            numbers[i] *= 2;
        }
        
        // Can iterate backwards
        Console.WriteLine("\nBackward iteration:");
        for (int i = numbers.Length - 1; i >= 0; i--)
        {
            Console.WriteLine($"Index {i}: {numbers[i]}");
        }
        
        // Can skip elements
        Console.WriteLine("\nSkip every other element:");
        for (int i = 0; i < numbers.Length; i += 2)
        {
            Console.WriteLine($"Index {i}: {numbers[i]}");
        }
    }
    
    public static void ForEachLoopExample()
    {
        int[] numbers = { 10, 20, 30, 40, 50 };
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
        
        // foreach loop - simpler syntax for iteration
        Console.WriteLine("Foreach loop with array:");
        foreach (int number in numbers)
        {
            Console.WriteLine($"Value: {number}");
            // Cannot modify 'number' variable to change array
        }
        
        // Works with any IEnumerable
        Console.WriteLine("\nForeach loop with List:");
        foreach (string name in names)
        {
            Console.WriteLine($"Name: {name}");
        }
        
        // Works with Dictionary
        Dictionary<string, int> ages = new Dictionary<string, int>
        {
            ["Alice"] = 25,
            ["Bob"] = 30
        };
        
        Console.WriteLine("\nForeach loop with Dictionary:");
        foreach (KeyValuePair<string, int> kvp in ages)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
    }
    
    public static void PerformanceComparison()
    {
        int[] largeArray = new int[1000000];
        for (int i = 0; i < largeArray.Length; i++)
        {
            largeArray[i] = i;
        }
        
        Stopwatch sw = new Stopwatch();
        
        // for loop timing
        sw.Start();
        long sum1 = 0;
        for (int i = 0; i < largeArray.Length; i++)
        {
            sum1 += largeArray[i];
        }
        sw.Stop();
        long forTime = sw.ElapsedMilliseconds;
        
        // foreach loop timing
        sw.Restart();
        long sum2 = 0;
        foreach (int number in largeArray)
        {
            sum2 += number;
        }
        sw.Stop();
        long foreachTime = sw.ElapsedMilliseconds;
        
        Console.WriteLine($"For loop time: {forTime}ms");
        Console.WriteLine($"Foreach loop time: {foreachTime}ms");
    }
}
```

