using System;

namespace Level02Variables
{
    class Program
    {
        static void Main(string[] args)
        {
            // Introduction to variables
            Console.WriteLine("Welcome to Level 2: Variables!");

            // Declare and initialize variables
            int age = 25;
            string name = "Arjan";
            double height = 1.75;
            bool isLearningCSharp = true;

            // Display variable values
            Console.WriteLine($"Name: {name}");
            Console.WriteLine($"Age: {age}");
            Console.WriteLine($"Height: {height} meters");
            Console.WriteLine($"Is learning C#: {isLearningCSharp}");

            // Prompt user for their own variable input
            Console.WriteLine("Please enter your name:");
            string userName = Console.ReadLine();
            Console.WriteLine($"Hello, {userName}! Let's learn about variables.");
        }
    }
}