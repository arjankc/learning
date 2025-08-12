using Microsoft.EntityFrameworkCore;

namespace Examples.EFCore.Demos;

public static class SqliteDemo
{
    public static async Task RunAsync()
    {
        Console.WriteLine("\n== EF Core: SQLite provider ==");

        var dbPath = Path.Combine(Path.GetTempPath(), "efcore-demo.sqlite");
        var options = new DbContextOptionsBuilder<BlogContext>()
            .UseSqlite($"Data Source={dbPath}")
            .Options;

        await using var db = new BlogContext(options);
        await db.Database.EnsureCreatedAsync();

        if (!await db.Posts.AnyAsync())
        {
            await db.Posts.AddRangeAsync(
                new Post { Title = "Hello", Content = "World" },
                new Post { Title = "EF Core", Content = "SQLite sample" }
            );
            await db.SaveChangesAsync();
        }

        var posts = await db.Posts
            .Where(p => p.Title.Contains("e", StringComparison.OrdinalIgnoreCase))
            .OrderBy(p => p.Title)
            .ToListAsync();

        Console.WriteLine(string.Join(" | ", posts.Select(p => p.Title)));

        File.Delete(dbPath);
    }

    private sealed class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }
        public DbSet<Post> Posts => Set<Post>();
    }

    private sealed class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
