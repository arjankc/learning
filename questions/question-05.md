# Question 5: Differentiate connected architecture of ADO.NET from disconnected architecture of ADO.NET. Write a C# program to connect to database and insert five employee records and delete employee records whose salary is less than Rs 10000.

## Connected vs Disconnected Architecture

| Aspect | Connected Architecture | Disconnected Architecture |
|--------|----------------------|---------------------------|
| **Connection** | Maintains active connection | Works with disconnected data |
| **Performance** | Faster for single operations | Better for multiple operations |
| **Memory Usage** | Less memory usage | More memory usage |
| **Concurrency** | Limited concurrent users | Supports many concurrent users |
| **Network Traffic** | Continuous network usage | Minimal network usage |
| **Offline Support** | No offline capability | Full offline support |
| **Data Modification** | Direct database updates | Batch updates possible |
| **Primary Classes** | SqlConnection, SqlCommand, SqlDataReader | DataSet, DataTable, SqlDataAdapter |
| **Use Case** | Simple read operations, real-time data | Complex operations, data manipulation |

## Database Program Implementation

```csharp
using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string JobTitle { get; set; }
    public string Address { get; set; }
    public float Salary { get; set; }
    public DateTime JoiningDate { get; set; }
}

public class EmployeeDataAccess
{
    // Connection string - update with your SQL Server details
    private string connectionString = @"Server=localhost;Database=Empinfo;Integrated Security=true;TrustServerCertificate=true;";
    
    // Alternative connection string for SQL Server Authentication
    // private string connectionString = @"Server=localhost;Database=Empinfo;User Id=sa;Password=yourpassword;TrustServerCertificate=true;";
    
    public static void Main()
    {
        var dataAccess = new EmployeeDataAccess();
        
        try
        {
            // Create database and table if they don't exist
            dataAccess.CreateDatabaseAndTable();
            
            // Insert five employee records
            dataAccess.InsertEmployeeRecords();
            
            // Display all employees before deletion
            Console.WriteLine("=== All Employees Before Deletion ===");
            dataAccess.DisplayAllEmployees();
            
            // Delete employees with salary less than 10000
            int deletedCount = dataAccess.DeleteLowSalaryEmployees();
            Console.WriteLine($"\n{deletedCount} employee(s) deleted with salary less than Rs. 10000");
            
            // Display remaining employees
            Console.WriteLine("\n=== Remaining Employees After Deletion ===");
            dataAccess.DisplayAllEmployees();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        
        Console.WriteLine("\nPress any key to exit...");
        Console.ReadKey();
    }
    
    // Create database and table
    private void CreateDatabaseAndTable()
    {
        string masterConnectionString = connectionString.Replace("Database=Empinfo", "Database=master");
        
        // Create database
        using (SqlConnection connection = new SqlConnection(masterConnectionString))
        {
            connection.Open();
            
            string createDbQuery = @"
                IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Empinfo')
                CREATE DATABASE Empinfo";
            
            using (SqlCommand command = new SqlCommand(createDbQuery, connection))
            {
                command.ExecuteNonQuery();
                Console.WriteLine("Database 'Empinfo' created or already exists.");
            }
        }
        
        // Create table
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            string createTableQuery = @"
                IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Employee]') AND type in (N'U'))
                CREATE TABLE Employee (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    Name NVARCHAR(50) NOT NULL,
                    JobTitle NVARCHAR(50) NOT NULL,
                    Address NVARCHAR(50) NOT NULL,
                    Salary FLOAT NOT NULL,
                    JoiningDate DATETIME NOT NULL
                )";
            
            using (SqlCommand command = new SqlCommand(createTableQuery, connection))
            {
                command.ExecuteNonQuery();
                Console.WriteLine("Table 'Employee' created or already exists.");
            }
        }
    }
    
    // Connected Architecture - Insert Employee Records
    private void InsertEmployeeRecords()
    {
        var employees = new[]
        {
            new Employee { Name = "John Doe", JobTitle = "Software Developer", Address = "123 Main St, City A", Salary = 55000, JoiningDate = DateTime.Now.AddYears(-2) },
            new Employee { Name = "Jane Smith", JobTitle = "Project Manager", Address = "456 Oak Ave, City B", Salary = 75000, JoiningDate = DateTime.Now.AddYears(-3) },
            new Employee { Name = "Mike Johnson", JobTitle = "Junior Developer", Address = "789 Pine Rd, City C", Salary = 8000, JoiningDate = DateTime.Now.AddMonths(-6) },
            new Employee { Name = "Sarah Wilson", JobTitle = "Senior Developer", Address = "321 Elm St, City D", Salary = 85000, JoiningDate = DateTime.Now.AddYears(-4) },
            new Employee { Name = "Tom Brown", JobTitle = "Intern", Address = "654 Maple Dr, City E", Salary = 5000, JoiningDate = DateTime.Now.AddMonths(-3) }
        };
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            // Clear existing data for demo
            string clearQuery = "DELETE FROM Employee";
            using (SqlCommand clearCommand = new SqlCommand(clearQuery, connection))
            {
                clearCommand.ExecuteNonQuery();
            }
            
            // Insert new records
            string insertQuery = @"
                INSERT INTO Employee (Name, JobTitle, Address, Salary, JoiningDate)
                VALUES (@Name, @JobTitle, @Address, @Salary, @JoiningDate)";
            
            foreach (var employee in employees)
            {
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Using parameters to prevent SQL injection
                    command.Parameters.AddWithValue("@Name", employee.Name);
                    command.Parameters.AddWithValue("@JobTitle", employee.JobTitle);
                    command.Parameters.AddWithValue("@Address", employee.Address);
                    command.Parameters.AddWithValue("@Salary", employee.Salary);
                    command.Parameters.AddWithValue("@JoiningDate", employee.JoiningDate);
                    
                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        Console.WriteLine($"Inserted: {employee.Name}");
                    }
                }
            }
            
            Console.WriteLine("\nAll employee records inserted successfully!");
        }
    }
    
    // Connected Architecture - Display All Employees using DataReader
    private void DisplayAllEmployees()
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            string selectQuery = "SELECT Id, Name, JobTitle, Address, Salary, JoiningDate FROM Employee ORDER BY Id";
            
            using (SqlCommand command = new SqlCommand(selectQuery, connection))
            using (SqlDataReader reader = command.ExecuteReader())
            {
                Console.WriteLine($"{"ID",-5} {"Name",-15} {"Job Title",-20} {"Address",-25} {"Salary",-10} {"Joining Date",-12}");
                Console.WriteLine(new string('-', 95));
                
                while (reader.Read())
                {
                    Console.WriteLine($"{reader["Id"],-5} " +
                                    $"{reader["Name"],-15} " +
                                    $"{reader["JobTitle"],-20} " +
                                    $"{reader["Address"],-25} " +
                                    $"{reader["Salary"],-10:F0} " +
                                    $"{((DateTime)reader["JoiningDate"]).ToString("yyyy-MM-dd"),-12}");
                }
            }
        }
    }
    
    // Connected Architecture - Delete Low Salary Employees
    private int DeleteLowSalaryEmployees()
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            string deleteQuery = "DELETE FROM Employee WHERE Salary < @MinSalary";
            
            using (SqlCommand command = new SqlCommand(deleteQuery, connection))
            {
                command.Parameters.AddWithValue("@MinSalary", 10000);
                
                int rowsDeleted = command.ExecuteNonQuery();
                return rowsDeleted;
            }
        }
    }
}

// Disconnected Architecture Example
public class DisconnectedEmployeeDataAccess
{
    private string connectionString = @"Server=localhost;Database=Empinfo;Integrated Security=true;TrustServerCertificate=true;";
    
    // Disconnected Architecture - Using DataSet and DataAdapter
    public void DisconnectedOperationsDemo()
    {
        DataSet employeeDataSet = new DataSet("EmployeeData");
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            // Create DataAdapter
            string selectQuery = "SELECT Id, Name, JobTitle, Address, Salary, JoiningDate FROM Employee";
            SqlDataAdapter adapter = new SqlDataAdapter(selectQuery, connection);
            
            // Configure command builders for automatic INSERT, UPDATE, DELETE commands
            SqlCommandBuilder commandBuilder = new SqlCommandBuilder(adapter);
            
            // Fill DataSet (connection opens and closes automatically)
            adapter.Fill(employeeDataSet, "Employees");
            
            // Work with data offline
            DataTable employeeTable = employeeDataSet.Tables["Employees"];
            
            Console.WriteLine("=== Working with Disconnected Data ===");
            Console.WriteLine($"Loaded {employeeTable.Rows.Count} employees into DataSet");
            
            // Modify data in memory
            foreach (DataRow row in employeeTable.Rows)
            {
                if ((double)row["Salary"] < 50000)
                {
                    row["Salary"] = (double)row["Salary"] * 1.1; // 10% raise
                    Console.WriteLine($"Increased salary for {row["Name"]}");
                }
            }
            
            // Add new employee
            DataRow newRow = employeeTable.NewRow();
            newRow["Name"] = "Alice Cooper";
            newRow["JobTitle"] = "Data Analyst";
            newRow["Address"] = "999 Data St, City F";
            newRow["Salary"] = 60000;
            newRow["JoiningDate"] = DateTime.Now;
            employeeTable.Rows.Add(newRow);
            
            // Update database with all changes in one batch
            try
            {
                int updatedRows = adapter.Update(employeeDataSet, "Employees");
                Console.WriteLine($"Updated {updatedRows} rows in database");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Update failed: {ex.Message}");
            }
        }
    }
}
```

