# ADO.NET

## Definition
ADO.NET is a set of classes that expose data access services for .NET Framework programmers, providing access to relational databases, XML, and application data.

## ADO.NET Architecture

### Core Components
1. **Data Provider** - Connects to database
2. **DataSet** - In-memory representation of data
3. **DataAdapter** - Bridge between DataSet and data source
4. **DataReader** - Forward-only, read-only data stream

```
+----------------+    +------------------+    +----------------+
|   Application  |<-->|    DataSet       |<-->|  DataAdapter   |
|                |    |  (Disconnected)  |    |                |
+----------------+    +------------------+    +----------------+
                                                       |
+----------------+    +------------------+            |
|   Application  |<-->|   DataReader     |<-----------+
|                |    |   (Connected)    |            |
+----------------+    +------------------+            |
                                                      |
                                             +----------------+
                                             |   Data Source  |
                                             |   (Database)   |
                                             +----------------+
```

**Connection Types:**
- **DataSet**: Disconnected - loads data into memory, works offline
- **DataReader**: Connected - requires active connection, reads forward-only

## DataReader vs DataSet

### DataReader (Connected Architecture)
```csharp
public class DataReaderExample
{
    private string connectionString = "Server=localhost;Database=TestDB;Integrated Security=true;";
    
    public void ReadDataWithDataReader()
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            string sql = "SELECT EmployeeId, FirstName, LastName, Salary FROM Employees";
            using (SqlCommand command = new SqlCommand(sql, connection))
            using (SqlDataReader reader = command.ExecuteReader())
            {
                Console.WriteLine("Employee Data:");
                Console.WriteLine("ID\tFirst Name\tLast Name\tSalary");
                Console.WriteLine("".PadRight(50, '-'));
                
                while (reader.Read())
                {
                    int id = reader.GetInt32("EmployeeId");
                    string firstName = reader.GetString("FirstName");
                    string lastName = reader.GetString("LastName");
                    decimal salary = reader.GetDecimal("Salary");
                    
                    Console.WriteLine($"{id}\t{firstName}\t\t{lastName}\t\t{salary:C}");
                }
            }
            // Connection automatically closed due to using statement
        }
    }
    
    public async Task ReadDataAsync()
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            await connection.OpenAsync();
            
            string sql = "SELECT * FROM Products WHERE CategoryId = @categoryId";
            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@categoryId", 1);
                
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        string productName = reader["ProductName"].ToString();
                        decimal price = Convert.ToDecimal(reader["Price"]);
                        Console.WriteLine($"{productName}: {price:C}");
                    }
                }
            }
        }
    }
}
```

### DataSet (Disconnected Architecture)
```csharp
public class DataSetExample
{
    private string connectionString = "Server=localhost;Database=TestDB;Integrated Security=true;";
    
    public void WorkWithDataSet()
    {
        // Create DataSet and DataAdapter
        DataSet dataSet = new DataSet("EmployeeDataSet");
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            // Create DataAdapter
            string sql = "SELECT EmployeeId, FirstName, LastName, DepartmentId FROM Employees";
            SqlDataAdapter adapter = new SqlDataAdapter(sql, connection);
            
            // Fill DataSet (connection opened and closed automatically)
            adapter.Fill(dataSet, "Employees");
            
            // Work with data offline
            DataTable employeeTable = dataSet.Tables["Employees"];
            
            // Display data
            foreach (DataRow row in employeeTable.Rows)
            {
                Console.WriteLine($"{row["EmployeeId"]}: {row["FirstName"]} {row["LastName"]}");
            }
            
            // Modify data
            DataRow newRow = employeeTable.NewRow();
            newRow["FirstName"] = "John";
            newRow["LastName"] = "Doe";
            newRow["DepartmentId"] = 1;
            employeeTable.Rows.Add(newRow);
            
            // Update database
            SqlCommandBuilder commandBuilder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Employees");
        }
    }
    
    public void DataSetWithRelations()
    {
        DataSet dataSet = new DataSet();
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            // Fill Departments table
            SqlDataAdapter deptAdapter = new SqlDataAdapter("SELECT * FROM Departments", connection);
            deptAdapter.Fill(dataSet, "Departments");
            
            // Fill Employees table
            SqlDataAdapter empAdapter = new SqlDataAdapter("SELECT * FROM Employees", connection);
            empAdapter.Fill(dataSet, "Employees");
            
            // Create relationship
            DataRelation relation = new DataRelation("DeptEmployees",
                dataSet.Tables["Departments"].Columns["DepartmentId"],
                dataSet.Tables["Employees"].Columns["DepartmentId"]);
            dataSet.Relations.Add(relation);
            
            // Navigate relationship
            foreach (DataRow deptRow in dataSet.Tables["Departments"].Rows)
            {
                Console.WriteLine($"Department: {deptRow["DepartmentName"]}");
                
                DataRow[] employees = deptRow.GetChildRows(relation);
                foreach (DataRow empRow in employees)
                {
                    Console.WriteLine($"  Employee: {empRow["FirstName"]} {empRow["LastName"]}");
                }
            }
        }
    }
}
```

## Steps to Connect to SQL Database

```csharp
public class DatabaseConnection
{
    // Step 1: Define connection string
    private readonly string connectionString = 
        "Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;";
    
    // Alternative with integrated security
    private readonly string integratedConnectionString = 
        "Server=myServerAddress;Database=myDataBase;Integrated Security=true;";
    
    public void ConnectToDatabase()
    {
        // Step 2: Create SqlConnection object
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                // Step 3: Open the connection
                connection.Open();
                Console.WriteLine("Connection opened successfully!");
                Console.WriteLine($"Database: {connection.Database}");
                Console.WriteLine($"Server Version: {connection.ServerVersion}");
                
                // Step 4: Create and execute command
                string sql = "SELECT COUNT(*) FROM Employees";
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    // Step 5: Execute command and get result
                    int employeeCount = (int)command.ExecuteScalar();
                    Console.WriteLine($"Total employees: {employeeCount}");
                }
                
                // Step 6: Connection automatically closed by using statement
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"SQL Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
            }
        }
    }
    
    // CRUD Operations Example
    public class EmployeeCRUD
    {
        private readonly string connectionString;
        
        public EmployeeCRUD(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        // CREATE
        public int CreateEmployee(string firstName, string lastName, decimal salary, int departmentId)
        {
            string sql = @"INSERT INTO Employees (FirstName, LastName, Salary, DepartmentId) 
                          VALUES (@firstName, @lastName, @salary, @departmentId);
                          SELECT SCOPE_IDENTITY();";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@firstName", firstName);
                    command.Parameters.AddWithValue("@lastName", lastName);
                    command.Parameters.AddWithValue("@salary", salary);
                    command.Parameters.AddWithValue("@departmentId", departmentId);
                    
                    return Convert.ToInt32(command.ExecuteScalar());
                }
            }
        }
        
        // READ
        public Employee GetEmployee(int employeeId)
        {
            string sql = "SELECT * FROM Employees WHERE EmployeeId = @employeeId";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@employeeId", employeeId);
                    
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Employee
                            {
                                EmployeeId = reader.GetInt32("EmployeeId"),
                                FirstName = reader.GetString("FirstName"),
                                LastName = reader.GetString("LastName"),
                                Salary = reader.GetDecimal("Salary"),
                                DepartmentId = reader.GetInt32("DepartmentId")
                            };
                        }
                    }
                }
            }
            return null;
        }
        
        // UPDATE
        public bool UpdateEmployee(Employee employee)
        {
            string sql = @"UPDATE Employees 
                          SET FirstName = @firstName, LastName = @lastName, 
                              Salary = @salary, DepartmentId = @departmentId
                          WHERE EmployeeId = @employeeId";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@firstName", employee.FirstName);
                    command.Parameters.AddWithValue("@lastName", employee.LastName);
                    command.Parameters.AddWithValue("@salary", employee.Salary);
                    command.Parameters.AddWithValue("@departmentId", employee.DepartmentId);
                    command.Parameters.AddWithValue("@employeeId", employee.EmployeeId);
                    
                    return command.ExecuteNonQuery() > 0;
                }
            }
        }
        
        // DELETE
        public bool DeleteEmployee(int employeeId)
        {
            string sql = "DELETE FROM Employees WHERE EmployeeId = @employeeId";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@employeeId", employeeId);
                    return command.ExecuteNonQuery() > 0;
                }
            }
        }
    }
    
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
    }
}
```

## LINQ to SQL

```csharp
// Entity classes
[Table(Name = "Employees")]
public class Employee
{
    [Column(IsPrimaryKey = true, IsDbGenerated = true)]
    public int EmployeeId { get; set; }
    
    [Column]
    public string FirstName { get; set; }
    
    [Column]
    public string LastName { get; set; }
    
    [Column]
    public decimal Salary { get; set; }
    
    [Column]
    public int DepartmentId { get; set; }
}

// DataContext
public class CompanyDataContext : DataContext
{
    public CompanyDataContext(string connectionString) : base(connectionString) { }
    
    public Table<Employee> Employees => GetTable<Employee>();
}

// Usage
public class LinqToSqlExample
{
    private string connectionString = "Server=localhost;Database=Company;Integrated Security=true;";
    
    public void QueryWithLinqToSql()
    {
        using (var context = new CompanyDataContext(connectionString))
        {
            // Query syntax
            var highEarners = from emp in context.Employees
                             where emp.Salary > 50000
                             orderby emp.Salary descending
                             select emp;
            
            Console.WriteLine("High earners:");
            foreach (var employee in highEarners)
            {
                Console.WriteLine($"{employee.FirstName} {employee.LastName}: {employee.Salary:C}");
            }
            
            // Method syntax
            var topPerformers = context.Employees
                .Where(e => e.Salary > 75000)
                .OrderByDescending(e => e.Salary)
                .Take(5)
                .ToList();
            
            // Insert new employee
            var newEmployee = new Employee
            {
                FirstName = "Jane",
                LastName = "Smith",
                Salary = 60000,
                DepartmentId = 1
            };
            
            context.Employees.InsertOnSubmit(newEmployee);
            context.SubmitChanges();
        }
    }
}
```
