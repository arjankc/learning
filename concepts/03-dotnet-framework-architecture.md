# .NET Framework Architecture

## Key Components

### 1. Common Language Runtime (CLR)
- **Memory Management**: Automatic garbage collection
- **Type Safety**: Ensures type safety at runtime
- **Exception Handling**: Unified exception handling
- **Thread Management**: Manages application threads
- **Security**: Code access security

### 2. Base Class Library (BCL)
- **System.Object**: Root of all .NET types
- **Collections**: Generic and non-generic collections
- **I/O**: File and stream operations
- **Networking**: Network communication classes

### 3. .NET Framework vs .NET Core vs .NET 5+

| Feature | .NET Framework | .NET Core | .NET 5+ |
|---------|---------------|-----------|---------|
| **Platform** | Windows only | Cross-platform | Cross-platform |
| **Open Source** | No | Yes | Yes |
| **Performance** | Good | Better | Best |
| **Deployment** | Framework dependent | Self-contained options | Self-contained options |

## Architecture Diagram
```
+-------------------------------------+
|        Your Application            |
+-------------------------------------+
|    Base Class Library (BCL)        |
+-------------------------------------+
|  Common Language Runtime (CLR)     |
+-------------------------------------+
|       Operating System             |
+-------------------------------------+
```

**Layer Description:**
- **Your Application**: C# code you write (WPF, Console, Web, etc.)
- **Base Class Library**: Built-in .NET classes (System.*, Collections, etc.)
- **Common Language Runtime**: Memory management, type safety, execution
- **Operating System**: Windows, Linux, macOS platform services
