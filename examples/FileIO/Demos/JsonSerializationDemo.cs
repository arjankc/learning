using System.Text.Json;

namespace Examples.FileIO.Demos;

public static class JsonSerializationDemo
{
    public static async Task RunAsync()
    {
        Console.WriteLine("\n== JSON Serialization (System.Text.Json) ==");
        var person = new Person { FirstName = "Ada", LastName = "Lovelace" };
        var json = JsonSerializer.Serialize(person);
        Console.WriteLine($"JSON: {json}");

        var path = Path.Combine(Path.GetTempPath(), "person.json");
        await File.WriteAllTextAsync(path, json);
        var roundTrip = JsonSerializer.Deserialize<Person>(await File.ReadAllTextAsync(path));
        Console.WriteLine($"Round-trip: {roundTrip?.FirstName} {roundTrip?.LastName}");
        File.Delete(path);
    }

    private sealed class Person
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
