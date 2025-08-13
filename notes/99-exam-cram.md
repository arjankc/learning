# Exam Cram: C#/.NET Quick Reference

Use this as your last‑minute refresher. Practice from the section prompts in each chapter; this page is for recall.

## Core C#
- Value vs reference: structs/enums vs classes/arrays/strings (string is reference/immutable). Passing ref type copies the reference.
- Conversions: implicit (safe) vs explicit (cast); checked for overflow; boxing/unboxing for value types.
- Flow: if/else, switch (patterns, when guards), loops (for/while/foreach), break/continue.
- Iterators: `yield return` (lazy), `yield break` (stop). Side effects occur on enumeration.

## OOP essentials
- Encapsulation: hide fields; validate in properties; keep invariants.
- Inheritance: `virtual/override/abstract/sealed`; prefer composition for reuse.
- Polymorphism: interfaces or virtual methods; favor interface‑first design.
- Records: value semantics and with‑expressions; great for immutable DTOs.

## Collections: pick fast
- List<T>: ordered, O(1) index, appends amortized O(1).
- Dictionary<TKey,TValue>: O(1) avg lookup; use StringComparer for string keys.
- HashSet<T>: fast uniqueness membership.
- Queue/Stack: FIFO/LIFO O(1) ops; BlockingCollection/ConcurrentBag for threads.
- Avoid repeated List.Remove in loops; prefer RemoveAll/filtering.

## Exceptions
- Use exceptions for exceptional paths; not control flow.
- Pattern: try → specific catch → generic catch (log) → finally. Filters: `catch (X ex) when (cond)`.
- Rethrow with `throw;` to preserve stack; prefer `TryXxx` for expected failures.
- Custom exception: serializable, useful properties, preserve inner.

## Delegates & events
- Delegates: `Action`, `Func`, `Predicate` cover most needs. Lambdas can capture variables (closures).
- Events: `event EventHandler<T>`; raise with null‑conditional; unsubscribe to avoid leaks.

## LINQ map
- Filter: Where; Project: Select/SelectMany; Sort: OrderBy/ThenBy; Group: GroupBy; Join: Join/GroupJoin; Sets: Distinct/Union/Intersect/Except; Aggregates: Count/Sum/Average/Aggregate.
- Deferred vs immediate: pipelines run on enumeration; materialize with ToList/ToArray when needed.
- IEnumerable vs IQueryable: in‑memory vs provider‑translated; avoid client‑only methods in IQueryable.

## Async/await
- Don’t block (no .Result/.Wait); async all the way. Use `Task.WhenAll` for parallel async IO.
- Cancellation: pass CancellationToken; catch OperationCanceledException. Timeouts via CTS.
- Libraries: `ConfigureAwait(false)`; UI apps usually capture context.
- Parallel: CPU‑bound → Parallel.ForEach/PLINQ; IO‑bound → async + WhenAll.

## ADO.NET vs EF Core
- ADO.NET: explicit SqlConnection/Command/Reader; optimal control and perf.
- EF Core: LINQ + change tracking; faster dev, migrations, relationships.
- Transactions: `BeginTransaction` + commit/rollback. Parameters prevent SQL injection.
- EF tips: scope DbContext per unit of work; `AsNoTracking` for read‑only; `Include` for navs; migrations: `add` then `update`.

## File I/O
- Use async IO on servers; `File.ReadLines` for lazy large files. JSON with System.Text.Json; XML with XmlSerializer.

## WPF
- Binding: INotifyPropertyChanged; modes (OneWay, TwoWay). Commands (ICommand) decouple UI.
- Validation: IDataErrorInfo/INotifyDataErrorInfo or ValidationRules on bindings.

## ASP.NET Core
- Pipeline order: UseRouting → UseAuthentication → UseAuthorization → Map endpoints.
- Minimal API shape: `app.MapGet("/path", (deps, ...) => Results.Ok(...));`
- Model binding, validation attributes, content negotiation (JSON default).

## Blazor
- Server vs WASM: latency/connection vs offline/native‑like; same component model.
- @inject DI for services; parameters via `[Parameter]`.

## Security
- Cookies (server pages) vs JWT (APIs/SPAs). HTTPS always; strict CORS.
- Roles: `[Authorize(Roles="Admin")]`; Policies: central requirements; claims‑based.

## CLR/BCL
- GC: Gen0/1/2, LOH; allocations cheap when short‑lived. Exceptions are costly when thrown.
- JIT: tiered compilation, ReadyToRun; diagnostics via dotnet‑trace/counters.
- Prefer BCL types first (collections, IO, HttpClient, JsonSerializer).

## DevOps
- CI: restore/build/test on push/PR. Cache deps. Fail fast on warnings.
- Docker: multi‑stage build; environment via variables; health checks.
- Cloud: config from env/Key Vault; enable logs and health probes; use slots for safe deploys.

## Last‑minute checks
- Nullable enabled; guard public APIs.
- Dispose IDisposables (`using`/`await using`).
- Avoid multiple enumeration of expensive sources.
- Validate user input; parameterize SQL; never log secrets.
