namespace Examples.Async.Demos;

public static class CancellationDemo
{
    public static async Task Run()
    {
        Console.WriteLine("\n== Cancellation Tokens ==");
        using var cts = new CancellationTokenSource(200);
        try
        {
            await WorkAsync(cts.Token);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Operation canceled");
        }
    }

    private static async Task WorkAsync(CancellationToken token)
    {
        for (int i = 0; i < 5; i++)
        {
            token.ThrowIfCancellationRequested();
            await Task.Delay(100, token);
        }
    }
}
