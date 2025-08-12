using Microsoft.EntityFrameworkCore;

namespace Examples.EFCore.Demos;

public static class InMemoryDemo
{
    public static async Task RunAsync()
    {
        Console.WriteLine("\n== EF Core: InMemory provider ==");

        var options = new DbContextOptionsBuilder<PeopleContext>()
            .UseInMemoryDatabase("people-db")
            .Options;

        await using var db = new PeopleContext(options);
        if (!await db.People.AnyAsync())
        {
            await db.People.AddRangeAsync(
                new Person { FirstName = "Ada", LastName = "Lovelace" },
                new Person { FirstName = "Alan", LastName = "Turing" }
            );
            await db.SaveChangesAsync();
        }

        var query = await db.People
            .Where(p => p.LastName.StartsWith("L"))
            .OrderBy(p => p.FirstName)
            .ToListAsync();

        Console.WriteLine(string.Join(", ", query.Select(p => p.FirstName + " " + p.LastName)));
    }

    private sealed class PeopleContext : DbContext
    {
        public PeopleContext(DbContextOptions<PeopleContext> options) : base(options) { }
        public DbSet<Person> People => Set<Person>();
    }

    private sealed class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
