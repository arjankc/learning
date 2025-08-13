# Asynchronous Programming

Use async/await to free threads while work is pending (IO), improving scalability and responsiveness.

## async/await basics
```csharp
async Task<string> DownloadAsync(HttpClient http, string url)
{
	var resp = await http.GetAsync(url); // awaits without blocking
	resp.EnsureSuccessStatusCode();
	return await resp.Content.ReadAsStringAsync();
}
```

## Cancellation and timeouts
```csharp
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
try
{
	await Task.Delay(5000, cts.Token);
}
catch (OperationCanceledException)
{
	// cancelled
}
```

## Error handling
```csharp
try { await SomeAsync(); }
catch (HttpRequestException ex) { /* network failure */ }
```

## ConfigureAwait
In libraries, prefer `await task.ConfigureAwait(false)` to avoid capturing context. In apps (UI), default capture is usually fine.

## Parallelism
```csharp
// CPU-bound parallel loop (data parallelism)
Parallel.ForEach(data, item => Process(item));

// Fire multiple IO tasks concurrently and await all
var tasks = urls.Select(http.GetStringAsync);
var pages = await Task.WhenAll(tasks);
```

## Tips
- Don’t block on async (no .Result/.Wait()); make your call chain async.
- Use `ValueTask` for high-throughput hot paths when appropriate.

## Read More
- https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/
