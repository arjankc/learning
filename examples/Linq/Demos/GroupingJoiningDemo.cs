namespace Examples.Linq.Demos;

public static class GroupingJoiningDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== LINQ: Grouping & Joining ==");
        var people = new[]
        {
            new { Name = "Alice", City = "NY" },
            new { Name = "Bob", City = "LA" },
            new { Name = "Cara", City = "NY" },
        };
        var cities = new[]
        {
            new { City = "NY", Country = "USA" },
            new { City = "LA", Country = "USA" },
        };

        var grouped = people.GroupBy(p => p.City);
        foreach (var g in grouped)
            Console.WriteLine($"{g.Key}: {string.Join(", ", g.Select(p => p.Name))}");

        var joined = from p in people
                     join c in cities on p.City equals c.City
                     select new { p.Name, c.Country };
        Console.WriteLine(string.Join(", ", joined.Select(x => $"{x.Name}-{x.Country}")));
    }
}
