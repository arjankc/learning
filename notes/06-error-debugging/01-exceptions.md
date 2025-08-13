# Exception Handling

Exceptions represent exceptional, non-expected paths. Use them to signal failure, not for normal branching.

## Basics: try/catch/finally
```csharp
try
{
	using var stream = File.OpenRead("config.json");
	// work with stream
}
catch (FileNotFoundException ex)
{
	Console.Error.WriteLine($"Missing config: {ex.FileName}");
}
catch (IOException ex) when (ex.HResult == -2147024864) // example of filter (file in use)
{
	Console.Error.WriteLine("File is locked.");
}
catch (Exception ex)
{
	Console.Error.WriteLine($"Unexpected: {ex}");
	throw; // rethrow preserving stack trace
}
finally
{
	// cleanup that must always run
}
```

## Best practices
- Catch narrowly; let higher layers handle what they own.
- Use exception filters (`catch (X ex) when (...)`) to avoid partial state changes.
- Don’t swallow exceptions silently; log with context.
- Prefer `TryXxx` patterns (e.g., `int.TryParse`) when failure is expected.

## Creating error context
```csharp
try
{
	ProcessOrder(orderId);
}
catch (OrderStorageException ex)
{
	throw new OrderProcessingException($"Could not process order {orderId}", ex);
}
```

## Theory: reliability and observability
- Throwing is expensive; design for the happy path and throw only for truly exceptional cases.
- Rethrow with `throw;` to preserve the original stack.
- Avoid leaking secrets in messages; include useful IDs/correlation tokens.
- Add global exception handling appropriate to the app type (ASP.NET Core middleware, WPF DispatcherUnhandledException).
- Use first-chance exception settings when debugging to catch issues close to the source.
