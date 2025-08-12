namespace Examples.Async.Demos;

public static class ParallelDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Parallel.ForEach (conceptual) ==");
        var data = Enumerable.Range(1, 8);
        Parallel.ForEach(data, n =>
        {
            // Simulate work
            var square = n * n;
            Console.Write($"{square} ");
        });
        Console.WriteLine();
    }
}
