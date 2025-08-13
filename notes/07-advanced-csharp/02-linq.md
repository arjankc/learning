# LINQ

LINQ provides declarative querying for objects, XML, databases, and more.

## Two styles
```csharp
// Query syntax
var q = from n in Enumerable.Range(1, 10)
		where n % 2 == 0
		select n * n;

// Method syntax
var m = Enumerable.Range(1,10).Where(n => n % 2 == 0).Select(n => n * n);
```

## Core operators
- Filtering: Where
- Projection: Select, SelectMany
- Sorting: OrderBy/ThenBy
- Grouping: GroupBy
- Joining: Join, GroupJoin
- Set ops: Distinct, Union, Intersect, Except
- Aggregates: Count, Sum, Min/Max, Average, Aggregate

```csharp
var people = new[] {
	new { Name = "Ann", City = "NY", Age = 30 },
	new { Name = "Bob", City = "SF", Age = 25 },
	new { Name = "Cat", City = "NY", Age = 40 },
};

var byCity = people.GroupBy(p => p.City)
				   .Select(g => new { City = g.Key, AvgAge = g.Average(p => p.Age) });

var orders = new[] { new { Id = 1, Customer = "Ann" } };
var customers = new[] { new { Name = "Ann" }, new { Name = "Bob" } };
var join = from o in orders
		   join c in customers on o.Customer equals c.Name
		   select new { o.Id, o.Customer };
```

## Deferred vs immediate execution
- Deferred: Where/Select build a pipeline evaluated on enumeration.
- Immediate: ToList/ToArray/Count materialize or compute immediately.
```csharp
var source = new List<int> { 1, 2 };
var seq = source.Select(n => n * 10); // deferred
source.Add(3);
var arr = seq.ToArray(); // 10, 20, 30
```

## IEnumerable vs IQueryable
- IEnumerable: in-memory; operators run as .NET delegates.
- IQueryable: expression trees; provider can translate to SQL or other backends. Beware of unsupported methods.

## Tips
- Push filters early (Where) and project only what you need (Select) to reduce work.
- Avoid multiple enumeration if source is expensive; materialize once when needed.

## Practice
- Given orders with a CustomerId, output the top 3 orders by total per customer.
- Inner join vs group join: produce both and explain the shape differences.
- Flatten nested collections (customers -> orders -> lines) and compute totals with SelectMany.

## Read More
- https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/linq/
