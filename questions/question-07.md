# Question 7: Describe different types of inheritance methods with example in C#.

## Types of Inheritance in C#:

1. **Single Inheritance** - One class inherits from one base class
2. **Multilevel Inheritance** - Chain of inheritance
3. **Hierarchical Inheritance** - Multiple classes inherit from one base class
4. **Interface Inheritance** - Multiple interface implementation (Multiple inheritance alternative)

**Note:** C# does not support multiple inheritance of classes, but supports multiple interface inheritance.

## Examples:

```csharp
// 1. Single Inheritance
public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public virtual void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
    
    public virtual void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

public class Dog : Animal // Single inheritance
{
    public string Breed { get; set; }
    
    public override void Eat()
    {
        Console.WriteLine($"{Name} the dog is eating dog food.");
    }
    
    public void Bark()
    {
        Console.WriteLine($"{Name} is barking!");
    }
}

// 2. Multilevel Inheritance
public class Mammal : Animal
{
    public double BodyTemperature { get; set; } = 37.0;
    
    public virtual void GiveBirth()
    {
        Console.WriteLine($"{Name} is giving birth to live offspring.");
    }
}

public class Canine : Mammal
{
    public string PackBehavior { get; set; }
    
    public virtual void Hunt()
    {
        Console.WriteLine($"{Name} is hunting in a pack.");
    }
}

public class Wolf : Canine // Multilevel: Wolf -> Canine -> Mammal -> Animal
{
    public string Territory { get; set; }
    
    public override void Hunt()
    {
        Console.WriteLine($"{Name} the wolf is hunting in territory: {Territory}");
    }
    
    public void Howl()
    {
        Console.WriteLine($"{Name} is howling at the moon!");
    }
}

// 3. Hierarchical Inheritance
public class Vehicle
{
    public string Brand { get; set; }
    public int Year { get; set; }
    
    public virtual void Start()
    {
        Console.WriteLine($"{Brand} vehicle is starting.");
    }
    
    public virtual void Stop()
    {
        Console.WriteLine($"{Brand} vehicle is stopping.");
    }
}

public class Car : Vehicle // Hierarchical inheritance
{
    public int NumberOfDoors { get; set; }
    
    public override void Start()
    {
        Console.WriteLine($"{Brand} car is starting with ignition.");
    }
    
    public void OpenTrunk()
    {
        Console.WriteLine("Car trunk is opened.");
    }
}

public class Motorcycle : Vehicle // Hierarchical inheritance
{
    public bool HasSidecar { get; set; }
    
    public override void Start()
    {
        Console.WriteLine($"{Brand} motorcycle is starting with kick/button.");
    }
    
    public void Wheelie()
    {
        Console.WriteLine("Motorcycle is doing a wheelie!");
    }
}

public class Truck : Vehicle // Hierarchical inheritance
{
    public double CargoCapacity { get; set; }
    
    public override void Start()
    {
        Console.WriteLine($"{Brand} truck is starting with heavy engine.");
    }
    
    public void LoadCargo()
    {
        Console.WriteLine($"Loading cargo up to {CargoCapacity} tons.");
    }
}

// 4. Interface Inheritance (Multiple inheritance alternative)
public interface IFlyable
{
    void Fly();
    double MaxAltitude { get; }
}

public interface ISwimmable
{
    void Swim();
    double MaxDepth { get; }
}

public interface IWalkable
{
    void Walk();
    double MaxSpeed { get; }
}

// Multiple interface inheritance
public class Duck : Animal, IFlyable, ISwimmable, IWalkable
{
    public double MaxAltitude { get; set; } = 1000;
    public double MaxDepth { get; set; } = 5;
    public double MaxSpeed { get; set; } = 10;
    
    public void Fly()
    {
        Console.WriteLine($"{Name} the duck is flying up to {MaxAltitude} meters.");
    }
    
    public void Swim()
    {
        Console.WriteLine($"{Name} the duck is swimming up to {MaxDepth} meters deep.");
    }
    
    public void Walk()
    {
        Console.WriteLine($"{Name} the duck is walking at {MaxSpeed} km/h.");
    }
    
    public void Quack()
    {
        Console.WriteLine($"{Name} says: Quack quack!");
    }
}

// Usage Example
public class InheritanceDemo
{
    public static void Main()
    {
        // Single inheritance
        Dog dog = new Dog { Name = "Buddy", Age = 3, Breed = "Golden Retriever" };
        dog.Eat();
        dog.Bark();
        
        // Multilevel inheritance
        Wolf wolf = new Wolf { Name = "Alpha", Age = 5, Territory = "Forest" };
        wolf.Eat();      // From Animal
        wolf.GiveBirth(); // From Mammal
        wolf.Hunt();     // From Canine (overridden)
        wolf.Howl();     // From Wolf
        
        // Hierarchical inheritance
        Car car = new Car { Brand = "Toyota", Year = 2023, NumberOfDoors = 4 };
        Motorcycle bike = new Motorcycle { Brand = "Honda", Year = 2022, HasSidecar = false };
        Truck truck = new Truck { Brand = "Ford", Year = 2021, CargoCapacity = 10.5 };
        
        car.Start();
        bike.Start();
        truck.Start();
        
        // Multiple interface inheritance
        Duck duck = new Duck { Name = "Donald", Age = 2 };
        duck.Eat();   // From Animal
        duck.Fly();   // From IFlyable
        duck.Swim();  // From ISwimmable
        duck.Walk();  // From IWalkable
        duck.Quack(); // From Duck
    }
}
```
