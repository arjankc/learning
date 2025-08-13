// Solution code for Level 02: Variables in C#
// This code demonstrates the use of variables, data types, and basic operations.

using System;

namespace Level02Variables
{
    class Program
    {
        static void Main(string[] args)
        {
            // Declare and initialize variables
            int age = 25;
            string name = "Arjan";
            double height = 1.75; // in meters
            bool isLearningCSharp = true;

            // Output the variable values
            Console.WriteLine("Name: " + name);
            Console.WriteLine("Age: " + age);
            Console.WriteLine("Height: " + height + " meters");
            Console.WriteLine("Is learning C#: " + isLearningCSharp);

            // Perform a simple calculation
            int yearsUntilRetirement = 65 - age;
            Console.WriteLine("Years until retirement: " + yearsUntilRetirement);
        }
    }
}