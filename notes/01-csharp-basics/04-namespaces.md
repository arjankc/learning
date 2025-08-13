# Namespaces in C#

## Purpose of Namespaces
Namespaces organize types and prevent naming collisions across libraries and projects.

## Key Concepts
- Logical grouping: types with related purpose live together.
- Disambiguation: identical type names can coexist in different namespaces.
- Using directives: bring a namespace into scope to shorten type names.
- Aliases: assign a local alias to a type or namespace to avoid ambiguity.

## Design Tips
- Mirror folder structure with namespaces for clarity.
- Use company/product root (e.g., Company.Product.Module).
- Avoid deep nesting unless it communicates meaningful boundaries.

## Examples
Using directives and aliases:

```csharp
using System.Text;                 // bring types into scope
using Col = System.Collections.Generic; // alias

namespace Demo.Project;

public class Example
{
	public string JoinWords(Col.List<string> words)
		=> string.Join(' ', words);
}
```

Disambiguation with fully-qualified names:

```csharp
// If two types have the same name in different namespaces
global::System.Uri uri = new("https://example.com");
```
