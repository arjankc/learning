namespace Examples.Linq.Demos;

public static class MethodSyntaxDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== LINQ: Method Syntax ==");
        var words = new[] { "cherry", "apple", "blueberry" };
        var projection = words
            .Select(w => new { Word = w, Length = w.Length })
            .OrderBy(x => x.Length);
        foreach (var x in projection)
            Console.WriteLine($"{x.Word} ({x.Length})");
    }
}
