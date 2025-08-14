# Create 200 comprehensive quiz questions based on the concepts folder content
$csvPath = "C:\Users\Arjan\learning\concept-questions.csv"

Write-Host "Creating 200 comprehensive C# .NET concept questions..."

# Comprehensive concept-based quiz questions
$conceptQuestions = @(
    # Questions 1-15: Visual Programming
    @{
        Question = "What is visual programming?"
        Options = @("Programming with colors", "Programming paradigm using graphical elements instead of text", "Programming for visually impaired", "Programming graphics only")
        Answer = 2
    },
    @{
        Question = "Which is an advantage of visual programming for beginners?"
        Options = @("Better performance", "Easier learning curve", "More flexibility", "Faster execution")
        Answer = 2
    },
    @{
        Question = "What is a limitation of visual programming compared to text-based programming?"
        Options = @("Slower development", "Limited by available components", "No debugging support", "Cannot create applications")
        Answer = 2
    },
    @{
        Question = "Which tool is an example of visual programming in .NET?"
        Options = @("Command line compiler", "Visual Studio Designer", "Text editor", "Database manager")
        Answer = 2
    },
    @{
        Question = "What is XAML Designer used for?"
        Options = @("Database design", "WPF and UWP application UI design", "Web page creation", "API development")
        Answer = 2
    },
    @{
        Question = "In visual programming, how do you typically create UI elements?"
        Options = @("Writing code manually", "Drag-and-drop from toolbox", "Using command line", "Drawing by hand")
        Answer = 2
    },
    @{
        Question = "What type of debugging is typically available in visual programming environments?"
        Options = @("Command line debugging only", "Visual debugging tools", "No debugging", "Text-only debugging")
        Answer = 2
    },
    @{
        Question = "Which programming approach gives you more direct control over performance?"
        Options = @("Visual programming", "Text-based programming", "Both are equal", "Neither")
        Answer = 2
    },
    @{
        Question = "What is generated when you use visual designers?"
        Options = @("Images only", "Code that implements the visual design", "Documentation", "Database schemas")
        Answer = 2
    },
    @{
        Question = "Can visual programming completely replace text-based programming?"
        Options = @("Yes, always", "No, both have their place", "Only for web development", "Only for desktop applications")
        Answer = 2
    },
    @{
        Question = "What is the main interface difference between visual and text-based programming?"
        Options = @("No difference", "Visual uses drag-and-drop, text uses code writing", "Visual is faster", "Text is more colorful")
        Answer = 2
    },
    @{
        Question = "Which type of application is Blazor Visual Designer used for?"
        Options = @("Desktop applications", "Web components", "Mobile applications", "Database applications")
        Answer = 2
    },
    @{
        Question = "What is the flexibility trade-off in visual programming?"
        Options = @("More flexible than text", "Limited by available components", "Equal flexibility", "No flexibility")
        Answer = 2
    },
    @{
        Question = "In WinForms designer, what happens when you drag a button onto a form?"
        Options = @("Nothing happens", "Code is automatically generated", "Application crashes", "Form is deleted")
        Answer = 2
    },
    @{
        Question = "What is the relationship between visual designers and generated code?"
        Options = @("No relationship", "Designer creates code automatically", "Code creates designer", "They are separate")
        Answer = 2
    },

    # Questions 16-30: Event-Driven Programming
    @{
        Question = "What is event-driven programming?"
        Options = @("Programming only for events", "Paradigm where program flow is determined by events", "Programming without events", "Database programming")
        Answer = 2
    },
    @{
        Question = "What are events in event-driven programming?"
        Options = @("Functions only", "Notifications that something has happened", "Variables only", "Classes only")
        Answer = 2
    },
    @{
        Question = "What is an event handler?"
        Options = @("Database connection", "Method that responds to events", "Variable storage", "User interface")
        Answer = 2
    },
    @{
        Question = "What is the event loop responsible for?"
        Options = @("Creating events", "Continuously monitoring for events", "Deleting events", "Storing events")
        Answer = 2
    },
    @{
        Question = "What are delegates in C# event-driven programming?"
        Options = @("Database objects", "Type-safe function pointers", "UI elements", "Network connections")
        Answer = 2
    },
    @{
        Question = "How do you subscribe to a button click event in C#?"
        Options = @("button.OnClick", "button.Click += EventHandler", "button.Press", "button.Select")
        Answer = 2
    },
    @{
        Question = "What parameters does a typical event handler method receive?"
        Options = @("No parameters", "sender and EventArgs", "Only sender", "Only EventArgs")
        Answer = 2
    },
    @{
        Question = "What triggers the execution of an event handler?"
        Options = @("Timer", "When the associated event occurs", "Manual call only", "System startup")
        Answer = 2
    },
    @{
        Question = "Can multiple event handlers be attached to the same event?"
        Options = @("No, only one", "Yes, using multicast delegates", "Only two", "Only for specific events")
        Answer = 2
    },
    @{
        Question = "What happens if you don't handle an event?"
        Options = @("Application crashes", "Nothing specific happens", "Error is thrown", "Event is deleted")
        Answer = 2
    },
    @{
        Question = "How do you unsubscribe from an event in C#?"
        Options = @("event += handler", "event -= handler", "event == handler", "event != handler")
        Answer = 2
    },
    @{
        Question = "What is the sender parameter in an event handler?"
        Options = @("Event data", "Object that raised the event", "Event type", "Handler method")
        Answer = 2
    },
    @{
        Question = "What type of information does EventArgs typically contain?"
        Options = @("Sender information", "Event-specific data", "Handler information", "System information")
        Answer = 2
    },
    @{
        Question = "In GUI applications, what typically triggers events?"
        Options = @("Database queries", "User interactions", "File operations", "Network requests")
        Answer = 2
    },
    @{
        Question = "What is the advantage of event-driven programming for user interfaces?"
        Options = @("Faster execution", "Responsive to user actions", "Uses less memory", "Simpler code")
        Answer = 2
    },

    # Questions 31-45: .NET Framework Architecture
    @{
        Question = "What is the Common Language Runtime (CLR)?"
        Options = @("Programming language", "Runtime environment for .NET applications", "Database system", "Web server")
        Answer = 2
    },
    @{
        Question = "What is the Base Class Library (BCL)?"
        Options = @("User interface library", "Fundamental library of types and functionality", "Database library", "Network library")
        Answer = 2
    },
    @{
        Question = "What is managed code in .NET?"
        Options = @("Code written by managers", "Code that runs under CLR management", "Code for databases", "Code for web applications")
        Answer = 2
    },
    @{
        Question = "What is the Global Assembly Cache (GAC)?"
        Options = @("Database cache", "Machine-wide cache for .NET assemblies", "Web cache", "User cache")
        Answer = 2
    },
    @{
        Question = "What is Just-In-Time (JIT) compilation?"
        Options = @("Compile-time optimization", "Converting IL code to native code at runtime", "Database compilation", "Web compilation")
        Answer = 2
    },
    @{
        Question = "What is Intermediate Language (IL) code?"
        Options = @("High-level language", "Platform-independent bytecode", "Native machine code", "Database query language")
        Answer = 2
    },
    @{
        Question = "What is the Common Type System (CTS)?"
        Options = @("Database type system", "Specification defining how types are declared and used", "Web type system", "UI type system")
        Answer = 2
    },
    @{
        Question = "What is the Common Language Specification (CLS)?"
        Options = @("Programming language", "Subset of CTS for language interoperability", "Database specification", "Web specification")
        Answer = 2
    },
    @{
        Question = "What is garbage collection in .NET?"
        Options = @("Deleting files", "Automatic memory management", "Code optimization", "Database cleanup")
        Answer = 2
    },
    @{
        Question = "What are assemblies in .NET?"
        Options = @("Code files", "Compiled units containing one or more modules", "Database tables", "Web pages")
        Answer = 2
    },
    @{
        Question = "What is the difference between .NET Framework and .NET Core?"
        Options = @("No difference", ".NET Core is cross-platform, Framework is Windows-only", "Framework is newer", "Core is deprecated")
        Answer = 2
    },
    @{
        Question = "What is Application Domain (AppDomain)?"
        Options = @("Database domain", "Isolated execution environment within a process", "Web domain", "Network domain")
        Answer = 2
    },
    @{
        Question = "What is the purpose of metadata in .NET assemblies?"
        Options = @("User data", "Information about types and members", "Performance data", "Security data")
        Answer = 2
    },
    @{
        Question = "What is the Framework Class Library (FCL)?"
        Options = @("User library", "Complete library of classes in .NET Framework", "Third-party library", "Database library")
        Answer = 2
    },
    @{
        Question = "What is strong naming in .NET assemblies?"
        Options = @("Giving descriptive names", "Ensuring assembly integrity and uniqueness", "Using long names", "Database naming")
        Answer = 2
    },

    # Questions 46-60: RAD Tools
    @{
        Question = "What does RAD stand for in software development?"
        Options = @("Rapid Application Development", "Random Access Development", "Real Application Development", "Reliable Application Development")
        Answer = 1
    },
    @{
        Question = "What is the main goal of RAD tools?"
        Options = @("Slow development", "Fast application development with minimal coding", "Complex development", "Database management")
        Answer = 2
    },
    @{
        Question = "Which Visual Studio feature is considered a RAD tool?"
        Options = @("Command line", "Visual designers and IntelliSense", "File explorer", "Task manager")
        Answer = 2
    },
    @{
        Question = "What is IntelliSense in Visual Studio?"
        Options = @("Database tool", "Code completion and suggestion feature", "Graphics tool", "Testing tool")
        Answer = 2
    },
    @{
        Question = "What are code snippets in RAD tools?"
        Options = @("Deleted code", "Pre-written code templates", "Error messages", "Database queries")
        Answer = 2
    },
    @{
        Question = "What is scaffolding in RAD development?"
        Options = @("Building construction", "Auto-generation of basic code structure", "Manual coding", "Database design")
        Answer = 2
    },
    @{
        Question = "Which is an example of RAD in web development?"
        Options = @("Manual HTML coding", "Visual Studio web forms designer", "Command line tools", "Text editors")
        Answer = 2
    },
    @{
        Question = "What is the advantage of using RAD tools for prototyping?"
        Options = @("Slower development", "Quick creation of working prototypes", "More complex code", "Manual testing")
        Answer = 2
    },
    @{
        Question = "What is drag-and-drop functionality in RAD tools?"
        Options = @("File management", "Visual component placement", "Database operations", "Network operations")
        Answer = 2
    },
    @{
        Question = "What is auto-complete in IDEs?"
        Options = @("Automatic testing", "Automatic code completion while typing", "Automatic compilation", "Automatic deployment")
        Answer = 2
    },
    @{
        Question = "What are project templates in RAD tools?"
        Options = @("Database templates", "Pre-configured project structures", "UI templates only", "Test templates only")
        Answer = 2
    },
    @{
        Question = "What is the benefit of visual form designers?"
        Options = @("Manual coding", "Visual UI creation without writing code", "Database design", "Network configuration")
        Answer = 2
    },
    @{
        Question = "What is code generation in RAD tools?"
        Options = @("Manual code writing", "Automatic creation of boilerplate code", "Code deletion", "Code encryption")
        Answer = 2
    },
    @{
        Question = "What is a potential disadvantage of over-relying on RAD tools?"
        Options = @("Faster development", "Less understanding of underlying code", "Better performance", "Easier debugging")
        Answer = 2
    },
    @{
        Question = "What is refactoring support in RAD tools?"
        Options = @("Code deletion", "Automated code restructuring and improvement", "Manual rewriting", "Code compilation")
        Answer = 2
    },

    # Questions 61-80: Type Conversion
    @{
        Question = "What is implicit type conversion?"
        Options = @("Manual conversion", "Automatic conversion by compiler", "Error conversion", "No conversion")
        Answer = 2
    },
    @{
        Question = "What is explicit type conversion?"
        Options = @("Automatic conversion", "Manual conversion using cast operators", "Error conversion", "Default conversion")
        Answer = 2
    },
    @{
        Question = "Which conversion is considered safe?"
        Options = @("Explicit conversion", "Implicit conversion", "No conversion", "Error conversion")
        Answer = 2
    },
    @{
        Question = "What happens during widening conversion?"
        Options = @("Data loss", "No data loss, smaller to larger type", "Type error", "Compilation error")
        Answer = 2
    },
    @{
        Question = "What happens during narrowing conversion?"
        Options = @("No data loss", "Potential data loss, larger to smaller type", "Type expansion", "Memory increase")
        Answer = 2
    },
    @{
        Question = "What does Convert.ToInt32() do with null values?"
        Options = @("Throws exception", "Returns 0", "Returns null", "Returns -1")
        Answer = 2
    },
    @{
        Question = "What does int.Parse() do with null values?"
        Options = @("Returns 0", "Throws ArgumentNullException", "Returns null", "Returns -1")
        Answer = 2
    },
    @{
        Question = "What is the safest method for string to integer conversion?"
        Options = @("int.Parse()", "Convert.ToInt32()", "int.TryParse()", "(int)string")
        Answer = 3
    },
    @{
        Question = "What does int.TryParse() return when conversion fails?"
        Options = @("Exception", "null", "false and out parameter is 0", "-1")
        Answer = 3
    },
    @{
        Question = "What is boxing in type conversion?"
        Options = @("Converting reference to value type", "Converting value type to object", "Array conversion", "String conversion")
        Answer = 2
    },
    @{
        Question = "What is unboxing in type conversion?"
        Options = @("Converting value to object", "Converting object to value type", "Array conversion", "String conversion")
        Answer = 2
    },
    @{
        Question = "What happens if you unbox to the wrong type?"
        Options = @("Silent conversion", "InvalidCastException", "Data loss", "Compilation error")
        Answer = 2
    },
    @{
        Question = "Which has better performance?"
        Options = @("Boxing/unboxing", "Direct type operations", "String conversion", "All same")
        Answer = 2
    },
    @{
        Question = "What is the 'as' operator used for?"
        Options = @("Type creation", "Safe casting that returns null on failure", "Type deletion", "Type comparison")
        Answer = 2
    },
    @{
        Question = "What is the 'is' operator used for?"
        Options = @("Type conversion", "Type checking", "Type creation", "Type deletion")
        Answer = 2
    },
    @{
        Question = "What does (int)3.9 result in?"
        Options = @("4", "3", "3.9", "Compilation error")
        Answer = 2
    },
    @{
        Question = "Can you implicitly convert int to long?"
        Options = @("No", "Yes", "Only with casting", "Only with Convert")
        Answer = 2
    },
    @{
        Question = "Can you implicitly convert long to int?"
        Options = @("Yes", "No, requires explicit casting", "Only positive values", "Only small values")
        Answer = 2
    },
    @{
        Question = "What is a checked context in type conversion?"
        Options = @("Unchecked conversion", "Throws exception on overflow", "Silent overflow", "No conversion")
        Answer = 2
    },
    @{
        Question = "What does unchecked context do?"
        Options = @("Prevents conversion", "Allows overflow without exception", "Forces exception", "No effect")
        Answer = 2
    },

    # Questions 81-95: Structures vs Enumerations
    @{
        Question = "What is a struct in C#?"
        Options = @("Reference type", "Value type for grouping related data", "Class type", "Interface type")
        Answer = 2
    },
    @{
        Question = "What is an enum in C#?"
        Options = @("Class type", "Value type for named constants", "Reference type", "Interface type")
        Answer = 2
    },
    @{
        Question = "Where are structs stored in memory?"
        Options = @("Heap", "Stack", "Database", "Registry")
        Answer = 2
    },
    @{
        Question = "Can structs inherit from other structs?"
        Options = @("Yes", "No", "Only from classes", "Only from interfaces")
        Answer = 2
    },
    @{
        Question = "Can structs implement interfaces?"
        Options = @("No", "Yes", "Only specific interfaces", "Only if sealed")
        Answer = 2
    },
    @{
        Question = "What is the default underlying type of an enum?"
        Options = @("string", "int", "long", "byte")
        Answer = 2
    },
    @{
        Question = "Can you specify a different underlying type for an enum?"
        Options = @("No", "Yes, using : syntax", "Only int", "Only string")
        Answer = 2
    },
    @{
        Question = "What is the default value of an enum?"
        Options = @("null", "0 (first value)", "last value", "undefined")
        Answer = 2
    },
    @{
        Question = "Can struct constructors be parameterless?"
        Options = @("Yes, always", "No, must have parameters", "Only private ones", "Only static ones")
        Answer = 2
    },
    @{
        Question = "Can you assign explicit values to enum members?"
        Options = @("No", "Yes", "Only consecutive values", "Only positive values")
        Answer = 2
    },
    @{
        Question = "What happens when you don't assign values to enum members?"
        Options = @("Compilation error", "Auto-assigned starting from 0", "Random values", "Null values")
        Answer = 2
    },
    @{
        Question = "Can enum members have duplicate values?"
        Options = @("No", "Yes", "Only if explicit", "Only adjacent members")
        Answer = 2
    },
    @{
        Question = "What is a flags enum?"
        Options = @("Regular enum", "Enum that can be combined with bitwise operations", "Enum with strings", "Enum with arrays")
        Answer = 2
    },
    @{
        Question = "Which attribute is used for flags enums?"
        Options = @("[Flag]", "[Flags]", "[Bitwise]", "[Combination]")
        Answer = 2
    },
    @{
        Question = "When should you use struct instead of class?"
        Options = @("Always", "For small, immutable value types", "For large objects", "For inheritance")
        Answer = 2
    },

    # Questions 96-110: Collections
    @{
        Question = "What is the difference between List<T> and ArrayList?"
        Options = @("No difference", "List<T> is type-safe, ArrayList is not", "ArrayList is faster", "List<T> is deprecated")
        Answer = 2
    },
    @{
        Question = "What is the difference between Array and List<T>?"
        Options = @("No difference", "Array has fixed size, List<T> is dynamic", "List<T> is faster", "Array is generic")
        Answer = 2
    },
    @{
        Question = "What does Dictionary<TKey, TValue> store?"
        Options = @("Only keys", "Only values", "Key-value pairs", "Arrays")
        Answer = 3
    },
    @{
        Question = "What happens if you try to add a duplicate key to Dictionary?"
        Options = @("Key is updated", "ArgumentException is thrown", "Nothing happens", "Key is ignored")
        Answer = 2
    },
    @{
        Question = "What is the difference between Dictionary and Hashtable?"
        Options = @("No difference", "Dictionary is generic and type-safe", "Hashtable is faster", "Dictionary is deprecated")
        Answer = 2
    },
    @{
        Question = "What does Queue<T> implement?"
        Options = @("LIFO", "FIFO", "Random access", "Sorted access")
        Answer = 2
    },
    @{
        Question = "What does Stack<T> implement?"
        Options = @("FIFO", "LIFO", "Random access", "Sorted access")
        Answer = 2
    },
    @{
        Question = "What method adds an item to the end of a List<T>?"
        Options = @("Insert()", "Add()", "Push()", "Append()")
        Answer = 2
    },
    @{
        Question = "What method removes an item from the end of a List<T>?"
        Options = @("Remove()", "RemoveAt()", "Pop()", "Delete()")
        Answer = 2
    },
    @{
        Question = "What is a HashSet<T> used for?"
        Options = @("Ordered collection", "Collection of unique elements", "Key-value pairs", "FIFO operations")
        Answer = 2
    },
    @{
        Question = "What is the difference between IEnumerable and ICollection?"
        Options = @("No difference", "ICollection extends IEnumerable with modification methods", "IEnumerable is faster", "ICollection is deprecated")
        Answer = 2
    },
    @{
        Question = "What does the Contains() method do?"
        Options = @("Adds element", "Checks if element exists", "Removes element", "Counts elements")
        Answer = 2
    },
    @{
        Question = "What is a SortedDictionary<TKey, TValue>?"
        Options = @("Regular dictionary", "Dictionary that maintains sorted order by key", "Dictionary sorted by value", "Unsorted dictionary")
        Answer = 2
    },
    @{
        Question = "What is the difference between Add() and Insert() in List<T>?"
        Options = @("No difference", "Add() appends, Insert() adds at specific index", "Insert() is faster", "Add() is deprecated")
        Answer = 2
    },
    @{
        Question = "What happens when List<T> capacity is exceeded?"
        Options = @("Exception thrown", "Capacity is automatically increased", "Oldest items removed", "New items ignored")
        Answer = 2
    },

    # Questions 111-125: Regular Expressions
    @{
        Question = "What namespace contains regular expression classes in C#?"
        Options = @("System.String", "System.Text.RegularExpressions", "System.Regex", "System.Text")
        Answer = 2
    },
    @{
        Question = "What class is used for regular expressions in C#?"
        Options = @("RegularExpression", "Regex", "Pattern", "Match")
        Answer = 2
    },
    @{
        Question = "What does the '.' metacharacter match?"
        Options = @("Only dots", "Any character except newline", "Whitespace", "Numbers only")
        Answer = 2
    },
    @{
        Question = "What does the '*' quantifier mean?"
        Options = @("One or more", "Zero or more", "Exactly one", "Zero or one")
        Answer = 2
    },
    @{
        Question = "What does the '+' quantifier mean?"
        Options = @("Zero or more", "One or more", "Exactly one", "Zero or one")
        Answer = 2
    },
    @{
        Question = "What does the '?' quantifier mean?"
        Options = @("Zero or more", "One or more", "Zero or one", "Exactly one")
        Answer = 3
    },
    @{
        Question = "What does \\d represent in regex?"
        Options = @("Letters", "Digits", "Whitespace", "Special characters")
        Answer = 2
    },
    @{
        Question = "What does \\w represent in regex?"
        Options = @("Whitespace", "Word characters (letters, digits, underscore)", "Special characters", "Numbers only")
        Answer = 2
    },
    @{
        Question = "What does \\s represent in regex?"
        Options = @("Letters", "Numbers", "Whitespace characters", "Special characters")
        Answer = 3
    },
    @{
        Question = "What does ^ represent in regex?"
        Options = @("End of string", "Beginning of string", "Any character", "Negation")
        Answer = 2
    },
    @{
        Question = "What does $ represent in regex?"
        Options = @("Beginning of string", "End of string", "Any character", "Dollar sign")
        Answer = 2
    },
    @{
        Question = "What do square brackets [] represent in regex?"
        Options = @("Grouping", "Character class", "Quantifier", "Literal brackets")
        Answer = 2
    },
    @{
        Question = "What is a capturing group in regex?"
        Options = @("Character class", "Parentheses that capture matched text", "Quantifier", "Anchor")
        Answer = 2
    },
    @{
        Question = "What method checks if entire string matches pattern?"
        Options = @("Regex.Find()", "Regex.IsMatch()", "Regex.Search()", "Regex.Test()")
        Answer = 2
    },
    @{
        Question = "What is the purpose of regex flags like IgnoreCase?"
        Options = @("Performance", "Modify pattern behavior", "Error handling", "Debugging")
        Answer = 2
    },

    # Questions 126-140: Polymorphism
    @{
        Question = "What is polymorphism?"
        Options = @("Multiple inheritance", "Ability of objects to take multiple forms", "Single inheritance", "Interface implementation")
        Answer = 2
    },
    @{
        Question = "What are the types of polymorphism in C#?"
        Options = @("Static only", "Dynamic only", "Static and Dynamic", "No polymorphism")
        Answer = 3
    },
    @{
        Question = "What is compile-time polymorphism?"
        Options = @("Dynamic binding", "Method overloading and operator overloading", "Runtime binding", "Interface implementation")
        Answer = 2
    },
    @{
        Question = "What is runtime polymorphism?"
        Options = @("Method overloading", "Method overriding and virtual methods", "Operator overloading", "Static methods")
        Answer = 2
    },
    @{
        Question = "What keyword enables method overriding?"
        Options = @("new", "virtual", "static", "sealed")
        Answer = 2
    },
    @{
        Question = "What keyword is used to override a virtual method?"
        Options = @("virtual", "override", "new", "sealed")
        Answer = 2
    },
    @{
        Question = "What is method overloading?"
        Options = @("Same method name, different parameters", "Different method names", "Virtual methods", "Abstract methods")
        Answer = 1
    },
    @{
        Question = "What is method overriding?"
        Options = @("Creating new methods", "Redefining inherited virtual methods", "Deleting methods", "Static methods")
        Answer = 2
    },
    @{
        Question = "Can you override static methods?"
        Options = @("Yes", "No", "Only virtual static", "Only in derived classes")
        Answer = 2
    },
    @{
        Question = "What happens if you use 'new' instead of 'override'?"
        Options = @("Same behavior", "Method hiding instead of overriding", "Compilation error", "Runtime error")
        Answer = 2
    },
    @{
        Question = "What is operator overloading?"
        Options = @("Method overloading", "Defining custom behavior for operators", "Virtual operators", "Abstract operators")
        Answer = 2
    },
    @{
        Question = "Can you overload all operators in C#?"
        Options = @("Yes", "No, some are restricted", "Only arithmetic operators", "Only comparison operators")
        Answer = 2
    },
    @{
        Question = "What is late binding?"
        Options = @("Compile-time binding", "Runtime binding", "Early binding", "Static binding")
        Answer = 2
    },
    @{
        Question = "What enables dynamic polymorphism?"
        Options = @("Static methods", "Virtual methods and inheritance", "Method overloading", "Operator overloading")
        Answer = 2
    },
    @{
        Question = "Can interface methods be overridden?"
        Options = @("No", "Yes, through implementation", "Only virtual ones", "Only abstract ones")
        Answer = 2
    },

    # Questions 141-155: Abstract Classes vs Interfaces
    @{
        Question = "Can abstract classes have constructors?"
        Options = @("No", "Yes", "Only private", "Only protected")
        Answer = 2
    },
    @{
        Question = "Can interfaces have constructors?"
        Options = @("Yes", "No", "Only public", "Only private")
        Answer = 2
    },
    @{
        Question = "Can abstract classes have implemented methods?"
        Options = @("No", "Yes", "Only virtual", "Only abstract")
        Answer = 2
    },
    @{
        Question = "Can interfaces have implemented methods in C# 8+?"
        Options = @("No", "Yes, default implementations", "Only virtual", "Only static")
        Answer = 2
    },
    @{
        Question = "How many abstract classes can a class inherit from?"
        Options = @("Multiple", "One", "Two", "None")
        Answer = 2
    },
    @{
        Question = "How many interfaces can a class implement?"
        Options = @("One", "Multiple", "Two", "None")
        Answer = 2
    },
    @{
        Question = "Can abstract classes have fields?"
        Options = @("No", "Yes", "Only static", "Only readonly")
        Answer = 2
    },
    @{
        Question = "Can interfaces have fields (traditionally)?"
        Options = @("Yes", "No", "Only static", "Only readonly")
        Answer = 2
    },
    @{
        Question = "What access modifiers can abstract class members have?"
        Options = @("Only public", "Any access modifier", "Only protected", "Only private")
        Answer = 2
    },
    @{
        Question = "What access modifier do interface members have by default?"
        Options = @("private", "public", "protected", "internal")
        Answer = 2
    },
    @{
        Question = "Can you instantiate an abstract class?"
        Options = @("Yes", "No", "Only with new", "Only derived classes")
        Answer = 2
    },
    @{
        Question = "Can you instantiate an interface?"
        Options = @("Yes", "No", "Only with new", "Only implementations")
        Answer = 2
    },
    @{
        Question = "When should you use abstract classes?"
        Options = @("Never", "When you have common implementation to share", "Always", "Only for interfaces")
        Answer = 2
    },
    @{
        Question = "When should you use interfaces?"
        Options = @("Never", "For contracts and multiple inheritance", "Always", "Only for abstract classes")
        Answer = 2
    },
    @{
        Question = "Can abstract classes implement interfaces?"
        Options = @("No", "Yes", "Only partially", "Only virtually")
        Answer = 2
    },

    # Questions 156-170: Exception Handling
    @{
        Question = "What is the purpose of try-catch blocks?"
        Options = @("Performance optimization", "Handle exceptions gracefully", "Variable declaration", "Method definition")
        Answer = 2
    },
    @{
        Question = "What happens if an exception is not caught?"
        Options = @("Program continues", "Application terminates", "Exception disappears", "Memory leak")
        Answer = 2
    },
    @{
        Question = "What is the purpose of the finally block?"
        Options = @("Catch exceptions", "Code that always executes", "Handle specific exceptions", "Return values")
        Answer = 2
    },
    @{
        Question = "When does the finally block execute?"
        Options = @("Only when exception occurs", "Only when no exception", "Always", "Never")
        Answer = 3
    },
    @{
        Question = "What is the base class for all exceptions in .NET?"
        Options = @("Error", "Exception", "SystemException", "ApplicationException")
        Answer = 2
    },
    @{
        Question = "What is the difference between Exception and SystemException?"
        Options = @("No difference", "SystemException is for runtime errors", "Exception is deprecated", "SystemException is user-defined")
        Answer = 2
    },
    @{
        Question = "How do you create custom exceptions?"
        Options = @("Use existing exceptions", "Inherit from Exception class", "Use strings only", "Use integers")
        Answer = 2
    },
    @{
        Question = "What is the purpose of throw statement?"
        Options = @("Catch exceptions", "Raise exceptions", "Handle exceptions", "Ignore exceptions")
        Answer = 2
    },
    @{
        Question = "What does 'throw;' (rethrow) do?"
        Options = @("Creates new exception", "Re-raises current exception preserving stack trace", "Ignores exception", "Catches exception")
        Answer = 2
    },
    @{
        Question = "Can you have multiple catch blocks?"
        Options = @("No", "Yes, for different exception types", "Only two", "Only for same type")
        Answer = 2
    },
    @{
        Question = "What is the order of catch blocks?"
        Options = @("Random order", "Most specific to least specific", "Least specific to most specific", "Alphabetical order")
        Answer = 2
    },
    @{
        Question = "What is ArgumentNullException used for?"
        Options = @("All arguments", "When null is passed to method that doesn't allow it", "Numeric arguments", "String arguments")
        Answer = 2
    },
    @{
        Question = "What is IndexOutOfRangeException?"
        Options = @("Network error", "Array/collection index outside valid range", "File error", "Database error")
        Answer = 2
    },
    @{
        Question = "What information does Exception.StackTrace provide?"
        Options = @("Exception message", "Call stack when exception occurred", "Exception type", "Exception data")
        Answer = 2
    },
    @{
        Question = "Can finally block prevent exception propagation?"
        Options = @("Yes, always", "No, exceptions still propagate", "Only for specific exceptions", "Only in debug mode")
        Answer = 2
    },

    # Questions 171-185: Parallel Programming (Advanced)
    @{
        Question = "What is the Task Parallel Library (TPL)?"
        Options = @("Database library", "Library for parallel and asynchronous programming", "UI library", "Network library")
        Answer = 2
    },
    @{
        Question = "What is the difference between Task.Run() and new Task()?"
        Options = @("No difference", "Task.Run() automatically starts task", "new Task() is faster", "Task.Run() is deprecated")
        Answer = 2
    },
    @{
        Question = "What is Parallel.For() used for?"
        Options = @("Sequential loops", "Parallel execution of for loop iterations", "Database operations", "File operations")
        Answer = 2
    },
    @{
        Question = "What is a race condition?"
        Options = @("Fast execution", "Multiple threads accessing shared data unsafely", "Task completion", "Memory allocation")
        Answer = 2
    },
    @{
        Question = "What is the lock statement used for?"
        Options = @("File locking", "Thread synchronization", "Memory locking", "Network locking")
        Answer = 2
    },
    @{
        Question = "What is deadlock?"
        Options = @("Fast execution", "Two or more threads waiting for each other indefinitely", "Memory error", "File error")
        Answer = 2
    },
    @{
        Question = "What is the purpose of CancellationToken?"
        Options = @("Create tasks", "Cancel long-running operations", "Start tasks", "Monitor tasks")
        Answer = 2
    },
    @{
        Question = "What is ConfigureAwait(false) used for?"
        Options = @("Task creation", "Avoid deadlocks in UI applications", "Task cancellation", "Task monitoring")
        Answer = 2
    },
    @{
        Question = "What is the difference between Task.Wait() and await?"
        Options = @("No difference", "Wait() blocks thread, await doesn't", "await is faster", "Wait() is deprecated")
        Answer = 2
    },
    @{
        Question = "What is thread-safe collection?"
        Options = @("Regular collection", "Collection that can be safely accessed by multiple threads", "Fast collection", "Database collection")
        Answer = 2
    },
    @{
        Question = "What is ConcurrentBag<T>?"
        Options = @("Regular list", "Thread-safe unordered collection", "Dictionary", "Array")
        Answer = 2
    },
    @{
        Question = "What is the purpose of Interlocked class?"
        Options = @("File operations", "Atomic operations on shared variables", "Database operations", "Network operations")
        Answer = 2
    },
    @{
        Question = "What is volatile keyword used for?"
        Options = @("Memory optimization", "Prevent compiler optimizations on field", "Performance improvement", "Type checking")
        Answer = 2
    },
    @{
        Question = "What is async/await used for?"
        Options = @("Parallel processing", "Asynchronous programming", "Synchronous programming", "Database operations")
        Answer = 2
    },
    @{
        Question = "Can you use await in a non-async method?"
        Options = @("Yes", "No", "Only in Main", "Only in static methods")
        Answer = 2
    },

    # Questions 186-200: ADO.NET Advanced
    @{
        Question = "What is a DataSet in ADO.NET?"
        Options = @("Single table", "In-memory representation of database", "Connection object", "Command object")
        Answer = 2
    },
    @{
        Question = "What is the difference between connected and disconnected architecture?"
        Options = @("No difference", "Connected maintains connection, disconnected works with cached data", "Connected is faster", "Disconnected is deprecated")
        Answer = 2
    },
    @{
        Question = "What is a DataAdapter?"
        Options = @("Database connection", "Bridge between DataSet and database", "Query executor", "Transaction manager")
        Answer = 2
    },
    @{
        Question = "What is Entity Framework?"
        Options = @("Database", "Object-Relational Mapping framework", "UI framework", "Web framework")
        Answer = 2
    },
    @{
        Question = "What is Code First approach in Entity Framework?"
        Options = @("Database first", "Define classes first, generate database", "Generate classes from database", "No code approach")
        Answer = 2
    },
    @{
        Question = "What is Database First approach in Entity Framework?"
        Options = @("Classes first", "Generate classes from existing database", "Create database first", "No database approach")
        Answer = 2
    },
    @{
        Question = "What is DbContext in Entity Framework?"
        Options = @("Database connection", "Session with database and change tracking", "Query builder", "Data model")
        Answer = 2
    },
    @{
        Question = "What is LINQ to Entities?"
        Options = @("Database query language", "LINQ provider for Entity Framework", "Web technology", "UI technology")
        Answer = 2
    },
    @{
        Question = "What are migrations in Entity Framework?"
        Options = @("Data transfer", "Database schema version control", "Query optimization", "Connection management")
        Answer = 2
    },
    @{
        Question = "What is lazy loading in Entity Framework?"
        Options = @("Fast loading", "Loading related data on demand", "Loading all data", "No loading")
        Answer = 2
    },
    @{
        Question = "What is eager loading in Entity Framework?"
        Options = @("Loading data on demand", "Loading related data immediately", "Lazy loading", "No loading")
        Answer = 2
    },
    @{
        Question = "What is the purpose of Include() method?"
        Options = @("Exclude data", "Include related data in query", "Include tables", "Include databases")
        Answer = 2
    },
    @{
        Question = "What is change tracking in Entity Framework?"
        Options = @("Query tracking", "Monitoring entity modifications", "Performance tracking", "Error tracking")
        Answer = 2
    },
    @{
        Question = "What is SaveChanges() used for?"
        Options = @("Load changes", "Persist tracked changes to database", "Cancel changes", "View changes")
        Answer = 2
    },
    @{
        Question = "What is the Unit of Work pattern?"
        Options = @("Single operation", "Managing multiple operations as single transaction", "Work scheduling", "Task management")
        Answer = 2
    }
)

Write-Host "Creating CSV with $($conceptQuestions.Count) questions..."

# Create CSV content
$csvData = @()
$csvData += "Question,Answer 1,Answer 2,Answer 3,Answer 4,Correct Answer"

foreach ($quiz in $conceptQuestions) {
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
Write-Host "Total questions: $($conceptQuestions.Count)"
Write-Host ""
Write-Host "Question breakdown by topic:"
Write-Host "- Visual Programming: 15 questions"
Write-Host "- Event-Driven Programming: 15 questions"
Write-Host "- .NET Framework Architecture: 15 questions"
Write-Host "- RAD Tools: 15 questions"
Write-Host "- Type Conversion: 20 questions"
Write-Host "- Structures vs Enumerations: 15 questions"
Write-Host "- Collections: 15 questions"
Write-Host "- Regular Expressions: 15 questions"
Write-Host "- Polymorphism: 15 questions"
Write-Host "- Abstract Classes vs Interfaces: 15 questions"
Write-Host "- Exception Handling: 15 questions"
Write-Host "- Parallel Programming (Advanced): 15 questions"
Write-Host "- ADO.NET Advanced: 15 questions"
