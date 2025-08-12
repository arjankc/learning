namespace Examples.Basics.Demos;

public static class CollectionsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Collections (List, Dictionary, HashSet) ==");

        // List
        var list = new List<int> { 1, 2, 3 };
        list.Add(4);
        Console.WriteLine($"List count={list.Count}");

        // Dictionary
        var dict = new Dictionary<string, int> { ["one"] = 1 };
        dict["two"] = 2;
        Console.WriteLine($"Dictionary[\"two\"]={dict["two"]}");

        // HashSet
        var set = new HashSet<int> { 1, 2, 2 };
        Console.WriteLine($"HashSet count (no dups)={set.Count}");
    }
}
