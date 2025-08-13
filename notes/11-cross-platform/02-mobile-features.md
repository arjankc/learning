# Mobile Features

## Local Storage (SQLite.NET)
```csharp
using SQLite;
public class Person { [PrimaryKey, AutoIncrement] public int Id { get; set; } public string Name { get; set; } = ""; }
var db = new SQLiteAsyncConnection(dbPath);
await db.CreateTableAsync<Person>();
await db.InsertAsync(new Person { Name = "Ada" });
```

## Platform-specific code
```csharp
public interface IDeviceInfo { string GetModel(); }
// Implement per platform and register with DependencyService or via MAUI handlers.
```

## OAuth 2.0 / OIDC
- Use the system browser; follow the authorization code flow with PKCE.
- Store tokens securely (Keychain/Keystore); refresh tokens carefully.

## Read More
- https://learn.microsoft.com/xamarin/
