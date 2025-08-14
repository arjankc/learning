# Question 11: Define term serialization and deserialization and write a program to write user input into file and display using stream class.

## Definitions:
- **Serialization**: Converting an object's state into a format that can be stored or transmitted
- **Deserialization**: Converting serialized data back into an object

## Complete Program Example:

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

[Serializable]
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Course { get; set; }
    public double Grade { get; set; }
    
    public Student() { }
    
    public Student(int id, string name, int age, string course, double grade)
    {
        Id = id;
        Name = name;
        Age = age;
        Course = course;
        Grade = grade;
    }
    
    public override string ToString()
    {
        return $"ID: {Id}, Name: {Name}, Age: {Age}, Course: {Course}, Grade: {Grade:F2}";
    }
}

public class SerializationDemo
{
    private static List<Student> students = new List<Student>();
    private static string jsonFilePath = @"C:\temp\students.json";
    private static string textFilePath = @"C:\temp\students.txt";
    
    public static void Main()
    {
        Directory.CreateDirectory(@"C:\temp");
        
        bool exit = false;
        while (!exit)
        {
            Console.WriteLine("\n=== Student Management System ===");
            Console.WriteLine("1. Add Student");
            Console.WriteLine("2. Display All Students");
            Console.WriteLine("3. Save to JSON File");
            Console.WriteLine("4. Load from JSON File");
            Console.WriteLine("5. Save to Text File");
            Console.WriteLine("6. Load from Text File");
            Console.WriteLine("7. Exit");
            Console.Write("Choose option: ");
            
            string choice = Console.ReadLine();
            
            switch (choice)
            {
                case "1": AddStudent(); break;
                case "2": DisplayStudents(); break;
                case "3": SaveToJson(); break;
                case "4": LoadFromJson(); break;
                case "5": SaveToTextFile(); break;
                case "6": LoadFromTextFile(); break;
                case "7": exit = true; break;
                default: Console.WriteLine("Invalid option!"); break;
            }
        }
    }
    
    public static void AddStudent()
    {
        try
        {
            Console.Write("Enter Student ID: ");
            int id = int.Parse(Console.ReadLine());
            
            Console.Write("Enter Student Name: ");
            string name = Console.ReadLine();
            
            Console.Write("Enter Student Age: ");
            int age = int.Parse(Console.ReadLine());
            
            Console.Write("Enter Course: ");
            string course = Console.ReadLine();
            
            Console.Write("Enter Grade (0-100): ");
            double grade = double.Parse(Console.ReadLine());
            
            Student student = new Student(id, name, age, course, grade);
            students.Add(student);
            
            Console.WriteLine("Student added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding student: {ex.Message}");
        }
    }
    
    public static void DisplayStudents()
    {
        if (students.Count == 0)
        {
            Console.WriteLine("No students found.");
            return;
        }
        
        Console.WriteLine("\n--- Student List ---");
        foreach (Student student in students)
        {
            Console.WriteLine(student);
        }
    }
    
    // JSON Serialization using System.Text.Json
    public static void SaveToJson()
    {
        try
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(students, options);
            
            using (StreamWriter writer = new StreamWriter(jsonFilePath))
            {
                writer.Write(jsonString);
            }
            
            Console.WriteLine($"Data saved to JSON file: {jsonFilePath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving to JSON: {ex.Message}");
        }
    }
    
    public static void LoadFromJson()
    {
        try
        {
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine("JSON file not found.");
                return;
            }
            
            string jsonString;
            using (StreamReader reader = new StreamReader(jsonFilePath))
            {
                jsonString = reader.ReadToEnd();
            }
            
            students = JsonSerializer.Deserialize<List<Student>>(jsonString) ?? new List<Student>();
            
            Console.WriteLine($"Data loaded from JSON file. {students.Count} students loaded.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading from JSON: {ex.Message}");
        }
    }
    
    // Custom Text File Format using StreamWriter/StreamReader
    public static void SaveToTextFile()
    {
        try
        {
            using (StreamWriter writer = new StreamWriter(textFilePath))
            {
                writer.WriteLine("# Student Data File");
                writer.WriteLine($"# Generated on: {DateTime.Now}");
                writer.WriteLine($"# Total Students: {students.Count}");
                writer.WriteLine("# Format: ID|Name|Age|Course|Grade");
                writer.WriteLine("---DATA---");
                
                foreach (Student student in students)
                {
                    writer.WriteLine($"{student.Id}|{student.Name}|{student.Age}|{student.Course}|{student.Grade}");
                }
                
                writer.WriteLine("---END---");
            }
            
            Console.WriteLine($"Data saved to text file: {textFilePath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving to text file: {ex.Message}");
        }
    }
    
    public static void LoadFromTextFile()
    {
        try
        {
            if (!File.Exists(textFilePath))
            {
                Console.WriteLine("Text file not found.");
                return;
            }
            
            students.Clear();
            bool dataSection = false;
            
            using (StreamReader reader = new StreamReader(textFilePath))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    if (line == "---DATA---")
                    {
                        dataSection = true;
                        continue;
                    }
                    
                    if (line == "---END---")
                    {
                        break;
                    }
                    
                    if (dataSection && !line.StartsWith("#"))
                    {
                        string[] parts = line.Split('|');
                        if (parts.Length == 5)
                        {
                            Student student = new Student
                            {
                                Id = int.Parse(parts[0]),
                                Name = parts[1],
                                Age = int.Parse(parts[2]),
                                Course = parts[3],
                                Grade = double.Parse(parts[4])
                            };
                            students.Add(student);
                        }
                    }
                }
            }
            
            Console.WriteLine($"Data loaded from text file. {students.Count} students loaded.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading from text file: {ex.Message}");
        }
    }
}
```
