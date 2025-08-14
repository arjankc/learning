# Question 23: What are the streams in C#? Write a program to save content to file and read from it using stream.

## What are Streams?

**Streams** in C# represent a sequence of bytes that can be read from or written to. They provide a unified way to work with different data sources like files, memory, network connections, etc.

## Stream Hierarchy and Types:

```csharp
using System;
using System.IO;
using System.Text;

public class StreamDemo
{
    public static void Main()
    {
        Console.WriteLine("=== C# Streams Demonstration ===\n");
        
        // Basic file stream operations
        BasicFileStreamDemo();
        
        // StreamWriter and StreamReader
        StreamWriterReaderDemo();
        
        // Binary streams
        BinaryStreamDemo();
        
        // Memory streams
        MemoryStreamDemo();
        
        // Buffered streams
        BufferedStreamDemo();
        
        // Advanced stream operations
        AdvancedStreamOperations();
    }
    
    public static void BasicFileStreamDemo()
    {
        Console.WriteLine("1. Basic FileStream Operations:");
        
        string fileName = "basic_stream_demo.txt";
        
        try
        {
            // WRITING to file using FileStream
            using (FileStream writeStream = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                string content = "Hello, World! This is written using FileStream.";
                byte[] data = Encoding.UTF8.GetBytes(content);
                
                writeStream.Write(data, 0, data.Length);
                Console.WriteLine($"✓ Written {data.Length} bytes to {fileName}");
            }
            
            // READING from file using FileStream
            using (FileStream readStream = new FileStream(fileName, FileMode.Open, FileAccess.Read))
            {
                byte[] buffer = new byte[readStream.Length];
                int bytesRead = readStream.Read(buffer, 0, buffer.Length);
                
                string content = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"✓ Read {bytesRead} bytes from {fileName}");
                Console.WriteLine($"Content: {content}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            // Cleanup
            if (File.Exists(fileName))
                File.Delete(fileName);
        }
        
        Console.WriteLine();
    }
    
    public static void StreamWriterReaderDemo()
    {
        Console.WriteLine("2. StreamWriter and StreamReader:");
        
        string fileName = "text_stream_demo.txt";
        
        try
        {
            // WRITING text using StreamWriter
            using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
            using (StreamWriter writer = new StreamWriter(fileStream, Encoding.UTF8))
            {
                writer.WriteLine("=== Student Records ===");
                writer.WriteLine($"Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
                writer.WriteLine();
                
                // Write multiple lines
                string[] students = {
                    "John Doe, 23, Computer Science",
                    "Jane Smith, 22, Mathematics", 
                    "Bob Johnson, 24, Physics",
                    "Alice Brown, 21, Chemistry"
                };
                
                foreach (string student in students)
                {
                    writer.WriteLine(student);
                }
                
                writer.WriteLine();
                writer.WriteLine($"Total students: {students.Length}");
                
                Console.WriteLine($"✓ Written student records to {fileName}");
            }
            
            // READING text using StreamReader
            using (FileStream fileStream = new FileStream(fileName, FileMode.Open))
            using (StreamReader reader = new StreamReader(fileStream, Encoding.UTF8))
            {
                Console.WriteLine("✓ Reading content from file:");
                
                string line;
                int lineNumber = 1;
                
                while ((line = reader.ReadLine()) != null)
                {
                    Console.WriteLine($"Line {lineNumber:D2}: {line}");
                    lineNumber++;
                }
                
                // Alternative: Read entire file at once
                // string allContent = reader.ReadToEnd();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            if (File.Exists(fileName))
                File.Delete(fileName);
        }
        
        Console.WriteLine();
    }
    
    public static void BinaryStreamDemo()
    {
        Console.WriteLine("3. Binary Stream Operations:");
        
        string fileName = "binary_stream_demo.dat";
        
        try
        {
            // WRITING binary data
            using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
            using (BinaryWriter writer = new BinaryWriter(fileStream))
            {
                // Write different data types
                writer.Write(42);                          // int
                writer.Write(3.14159);                     // double
                writer.Write("Binary Stream Demo");        // string
                writer.Write(true);                        // bool
                writer.Write(DateTime.Now.ToBinary());     // DateTime as binary
                
                // Write array
                int[] numbers = { 1, 2, 3, 4, 5 };
                writer.Write(numbers.Length);
                foreach (int number in numbers)
                {
                    writer.Write(number);
                }
                
                Console.WriteLine("✓ Written binary data to file");
            }
            
            // READING binary data
            using (FileStream fileStream = new FileStream(fileName, FileMode.Open))
            using (BinaryReader reader = new BinaryReader(fileStream))
            {
                int intValue = reader.ReadInt32();
                double doubleValue = reader.ReadDouble();
                string stringValue = reader.ReadString();
                bool boolValue = reader.ReadBoolean();
                DateTime dateValue = DateTime.FromBinary(reader.ReadInt64());
                
                Console.WriteLine("✓ Read binary data from file:");
                Console.WriteLine($"  Integer: {intValue}");
                Console.WriteLine($"  Double: {doubleValue}");
                Console.WriteLine($"  String: {stringValue}");
                Console.WriteLine($"  Boolean: {boolValue}");
                Console.WriteLine($"  DateTime: {dateValue:yyyy-MM-dd HH:mm:ss}");
                
                // Read array
                int arrayLength = reader.ReadInt32();
                int[] numbers = new int[arrayLength];
                for (int i = 0; i < arrayLength; i++)
                {
                    numbers[i] = reader.ReadInt32();
                }
                Console.WriteLine($"  Array: [{string.Join(", ", numbers)}]");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            if (File.Exists(fileName))
                File.Delete(fileName);
        }
        
        Console.WriteLine();
    }
    
    public static void MemoryStreamDemo()
    {
        Console.WriteLine("4. Memory Stream Operations:");
        
        try
        {
            // Create and work with MemoryStream
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // Write to memory stream
                string data = "This data is stored in memory, not on disk!";
                byte[] bytes = Encoding.UTF8.GetBytes(data);
                
                memoryStream.Write(bytes, 0, bytes.Length);
                Console.WriteLine($"✓ Written {bytes.Length} bytes to memory stream");
                
                // Reset position to beginning
                memoryStream.Position = 0;
                
                // Read from memory stream
                byte[] readBuffer = new byte[memoryStream.Length];
                int bytesRead = memoryStream.Read(readBuffer, 0, readBuffer.Length);
                
                string readData = Encoding.UTF8.GetString(readBuffer, 0, bytesRead);
                Console.WriteLine($"✓ Read {bytesRead} bytes from memory stream");
                Console.WriteLine($"Content: {readData}");
                
                // Get all data as byte array
                byte[] allData = memoryStream.ToArray();
                Console.WriteLine($"Total memory stream size: {allData.Length} bytes");
            }
            
            // Memory stream with initial data
            byte[] initialData = Encoding.UTF8.GetBytes("Initial memory data");
            using (MemoryStream preloadedStream = new MemoryStream(initialData))
            {
                using (StreamReader reader = new StreamReader(preloadedStream))
                {
                    string content = reader.ReadToEnd();
                    Console.WriteLine($"Preloaded content: {content}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        
        Console.WriteLine();
    }
    
    public static void BufferedStreamDemo()
    {
        Console.WriteLine("5. Buffered Stream Operations:");
        
        string fileName = "buffered_stream_demo.txt";
        
        try
        {
            // Writing with BufferedStream
            using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
            using (BufferedStream bufferedStream = new BufferedStream(fileStream, 4096)) // 4KB buffer
            {
                byte[] data = Encoding.UTF8.GetBytes("Buffered stream improves performance for small, frequent operations.\n");
                
                // Write the same data multiple times
                for (int i = 0; i < 100; i++)
                {
                    bufferedStream.Write(data, 0, data.Length);
                }
                
                Console.WriteLine("✓ Written data using BufferedStream");
            }
            
            // Reading with BufferedStream
            using (FileStream fileStream = new FileStream(fileName, FileMode.Open))
            using (BufferedStream bufferedStream = new BufferedStream(fileStream, 4096))
            {
                byte[] buffer = new byte[1024];
                int totalBytesRead = 0;
                int bytesRead;
                
                while ((bytesRead = bufferedStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    totalBytesRead += bytesRead;
                }
                
                Console.WriteLine($"✓ Read {totalBytesRead} bytes using BufferedStream");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            if (File.Exists(fileName))
                File.Delete(fileName);
        }
        
        Console.WriteLine();
    }
    
    public static void AdvancedStreamOperations()
    {
        Console.WriteLine("6. Advanced Stream Operations:");
        
        string fileName = "advanced_stream_demo.json";
        
        try
        {
            // Create complex data structure
            var studentData = new
            {
                Students = new[]
                {
                    new { Name = "John Doe", Age = 23, GPA = 3.75 },
                    new { Name = "Jane Smith", Age = 22, GPA = 3.95 },
                    new { Name = "Bob Johnson", Age = 24, GPA = 3.60 }
                },
                CourseCode = "CS101",
                Semester = "Fall 2024"
            };
            
            // Write JSON-like data
            using (FileStream fileStream = new FileStream(fileName, FileMode.Create))
            using (StreamWriter writer = new StreamWriter(fileStream, Encoding.UTF8))
            {
                writer.WriteLine("{");
                writer.WriteLine($"  \"CourseCode\": \"{studentData.CourseCode}\",");
                writer.WriteLine($"  \"Semester\": \"{studentData.Semester}\",");
                writer.WriteLine("  \"Students\": [");
                
                for (int i = 0; i < studentData.Students.Length; i++)
                {
                    var student = studentData.Students[i];
                    writer.WriteLine("    {");
                    writer.WriteLine($"      \"Name\": \"{student.Name}\",");
                    writer.WriteLine($"      \"Age\": {student.Age},");
                    writer.WriteLine($"      \"GPA\": {student.GPA}");
                    writer.Write("    }");
                    
                    if (i < studentData.Students.Length - 1)
                        writer.WriteLine(",");
                    else
                        writer.WriteLine();
                }
                
                writer.WriteLine("  ]");
                writer.WriteLine("}");
            }
            
            Console.WriteLine("✓ Written JSON-like data to file");
            
            // Read and parse the data
            using (FileStream fileStream = new FileStream(fileName, FileMode.Open))
            using (StreamReader reader = new StreamReader(fileStream))
            {
                Console.WriteLine("✓ File contents:");
                
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    Console.WriteLine($"  {line}");
                }
            }
            
            // Demonstrate stream copying
            CopyStreamDemo(fileName);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            if (File.Exists(fileName))
                File.Delete(fileName);
            if (File.Exists("copied_" + fileName))
                File.Delete("copied_" + fileName);
        }
    }
    
    public static void CopyStreamDemo(string sourceFileName)
    {
        string targetFileName = "copied_" + sourceFileName;
        
        try
        {
            using (FileStream source = new FileStream(sourceFileName, FileMode.Open, FileAccess.Read))
            using (FileStream target = new FileStream(targetFileName, FileMode.Create, FileAccess.Write))
            {
                source.CopyTo(target);
                Console.WriteLine($"✓ Copied {sourceFileName} to {targetFileName}");
            }
            
            // Verify copy
            FileInfo sourceInfo = new FileInfo(sourceFileName);
            FileInfo targetInfo = new FileInfo(targetFileName);
            
            Console.WriteLine($"Source size: {sourceInfo.Length} bytes");
            Console.WriteLine($"Target size: {targetInfo.Length} bytes");
            Console.WriteLine($"Copy successful: {sourceInfo.Length == targetInfo.Length}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Copy error: {ex.Message}");
        }
    }
}

// Utility class for stream operations
public static class StreamUtilities
{
    // Read entire file as string
    public static string ReadAllText(string fileName)
    {
        using (FileStream stream = new FileStream(fileName, FileMode.Open))
        using (StreamReader reader = new StreamReader(stream))
        {
            return reader.ReadToEnd();
        }
    }
    
    // Write string to file
    public static void WriteAllText(string fileName, string content)
    {
        using (FileStream stream = new FileStream(fileName, FileMode.Create))
        using (StreamWriter writer = new StreamWriter(stream))
        {
            writer.Write(content);
        }
    }
    
    // Append text to file
    public static void AppendText(string fileName, string content)
    {
        using (FileStream stream = new FileStream(fileName, FileMode.Append))
        using (StreamWriter writer = new StreamWriter(stream))
        {
            writer.WriteLine(content);
        }
    }
    
    // Count lines in a text file
    public static int CountLines(string fileName)
    {
        int lineCount = 0;
        using (FileStream stream = new FileStream(fileName, FileMode.Open))
        using (StreamReader reader = new StreamReader(stream))
        {
            while (reader.ReadLine() != null)
            {
                lineCount++;
            }
        }
        return lineCount;
    }
    
    // Convert stream to byte array
    public static byte[] StreamToByteArray(Stream stream)
    {
        using (MemoryStream memoryStream = new MemoryStream())
        {
            stream.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}

// Custom stream wrapper example
public class LoggingStream : Stream
{
    private Stream baseStream;
    private string logPrefix;
    
    public LoggingStream(Stream baseStream, string logPrefix)
    {
        this.baseStream = baseStream;
        this.logPrefix = logPrefix;
    }
    
    public override bool CanRead => baseStream.CanRead;
    public override bool CanSeek => baseStream.CanSeek;
    public override bool CanWrite => baseStream.CanWrite;
    public override long Length => baseStream.Length;
    
    public override long Position 
    { 
        get => baseStream.Position; 
        set => baseStream.Position = value; 
    }
    
    public override void Flush()
    {
        Console.WriteLine($"{logPrefix}: Flushing stream");
        baseStream.Flush();
    }
    
    public override int Read(byte[] buffer, int offset, int count)
    {
        int bytesRead = baseStream.Read(buffer, offset, count);
        Console.WriteLine($"{logPrefix}: Read {bytesRead} bytes");
        return bytesRead;
    }
    
    public override long Seek(long offset, SeekOrigin origin)
    {
        long position = baseStream.Seek(offset, origin);
        Console.WriteLine($"{logPrefix}: Seek to position {position}");
        return position;
    }
    
    public override void SetLength(long value)
    {
        Console.WriteLine($"{logPrefix}: Set length to {value}");
        baseStream.SetLength(value);
    }
    
    public override void Write(byte[] buffer, int offset, int count)
    {
        Console.WriteLine($"{logPrefix}: Writing {count} bytes");
        baseStream.Write(buffer, offset, count);
    }
    
    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            Console.WriteLine($"{logPrefix}: Disposing stream");
            baseStream?.Dispose();
        }
        base.Dispose(disposing);
    }
}
```

## Types of Streams in C#:

| Stream Type | Purpose | Use Case |
|-------------|---------|----------|
| **FileStream** | File I/O operations | Reading/writing files |
| **MemoryStream** | In-memory data | Temporary data storage |
| **NetworkStream** | Network communication | TCP/UDP data transfer |
| **BufferedStream** | Buffered I/O | Performance improvement |
| **StreamReader/Writer** | Text operations | Reading/writing text |
| **BinaryReader/Writer** | Binary operations | Reading/writing binary data |

## Key Stream Properties:

- **CanRead**: Whether stream supports reading
- **CanWrite**: Whether stream supports writing  
- **CanSeek**: Whether stream supports seeking
- **Length**: Total length of stream
- **Position**: Current position in stream

## Best Practices:
1. **Always use `using` statements** for automatic disposal
2. **Choose appropriate stream type** for your data
3. **Use buffered streams** for frequent small operations
4. **Handle exceptions** properly
5. **Set appropriate buffer sizes** for performance
6. **Close streams explicitly** or use `using` blocks
