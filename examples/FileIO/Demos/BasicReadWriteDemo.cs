namespace Examples.FileIO.Demos;

public static class BasicReadWriteDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== File Read/Write ==");
        var path = Path.Combine(Path.GetTempPath(), "demo.txt");
        File.WriteAllText(path, "hello world");
        var contents = File.ReadAllText(path);
        Console.WriteLine($"Wrote and read: '{contents}' at {path}");
        File.Delete(path);
    }
}
