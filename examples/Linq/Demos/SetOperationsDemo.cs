namespace Examples.Linq.Demos;

public static class SetOperationsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== set operations ==");
        var a = new[] { 1, 2, 2, 3, 4 };
        var b = new[] { 3, 4, 4, 5 };
        Console.WriteLine($"Distinct(a): {string.Join(", ", a.Distinct())}");
        Console.WriteLine($"Union: {string.Join(", ", a.Union(b))}");
        Console.WriteLine($"Intersect: {string.Join(", ", a.Intersect(b))}");
        Console.WriteLine($"Except(a-b): {string.Join(", ", a.Except(b))}");
    }
}
