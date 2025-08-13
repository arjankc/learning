# Debugging Techniques

Debugging is about fast feedback and narrowing hypotheses.

## Core tools
- Breakpoints (conditions, hit counts), data tips, watch/locals, call stack, step-into/out/over.
- Edit and Continue, exception settings (break on thrown/unhandled).

## Logging
```csharp
using Microsoft.Extensions.Logging;

using var loggerFactory = LoggerFactory.Create(b => b.AddSimpleConsole().SetMinimumLevel(LogLevel.Debug));
var logger = loggerFactory.CreateLogger("Demo");
logger.LogInformation("Starting module {Module}", "X");
```

## Tactics
- Reproduce deterministically; reduce the surface (disable concurrency, mock IO).
- Bisect changes (git); add asserts for invariants.
- Capture context: inputs, environment, timing, correlation IDs.

## Performance debugging
- dotnet-trace/dotnet-counters; sampling profilers; memory dumps (dotnet-gcdump).

## Read More
- https://learn.microsoft.com/visualstudio/debugger/debugger-feature-tour
