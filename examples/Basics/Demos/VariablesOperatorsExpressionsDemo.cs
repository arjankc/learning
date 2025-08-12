namespace Examples.Basics.Demos;

public static class VariablesOperatorsExpressionsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Variables, Operators, Expressions ==");

        // Declarations and initialization
        int x = 10;
        int y = 3;

        // Arithmetic
        int sum = x + y;
        int quotient = x / y;
        int remainder = x % y;
        Console.WriteLine($"sum={sum}, quotient={quotient}, remainder={remainder}");

        // Comparison and logical
        bool isGreater = x > y;
        bool bothTrue = (x > 0) && (y > 0);
        Console.WriteLine($"isGreater={isGreater}, bothTrue={bothTrue}");

        // Expressions with precedence; parentheses for clarity
        int result = (x + y) * 2;
        Console.WriteLine($"result={(x + y) * 2} (computed)");
    }
}
