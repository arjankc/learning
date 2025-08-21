# C#/.NET Learning Repository

C#/.NET Learning Repository is a comprehensive study resource containing runnable code examples, extensive notes, a gamified web-based learning interface, and auto-generated study materials. The repository includes multiple .NET 8 projects demonstrating core C# concepts, LINQ, async programming, web development, and more.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites
- .NET SDK 8+ is required (available on Linux/Ubuntu)
- PowerShell Core for script execution (optional but recommended)
- Python 3 for serving the web learning interface
- Web browser for viewing generated documentation

### Bootstrap and Build
Execute these commands in sequence to set up the repository:

```bash
# Verify .NET SDK availability - should show version 8.0+
dotnet --info

# Restore dependencies - takes ~1-17 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
dotnet restore ./LearningExamples.sln

# Build all projects (except WPF on Linux) - takes ~17 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
# Note: WPF project (examples/WpfApp) only builds on Windows - will fail with WindowsDesktop SDK error
dotnet build ./LearningExamples.sln -c Release --no-restore

# Build individual projects (recommended on Linux to avoid WPF errors):
for dir in AdoNet Async Basics BlazorServer EFCore FileIO Linq Security WebApi; do
    echo "Building examples/$dir"
    dotnet build "examples/$dir" -c Release --no-restore  # ~4-6 seconds each (first build)
done

# Build the BookBuilder tool - takes ~2-3 seconds
dotnet build ./tools/BookBuilder/BookBuilder.csproj -c Release --nologo

# Generate the consolidated study book - takes ~2 seconds
dotnet run --project ./tools/BookBuilder/BookBuilder.csproj -c Release -- $PWD
```

### Run the Learning Examples
Test the example projects to understand C# concepts:

```bash
# Run basic C# concepts demo
cd examples/Basics
dotnet run  # Shows data types, OOP, collections, exceptions, delegates

# Run LINQ demonstrations  
cd ../Linq
dotnet run  # Shows query syntax, method syntax, grouping, joins

# Run async/await patterns
cd ../Async
dotnet run  # Shows async patterns, Task usage, cancellation

# Run file I/O examples
cd ../FileIO
dotnet run  # Shows file operations, streams, JSON serialization

# Run database examples with EF Core
cd ../EFCore
dotnet run  # Shows Entity Framework operations with in-memory DB
# Note: EF Core example has a known issue with SQLite string comparison - this is expected

# Run ADO.NET with SQLite
cd ../AdoNet
dotnet run  # Shows raw SQL operations - works correctly

# Run Security/JWT examples
cd ../Security
dotnet run  # Shows JWT token generation and validation
```

### Run Web Applications
Start web applications for development and testing:

```bash
# Start ASP.NET Core Web API - serves on http://localhost:5000
cd examples/WebApi
dotnet run
# Test with: curl http://localhost:5000/weatherforecast

# Start Blazor Server app - serves on http://localhost:5000
cd examples/BlazorServer  
dotnet run
# Test with: curl http://localhost:5000

# Note: WPF app (examples/WpfApp) only runs on Windows
```

### Serve the Gamified Learning Interface
The repository includes a web-based gamified learning interface:

```bash
# Start the learning web interface - serves on http://localhost:8000
cd docs
python3 -m http.server 8000
# Access at: http://localhost:8000
# Features: levels, achievements, progress tracking, quiz system
```

### Generate Study Materials
Use PowerShell scripts to build comprehensive study materials:

```bash
# Build the consolidated book (Markdown + HTML) - takes ~5 seconds
pwsh -c "./build-book.ps1"
# Creates: book/book.md, book/book.html

# Other available scripts:
# - create-concept-questions.ps1: Generate concept-based questions
# - extract-questions-v2.ps1: Extract questions from content
# - strip-code-expand-theory.ps1: Focus on theoretical concepts
```

## Validation

### Manual Testing Requirements
ALWAYS manually validate changes by running through these scenarios:

1. **Basic Build Validation**: Run `dotnet restore` and individual project builds (avoid solution build on Linux)
2. **Example Project Validation**: Run at least 3 different example projects (Basics, LINQ, AdoNet)
3. **Web Application Testing**: Start WebAPI or BlazorServer and verify endpoints respond
4. **Security/JWT Testing**: Start Security example, get a JWT token, and test secure endpoint:
   ```bash
   # Terminal 1: Start security app
   cd examples/Security && dotnet run
   
   # Terminal 2: Test JWT workflow
   TOKEN=$(curl -s -X POST "http://localhost:5000/token?username=admin" | jq -r .access_token)
   curl -H "Authorization: Bearer $TOKEN" "http://localhost:5000/secure"
   ```
5. **BookBuilder Validation**: Generate the study book and verify output files are created
6. **Learning Interface Testing**: Start the docs web server and verify the interface loads

### Build and Test Commands
The repository has no unit test projects. Validation is done through example execution:

```bash
# No test command needed - validation through example execution
# Always test your changes by running relevant example projects
cd examples/[relevant-example] && dotnet run
```

### CI Validation Commands  
Always run these commands before completing your changes:

```bash
# Validate solution restore
dotnet restore ./LearningExamples.sln

# Validate individual project builds (recommended on Linux to avoid WPF errors)
for dir in AdoNet Async Basics BlazorServer EFCore FileIO Linq Security WebApi; do
    echo "Building examples/$dir"
    dotnet build "examples/$dir" -c Release --no-restore
done

# Validate BookBuilder tool
dotnet build ./tools/BookBuilder/BookBuilder.csproj -c Release --nologo
dotnet run --project ./tools/BookBuilder/BookBuilder.csproj -c Release -- $PWD

# No linting commands - repository doesn't use code style tools
```

## Common Tasks and Reference Information

### Repository Structure
```
learning/
├── .github/workflows/ci.yml          # CI pipeline (Windows-based)
├── LearningExamples.sln              # Main solution file  
├── examples/                         # Runnable code examples
│   ├── Basics/                      # Core C# concepts
│   ├── Linq/                        # LINQ demonstrations
│   ├── Async/                       # Async/await patterns
│   ├── FileIO/                      # File operations
│   ├── EFCore/                      # Entity Framework examples
│   ├── AdoNet/                      # Raw SQL with SQLite
│   ├── WebApi/                      # ASP.NET Core Web API
│   ├── BlazorServer/                # Blazor Server app
│   ├── Security/                    # JWT and security
│   └── WpfApp/                      # Windows-only WPF app
├── notes/                           # Structured learning notes
├── book/                           # Generated consolidated study materials
├── docs/                           # Gamified web learning interface
├── tools/BookBuilder/              # Tool for generating study book
└── *.ps1                           # PowerShell utility scripts
```

### Platform Limitations
- **Linux/Ubuntu**: Can build and run all projects except WpfApp (Windows-only)
- **Windows**: Can build and run all projects including WpfApp
- **CI Pipeline**: Runs on Windows (supports all projects)

### Build Timing Expectations
- **Solution restore**: ~1-17 seconds (varies by cache state) - NEVER CANCEL, set timeout to 30+ seconds
- **Solution build**: ~17 seconds (fails on Linux due to WPF) - NEVER CANCEL, set timeout to 30+ seconds  
- **Individual project build**: ~4-6 seconds each (first build), ~1 second (subsequent builds)
- **BookBuilder tool build**: ~2-3 seconds
- **BookBuilder execution**: ~2 seconds
- **Example project execution**: ~1-6 seconds (most are immediate)

### Key URLs and Endpoints
- **WebAPI**: http://localhost:5000/weatherforecast (when running)
- **BlazorServer**: http://localhost:5000 (when running)
- **Learning Interface**: http://localhost:8000 (when docs server running)
- **Generated Book**: file://[repo]/book/book.html

### Common File Locations
- **Solution file**: `./LearningExamples.sln`
- **Example projects**: `./examples/[ProjectName]/`
- **Generated book**: `./book/book.html` and `./book/book.md`
- **Learning notes**: `./notes/` (organized by topic)
- **Web interface**: `./docs/index.html`
- **Copilot instructions**: `copilot-instructions.md` (study syllabus - different from this file)

### Important Notes
- The repository contains **no unit test projects** - validation is done by running examples
- **WPF project fails on Linux** - this is expected and documented
- **PowerShell scripts may fail to open browsers** on Linux - this is harmless
- **Always run example projects** to validate your changes work correctly
- **BookBuilder tool consolidates** all notes from the notes/ directory into a single study book
- **Gamified learning interface** tracks progress and provides achievements system

### When Making Changes
1. **Always test relevant example projects** after making changes
2. **Run BookBuilder** if you modify notes or documentation
3. **Test web applications** by starting them and verifying endpoints
4. **Check generated outputs** in the book/ directory for formatting issues
5. **Validate the learning interface** still loads correctly

### Troubleshooting Common Issues
- **WPF build errors on Linux**: Expected - exclude WpfApp from builds on non-Windows
- **EFCore example crashes with string comparison error**: Known issue with SQLite provider - expected behavior
- **PowerShell script browser errors**: Harmless - files are still generated correctly
- **Port conflicts**: Web apps default to port 5000, learning interface to port 8000
- **Missing dependencies**: Run `dotnet restore` for any new packages
- **Build cache issues**: Delete bin/ and obj/ directories, then rebuild
