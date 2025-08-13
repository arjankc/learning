namespace Examples.Linq.Demos;

public static class PitfallsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== pitfalls: deferred execution & multiple enumeration ==");
        var list = new List<int> { 1, 2 };
        var pipeline = list.Select(n => n * 10); // deferred
        list.Add(3);
        Console.WriteLine(string.Join(", ", pipeline)); // includes 30 now

        Console.WriteLine("\n== expensive source enumerated twice ==");
        IEnumerable<int> Expensive()
        {
            Console.Write("[src]");
            yield return 1; yield return 2; yield return 3;
        }
        var seq = Expensive();
        Console.WriteLine(" first: " + seq.First());
        Console.WriteLine(" count: " + seq.Count()); // re-enumerates; consider materializing

        var cached = seq.ToList();
        Console.WriteLine(" cached count: " + cached.Count);
    }
}
