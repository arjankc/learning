# Blazor

## Component basics
```razor
@page "/counter"
<h3>Counter</h3>
<p>Current count: @count</p>
<button class="btn btn-primary" @onclick="Increment">Click me</button>
@code { int count; void Increment() => count++; }
```

## Parameters and cascading values
```razor
<MyCard Title="Hello">Content</MyCard>

@code {
	[Parameter] public string Title { get; set; } = string.Empty;
}
```

## Dependency injection
```razor
@inject HttpClient Http
@code {
	protected override async Task OnInitializedAsync() { var data = await Http.GetStringAsync("/api"); }
}
```

## Hosting models
- Server: thin client, low download, requires persistent connection.
- WebAssembly: runs in browser, offline capable, larger download.

## Theory
### Rendering model
- Blazor uses a diffing renderer; components re-render when parameters or state change via `StateHasChanged`.
- Server model sends UI diffs over SignalR; WebAssembly renders in the browser.

### Component lifecycle
- Hooks: `OnInitialized[Async]`, `OnParametersSet[Async]`, `OnAfterRender[Async]` (and Async variants) control setup and post-render work.
- Implement `IDisposable` to clean up timers/subscriptions.

### JS interop
- Use `IJSRuntime` and JS modules for interop; keep DOM-specific tasks in JS.
- Prefer strongly-typed wrappers for maintainability.
