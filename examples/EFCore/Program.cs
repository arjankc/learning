using Examples.EFCore.Demos;

Console.WriteLine("EF Core Demos\n-------------");

await InMemoryDemo.RunAsync();
await SqliteDemo.RunAsync();

Console.WriteLine("\nAll EF Core demos complete.");
