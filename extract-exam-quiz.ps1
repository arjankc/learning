# Extract quiz questions from the questions folder and create CSV
$questionsPath = "C:\Users\Arjan\learning\questions"
$csvPath = "C:\Users\Arjan\learning\exam-questions.csv"

Write-Host "Reading question files from: $questionsPath"

# Define quiz questions based on the exam question content
$quizQuestions = @(
    @{
        Question = "What is the main difference between 'for loop' and 'foreach loop' in C#?"
        Options = @("for loop provides index access, foreach doesn't", "foreach is faster than for loop", "for loop only works with arrays", "No difference")
        Answer = 1
    },
    @{
        Question = "What is an event in C#?"
        Options = @("A method that returns void", "A special kind of multicast delegate for notifications", "A type of exception", "A database connection")
        Answer = 2
    },
    @{
        Question = "Which namespace is required for ADO.NET database operations?"
        Options = @("System.IO", "System.Data", "System.Net", "System.Web")
        Answer = 2
    },
    @{
        Question = "What does LINQ stand for?"
        Options = @("Language Integrated Query", "Linear Query", "Linked Query", "Local Integrated Query")
        Answer = 1
    },
    @{
        Question = "What is deferred execution in LINQ?"
        Options = @("Query executes immediately", "Query execution is delayed until enumeration", "Query never executes", "Query executes in background")
        Answer = 2
    },
    @{
        Question = "Which LINQ operator is used for filtering?"
        Options = @("Select", "Where", "OrderBy", "GroupBy")
        Answer = 2
    },
    @{
        Question = "What is the difference between value types and reference types?"
        Options = @("No difference", "Value types store data directly, reference types store references", "Reference types are faster", "Value types can be null")
        Answer = 2
    },
    @{
        Question = "What are the different types of inheritance in C#?"
        Options = @("Single, Multiple, Multilevel", "Single, Multilevel, Hierarchical, Interface", "Only Single", "Single and Multiple only")
        Answer = 2
    },
    @{
        Question = "What is AJAX used for in web development?"
        Options = @("Database operations", "Asynchronous web requests without page reload", "File operations", "Memory management")
        Answer = 2
    },
    @{
        Question = "What is the main benefit of using AJAX?"
        Options = @("Faster server performance", "Improved user experience with partial page updates", "Better security", "Reduced memory usage")
        Answer = 2
    },
    @{
        Question = "Which method is used to check if conversion is possible in C#?"
        Options = @("Convert.ToInt32()", "int.Parse()", "int.TryParse()", "(int)value")
        Answer = 3
    },
    @{
        Question = "What is serialization in C#?"
        Options = @("Converting objects to string format", "Converting object state to storable/transmittable format", "Creating new objects", "Deleting objects")
        Answer = 2
    },
    @{
        Question = "What is TPL in C#?"
        Options = @("Type Parameter Library", "Task Parallel Library", "Template Processing Library", "Text Processing Library")
        Answer = 2
    },
    @{
        Question = "What is the main purpose of using statements in C#?"
        Options = @("Import namespaces", "Create variables", "Define methods", "Handle exceptions")
        Answer = 1
    },
    @{
        Question = "What is a delegate in C#?"
        Options = @("A variable", "A type that represents references to methods", "A class", "An interface")
        Answer = 2
    },
    @{
        Question = "What is polymorphism in C#?"
        Options = @("Multiple inheritance", "Ability of objects to take multiple forms", "Creating multiple classes", "Using multiple namespaces")
        Answer = 2
    },
    @{
        Question = "What is the difference between abstract classes and interfaces?"
        Options = @("No difference", "Abstract classes can have implementation, interfaces cannot", "Interfaces are faster", "Abstract classes are deprecated")
        Answer = 2
    },
    @{
        Question = "What is exception handling in C#?"
        Options = @("Preventing errors", "Managing runtime errors gracefully", "Creating errors", "Ignoring errors")
        Answer = 2
    },
    @{
        Question = "Which keywords are used for exception handling in C#?"
        Options = @("if-else", "try-catch-finally", "switch-case", "for-while")
        Answer = 2
    },
    @{
        Question = "What is parallel programming?"
        Options = @("Writing code in parallel files", "Executing multiple tasks simultaneously", "Creating multiple classes", "Using multiple databases")
        Answer = 2
    },
    @{
        Question = "What does ADO.NET stand for?"
        Options = @("Active Data Objects .NET", "Application Data Objects .NET", "Advanced Data Objects .NET", "Automated Data Objects .NET")
        Answer = 1
    },
    @{
        Question = "What is WPF?"
        Options = @("Web Programming Framework", "Windows Presentation Foundation", "Web Page Foundation", "Windows Programming Framework")
        Answer = 2
    },
    @{
        Question = "What is the main advantage of WPF over WinForms?"
        Options = @("Better performance", "Better UI capabilities and data binding", "Smaller file size", "Faster development")
        Answer = 2
    },
    @{
        Question = "What is ASP.NET Core?"
        Options = @("Desktop application framework", "Cross-platform web framework", "Database framework", "Mobile app framework")
        Answer = 2
    },
    @{
        Question = "What is middleware in ASP.NET Core?"
        Options = @("Database layer", "Components that handle HTTP requests/responses", "UI components", "Configuration files")
        Answer = 2
    },
    @{
        Question = "What is Blazor?"
        Options = @("JavaScript framework", "Framework for building web UIs using C#", "Database framework", "Mobile framework")
        Answer = 2
    },
    @{
        Question = "What are the two types of Blazor?"
        Options = @("Client and Server", "Server-side and Client-side", "Web and Desktop", "Static and Dynamic")
        Answer = 2
    },
    @{
        Question = "What is Xamarin used for?"
        Options = @("Web development", "Cross-platform mobile app development", "Desktop applications", "Database management")
        Answer = 2
    },
    @{
        Question = "What is XAML?"
        Options = @("eXtensible Application Markup Language", "eXtended Application Management Language", "eXternal Application Markup Language", "eXecutable Application Markup Language")
        Answer = 1
    },
    @{
        Question = "What is the difference between Xamarin and Xamarin.Forms?"
        Options = @("No difference", "Xamarin.Forms provides shared UI, Xamarin requires platform-specific UI", "Xamarin.Forms is faster", "Xamarin is deprecated")
        Answer = 2
    },
    @{
        Question = "What is SQLite.NET in Xamarin?"
        Options = @("Web framework", "Local database solution for mobile apps", "Network library", "UI framework")
        Answer = 2
    },
    @{
        Question = "What is data binding in C#?"
        Options = @("Connecting to database", "Connecting UI elements to data sources", "Creating data structures", "Validating data")
        Answer = 2
    },
    @{
        Question = "What is Entity Framework?"
        Options = @("UI framework", "Object-Relational Mapping (ORM) framework", "Web framework", "Testing framework")
        Answer = 2
    },
    @{
        Question = "What is the difference between DataReader and DataSet?"
        Options = @("No difference", "DataReader is forward-only, DataSet loads all data in memory", "DataSet is faster", "DataReader loads all data")
        Answer = 2
    },
    @{
        Question = "What is MVC pattern?"
        Options = @("Model-View-Controller architectural pattern", "Multiple-View-Components pattern", "Model-Variable-Class pattern", "Method-View-Class pattern")
        Answer = 1
    },
    @{
        Question = "What is MVVM pattern?"
        Options = @("Model-View-ViewModel architectural pattern", "Multiple-View-Variable-Model pattern", "Model-Variable-View-Method pattern", "Method-View-Variable-Model pattern")
        Answer = 1
    },
    @{
        Question = "What is dependency injection?"
        Options = @("Creating dependencies", "Design pattern for providing dependencies to objects", "Removing dependencies", "Testing dependencies")
        Answer = 2
    },
    @{
        Question = "What is authentication in web applications?"
        Options = @("Data validation", "Verifying user identity", "Error handling", "Data encryption")
        Answer = 2
    },
    @{
        Question = "What is authorization in web applications?"
        Options = @("User login", "Determining what authenticated users can access", "Data validation", "Error handling")
        Answer = 2
    },
    @{
        Question = "What is a Razor Page?"
        Options = @("JavaScript page", "Page-focused framework for building web apps", "Database page", "Configuration page")
        Answer = 2
    },
    @{
        Question = "What are the C# access modifiers?"
        Options = @("public, private only", "public, private, protected, internal, protected internal", "public, protected only", "public, internal only")
        Answer = 2
    },
    @{
        Question = "What is encapsulation in OOP?"
        Options = @("Creating multiple classes", "Hiding internal implementation details", "Inheriting from classes", "Creating interfaces")
        Answer = 2
    },
    @{
        Question = "What is inheritance in OOP?"
        Options = @("Creating new classes", "Creating classes based on existing classes", "Deleting classes", "Copying classes")
        Answer = 2
    },
    @{
        Question = "What is the purpose of the 'using' statement (not directive) in C#?"
        Options = @("Import namespaces", "Automatic resource cleanup", "Create variables", "Handle exceptions")
        Answer = 2
    },
    @{
        Question = "What is a stream in C#?"
        Options = @("A method", "Sequence of bytes for input/output operations", "A variable", "A class")
        Answer = 2
    },
    @{
        Question = "What is the difference between overloading and overriding?"
        Options = @("No difference", "Overloading is same method name with different parameters, overriding is redefining inherited method", "Overriding is faster", "Overloading is deprecated")
        Answer = 2
    },
    @{
        Question = "What is a collection in C#?"
        Options = @("A method", "Group of objects stored together", "A variable", "A namespace")
        Answer = 2
    },
    @{
        Question = "What is the difference between Array and List?"
        Options = @("No difference", "Array has fixed size, List is dynamic", "List is faster", "Array is deprecated")
        Answer = 2
    },
    @{
        Question = "What is Generic in C#?"
        Options = @("A method", "Feature that allows type-safe collections and methods", "A variable", "A namespace")
        Answer = 2
    },
    @{
        Question = "What is async/await in C#?"
        Options = @("Error handling", "Asynchronous programming pattern", "Database operations", "UI framework")
        Answer = 2
    },
    @{
        Question = "What is the CLR?"
        Options = @("C# Language Runtime", "Common Language Runtime", "Core Language Runtime", "Compiled Language Runtime")
        Answer = 2
    },
    @{
        Question = "What is JIT compilation?"
        Options = @("Just-In-Time compilation of IL to machine code", "JavaScript Integration Tool", "Java Integration Technology", "Just-In-Time testing")
        Answer = 1
    }
)

Write-Host "Creating CSV with $($quizQuestions.Count) questions..."

# Create CSV content
$csvData = @()
$csvData += "Question,Answer 1,Answer 2,Answer 3,Answer 4,Correct Answer"

foreach ($quiz in $quizQuestions) {
    # Escape quotes for CSV
    $questionText = $quiz.Question -replace '"', '""'
    $option1 = $quiz.Options[0] -replace '"', '""'
    $option2 = $quiz.Options[1] -replace '"', '""'
    $option3 = $quiz.Options[2] -replace '"', '""'
    $option4 = $quiz.Options[3] -replace '"', '""'
    
    $correctAnswer = $quiz.Answer
    
    # Create CSV row
    $csvRow = "`"$questionText`",`"$option1`",`"$option2`",`"$option3`",`"$option4`",$correctAnswer"
    $csvData += $csvRow
}

Write-Host "Writing to CSV file..."
$csvData | Out-File -FilePath $csvPath -Encoding UTF8

Write-Host "CSV file created at: $csvPath"
Write-Host "Total questions: $($quizQuestions.Count)"
