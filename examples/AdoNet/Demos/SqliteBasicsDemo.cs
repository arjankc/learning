using Microsoft.Data.Sqlite;

namespace Examples.AdoNet.Demos;

public static class SqliteBasicsDemo
{
    public static async Task RunAsync()
    {
        Console.WriteLine("\n== ADO.NET with SQLite (commands, parameters, reader) ==");
        var dbPath = Path.Combine(Path.GetTempPath(), "ado-sample.sqlite");
        var cs = new SqliteConnectionStringBuilder { DataSource = dbPath }.ToString();

        await using var conn = new SqliteConnection(cs);
        await conn.OpenAsync();

        // Create schema
        await using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "CREATE TABLE IF NOT EXISTS People (Id INTEGER PRIMARY KEY, FirstName TEXT, LastName TEXT);";
            await cmd.ExecuteNonQueryAsync();
        }

        // Insert with parameters
        await using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "INSERT INTO People (FirstName, LastName) VALUES ($fn, $ln);";
            cmd.Parameters.AddWithValue("$fn", "Ada");
            cmd.Parameters.AddWithValue("$ln", "Lovelace");
            await cmd.ExecuteNonQueryAsync();
        }

        // Query with reader
        await using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT FirstName, LastName FROM People ORDER BY LastName;";
            await using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var first = reader.GetString(0);
                var last = reader.GetString(1);
                Console.WriteLine($"Person: {first} {last}");
            }
        }

        await conn.CloseAsync();
        File.Delete(dbPath);
    }
}
