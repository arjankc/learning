namespace Examples.Basics.Demos;

public static class OopDemo
{
    public static void Run()
    {
        Console.WriteLine("\n== OOP Basics (Classes/Objects, Properties, Static) ==");

        var p = new Person("Ada", "Lovelace");
        Console.WriteLine(p.FullName);
        Console.WriteLine($"People created: {Person.Count}");
    }

    private class Person
    {
        public static int Count { get; private set; }

        public string FirstName { get; }
        public string LastName { get; }
        public string FullName => $"{FirstName} {LastName}";

        public Person(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
            Count++;
        }
    }
}
