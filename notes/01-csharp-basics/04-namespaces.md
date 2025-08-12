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

## Read More
- Microsoft Docs: Namespaces: https://learn.microsoft.com/dotnet/csharp/fundamentals/types/namespaces
