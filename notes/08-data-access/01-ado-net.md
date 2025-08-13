# ADO.NET

Low-level data access with explicit connections, commands, and readers. Great for tight control and performance.

## Connected: commands and readers
```csharp
using var conn = new Microsoft.Data.Sqlite.SqliteConnection("Data Source=:memory:");
await conn.OpenAsync();
using var cmd = conn.CreateCommand();
cmd.CommandText = "CREATE TABLE T(Id INTEGER PRIMARY KEY, Name TEXT); INSERT INTO T(Name) VALUES ('Ada'); SELECT Id, Name FROM T;";
using var reader = await cmd.ExecuteReaderAsync();
while (await reader.ReadAsync())
	Console.WriteLine($"{reader.GetInt32(0)} {reader.GetString(1)}");
```

## Disconnected: DataTable
```csharp
var table = new System.Data.DataTable();
using (var cmd = conn.CreateCommand())
{
	cmd.CommandText = "SELECT 1 AS N UNION ALL SELECT 2";
	using var reader = await cmd.ExecuteReaderAsync();
	table.Load(reader); // Fast materialization without DataAdapter
}
```

Tips:
- Track RowState (Added/Modified/Deleted) to know what to persist.
- Prefer `DataTable.Load(IDataReader)` for simple reads.
- Keep ADO.NET for surgical control and batching; use EF/Dapper when object mapping productivity is needed.

## Transactions
```csharp
using var tx = await conn.BeginTransactionAsync();
try
{
	using var c1 = conn.CreateCommand(); c1.Transaction = tx; c1.CommandText = "INSERT INTO T(Name) VALUES ('Babbage')"; await c1.ExecuteNonQueryAsync();
	using var c2 = conn.CreateCommand(); c2.Transaction = tx; c2.CommandText = "INSERT INTO T(Name) VALUES ('Turing')"; await c2.ExecuteNonQueryAsync();
	await tx.CommitAsync();
}
catch
{
	await tx.RollbackAsync();
	throw;
}
```

## Further reading
- https://learn.microsoft.com/dotnet/framework/data/adonet/ado-net-overview
