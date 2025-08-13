namespace Examples.Linq.Demos;

public static class SelectManyAndGroupJoinDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== SelectMany & GroupJoin ==");
        var customers = new[] {
            new Customer("Ann", new[]{"A1","A2"}),
            new Customer("Bob", new[]{"B1"}),
        };

        // Flatten all orders (SelectMany)
        var allOrders = customers.SelectMany(c => c.OrderIds.Select(id => new { c.Name, OrderId = id }));
        Console.WriteLine(string.Join("; ", allOrders.Select(x => $"{x.Name}:{x.OrderId}")));

        // GroupJoin: customers with their orders
        var orders = new[] { new Order("A1"), new Order("B1"), new Order("C1") };
        var grouped = customers.GroupJoin(orders, c => c.OrderIds.FirstOrDefault(), o => o.Id, (c, os) => new { c.Name, Orders = os.Select(x=>x.Id) });
        foreach (var g in grouped)
            Console.WriteLine($"{g.Name} -> [{string.Join(",", g.Orders)}]");
    }

    private record Customer(string Name, IEnumerable<string> OrderIds);
    private record Order(string Id);
}
