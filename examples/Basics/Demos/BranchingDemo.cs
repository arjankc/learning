namespace Examples.Basics.Demos;

public static class BranchingDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== Branching (if/else, switch) ==");

        int score = 85;
        if (score >= 90)
            Console.WriteLine("Grade: A");
        else if (score >= 80)
            Console.WriteLine("Grade: B");
        else
            Console.WriteLine("Grade: C or below");

        string category = score switch
        {
            >= 90 => "Excellent",
            >= 80 => "Good",
            >= 70 => "Fair",
            _ => "Needs Improvement"
        };
        Console.WriteLine($"Category: {category}");
    }
}
