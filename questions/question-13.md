# Question 13: Provided that a MSSQL database named "LibraryDb" with table named "Books" with following columns (Id as int, ISBN as varchar(20), Title as varchar(200), Publication Date as DateTime). Write a C# program to connect to the database and insert as many books as user wants, and finally display all the books in db. Explain the difference between ExecuteReader and ExecuteNonQuery.

## Complete Library Management Program:

```csharp
using System;
using System.Data;
using System.Data.SqlClient;

public class LibraryManagement
{
    private static string connectionString = "Server=localhost;Database=LibraryDb;Integrated Security=true;";
    
    public static void Main()
    {
        try
        {
            CreateDatabaseAndTable();
            
            bool continueAdding = true;
            while (continueAdding)
            {
                AddBook();
                
                Console.Write("Do you want to add another book? (y/n): ");
                string response = Console.ReadLine().ToLower();
                continueAdding = (response == "y" || response == "yes");
            }
            
            DisplayAllBooks();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    public static void CreateDatabaseAndTable()
    {
        string createTableQuery = @"
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Books' AND xtype='U')
            CREATE TABLE Books (
                Id INT PRIMARY KEY IDENTITY(1,1),
                ISBN VARCHAR(20) NOT NULL,
                Title VARCHAR(200) NOT NULL,
                PublicationDate DATETIME NOT NULL
            )";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(createTableQuery, connection))
                {
                    command.ExecuteNonQuery(); // Uses ExecuteNonQuery for CREATE TABLE
                    Console.WriteLine("Database table 'Books' created/verified successfully.");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
            }
        }
    }
    
    public static void AddBook()
    {
        try
        {
            Console.WriteLine("\n--- Add New Book ---");
            
            Console.Write("Enter ISBN: ");
            string isbn = Console.ReadLine();
            
            Console.Write("Enter Title: ");
            string title = Console.ReadLine();
            
            Console.Write("Enter Publication Date (yyyy-mm-dd): ");
            DateTime publicationDate = DateTime.Parse(Console.ReadLine());
            
            string insertQuery = @"
                INSERT INTO Books (ISBN, Title, PublicationDate) 
                VALUES (@ISBN, @Title, @PublicationDate)";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    // Add parameters to prevent SQL injection
                    command.Parameters.AddWithValue("@ISBN", isbn);
                    command.Parameters.AddWithValue("@Title", title);
                    command.Parameters.AddWithValue("@PublicationDate", publicationDate);
                    
                    int rowsAffected = command.ExecuteNonQuery(); // Uses ExecuteNonQuery for INSERT
                    Console.WriteLine($"Book added successfully! ({rowsAffected} row(s) affected)");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding book: {ex.Message}");
        }
    }
    
    public static void DisplayAllBooks()
    {
        string selectQuery = "SELECT Id, ISBN, Title, PublicationDate FROM Books ORDER BY Id";
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(selectQuery, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader()) // Uses ExecuteReader for SELECT
                    {
                        Console.WriteLine("\n--- All Books in Library ---");
                        Console.WriteLine($"{"ID",-5} {"ISBN",-15} {"Title",-30} {"Publication Date",-15}");
                        Console.WriteLine(new string('-', 70));
                        
                        while (reader.Read())
                        {
                            Console.WriteLine($"{reader["Id"],-5} " +
                                            $"{reader["ISBN"],-15} " +
                                            $"{reader["Title"],-30} " +
                                            $"{((DateTime)reader["PublicationDate"]).ToString("yyyy-MM-dd"),-15}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error displaying books: {ex.Message}");
            }
        }
    }
    
    // Additional methods to demonstrate ExecuteReader vs ExecuteNonQuery
    public static void DemonstrateExecuteMethods()
    {
        Console.WriteLine("\n=== ExecuteReader vs ExecuteNonQuery Demo ===");
        
        // ExecuteNonQuery examples
        ExecuteNonQueryExamples();
        
        // ExecuteReader examples
        ExecuteReaderExamples();
    }
    
    public static void ExecuteNonQueryExamples()
    {
        Console.WriteLine("\nExecuteNonQuery Examples:");
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            // INSERT example
            string insertQuery = "INSERT INTO Books (ISBN, Title, PublicationDate) VALUES ('123-456', 'Test Book', '2023-01-01')";
            using (SqlCommand command = new SqlCommand(insertQuery, connection))
            {
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine($"INSERT: {rowsAffected} row(s) affected");
            }
            
            // UPDATE example
            string updateQuery = "UPDATE Books SET Title = 'Updated Test Book' WHERE ISBN = '123-456'";
            using (SqlCommand command = new SqlCommand(updateQuery, connection))
            {
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine($"UPDATE: {rowsAffected} row(s) affected");
            }
            
            // DELETE example
            string deleteQuery = "DELETE FROM Books WHERE ISBN = '123-456'";
            using (SqlCommand command = new SqlCommand(deleteQuery, connection))
            {
                int rowsAffected = command.ExecuteNonQuery();
                Console.WriteLine($"DELETE: {rowsAffected} row(s) affected");
            }
        }
    }
    
    public static void ExecuteReaderExamples()
    {
        Console.WriteLine("\nExecuteReader Examples:");
        
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            // SELECT with specific columns
            string selectQuery = "SELECT TOP 3 ISBN, Title FROM Books";
            using (SqlCommand command = new SqlCommand(selectQuery, connection))
            {
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    Console.WriteLine("Top 3 Books (ISBN and Title only):");
                    while (reader.Read())
                    {
                        Console.WriteLine($"ISBN: {reader["ISBN"]}, Title: {reader["Title"]}");
                    }
                }
            }
        }
    }
}
```

## ExecuteReader vs ExecuteNonQuery:

| Aspect | ExecuteReader | ExecuteNonQuery |
|--------|---------------|-----------------|
| **Purpose** | Retrieve data from database | Execute commands that don't return data |
| **Return Type** | SqlDataReader | int (rows affected) |
| **Used For** | SELECT statements | INSERT, UPDATE, DELETE, CREATE, DROP |
| **Data Access** | Forward-only, read-only data stream | Number of affected rows |
| **Performance** | Efficient for large datasets | Fast for modification operations |
| **Connection** | Keeps connection open while reading | Releases connection immediately |

**Examples:**
```csharp
// ExecuteReader - for SELECT statements
using (SqlDataReader reader = command.ExecuteReader())
{
    while (reader.Read())
    {
        // Read data row by row
        string title = reader["Title"].ToString();
    }
}

// ExecuteNonQuery - for INSERT, UPDATE, DELETE
int rowsAffected = command.ExecuteNonQuery();
Console.WriteLine($"{rowsAffected} rows were modified");
```
