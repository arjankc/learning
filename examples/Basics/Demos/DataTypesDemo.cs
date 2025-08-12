namespace Examples.Basics.Demos;

public static class DataTypesDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Data Types: Value vs Reference ==");

        // Value type copy semantics
        int a = 42;
        int b = a; // copy
        b++;
        Console.WriteLine($"Value types: a={a}, b={b} (a unchanged)");

        // Reference type reference semantics
        int[] arr1 = { 1, 2, 3 };
        int[] arr2 = arr1; // same reference
        arr2[0] = 99;
        Console.WriteLine($"Reference types: arr1[0]={arr1[0]}, arr2[0]={arr2[0]} (both changed)");

        // String immutability (reference type, but immutable)
        string s1 = "hello";
        string s2 = s1;
        s2 = s2.ToUpperInvariant();
        Console.WriteLine($"Strings: s1='{s1}', s2='{s2}' (s1 unchanged due to immutability)");
    }
}
