namespace Examples.Async.Demos;

public static class AsyncStreamsDemo
{
    public static async Task Run()
    {
        Console.WriteLine("\n== async streams (IAsyncEnumerable) ==");
        using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(350));
        try
        {
            await foreach (var n in Tick(100, cts.Token))
            {
                Console.Write($"{n} ");
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("\n(cancelled)");
        }
    }

    private static async IAsyncEnumerable<int> Tick(int intervalMs, [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken ct = default)
    {
        var i = 0;
        while (!ct.IsCancellationRequested)
        {
            await Task.Delay(intervalMs, ct);
            yield return ++i;
        }
    }
}
