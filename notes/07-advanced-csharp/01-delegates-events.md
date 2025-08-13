# Delegates and Events

Delegates are type-safe function references; events build a publish/subscribe layer on top.

## Delegates and built-ins
```csharp
// Custom delegate type
public delegate int BinaryOp(int a, int b);
int Add(int x, int y) => x + y;
BinaryOp op = Add;
int r = op(2, 3); // 5

// Built-ins
Action<string> log = Console.WriteLine;     // no return
Func<int,int,int> mul = (a,b) => a * b;     // returns int
Predicate<int> isEven = n => n % 2 == 0;    // bool-returning Func<T,bool>
```

## Lambdas and closures
```csharp
int factor = 10;                  // captured variable
Func<int,int> times = n => n * factor;
factor = 20;                      // closure observes latest value
Console.WriteLine(times(2));      // 40
```

## Multicast delegates
```csharp
Action pipeline = () => Console.Write("A");
pipeline += () => Console.Write("B");
pipeline(); // prints AB
```

## Events (EventHandler pattern)
```csharp
public class Counter
{
	public event EventHandler<int>? ThresholdReached; // payload via generic arg
	private int _count;
	public void Increment()
	{
		_count++;
		if (_count % 5 == 0)
			ThresholdReached?.Invoke(this, _count); // raise safely with null-conditional
	}
}

var c = new Counter();
c.ThresholdReached += (s, value) => Console.WriteLine($"Hit {value}");
for (int i=0;i<10;i++) c.Increment();
```

## Custom event accessors (advanced)
```csharp
private EventHandler? _handlers;
public event EventHandler Something
{
	add { _handlers = (EventHandler?)Delegate.Combine(_handlers, value); }
	remove { _handlers = (EventHandler?)Delegate.Remove(_handlers, value); }
}
```

## Tips
- Prefer Action/Func over custom delegate types unless naming adds clarity.
- Be careful with closures in loops; capture the loop variable into a local.
- Unsubscribe from long-lived events to avoid memory leaks.

## Read More
- https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/
- https://learn.microsoft.com/dotnet/csharp/programming-guide/events/
