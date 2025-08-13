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

## Read More
- https://learn.microsoft.com/aspnet/core/blazor/
