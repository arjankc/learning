# Question 3: Write a C# program to connect to the database, insert data into Database and display the data using ADO.NET.

```csharp
using System;
using System.Data;
using System.Data.SqlClient;

public class DatabaseOperations
{
    private static string connectionString = "Server=localhost;Database=StudentDB;Integrated Security=true;";
    
    public static void Main()
    {
        try
        {
            CreateDatabase();
            InsertStudentData();
            DisplayStudentData();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    public static void CreateDatabase()
    {
        string createTableQuery = @"
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Students' AND xtype='U')
            CREATE TABLE Students (
                Id INT PRIMARY KEY IDENTITY(1,1),
                Name NVARCHAR(50) NOT NULL,
                Age INT NOT NULL,
                Course NVARCHAR(100) NOT NULL,
                Grade DECIMAL(5,2) NOT NULL,
                EnrollmentDate DATETIME DEFAULT GETDATE()
            )";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand(createTableQuery, connection))
            {
                command.ExecuteNonQuery();
                Console.WriteLine("Table 'Students' created successfully.");
            }
        }
    }
    
    public static void InsertStudentData()
    {
        string insertQuery = @"
            INSERT INTO Students (Name, Age, Course, Grade) 
            VALUES (@Name, @Age, @Course, @Grade)";
        
        // Sample student data
        var students = new[]
        {
            new { Name = "Alice Johnson", Age = 20, Course = "Computer Science", Grade = 85.5m },
            new { Name = "Bob Smith", Age = 22, Course = "Mathematics", Grade = 92.0m },
            new { Name = "Charlie Brown", Age = 19, Course = "Physics", Grade = 78.5m },
            new { Name = "Diana Prince", Age = 21, Course = "Chemistry", Grade = 88.0m },
            new { Name = "Eve Wilson", Age = 20, Course = "Biology", Grade = 95.5m }
        };
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            foreach (var student in students)
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Name", student.Name);
                    command.Parameters.AddWithValue("@Age", student.Age);
                    command.Parameters.AddWithValue("@Course", student.Course);
                    command.Parameters.AddWithValue("@Grade", student.Grade);
                    
                    int rowsAffected = command.ExecuteNonQuery();
                    Console.WriteLine($"Inserted student: {student.Name} ({rowsAffected} row(s) affected)");
                }
            }
        }
    }
    
    public static void DisplayStudentData()
    {
        string selectQuery = "SELECT Id, Name, Age, Course, Grade, EnrollmentDate FROM Students ORDER BY Grade DESC";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand(selectQuery, connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    Console.WriteLine("\n--- Student Information ---");
                    Console.WriteLine($"{"ID",-5} {"Name",-20} {"Age",-5} {"Course",-20} {"Grade",-8} {"Enrollment Date",-20}");
                    Console.WriteLine(new string('-', 80));
                    
                    while (reader.Read())
                    {
                        Console.WriteLine($"{reader["Id"],-5} " +
                                        $"{reader["Name"],-20} " +
                                        $"{reader["Age"],-5} " +
                                        $"{reader["Course"],-20} " +
                                        $"{reader["Grade"],-8} " +
                                        $"{((DateTime)reader["EnrollmentDate"]).ToString("yyyy-MM-dd"),-20}");
                    }
                }
            }
        }
    }
    
    // Alternative method using DataSet (Disconnected architecture)
    public static void DisplayDataUsingDataSet()
    {
        string selectQuery = "SELECT * FROM Students";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlDataAdapter adapter = new SqlDataAdapter(selectQuery, connection);
            DataSet dataSet = new DataSet();
            
            adapter.Fill(dataSet, "Students");
            
            Console.WriteLine("\n--- Using DataSet ---");
            foreach (DataRow row in dataSet.Tables["Students"].Rows)
            {
                Console.WriteLine($"ID: {row["Id"]}, Name: {row["Name"]}, " +
                                $"Course: {row["Course"]}, Grade: {row["Grade"]}");
            }
        }
    }
    
    // Method to search students by course
    public static void SearchStudentsByCourse(string courseName)
    {
        string searchQuery = "SELECT * FROM Students WHERE Course = @Course";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand(searchQuery, connection))
            {
                command.Parameters.AddWithValue("@Course", courseName);
                
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    Console.WriteLine($"\n--- Students in {courseName} ---");
                    while (reader.Read())
                    {
                        Console.WriteLine($"{reader["Name"]} - Grade: {reader["Grade"]}");
                    }
                }
            }
        }
    }
}
```

