namespace Examples.Linq.Demos;

public static class QuerySyntaxDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== LINQ: Query Syntax ==");
        var nums = new[] { 5, 1, 4, 2, 3 };
        var evensOrdered = from n in nums
                           where n % 2 == 0
                           orderby n
                           select n;
        Console.WriteLine(string.Join(", ", evensOrdered));
    }
}
