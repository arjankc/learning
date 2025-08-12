using Examples.FileIO.Demos;

Console.WriteLine("File I/O Demos\n--------------");

BasicReadWriteDemo.Run();
await JsonSerializationDemo.RunAsync();

Console.WriteLine("\nAll File I/O demos complete.");
