namespace Examples.Async.Demos;

public static class BasicsDemo
{
    public static async Task Run()
    {
        Console.WriteLine("\n== async/await basics ==");
        var result = await SimulateWorkAsync();
        Console.WriteLine($"Result: {result}");
    }

    private static async Task<int> SimulateWorkAsync()
    {
        await Task.Delay(200);
        return 42;
    }
}
