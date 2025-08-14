# Question 6: Describe the following terms: Razor View, Stream Reader and Stream Writer.

## Razor View

Razor is a markup syntax for embedding .NET code into web pages. It provides a clean and lightweight way to create dynamic web content.

**Characteristics:**
- Uses @ symbol to transition from HTML to C#
- Supports both C# and VB.NET
- IntelliSense support in Visual Studio
- Compile-time syntax checking

**Examples:**

```html
@{
    ViewData["Title"] = "Student List";
    var students = ViewBag.Students as List<Student>;
}

<h2>@ViewData["Title"]</h2>

@if (students != null && students.Any())
{
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var student in students)
            {
                <tr>
                    <td>@student.Name</td>
                    <td>@student.Age</td>
                    <td>@student.Course</td>
                    <td>@student.Grade.ToString("F2")</td>
                    <td>
                        <a href="@Url.Action("Edit", "Student", new { id = student.Id })">Edit</a> |
                        <a href="@Url.Action("Delete", "Student", new { id = student.Id })">Delete</a>
                    </td>
                </tr>
            }
        </tbody>
    </table>
}
else
{
    <p>No students found.</p>
}

@section Scripts {
    <script>
        function confirmDelete(studentName) {
            return confirm('Are you sure you want to delete ' + studentName + '?');
        }
    </script>
}
```

## Stream Reader

StreamReader is used to read characters from a stream in a particular encoding.

**Characteristics:**
- Reads text files efficiently
- Supports different encodings (UTF-8, ASCII, etc.)
- Implements IDisposable (use with using statement)
- Provides both synchronous and asynchronous methods

**Examples:**

```csharp
public class StreamReaderExamples
{
    public static void ReadTextFile()
    {
        string filePath = @"C:\temp\students.txt";
        
        // Method 1: Using 'using' statement (recommended)
        using (StreamReader reader = new StreamReader(filePath))
        {
            string content = reader.ReadToEnd();
            Console.WriteLine("File Content:");
            Console.WriteLine(content);
        }
        
        // Method 2: Reading line by line
        using (StreamReader reader = new StreamReader(filePath))
        {
            string line;
            int lineNumber = 1;
            
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine($"Line {lineNumber}: {line}");
                lineNumber++;
            }
        }
        
        // Method 3: Reading with specific encoding
        using (StreamReader reader = new StreamReader(filePath, Encoding.UTF8))
        {
            string content = reader.ReadToEnd();
            Console.WriteLine(content);
        }
    }
    
    public static async Task ReadTextFileAsync()
    {
        string filePath = @"C:\temp\students.txt";
        
        using (StreamReader reader = new StreamReader(filePath))
        {
            string content = await reader.ReadToEndAsync();
            Console.WriteLine("Async File Content:");
            Console.WriteLine(content);
        }
    }
    
    public static void ProcessLargeFile()
    {
        string filePath = @"C:\temp\largefile.txt";
        
        using (StreamReader reader = new StreamReader(filePath))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                // Process each line individually to save memory
                ProcessLine(line);
            }
        }
    }
    
    private static void ProcessLine(string line)
    {
        // Process individual line
        if (line.Contains("ERROR"))
        {
            Console.WriteLine($"Error found: {line}");
        }
    }
}
```

## Stream Writer

StreamWriter is used to write characters to a stream in a particular encoding.

**Characteristics:**
- Writes text to files efficiently
- Supports different encodings
- Can append to existing files
- Implements IDisposable
- Provides both synchronous and asynchronous methods

**Examples:**

```csharp
public class StreamWriterExamples
{
    public static void WriteTextFile()
    {
        string filePath = @"C:\temp\output.txt";
        
        // Method 1: Create new file (overwrites existing)
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            writer.WriteLine("Student Information");
            writer.WriteLine("==================");
            writer.WriteLine("Name: Alice Johnson");
            writer.WriteLine("Age: 20");
            writer.WriteLine("Course: Computer Science");
            writer.WriteLine($"Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
        }
        
        // Method 2: Append to existing file
        using (StreamWriter writer = new StreamWriter(filePath, append: true))
        {
            writer.WriteLine("\nAdditional Information:");
            writer.WriteLine("Grade: 85.5");
            writer.WriteLine("Status: Active");
        }
        
        // Method 3: With specific encoding
        using (StreamWriter writer = new StreamWriter(filePath, false, Encoding.UTF8))
        {
            writer.WriteLine("UTF-8 encoded content with special characters: áéíóú");
        }
    }
    
    public static void WriteStudentData()
    {
        string filePath = @"C:\temp\students.csv";
        
        var students = new[]
        {
            new { Name = "Alice", Age = 20, Course = "CS", Grade = 85.5 },
            new { Name = "Bob", Age = 22, Course = "Math", Grade = 92.0 },
            new { Name = "Charlie", Age = 19, Course = "Physics", Grade = 78.5 }
        };
        
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            // Write CSV header
            writer.WriteLine("Name,Age,Course,Grade");
            
            // Write student data
            foreach (var student in students)
            {
                writer.WriteLine($"{student.Name},{student.Age},{student.Course},{student.Grade}");
            }
        }
        
        Console.WriteLine($"Student data written to {filePath}");
    }
    
    public static async Task WriteTextFileAsync()
    {
        string filePath = @"C:\temp\async_output.txt";
        
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            await writer.WriteLineAsync("Async writing example");
            await writer.WriteLineAsync($"Written at: {DateTime.Now}");
        }
    }
    
    public static void LogExample()
    {
        string logPath = @"C:\temp\application.log";
        
        using (StreamWriter writer = new StreamWriter(logPath, append: true))
        {
            writer.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] INFO: Application started");
            writer.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] DEBUG: Processing user request");
            writer.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] ERROR: Database connection failed");
            
            // Ensure data is written immediately
            writer.Flush();
        }
    }
}
```

