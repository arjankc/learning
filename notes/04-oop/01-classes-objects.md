# Classes and Objects

Classes model state and behavior; objects are instances with their own state. Prefer small, cohesive classes with clear responsibilities.

## Anatomy of a class
```csharp
public class BankAccount
{
	private decimal _balance;              // encapsulated field
	public string Owner { get; }           // init-only via constructor
	public decimal Balance => _balance;    // read-only property (expression-bodied)

	public BankAccount(string owner, decimal openingBalance = 0)
	{
		Owner = owner ?? throw new ArgumentNullException(nameof(owner));
		if (openingBalance < 0) throw new ArgumentOutOfRangeException(nameof(openingBalance));
		_balance = openingBalance;
	}

	public void Deposit(decimal amount)
	{
		if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
		_balance += amount;
	}

	public bool TryWithdraw(decimal amount)
	{
		if (amount <= 0) return false;
		if (amount > _balance) return false;
		_balance -= amount;
		return true;
	}
}

// Usage
var acct = new BankAccount("Alice", 100m);
acct.Deposit(50m);
Console.WriteLine(acct.Balance); // 150
```

## Properties, init-only, and validation
```csharp
public class Person
{
	private int _age;
	public string FirstName { get; init; } = string.Empty; // init-only at construction
	public string LastName  { get; init; } = string.Empty;
	public int Age
	{
		get => _age;
		set => _age = value >= 0 ? value : throw new ArgumentOutOfRangeException();
	}
}

var p = new Person { FirstName = "Ada", LastName = "Lovelace", Age = 28 };
```

## Indexers and static members
```csharp
public class WordBag
{
	private readonly Dictionary<string,int> _counts = new(StringComparer.OrdinalIgnoreCase);
	public int this[string word]
	{
		get => _counts.TryGetValue(word, out var c) ? c : 0;
		set => _counts[word] = value;
	}

	public static WordBag FromText(string text)
	{
		var bag = new WordBag();
		foreach (var w in text.Split(' ', StringSplitOptions.RemoveEmptyEntries))
			bag[w]++;
		return bag;
	}
}

var bag = WordBag.FromText("to be or not to be");
Console.WriteLine(bag["be"]); // 1
```

## Records for immutable data models
```csharp
public record Customer(string Id, string Name);

var c1 = new Customer("42", "Dana");
var c2 = c1 with { Name = "Dana S." }; // non-destructive mutation
Console.WriteLine(c1 == c2); // false (value equality)
```

## Object initialization and deconstruction
```csharp
public class Point
{
	public int X { get; init; }
	public int Y { get; init; }
	public void Deconstruct(out int x, out int y) { x = X; y = Y; }
}

var pt = new Point { X = 3, Y = 4 };
var (x, y) = pt; // x=3, y=4
```
