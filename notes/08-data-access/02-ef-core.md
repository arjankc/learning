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

## Read More
- https://learn.microsoft.com/ef/core/
