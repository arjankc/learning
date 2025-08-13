# Custom Collections

Implementing custom collections lets you enforce invariants and expose efficient operations. Prefer composition and interfaces.

## Implementing IEnumerable<T>
```csharp
public sealed class EvenNumbers : IEnumerable<int>
{
	private readonly int _limit;
	public EvenNumbers(int limit) => _limit = limit;
	public IEnumerator<int> GetEnumerator() => Iterator();
	System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
	private IEnumerator<int> Iterator()
	{
		for (int i = 0; i <= _limit; i += 2)
			yield return i;
	}
}
```

## Implementing IList<T> (sketch)
```csharp
public class BoundedList<T> : IList<T>
{
	private readonly List<T> _inner = new();
	public int Capacity { get; }
	public BoundedList(int capacity) => Capacity = capacity;
	public T this[int index] { get => _inner[index]; set => _inner[index] = value; }
	public int Count => _inner.Count;
	public bool IsReadOnly => false;
	public void Add(T item) { if (Count >= Capacity) throw new InvalidOperationException("Full"); _inner.Add(item); }
	public void Clear() => _inner.Clear();
	public bool Contains(T item) => _inner.Contains(item);
	public void CopyTo(T[] array, int arrayIndex) => _inner.CopyTo(array, arrayIndex);
	public IEnumerator<T> GetEnumerator() => _inner.GetEnumerator();
	public int IndexOf(T item) => _inner.IndexOf(item);
	public void Insert(int index, T item) { if (Count >= Capacity) throw new InvalidOperationException("Full"); _inner.Insert(index, item); }
	public bool Remove(T item) => _inner.Remove(item);
	public void RemoveAt(int index) => _inner.RemoveAt(index);
	System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => _inner.GetEnumerator();
}
```
