# Regular Expressions

## Definition
Regular expressions (regex) are patterns used to match character combinations in strings. They provide a powerful way to search, replace, and validate text.

## Basic Syntax

### Metacharacters
- `.` - Any character except newline
- `*` - Zero or more occurrences
- `+` - One or more occurrences
- `?` - Zero or one occurrence
- `^` - Start of string
- `$` - End of string
- `|` - OR operator
- `[]` - Character class
- `()` - Grouping

## C# Regex Implementation

```csharp
using System.Text.RegularExpressions;

// Basic pattern matching
string text = "The quick brown fox jumps over the lazy dog";
string pattern = @"quick|lazy";
Regex regex = new Regex(pattern);

// Check if pattern exists
bool hasMatch = regex.IsMatch(text); // true

// Find all matches
MatchCollection matches = regex.Matches(text);
foreach (Match match in matches)
{
    Console.WriteLine($"Found: '{match.Value}' at position {match.Index}");
}

// Replace text
string replaced = regex.Replace(text, "REPLACED");
Console.WriteLine(replaced);
```

## Common Patterns

### Email Validation
```csharp
string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
Regex emailRegex = new Regex(emailPattern);

string[] emails = { "user@example.com", "invalid.email", "test@domain.co.uk" };
foreach (string email in emails)
{
    bool isValid = emailRegex.IsMatch(email);
    Console.WriteLine($"{email}: {(isValid ? "Valid" : "Invalid")}");
}
```

### Phone Number Extraction
```csharp
string phonePattern = @"\b\d{3}-\d{3}-\d{4}\b";
string text = "Call me at 555-123-4567 or 555-987-6543";

MatchCollection phoneMatches = Regex.Matches(text, phonePattern);
foreach (Match match in phoneMatches)
{
    Console.WriteLine($"Phone: {match.Value}");
}
```

### Groups and Capturing
```csharp
string namePattern = @"(\w+)\s+(\w+)"; // First name, Last name
string input = "John Doe, Jane Smith, Bob Johnson";

MatchCollection nameMatches = Regex.Matches(input, namePattern);
foreach (Match match in nameMatches)
{
    string firstName = match.Groups[1].Value;
    string lastName = match.Groups[2].Value;
    Console.WriteLine($"Name: {firstName} {lastName}");
}
```

## Advanced Features

### Regex Options
```csharp
// Case-insensitive matching
Regex regex1 = new Regex(@"hello", RegexOptions.IgnoreCase);

// Multiline mode
Regex regex2 = new Regex(@"^Start", RegexOptions.Multiline);

// Compiled regex for performance
Regex regex3 = new Regex(@"\d+", RegexOptions.Compiled);
```

### Named Groups
```csharp
string pattern = @"(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})";
string dateText = "Today is 2023-12-25";

Match match = Regex.Match(dateText, pattern);
if (match.Success)
{
    string year = match.Groups["year"].Value;
    string month = match.Groups["month"].Value;
    string day = match.Groups["day"].Value;
    Console.WriteLine($"Date: {year}/{month}/{day}");
}
```
