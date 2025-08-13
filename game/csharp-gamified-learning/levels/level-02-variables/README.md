# Level 2: Variables in C#

Welcome to Level 2 of the C# gamified learning project! In this level, you will learn about variables and data types in C#. Understanding variables is crucial as they are the building blocks of any programming language.

## Objectives
- Learn what variables are and how to declare them.
- Understand different data types available in C#.
- Practice using variables in simple operations.

## Key Concepts

### What are Variables?
Variables are used to store data that can be changed during the execution of a program. They act as containers for holding information.

### Data Types
C# supports several data types, including:
- **int**: Represents integer values.
- **double**: Represents floating-point numbers.
- **char**: Represents a single character.
- **string**: Represents a sequence of characters.
- **bool**: Represents a boolean value (true or false).

### Declaring Variables
To declare a variable in C#, you specify the data type followed by the variable name. For example:
```csharp
int age;
double height;
string name;
```

### Assigning Values
You can assign values to variables using the assignment operator `=`:
```csharp
age = 25;
height = 5.9;
name = "Alice";
```

### Example
Here’s a simple example demonstrating variable declaration and assignment:
```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 30;
        string name = "Bob";
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}
```

## Tasks
1. Create variables for your name, age, and favorite number.
2. Write a program that prints out a sentence using these variables.
3. Experiment with changing the values of your variables and observe the output.

## Resources
- [C# Documentation on Variables](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/variables/)
- [C# Data Types](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/data-types)

Once you complete this level, you will have a solid understanding of variables in C#. Good luck, and have fun coding!