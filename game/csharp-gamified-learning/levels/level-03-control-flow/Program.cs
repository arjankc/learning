using System;

namespace Level03ControlFlow
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to Level 3: Control Flow!");

            // Example of an if statement
            int score = 75;
            if (score >= 50)
            {
                Console.WriteLine("Congratulations! You've passed this level.");
            }
            else
            {
                Console.WriteLine("Keep trying! You can do it.");
            }

            // Example of a switch statement
            Console.WriteLine("Choose a difficulty level (easy, medium, hard):");
            string difficulty = Console.ReadLine();

            switch (difficulty.ToLower())
            {
                case "easy":
                    Console.WriteLine("You have chosen Easy mode.");
                    break;
                case "medium":
                    Console.WriteLine("You have chosen Medium mode.");
                    break;
                case "hard":
                    Console.WriteLine("You have chosen Hard mode.");
                    break;
                default:
                    Console.WriteLine("Invalid choice. Please select easy, medium, or hard.");
                    break;
            }

            // Example of a loop
            Console.WriteLine("Counting from 1 to 5:");
            for (int i = 1; i <= 5; i++)
            {
                Console.WriteLine(i);
            }

            Console.WriteLine("Level 3 completed! Press any key to exit.");
            Console.ReadKey();
        }
    }
}