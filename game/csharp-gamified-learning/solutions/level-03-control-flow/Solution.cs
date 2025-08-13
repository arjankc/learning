using System;

namespace Level03ControlFlow
{
    class Solution
    {
        static void Main(string[] args)
        {
            // Example of control flow using if-else statements
            int score = 85;

            if (score >= 90)
            {
                Console.WriteLine("Grade: A");
            }
            else if (score >= 80)
            {
                Console.WriteLine("Grade: B");
            }
            else if (score >= 70)
            {
                Console.WriteLine("Grade: C");
            }
            else if (score >= 60)
            {
                Console.WriteLine("Grade: D");
            }
            else
            {
                Console.WriteLine("Grade: F");
            }

            // Example of a switch statement
            string day = "Monday";

            switch (day)
            {
                case "Monday":
                    Console.WriteLine("Start of the work week.");
                    break;
                case "Friday":
                    Console.WriteLine("End of the work week.");
                    break;
                case "Saturday":
                case "Sunday":
                    Console.WriteLine("It's the weekend!");
                    break;
                default:
                    Console.WriteLine("Midweek day.");
                    break;
            }

            // Example of a loop
            for (int i = 1; i <= 5; i++)
            {
                Console.WriteLine($"Iteration {i}");
            }
        }
    }
}