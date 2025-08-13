# Common Language Runtime (CLR)

The CLR is the virtual machine that runs .NET code. It loads assemblies, verifies IL, JIT-compiles methods to native code, and manages memory and execution.

## Role of CLR
- IL → native via Just-In-Time (JIT) compilation with tiered compilation (fast Tier0 → optimized Tier1).
- Memory management with a generational, concurrent, compacting Garbage Collector.
- Type safety, verification, security boundaries, exception handling.

## Key Services
- Garbage Collection: Generations (0/1/2), Large Object Heap (LOH), Server vs Workstation GC, Background GC.
- JIT: Tiered JIT, ReadyToRun (AOT-like precompiled IL), PGO (profile-guided optimization).
- Type System & Metadata: reflection, attributes, runtime type info (RTTI).
- Loading & Isolation: Assemblies, AssemblyLoadContext (plugin isolation), single-file publish.

## Practical effects
- Startup vs throughput: tiered JIT improves startup with later optimizations.
- Allocation patterns matter: short-lived objects die young (Gen0) → cheap; avoid LOH fragmentation.
- Exceptions are expensive when thrown; using them for control flow hurts performance.

## Interop (brief)
- P/Invoke to call native functions; `DllImport` attribute defines the boundary.
```csharp
using System.Runtime.InteropServices;

static class Native
{
	[DllImport("kernel32.dll")]
	public static extern void Sleep(uint dwMilliseconds);
}

Native.Sleep(100);
```

## Diagnostics hooks
- ETW/EventPipe (dotnet-trace), dotnet-counters, dotnet-gcdump, PerfView.
- In-process: `GC.GetTotalMemory`, `GC.TryStartNoGCRegion`, `Activity` for tracing.

## Additional theory
### Execution model
- IL and metadata describe types/methods; JIT compiles methods on first execution.
- Tiered compilation starts with fast code (Tier0) then re-JITs hot paths with optimizations (Tier1).
- ReadyToRun (R2R) publishes precompiled native stubs to reduce startup JIT work.

### GC internals
- Generational GC with ephemeral segments for Gen0/Gen1 and a separate Gen2; LOH holds large objects (~85k+).
- Finalizers run on a dedicated thread; objects with finalizers survive at least one extra collection.
- Use `IDisposable` and `using` to release unmanaged resources deterministically.

### Type safety and verification
- The CLR verifies IL for type safety unless running fully trusted/unsafe code.
- Unsafe code and stackalloc/pointers are available but opt-in and should be minimized.

### Loading and isolation
- AssemblyLoadContext enables custom probing and dynamic plugin loading in .NET 5+.
- Single-file publish bundles dependencies; trimming reduces unused IL where possible.
