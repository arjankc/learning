using System;

namespace CSharpGamifiedLearning.Shared
{
    public static class Utilities
    {
        public static void PrintWelcomeMessage(string userName)
        {
            Console.WriteLine($"Welcome to the C# Gamified Learning Project, {userName}!");
            Console.WriteLine("Get ready to enhance your C# skills through fun and interactive levels.");
        }

        public static void DisplayInstructions(string instructions)
        {
            Console.WriteLine("Instructions:");
            Console.WriteLine(instructions);
        }

        public static void WaitForUserInput()
        {
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }

        public static void ClearConsole()
        {
            Console.Clear();
        }
    }
}