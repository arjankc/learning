namespace Examples.Linq.Demos;

public static class DeferredExecutionDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== LINQ: Deferred Execution ==");
        var nums = new List<int> { 1, 2, 3 };
        var query = nums.Where(n => n > 1);
        nums.Add(4); // affects query because it's deferred
        Console.WriteLine(string.Join(", ", query));
    }
}
