namespace Examples.Basics.Demos;

public static class IteratorsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Iterators (yield) ==");
        foreach (var n in FirstN(3))
            Console.Write(n + " ");
        Console.WriteLine();
    }

    private static IEnumerable<int> FirstN(int count)
    {
        for (int i = 1; i <= count; i++)
            yield return i;
    }
}
