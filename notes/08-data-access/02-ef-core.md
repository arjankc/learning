# Entity Framework Core

ORM for .NET with LINQ queries and change tracking.

## Model & DbContext
```csharp
public class Blog { public int Id { get; set; } public string Title { get; set; } = ""; public List<Post> Posts { get; set; } = new(); }
public class Post { public int Id { get; set; } public string Content { get; set; } = ""; public int BlogId { get; set; } public Blog? Blog { get; set; } }

public class AppDb : DbContext
{
	public DbSet<Blog> Blogs => Set<Blog>();
	public DbSet<Post> Posts => Set<Post>();
	protected override void OnConfiguring(DbContextOptionsBuilder b) => b.UseSqlite("Data Source=app.db");
	protected override void OnModelCreating(ModelBuilder mb) => mb.Entity<Post>().HasIndex(p => p.BlogId);
}
```

## Queries and tracking
```csharp
using var db = new AppDb();
db.Database.EnsureCreated();
db.Blogs.Add(new Blog { Title = "Hello" });
db.SaveChanges();

var blogs = await db.Blogs.AsNoTracking().Where(b => b.Title.Contains("H")).ToListAsync();
```

## Migrations (concept)
- Add: dotnet ef migrations add Initial
- Update DB: dotnet ef database update
- Track schema changes over time; commit migration files.

## Tips
- Scope DbContext per unit of work (e.g., per web request).
- Use AsNoTracking for read-only queries; include navigation properties with `.Include` when needed.

## Practice
- Add a unique index to Blog.Title using Fluent API and verify the constraint.
- Demonstrate tracking vs AsNoTracking and explain memory/perf impact in a list view.
- Implement a one-to-many with cascade delete and write a test to verify.

## Theory
### Change tracking and state
- DbContext tracks entity instances with states: Added, Modified, Deleted, Unchanged.
- `DetectChanges` scans tracked entities; disable or minimize tracking for large read scenarios.
- Use `AsNoTracking` for queries that don’t modify data; reattach entities with explicit states when updating detached graphs.

### LINQ translation
- Most query operators translate to SQL; some methods are client-evaluated—verify using `ToQueryString()`.
- Prevent N+1 by using `Include`/`ThenInclude` or composing joins intentionally.

### Transactions and concurrency
- `SaveChanges` runs in a transaction by default; use explicit transactions for multiple SaveChanges or cross-context operations.
- Implement optimistic concurrency with a rowversion/timestamp column; handle `DbUpdateConcurrencyException` by reloading/merging.

### Migrations practices
- Keep migrations small, named, and reviewed; include data migrations when needed.
- For destructive schema changes, back up and apply in maintenance windows.
