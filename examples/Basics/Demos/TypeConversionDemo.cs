namespace Examples.Basics.Demos;

public static class TypeConversionDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Type Conversion (Implicit/Explicit, Boxing) ==");

        // Implicit (widening)
        int small = 123;
        long wide = small; // implicit
        Console.WriteLine($"Implicit widening: int {small} -> long {wide}");

        // Explicit (narrowing)
        double pi = 3.14;
        int truncated = (int)pi; // explicit
        Console.WriteLine($"Explicit narrowing: double {pi} -> int {truncated}");

        // Checked overflow example
        try
        {
            checked
            {
                int max = int.MaxValue;
                // This will throw in checked context
                int overflow = max + 1;
                Console.WriteLine(overflow);
            }
        }
        catch (OverflowException)
        {
            Console.WriteLine("Overflow detected in checked context");
        }

        // Boxing / Unboxing
        object boxed = small; // boxing
        int unboxed = (int)boxed; // unboxing
        Console.WriteLine($"Boxing/unboxing round-trip: {unboxed}");
    }
}
