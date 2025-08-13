using Microsoft.Data.Sqlite;

namespace Examples.AdoNet.Demos;

public static class TransactionsAndDisconnectedDemo
{
    public static async Task RunAsync()
    {
        Console.WriteLine("\n== transactions + disconnected ==");
        using var conn = new Microsoft.Data.Sqlite.SqliteConnection("Data Source=:memory:");
        await conn.OpenAsync();
        await using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "CREATE TABLE T(Id INTEGER PRIMARY KEY, Name TEXT);";
            await cmd.ExecuteNonQueryAsync();
        }

        await using var tx = await conn.BeginTransactionAsync();
        try
        {
            await using var c1 = conn.CreateCommand(); c1.Transaction = (SqliteTransaction)tx; c1.CommandText = "INSERT INTO T(Name) VALUES ('Ada')"; await c1.ExecuteNonQueryAsync();
            await using var c2 = conn.CreateCommand(); c2.Transaction = (SqliteTransaction)tx; c2.CommandText = "INSERT INTO T(Name) VALUES ('Turing')"; await c2.ExecuteNonQueryAsync();
            await tx.CommitAsync();
        }
        catch
        {
            await tx.RollbackAsync();
            throw;
        }

        var table = new System.Data.DataTable();
        await using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT * FROM T";
            await using var reader = await cmd.ExecuteReaderAsync();
            table.Load(reader);
        }
        foreach (System.Data.DataRow row in table.Rows)
        {
            Console.WriteLine($"{row["Id"]}: {row["Name"]}");
        }
    }
}
