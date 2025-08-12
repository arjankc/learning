namespace Examples.Basics.Demos;

public static class LoopingDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Looping (for, while, foreach) ==");

        // for loop
        int total = 0;
        for (int i = 1; i <= 3; i++)
            total += i;
        Console.WriteLine($"for total={total}");

        // while loop
        int n = 3;
        while (n > 0)
            n--;
        Console.WriteLine($"while n={n}");

        // foreach
        var items = new[] { "a", "b", "c" };
        foreach (var it in items)
            Console.Write(it + " ");
        Console.WriteLine();
    }
}
