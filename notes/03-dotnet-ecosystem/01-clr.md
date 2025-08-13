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

## Read More
- https://learn.microsoft.com/dotnet/standard/clr
- https://learn.microsoft.com/dotnet/standard/garbage-collection/
