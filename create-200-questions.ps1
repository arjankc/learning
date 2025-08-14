# Create 200 comprehensive quiz questions based on the exam content
$csvPath = "C:\Users\Arjan\learning\exam-questions.csv"

Write-Host "Creating 200 comprehensive C# .NET exam questions..."

# Comprehensive quiz questions covering all exam topics
$quizQuestions = @(
    # Questions 1-10: Loops and Control Flow
    @{
        Question = "What is the main difference between 'for loop' and 'foreach loop' in C#?"
        Options = @("for loop provides index access, foreach doesn't", "foreach is faster than for loop", "for loop only works with arrays", "No difference")
        Answer = 1
    },
    @{
        Question = "Which loop is best for iterating through collections when you don't need the index?"
        Options = @("for loop", "foreach loop", "while loop", "do-while loop")
        Answer = 2
    },
    @{
        Question = "What happens if you modify a collection while using foreach?"
        Options = @("Nothing happens", "Performance improves", "InvalidOperationException is thrown", "Compilation error")
        Answer = 3
    },
    @{
        Question = "In a for loop, when is the increment statement executed?"
        Options = @("Before each iteration", "After each iteration", "Only at the end", "Before condition check")
        Answer = 2
    },
    @{
        Question = "Which loop guarantees at least one execution?"
        Options = @("for loop", "while loop", "do-while loop", "foreach loop")
        Answer = 3
    },
    @{
        Question = "What is the purpose of the 'break' statement in loops?"
        Options = @("Skip current iteration", "Exit the loop completely", "Restart the loop", "Pause the loop")
        Answer = 2
    },
    @{
        Question = "What does the 'continue' statement do in a loop?"
        Options = @("Exit the loop", "Skip remaining code in current iteration", "Restart the loop", "Create infinite loop")
        Answer = 2
    },
    @{
        Question = "Which is more efficient for accessing array elements by index?"
        Options = @("foreach loop", "for loop", "while loop", "No difference")
        Answer = 2
    },
    @{
        Question = "Can you use 'break' and 'continue' in foreach loops?"
        Options = @("Only break", "Only continue", "Both break and continue", "Neither")
        Answer = 3
    },
    @{
        Question = "What is the scope of the loop variable in a for loop?"
        Options = @("Global", "Class level", "Method level", "Limited to the for loop block")
        Answer = 4
    },

    # Questions 11-25: Events and Delegates
    @{
        Question = "What is an event in C#?"
        Options = @("A method that returns void", "A special kind of multicast delegate for notifications", "A type of exception", "A database connection")
        Answer = 2
    },
    @{
        Question = "What is a delegate in C#?"
        Options = @("A variable", "A type that represents references to methods", "A class", "An interface")
        Answer = 2
    },
    @{
        Question = "How do you subscribe to an event in C#?"
        Options = @("Using = operator", "Using += operator", "Using == operator", "Using -= operator")
        Answer = 2
    },
    @{
        Question = "How do you unsubscribe from an event in C#?"
        Options = @("Using = operator", "Using += operator", "Using -= operator", "Using != operator")
        Answer = 3
    },
    @{
        Question = "What is a multicast delegate?"
        Options = @("A delegate that can hold single method reference", "A delegate that can hold multiple method references", "A delegate for casting", "A delegate for multiplication")
        Answer = 2
    },
    @{
        Question = "Can events be accessed directly from outside the class?"
        Options = @("Yes, always", "No, they are encapsulated", "Only if public", "Only in same namespace")
        Answer = 2
    },
    @{
        Question = "What is the publisher-subscriber pattern?"
        Options = @("Database pattern", "Design pattern where publisher notifies subscribers of events", "UI pattern", "Security pattern")
        Answer = 2
    },
    @{
        Question = "What happens if you invoke a null delegate?"
        Options = @("Nothing happens", "NullReferenceException", "Compilation error", "Default value returned")
        Answer = 2
    },
    @{
        Question = "Which delegate is used for methods that return void?"
        Options = @("Func", "Action", "Predicate", "EventHandler")
        Answer = 2
    },
    @{
        Question = "Which delegate is used for methods that return a value?"
        Options = @("Action", "Func", "EventHandler", "MulticastDelegate")
        Answer = 2
    },
    @{
        Question = "Can you combine delegates using + operator?"
        Options = @("No", "Yes, creating multicast delegate", "Only for events", "Only for Action delegates")
        Answer = 2
    },
    @{
        Question = "What is the difference between delegates and events?"
        Options = @("No difference", "Events provide encapsulation and can only be triggered from within the class", "Delegates are faster", "Events are deprecated")
        Answer = 2
    },
    @{
        Question = "Can events have return values?"
        Options = @("Yes, always", "No, events return void", "Only if using Func", "Only for static events")
        Answer = 2
    },
    @{
        Question = "What is the EventHandler delegate used for?"
        Options = @("Database events", "Standard event handling with sender and EventArgs", "File events", "Network events")
        Answer = 2
    },
    @{
        Question = "Can you use lambda expressions with delegates?"
        Options = @("No", "Yes", "Only with events", "Only with Action")
        Answer = 2
    },

    # Questions 26-40: Database and ADO.NET
    @{
        Question = "Which namespace is required for ADO.NET database operations?"
        Options = @("System.IO", "System.Data", "System.Net", "System.Web")
        Answer = 2
    },
    @{
        Question = "What does ADO.NET stand for?"
        Options = @("Active Data Objects .NET", "Application Data Objects .NET", "Advanced Data Objects .NET", "Automated Data Objects .NET")
        Answer = 1
    },
    @{
        Question = "What is the difference between DataReader and DataSet?"
        Options = @("No difference", "DataReader is forward-only, DataSet loads all data in memory", "DataSet is faster", "DataReader loads all data")
        Answer = 2
    },
    @{
        Question = "Which is more efficient for reading large amounts of data?"
        Options = @("DataSet", "DataReader", "DataTable", "DataAdapter")
        Answer = 2
    },
    @{
        Question = "What is SqlConnection used for?"
        Options = @("Execute commands", "Establish connection to SQL Server", "Read data", "Update data")
        Answer = 2
    },
    @{
        Question = "What is SqlCommand used for?"
        Options = @("Connect to database", "Execute SQL statements", "Read data only", "Close connections")
        Answer = 2
    },
    @{
        Question = "Which method is used for SELECT statements?"
        Options = @("ExecuteNonQuery", "ExecuteReader", "ExecuteScalar", "ExecuteQuery")
        Answer = 2
    },
    @{
        Question = "Which method is used for INSERT, UPDATE, DELETE statements?"
        Options = @("ExecuteReader", "ExecuteNonQuery", "ExecuteScalar", "ExecuteQuery")
        Answer = 2
    },
    @{
        Question = "What does ExecuteScalar return?"
        Options = @("DataReader", "DataSet", "Single value", "Number of affected rows")
        Answer = 3
    },
    @{
        Question = "What is a connection string?"
        Options = @("SQL query", "Database schema", "Configuration that specifies database connection details", "Table name")
        Answer = 3
    },
    @{
        Question = "Why should you use parameterized queries?"
        Options = @("Better performance", "Prevent SQL injection attacks", "Easier syntax", "Faster execution")
        Answer = 2
    },
    @{
        Question = "What is Entity Framework?"
        Options = @("UI framework", "Object-Relational Mapping (ORM) framework", "Web framework", "Testing framework")
        Answer = 2
    },
    @{
        Question = "What is the purpose of using statement with database connections?"
        Options = @("Better performance", "Automatic resource cleanup", "SQL injection prevention", "Faster queries")
        Answer = 2
    },
    @{
        Question = "What is LINQ to SQL?"
        Options = @("Language Integrated Query for SQL databases", "Library for SQL", "Language for SQL", "Link to SQL")
        Answer = 1
    },
    @{
        Question = "What is the difference between connected and disconnected architecture?"
        Options = @("No difference", "Connected maintains connection, disconnected works with cached data", "Connected is faster", "Disconnected is deprecated")
        Answer = 2
    },

    # Questions 41-55: LINQ
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
        Question = "Which LINQ operator is used for projection?"
        Options = @("Where", "Select", "OrderBy", "GroupBy")
        Answer = 2
    },
    @{
        Question = "What is the difference between First() and FirstOrDefault()?"
        Options = @("No difference", "First() throws exception if no element, FirstOrDefault() returns default", "FirstOrDefault() is faster", "First() is deprecated")
        Answer = 2
    },
    @{
        Question = "Which LINQ operator is used for sorting?"
        Options = @("Where", "Select", "OrderBy", "GroupBy")
        Answer = 3
    },
    @{
        Question = "What does the Any() method return?"
        Options = @("First element", "Count of elements", "Boolean indicating if any element matches", "All elements")
        Answer = 3
    },
    @{
        Question = "What does the All() method check?"
        Options = @("If any element matches condition", "If all elements match condition", "First element only", "Last element only")
        Answer = 2
    },
    @{
        Question = "Which method forces immediate execution of LINQ query?"
        Options = @("Where", "Select", "ToList()", "OrderBy")
        Answer = 3
    },
    @{
        Question = "What is the purpose of GroupBy in LINQ?"
        Options = @("Filter data", "Sort data", "Group elements by key", "Select specific columns")
        Answer = 3
    },
    @{
        Question = "Can you use LINQ with databases?"
        Options = @("No", "Yes, with LINQ to SQL and Entity Framework", "Only with SQL Server", "Only with MySQL")
        Answer = 2
    },
    @{
        Question = "What is the difference between IEnumerable and IQueryable?"
        Options = @("No difference", "IQueryable is for database queries, IEnumerable is for in-memory", "IEnumerable is faster", "IQueryable is deprecated")
        Answer = 2
    },
    @{
        Question = "Which LINQ method joins two sequences?"
        Options = @("Union", "Join", "Concat", "Merge")
        Answer = 2
    },
    @{
        Question = "What does Skip() method do in LINQ?"
        Options = @("Skip all elements", "Skip specified number of elements", "Skip last element", "Skip duplicates")
        Answer = 2
    },
    @{
        Question = "What does Take() method do in LINQ?"
        Options = @("Take all elements", "Take specified number of elements", "Take last element", "Take duplicates")
        Answer = 2
    },

    # Questions 56-70: Value vs Reference Types
    @{
        Question = "What is the difference between value types and reference types?"
        Options = @("No difference", "Value types store data directly, reference types store references", "Reference types are faster", "Value types can be null")
        Answer = 2
    },
    @{
        Question = "Where are value types stored?"
        Options = @("Heap", "Stack", "Database", "Registry")
        Answer = 2
    },
    @{
        Question = "Where are reference types stored?"
        Options = @("Stack", "Heap", "Database", "Registry")
        Answer = 2
    },
    @{
        Question = "What happens when you assign one value type to another?"
        Options = @("Both variables point to same memory", "Data is copied", "Reference is shared", "Nothing happens")
        Answer = 2
    },
    @{
        Question = "What happens when you assign one reference type to another?"
        Options = @("Data is copied", "Reference is copied", "New object is created", "Nothing happens")
        Answer = 2
    },
    @{
        Question = "Which of these is a value type?"
        Options = @("string", "object", "int", "array")
        Answer = 3
    },
    @{
        Question = "Which of these is a reference type?"
        Options = @("int", "bool", "string", "char")
        Answer = 3
    },
    @{
        Question = "What is boxing in C#?"
        Options = @("Converting reference to value type", "Converting value type to object", "Creating arrays", "Memory allocation")
        Answer = 2
    },
    @{
        Question = "What is unboxing in C#?"
        Options = @("Converting value type to object", "Converting object back to value type", "Creating objects", "Memory deallocation")
        Answer = 2
    },
    @{
        Question = "Can value types be null by default?"
        Options = @("Yes", "No", "Only int", "Only bool")
        Answer = 2
    },
    @{
        Question = "What is a nullable value type?"
        Options = @("Value type that can be null", "Reference type", "Array type", "Object type")
        Answer = 1
    },
    @{
        Question = "How do you declare a nullable int?"
        Options = @("int? x", "nullable int x", "int x = null", "Nullable<int> x")
        Answer = 1
    },
    @{
        Question = "What is the default value of a reference type?"
        Options = @("0", "false", "null", "empty string")
        Answer = 3
    },
    @{
        Question = "What is the default value of an int?"
        Options = @("null", "0", "1", "-1")
        Answer = 2
    },
    @{
        Question = "Are strings mutable in C#?"
        Options = @("Yes", "No", "Sometimes", "Depends on length")
        Answer = 2
    },

    # Questions 71-85: Inheritance
    @{
        Question = "What are the different types of inheritance in C#?"
        Options = @("Single, Multiple, Multilevel", "Single, Multilevel, Hierarchical, Interface", "Only Single", "Single and Multiple only")
        Answer = 2
    },
    @{
        Question = "Does C# support multiple inheritance of classes?"
        Options = @("Yes", "No", "Only with interfaces", "Only with abstract classes")
        Answer = 2
    },
    @{
        Question = "What keyword is used to inherit from a class in C#?"
        Options = @("extends", "inherits", ":", "implements")
        Answer = 3
    },
    @{
        Question = "What is single inheritance?"
        Options = @("Class inherits from multiple classes", "Class inherits from one class", "Interface inheritance", "No inheritance")
        Answer = 2
    },
    @{
        Question = "What is multilevel inheritance?"
        Options = @("Multiple classes inherit from one class", "Chain of inheritance", "No inheritance", "Interface inheritance")
        Answer = 2
    },
    @{
        Question = "What is hierarchical inheritance?"
        Options = @("Chain of inheritance", "Multiple classes inherit from one base class", "No inheritance", "Multiple inheritance")
        Answer = 2
    },
    @{
        Question = "Can you inherit from multiple interfaces?"
        Options = @("No", "Yes", "Only two interfaces", "Only if they're related")
        Answer = 2
    },
    @{
        Question = "What is the base class for all classes in C#?"
        Options = @("BaseClass", "Object", "System", "Class")
        Answer = 2
    },
    @{
        Question = "What keyword prevents a class from being inherited?"
        Options = @("private", "sealed", "static", "final")
        Answer = 2
    },
    @{
        Question = "What keyword is used to call base class constructor?"
        Options = @("super", "base", "this", "parent")
        Answer = 2
    },
    @{
        Question = "Can constructors be inherited?"
        Options = @("Yes", "No", "Only default constructor", "Only parameterized constructor")
        Answer = 2
    },
    @{
        Question = "What is method overriding?"
        Options = @("Creating new method", "Redefining inherited method", "Hiding method", "Deleting method")
        Answer = 2
    },
    @{
        Question = "What keyword is required to override a method?"
        Options = @("new", "override", "virtual", "abstract")
        Answer = 2
    },
    @{
        Question = "What keyword makes a method overridable?"
        Options = @("override", "virtual", "abstract", "sealed")
        Answer = 2
    },
    @{
        Question = "Can you override static methods?"
        Options = @("Yes", "No", "Only virtual static", "Only abstract static")
        Answer = 2
    },

    # Questions 86-100: AJAX and Web Development
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
        Question = "What does AJAX stand for?"
        Options = @("Asynchronous JavaScript and XML", "Advanced JavaScript and XML", "Automated JavaScript and XML", "Active JavaScript and XML")
        Answer = 1
    },
    @{
        Question = "Which method is commonly used for AJAX requests in jQuery?"
        Options = @("$.get()", "$.ajax()", "$.post()", "All of the above")
        Answer = 4
    },
    @{
        Question = "What is JSON in context of AJAX?"
        Options = @("JavaScript Object Notation for data exchange", "Java Standard Object Notation", "JavaScript Only Notation", "Java Script Object Network")
        Answer = 1
    },
    @{
        Question = "Can AJAX be used without JavaScript?"
        Options = @("Yes", "No", "Only with XML", "Only with JSON")
        Answer = 2
    },
    @{
        Question = "What HTTP methods can be used with AJAX?"
        Options = @("Only GET", "Only POST", "GET, POST, PUT, DELETE", "Only GET and POST")
        Answer = 3
    },
    @{
        Question = "What is the XMLHttpRequest object used for?"
        Options = @("Database operations", "Making HTTP requests from JavaScript", "File operations", "UI operations")
        Answer = 2
    },
    @{
        Question = "How do you handle AJAX errors?"
        Options = @("Try-catch blocks", "Error callbacks", "Status codes", "All of the above")
        Answer = 4
    },
    @{
        Question = "What is the advantage of using JSON over XML in AJAX?"
        Options = @("Smaller size and easier parsing", "Better security", "Faster server processing", "More features")
        Answer = 1
    },
    @{
        Question = "Can AJAX requests be synchronous?"
        Options = @("No, always asynchronous", "Yes, but not recommended", "Only with XML", "Only with JSON")
        Answer = 2
    },
    @{
        Question = "What is CORS in context of AJAX?"
        Options = @("Cross-Origin Resource Sharing", "Common Object Request System", "Cross-Origin Request Security", "Common Origin Resource System")
        Answer = 1
    },
    @{
        Question = "How do you prevent AJAX caching issues?"
        Options = @("Add random parameter", "Set cache headers", "Use POST instead of GET", "All of the above")
        Answer = 4
    },
    @{
        Question = "What status code indicates successful AJAX request?"
        Options = @("200", "404", "500", "302")
        Answer = 1
    },
    @{
        Question = "Can AJAX be used to upload files?"
        Options = @("No", "Yes, with FormData", "Only small files", "Only images")
        Answer = 2
    },

    # Questions 101-115: Type Conversion
    @{
        Question = "Which method is used to check if conversion is possible in C#?"
        Options = @("Convert.ToInt32()", "int.Parse()", "int.TryParse()", "(int)value")
        Answer = 3
    },
    @{
        Question = "What is implicit conversion?"
        Options = @("Manual type conversion", "Automatic type conversion", "Explicit casting", "Error in conversion")
        Answer = 2
    },
    @{
        Question = "What is explicit conversion?"
        Options = @("Automatic type conversion", "Manual type conversion using cast operator", "Error in conversion", "No conversion")
        Answer = 2
    },
    @{
        Question = "Which conversion is safe and automatic?"
        Options = @("Explicit", "Implicit", "Boxing", "Unboxing")
        Answer = 2
    },
    @{
        Question = "What happens in explicit conversion if data doesn't fit?"
        Options = @("Compilation error", "Data loss or overflow", "Exception thrown", "Nothing happens")
        Answer = 2
    },
    @{
        Question = "Which method is safest for string to int conversion?"
        Options = @("int.Parse()", "(int)string", "Convert.ToInt32()", "int.TryParse()")
        Answer = 4
    },
    @{
        Question = "What does int.Parse() do if string is invalid?"
        Options = @("Returns 0", "Returns null", "Throws exception", "Returns -1")
        Answer = 3
    },
    @{
        Question = "What does int.TryParse() return if conversion fails?"
        Options = @("Exception", "null", "false", "0")
        Answer = 3
    },
    @{
        Question = "What is the difference between Parse and Convert methods?"
        Options = @("No difference", "Convert handles null values, Parse doesn't", "Parse is faster", "Convert is deprecated")
        Answer = 2
    },
    @{
        Question = "Can you convert null string using int.Parse()?"
        Options = @("Yes, returns 0", "No, throws exception", "Yes, returns null", "No, compilation error")
        Answer = 2
    },
    @{
        Question = "What is the result of (int)3.7?"
        Options = @("4", "3", "3.7", "Compilation error")
        Answer = 2
    },
    @{
        Question = "Which conversion has performance overhead?"
        Options = @("Implicit conversion", "Explicit conversion", "Boxing/Unboxing", "TryParse")
        Answer = 3
    },
    @{
        Question = "What does Convert.ToInt32(null) return?"
        Options = @("Exception", "0", "null", "-1")
        Answer = 2
    },
    @{
        Question = "Can you convert between unrelated reference types?"
        Options = @("Yes, always", "No, never", "Only with explicit casting", "Only if they implement same interface")
        Answer = 3
    },
    @{
        Question = "What is narrowing conversion?"
        Options = @("Converting to larger type", "Converting to smaller type", "Converting to same type", "No conversion")
        Answer = 2
    },

    # Questions 116-130: Serialization
    @{
        Question = "What is serialization in C#?"
        Options = @("Converting objects to string format", "Converting object state to storable/transmittable format", "Creating new objects", "Deleting objects")
        Answer = 2
    },
    @{
        Question = "What is deserialization?"
        Options = @("Creating objects", "Converting serialized data back to objects", "Deleting objects", "Copying objects")
        Answer = 2
    },
    @{
        Question = "Which attribute is used to mark a class as serializable?"
        Options = @("[Serialize]", "[Serializable]", "[DataContract]", "[Serializeable]")
        Answer = 2
    },
    @{
        Question = "What is JSON serialization?"
        Options = @("Converting to XML", "Converting to binary", "Converting to JavaScript Object Notation", "Converting to text")
        Answer = 3
    },
    @{
        Question = "Which namespace contains JSON serialization classes in .NET?"
        Options = @("System.Json", "System.Text.Json", "System.Serialization", "System.Web.Json")
        Answer = 2
    },
    @{
        Question = "What is binary serialization?"
        Options = @("Converting to text", "Converting to binary format", "Converting to XML", "Converting to JSON")
        Answer = 2
    },
    @{
        Question = "Which is more human-readable?"
        Options = @("Binary serialization", "JSON serialization", "Both same", "Neither")
        Answer = 2
    },
    @{
        Question = "What happens to non-serializable fields during serialization?"
        Options = @("They are serialized", "They are ignored", "Exception is thrown", "They become null")
        Answer = 2
    },
    @{
        Question = "Which attribute prevents a field from being serialized?"
        Options = @("[NonSerialized]", "[NotSerialized]", "[IgnoreSerialize]", "[Skip]")
        Answer = 1
    },
    @{
        Question = "Can you serialize static fields?"
        Options = @("Yes, always", "No, never", "Only if marked", "Only public static")
        Answer = 2
    },
    @{
        Question = "What is XML serialization?"
        Options = @("Converting to binary", "Converting to XML format", "Converting to JSON", "Converting to text")
        Answer = 2
    },
    @{
        Question = "Which class is used for XML serialization?"
        Options = @("XmlSerializer", "BinaryFormatter", "JsonSerializer", "DataContractSerializer")
        Answer = 1
    },
    @{
        Question = "Can you customize JSON property names during serialization?"
        Options = @("No", "Yes, using attributes", "Only manually", "Only for strings")
        Answer = 2
    },
    @{
        Question = "What is the purpose of serialization?"
        Options = @("Performance improvement", "Data persistence and transmission", "Memory optimization", "Error handling")
        Answer = 2
    },
    @{
        Question = "Can you serialize circular references?"
        Options = @("Yes, always", "No, causes issues", "Only with XML", "Only with JSON")
        Answer = 2
    },

    # Questions 131-145: TPL and Parallel Programming
    @{
        Question = "What is TPL in C#?"
        Options = @("Type Parameter Library", "Task Parallel Library", "Template Processing Library", "Text Processing Library")
        Answer = 2
    },
    @{
        Question = "What is the main purpose of parallel programming?"
        Options = @("Write code in parallel files", "Execute multiple tasks simultaneously", "Create multiple classes", "Use multiple databases")
        Answer = 2
    },
    @{
        Question = "Which class represents an asynchronous operation in TPL?"
        Options = @("Thread", "Task", "Process", "Async")
        Answer = 2
    },
    @{
        Question = "How do you create a task in TPL?"
        Options = @("new Task()", "Task.Run()", "Task.Start()", "All of the above")
        Answer = 4
    },
    @{
        Question = "What is the difference between Task and Thread?"
        Options = @("No difference", "Task is higher-level abstraction over Thread", "Thread is newer", "Task is deprecated")
        Answer = 2
    },
    @{
        Question = "How do you wait for a task to complete?"
        Options = @("Task.Sleep()", "Task.Wait()", "Task.Stop()", "Task.Pause()")
        Answer = 2
    },
    @{
        Question = "What does Task.WaitAll() do?"
        Options = @("Wait for one task", "Wait for all tasks to complete", "Cancel all tasks", "Start all tasks")
        Answer = 2
    },
    @{
        Question = "What does Parallel.For() do?"
        Options = @("Sequential for loop", "Parallel execution of for loop iterations", "Infinite loop", "Nested loop")
        Answer = 2
    },
    @{
        Question = "What does Parallel.ForEach() do?"
        Options = @("Sequential foreach", "Parallel execution of foreach iterations", "Infinite loop", "Nested loop")
        Answer = 2
    },
    @{
        Question = "Can tasks return values?"
        Options = @("No", "Yes, using Task<T>", "Only strings", "Only integers")
        Answer = 2
    },
    @{
        Question = "What is async/await in C#?"
        Options = @("Error handling", "Asynchronous programming pattern", "Database operations", "UI framework")
        Answer = 2
    },
    @{
        Question = "What does the async keyword do?"
        Options = @("Makes method run faster", "Enables use of await keyword", "Makes method parallel", "Makes method synchronous")
        Answer = 2
    },
    @{
        Question = "What does the await keyword do?"
        Options = @("Waits synchronously", "Asynchronously waits for task completion", "Cancels task", "Starts task")
        Answer = 2
    },
    @{
        Question = "Can you use await without async?"
        Options = @("Yes", "No", "Only in Main method", "Only in static methods")
        Answer = 2
    },
    @{
        Question = "What is the benefit of using async/await over blocking waits?"
        Options = @("Better performance", "Non-blocking, improves responsiveness", "Simpler code", "Automatic error handling")
        Answer = 2
    },

    # Questions 146-160: WPF and UI
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
        Question = "What is XAML in WPF?"
        Options = @("eXtensible Application Markup Language", "eXtended Application Management Language", "eXternal Application Markup Language", "eXecutable Application Markup Language")
        Answer = 1
    },
    @{
        Question = "What is data binding in WPF?"
        Options = @("Connecting to database", "Connecting UI elements to data sources", "Creating data structures", "Validating data")
        Answer = 2
    },
    @{
        Question = "What are the types of data binding in WPF?"
        Options = @("OneWay, TwoWay", "OneWay, TwoWay, OneTime, OneWayToSource", "Only TwoWay", "Automatic only")
        Answer = 2
    },
    @{
        Question = "What is OneWay data binding?"
        Options = @("Data flows from source to target", "Data flows from target to source", "Data flows both ways", "No data flow")
        Answer = 1
    },
    @{
        Question = "What is TwoWay data binding?"
        Options = @("Data flows from source to target", "Data flows from target to source", "Data flows both ways", "No data flow")
        Answer = 3
    },
    @{
        Question = "What is MVVM pattern?"
        Options = @("Model-View-ViewModel architectural pattern", "Multiple-View-Variable-Model pattern", "Model-Variable-View-Method pattern", "Method-View-Variable-Model pattern")
        Answer = 1
    },
    @{
        Question = "What is the purpose of ViewModel in MVVM?"
        Options = @("Database operations", "Mediator between View and Model", "UI rendering", "Event handling")
        Answer = 2
    },
    @{
        Question = "What is INotifyPropertyChanged used for?"
        Options = @("Database notifications", "UI update notifications when properties change", "Error notifications", "Event notifications")
        Answer = 2
    },
    @{
        Question = "What are dependency properties in WPF?"
        Options = @("Regular properties", "Properties that support data binding and styling", "Database properties", "Static properties")
        Answer = 2
    },
    @{
        Question = "What is a UserControl in WPF?"
        Options = @("Built-in control", "Custom reusable UI component", "Database control", "Web control")
        Answer = 2
    },
    @{
        Question = "What is the purpose of styles in WPF?"
        Options = @("Database styling", "UI appearance and behavior customization", "Code styling", "Performance optimization")
        Answer = 2
    },
    @{
        Question = "Can you create animations in WPF?"
        Options = @("No", "Yes, using Storyboard and animations", "Only with third-party tools", "Only simple animations")
        Answer = 2
    },
    @{
        Question = "What is the Grid layout panel used for?"
        Options = @("Simple stacking", "Complex layout with rows and columns", "Absolute positioning", "Text display")
        Answer = 2
    },

    # Questions 161-175: ASP.NET Core and Web Development
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
        Question = "What is MVC pattern?"
        Options = @("Model-View-Controller architectural pattern", "Multiple-View-Components pattern", "Model-Variable-Class pattern", "Method-View-Class pattern")
        Answer = 1
    },
    @{
        Question = "What is the role of Controller in MVC?"
        Options = @("Data storage", "Handle user input and coordinate between Model and View", "UI rendering", "Database operations")
        Answer = 2
    },
    @{
        Question = "What is a Razor Page?"
        Options = @("JavaScript page", "Page-focused framework for building web apps", "Database page", "Configuration page")
        Answer = 2
    },
    @{
        Question = "What is dependency injection?"
        Options = @("Creating dependencies", "Design pattern for providing dependencies to objects", "Removing dependencies", "Testing dependencies")
        Answer = 2
    },
    @{
        Question = "What is the purpose of Startup.cs in ASP.NET Core?"
        Options = @("Database configuration", "Application configuration and service registration", "UI configuration", "Security configuration")
        Answer = 2
    },
    @{
        Question = "What is routing in ASP.NET Core?"
        Options = @("Database routing", "URL to controller/action mapping", "Network routing", "File routing")
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
        Question = "What is the difference between authentication and authorization?"
        Options = @("No difference", "Authentication verifies identity, authorization determines access", "Authorization is faster", "Authentication is deprecated")
        Answer = 2
    },
    @{
        Question = "What are action filters in ASP.NET Core?"
        Options = @("Database filters", "Attributes that run code before/after action execution", "UI filters", "Security filters")
        Answer = 2
    },
    @{
        Question = "What is model binding in ASP.NET Core?"
        Options = @("Database binding", "Mapping HTTP request data to action parameters", "UI binding", "File binding")
        Answer = 2
    },
    @{
        Question = "What is the purpose of ViewBag?"
        Options = @("Database storage", "Pass data from controller to view", "Session storage", "Cache storage")
        Answer = 2
    },
    @{
        Question = "What is the difference between ViewBag and ViewData?"
        Options = @("No difference", "ViewBag is dynamic, ViewData is dictionary", "ViewData is faster", "ViewBag is deprecated")
        Answer = 2
    },

    # Questions 176-190: Blazor and Modern Web
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
        Question = "What is Blazor Server?"
        Options = @("Runs on client browser", "Runs on server with SignalR for UI updates", "Runs on mobile", "Runs on desktop")
        Answer = 2
    },
    @{
        Question = "What is Blazor WebAssembly?"
        Options = @("Runs on server", "Runs in browser using WebAssembly", "Runs on mobile", "Runs on desktop")
        Answer = 2
    },
    @{
        Question = "What is a Blazor component?"
        Options = @("Database component", "Reusable UI element with logic", "Server component", "Network component")
        Answer = 2
    },
    @{
        Question = "How do you create a Blazor component?"
        Options = @("Using .cs files only", "Using .razor files", "Using .html files", "Using .js files")
        Answer = 2
    },
    @{
        Question = "What is data binding in Blazor?"
        Options = @("Database binding", "Connecting UI elements to component properties", "File binding", "Network binding")
        Answer = 2
    },
    @{
        Question = "What is the @bind directive used for in Blazor?"
        Options = @("Database binding", "Two-way data binding", "Event binding", "Style binding")
        Answer = 2
    },
    @{
        Question = "What is a Razor Class Library?"
        Options = @("Database library", "Reusable component library for Blazor/Razor", "Network library", "File library")
        Answer = 2
    },
    @{
        Question = "Can you use JavaScript with Blazor?"
        Options = @("No", "Yes, through JavaScript interop", "Only in Server-side", "Only in WebAssembly")
        Answer = 2
    },
    @{
        Question = "What is the @code block in Blazor components?"
        Options = @("HTML code", "C# code section", "JavaScript code", "CSS code")
        Answer = 2
    },
    @{
        Question = "How do you handle events in Blazor?"
        Options = @("Using JavaScript only", "Using @onclick and similar directives", "Using HTML only", "Using CSS")
        Answer = 2
    },
    @{
        Question = "What is the lifecycle of a Blazor component?"
        Options = @("OnInit only", "OnInitialized, OnParametersSet, OnAfterRender, etc.", "OnLoad only", "OnRender only")
        Answer = 2
    },
    @{
        Question = "Can Blazor work offline?"
        Options = @("No", "WebAssembly can, Server cannot", "Only Server can", "Both can with PWA")
        Answer = 2
    },
    @{
        Question = "What is StateHasChanged() used for?"
        Options = @("Database updates", "Force UI re-render", "State saving", "Navigation")
        Answer = 2
    },

    # Questions 191-200: Xamarin and Mobile Development
    @{
        Question = "What is Xamarin used for?"
        Options = @("Web development", "Cross-platform mobile app development", "Desktop applications", "Database management")
        Answer = 2
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
        Question = "What are the navigation patterns in Xamarin.Forms?"
        Options = @("Push/Pop only", "NavigationPage, TabbedPage, MasterDetailPage", "Browser navigation only", "No navigation")
        Answer = 2
    },
    @{
        Question = "What is MVVM pattern in Xamarin?"
        Options = @("Model-View-ViewModel architectural pattern", "Mobile-View-Variable-Model", "Method-View-Variable-Model", "Multiple-View-Variable-Model")
        Answer = 1
    },
    @{
        Question = "What is data binding in Xamarin.Forms?"
        Options = @("Database binding", "Connecting UI to ViewModel properties", "File binding", "Network binding")
        Answer = 2
    },
    @{
        Question = "What platforms does Xamarin.Forms support?"
        Options = @("iOS only", "Android only", "iOS, Android, Windows", "Web only")
        Answer = 3
    },
    @{
        Question = "What is a ContentPage in Xamarin.Forms?"
        Options = @("Database page", "Single page UI container", "Web page", "Configuration page")
        Answer = 2
    },
    @{
        Question = "What is the purpose of Application.MainPage?"
        Options = @("Database main page", "Set the root page of the application", "Main navigation", "Main configuration")
        Answer = 2
    },
    @{
        Question = "What is the future of Xamarin after .NET MAUI?"
        Options = @("Xamarin continues unchanged", ".NET MAUI is the evolution of Xamarin.Forms", "Xamarin is discontinued immediately", "No relationship")
        Answer = 2
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
