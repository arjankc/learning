# OOP Principles

Core pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction. Favor composition over deep inheritance chains.

## Encapsulation
Hide state, expose behavior with invariants enforced inside the type.
```csharp
public class Thermostat
{
	private double _temperature;
	public double Temperature
	{
		get => _temperature;
		set => _temperature = Math.Clamp(value, 10, 30); // keep within safe range
	}
}
```

## Inheritance (use sparingly)
```csharp
public abstract class Shape { public abstract double Area(); }
public class Rectangle : Shape
{
	public double Width { get; init; }
	public double Height { get; init; }
	public override double Area() => Width * Height;
}
public class Circle : Shape
{
	public double Radius { get; init; }
	public override double Area() => Math.PI * Radius * Radius;
}

Shape s = new Circle { Radius = 2 };
Console.WriteLine(s.Area());
```

## Polymorphism
Overriding via virtual/abstract methods; interface-based polymorphism preferred for decoupling.
```csharp
public interface IPrinter { void Print(string message); }
public class ConsolePrinter : IPrinter { public void Print(string m) => Console.WriteLine(m); }
public class UpperCasePrinter : IPrinter { public void Print(string m) => Console.WriteLine(m.ToUpperInvariant()); }

void Notify(IPrinter printer) => printer.Print("Hello");
```

## Abstraction
Express intent without committing to details.
```csharp
public interface IRepository<T>
{
	T? Get(string id);
	void Add(T entity);
}
```

## Composition over inheritance
```csharp
public class CachedRepository<T> : IRepository<T>
{
	private readonly IRepository<T> _inner;
	private readonly Dictionary<string,T> _cache = new();
	public CachedRepository(IRepository<T> inner) => _inner = inner;

	public T? Get(string id)
	{
		if (_cache.TryGetValue(id, out var v)) return v;
		var e = _inner.Get(id);
		if (e is not null) _cache[id] = e;
		return e;
	}
	public void Add(T entity) => _inner.Add(entity);
}
```

## Read More
- https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/
