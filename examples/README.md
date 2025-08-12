# Examples

Runnable C# examples accompanying the notes. Requires .NET SDK 8+.

## Projects
- Basics: `examples/Basics`
- LINQ: `examples/Linq`
- Async: `examples/Async`
 - File I/O: `examples/FileIO`
 - ADO.NET (SQLite): `examples/AdoNet`
 - WPF (Windows): `examples/WpfApp`
 - ASP.NET Core Web API: `examples/WebApi`
 - Blazor Server: `examples/BlazorServer`
 - Security (JWT + policies): `examples/Security`

## Quick start (PowerShell)

```powershell
# Install .NET SDK first: https://dotnet.microsoft.com/download
# Then build and run the Basics project
cd examples/Basics
# dotnet build
# dotnet run

# LINQ demos
cd ../Linq
# dotnet run

# Async demos
cd ../Async
# dotnet run

# File I/O demos
cd ../FileIO
# dotnet run

# ADO.NET (SQLite) demos
cd ../AdoNet
# dotnet run

# WPF app (Windows only)
cd ../WpfApp
# dotnet build
# .\bin\Debug\net8.0-windows\WpfApp.exe

# ASP.NET Core Web API
cd ../WebApi
# dotnet run

# Blazor Server
cd ../BlazorServer
# dotnet run

# Security (JWT) demo
cd ../Security
# dotnet run
# In a second terminal, request a token (replace USER):
# Invoke-WebRequest -Uri "http://localhost:5000/token?username=admin" -Method POST
# Use the token to call:
# Invoke-WebRequest -Uri "http://localhost:5000/secure" -Headers @{ Authorization = "Bearer <token>" }
```
