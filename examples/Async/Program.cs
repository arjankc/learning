using Examples.Async.Demos;

Console.WriteLine("Async Demos\n-----------");

await BasicsDemo.Run();
await CancellationDemo.Run();
ParallelDemo.Run();

Console.WriteLine("\nAll Async demos complete.");
