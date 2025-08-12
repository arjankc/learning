namespace Examples.Basics.Demos;

public static class ExceptionsDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Exceptions (try/catch/finally) ==");

        try
        {
            MightFail(0);
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Handled: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Cleanup in finally block");
        }
    }

    private static void MightFail(int divisor)
    {
        if (divisor == 0)
            throw new ArgumentException("Divisor cannot be zero.");
    }
}
