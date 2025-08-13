using Examples.AdoNet.Demos;

Console.WriteLine("ADO.NET Demos\n--------------");

await SqliteBasicsDemo.RunAsync();

await TransactionsAndDisconnectedDemo.RunAsync();

Console.WriteLine("\nAll ADO.NET demos complete.");
