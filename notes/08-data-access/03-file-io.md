# File I/O

## Streams
```csharp
await using var fs = new FileStream("data.bin", FileMode.Create, FileAccess.Write, FileShare.None, 8192, useAsync: true);
var bytes = Encoding.UTF8.GetBytes("hello");
await fs.WriteAsync(bytes);
```

## Text convenience
```csharp
File.WriteAllText("greet.txt", "hi");
var text = File.ReadAllText("greet.txt");
```

## JSON serialization
```csharp
record Person(string Name, int Age);
var json = System.Text.Json.JsonSerializer.Serialize(new Person("Ada", 28));
var p = System.Text.Json.JsonSerializer.Deserialize<Person>(json);
```

## XML serialization
```csharp
var xmlSer = new System.Xml.Serialization.XmlSerializer(typeof(Person));
await using var xfs = File.Create("person.xml");
xmlSer.Serialize(xfs, new Person("Ada", 28));
```

## Tips
- Prefer async IO for scalability in servers; sync is often fine for small local work.
- Use File.ReadLines (lazy) over ReadAllLines (eager) for large files.
