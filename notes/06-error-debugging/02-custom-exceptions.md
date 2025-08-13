# Custom Exceptions

Define custom exceptions to convey domain-specific failures and enable precise handling.

## Template
```csharp
[Serializable]
public class OrderProcessingException : Exception
{
	public string? OrderId { get; }
	public OrderProcessingException() { }
	public OrderProcessingException(string message) : base(message) { }
	public OrderProcessingException(string message, Exception inner) : base(message, inner) { }
	public OrderProcessingException(string message, string orderId) : base(message) => OrderId = orderId;
	protected OrderProcessingException(System.Runtime.Serialization.SerializationInfo info,
									   System.Runtime.Serialization.StreamingContext context)
		: base(info, context) { }
}
```

## Tips
- Name them clearly; include meaningful properties (like identifiers).
- Preserve inner exceptions; they’re essential for root-cause analysis.
- Avoid throwing exceptions for control flow; use `TryXxx` when failure is common.
