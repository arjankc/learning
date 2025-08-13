# IDE Setup (Visual Studio / VS Code)

## VS Code
- Install C# Dev Kit and .NET Runtime extension pack.
- Ensure .NET SDK installed: `dotnet --info`.
- Create a project: `dotnet new console -n Hello` → build/run: `dotnet run`.

## Visual Studio
- Workloads: “.NET desktop development”, “ASP.NET and web development”.
- Use Solution Explorer, launch profiles, integrated test runner, and code analyzers.

## Project configuration tips
- Nullable references: `<Nullable>enable</Nullable>` for safer APIs.
- Implicit usings: `<ImplicitUsings>enable</ImplicitUsings>` reduces boilerplate.
- Treat warnings as errors in CI: `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`.
- Add analyzers: StyleCop/IDEs, or enable Microsoft.CodeAnalysis.NetAnalyzers.

## CLI essentials
- `dotnet new`, `dotnet add package`, `dotnet build`, `dotnet test`, `dotnet publish`.
- `dotnet watch run` for hot reload during development.

## Read More
- https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio
- https://learn.microsoft.com/dotnet/core/tutorials/with-visual-studio-code
