# Question 25: What is polymorphism? Explain with a brief example.

## What is Polymorphism?

**Polymorphism** (Greek: "many forms") is an Object-Oriented Programming principle that allows objects of different types to be treated as instances of the same base type, while each object maintains its own specific behavior.

## Types of Polymorphism in C#:
1. **Compile-time Polymorphism** (Method Overloading, Operator Overloading)
2. **Runtime Polymorphism** (Method Overriding, Interface Implementation)

```csharp
using System;
using System.Collections.Generic;

// Base class for runtime polymorphism
public abstract class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // Virtual method - can be overridden
    public virtual void MakeSound()
    {
        Console.WriteLine($"{Name} makes a generic animal sound");
    }
    
    // Abstract method - must be overridden
    public abstract void Move();
    
    // Regular method - inherited as-is
    public void DisplayInfo()
    {
        Console.WriteLine($"Animal: {Name}, Age: {Age}");
    }
}

// Derived classes demonstrating polymorphism
public class Dog : Animal
{
    public string Breed { get; set; }
    
    public Dog(string name, int age, string breed) : base(name, age)
    {
        Breed = breed;
    }
    
    // Override virtual method - Runtime Polymorphism
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} the {Breed} says: Woof! Woof!");
    }
    
    // Override abstract method
    public override void Move()
    {
        Console.WriteLine($"{Name} runs around energetically");
    }
    
    // Dog-specific method
    public void Fetch()
    {
        Console.WriteLine($"{Name} fetches the ball");
    }
}

public class Cat : Animal
{
    public bool IsIndoor { get; set; }
    
    public Cat(string name, int age, bool isIndoor) : base(name, age)
    {
        IsIndoor = isIndoor;
    }
    
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} the cat says: Meow! Meow!");
    }
    
    public override void Move()
    {
        Console.WriteLine($"{Name} moves gracefully and silently");
    }
    
    public void Purr()
    {
        Console.WriteLine($"{Name} purrs contentedly");
    }
}

public class Bird : Animal
{
    public bool CanFly { get; set; }
    
    public Bird(string name, int age, bool canFly) : base(name, age)
    {
        CanFly = canFly;
    }
    
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} the bird says: Tweet! Tweet!");
    }
    
    public override void Move()
    {
        if (CanFly)
            Console.WriteLine($"{Name} soars through the sky");
        else
            Console.WriteLine($"{Name} hops around on the ground");
    }
    
    public void BuildNest()
    {
        Console.WriteLine($"{Name} builds a cozy nest");
    }
}

// Interface for polymorphism
public interface IPlayable
{
    void Play();
    void Rest();
}

// Classes implementing interface polymorphism
public class PlayfulDog : Dog, IPlayable
{
    public PlayfulDog(string name, int age, string breed) : base(name, age, breed)
    {
    }
    
    public void Play()
    {
        Console.WriteLine($"{Name} plays fetch and runs around happily");
    }
    
    public void Rest()
    {
        Console.WriteLine($"{Name} takes a nap in the sun");
    }
}

public class PlayfulCat : Cat, IPlayable
{
    public PlayfulCat(string name, int age, bool isIndoor) : base(name, age, isIndoor)
    {
    }
    
    public void Play()
    {
        Console.WriteLine($"{Name} plays with a ball of yarn");
    }
    
    public void Rest()
    {
        Console.WriteLine($"{Name} curls up for a cozy nap");
    }
}

// Demonstration of compile-time polymorphism (Method Overloading)
public class Calculator
{
    // Method overloading - same name, different parameters
    public int Add(int a, int b)
    {
        Console.WriteLine("Adding two integers");
        return a + b;
    }
    
    public double Add(double a, double b)
    {
        Console.WriteLine("Adding two doubles");
        return a + b;
    }
    
    public int Add(int a, int b, int c)
    {
        Console.WriteLine("Adding three integers");
        return a + b + c;
    }
    
    public string Add(string a, string b)
    {
        Console.WriteLine("Concatenating two strings");
        return a + b;
    }
}

// Main demonstration program
public class PolymorphismDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Polymorphism Demonstration ===\n");
        
        // Runtime Polymorphism Demo
        RuntimePolymorphismDemo();
        
        // Interface Polymorphism Demo
        InterfacePolymorphismDemo();
        
        // Compile-time Polymorphism Demo
        CompileTimePolymorphismDemo();
        
        // Advanced Polymorphism Examples
        AdvancedPolymorphismDemo();
    }
    
    public static void RuntimePolymorphismDemo()
    {
        Console.WriteLine("1. RUNTIME POLYMORPHISM (Method Overriding):");
        
        // Create array of Animal references pointing to different derived objects
        Animal[] animals = {
            new Dog("Buddy", 5, "Golden Retriever"),
            new Cat("Whiskers", 3, true),
            new Bird("Tweety", 2, true),
            new Dog("Rex", 7, "German Shepherd")
        };
        
        Console.WriteLine("Polymorphic behavior - same method call, different implementations:");
        
        foreach (Animal animal in animals)
        {
            // Polymorphic method calls
            animal.DisplayInfo();           // Inherited method
            animal.MakeSound();            // Virtual method - different implementation for each type
            animal.Move();                 // Abstract method - must be implemented by each type
            Console.WriteLine();
        }
        
        // Demonstrate virtual method behavior
        Console.WriteLine("Virtual method demonstration:");
        Animal genericAnimal = new Dog("Max", 4, "Labrador");
        genericAnimal.MakeSound(); // Calls Dog's implementation, not Animal's
        
        Console.WriteLine();
    }
    
    public static void InterfacePolymorphismDemo()
    {
        Console.WriteLine("2. INTERFACE POLYMORPHISM:");
        
        // Create array of interface references
        IPlayable[] playableAnimals = {
            new PlayfulDog("Rover", 3, "Beagle"),
            new PlayfulCat("Mittens", 2, false),
            new PlayfulDog("Spot", 6, "Dalmatian")
        };
        
        Console.WriteLine("Interface polymorphism - different classes, same interface:");
        
        foreach (IPlayable playable in playableAnimals)
        {
            playable.Play();
            playable.Rest();
            Console.WriteLine();
        }
    }
    
    public static void CompileTimePolymorphismDemo()
    {
        Console.WriteLine("3. COMPILE-TIME POLYMORPHISM (Method Overloading):");
        
        Calculator calc = new Calculator();
        
        // Same method name, different parameter types - resolved at compile time
        Console.WriteLine($"Result 1: {calc.Add(5, 10)}");                    // int version
        Console.WriteLine($"Result 2: {calc.Add(3.14, 2.86)}");               // double version
        Console.WriteLine($"Result 3: {calc.Add(1, 2, 3)}");                  // three int version
        Console.WriteLine($"Result 4: {calc.Add("Hello ", "World")}");        // string version
        
        Console.WriteLine();
    }
    
    public static void AdvancedPolymorphismDemo()
    {
        Console.WriteLine("4. ADVANCED POLYMORPHISM EXAMPLES:");
        
        // Polymorphic collection processing
        List<Animal> animalShelter = new List<Animal>
        {
            new Dog("Luna", 2, "Husky"),
            new Cat("Shadow", 4, true),
            new Bird("Phoenix", 1, false)
        };
        
        Console.WriteLine("Animal shelter daily routine:");
        ProcessAnimals(animalShelter);
        
        // Type checking and casting
        Console.WriteLine("\nType checking and specific behaviors:");
        foreach (Animal animal in animalShelter)
        {
            // Check type and call specific methods
            if (animal is Dog dog)
            {
                dog.Fetch();
            }
            else if (animal is Cat cat)
            {
                cat.Purr();
            }
            else if (animal is Bird bird)
            {
                bird.BuildNest();
            }
        }
        
        // Using 'as' operator
        Console.WriteLine("\nUsing 'as' operator for safe casting:");
        foreach (Animal animal in animalShelter)
        {
            Dog dog = animal as Dog;
            if (dog != null)
            {
                Console.WriteLine($"{dog.Name} is a {dog.Breed}");
            }
        }
        
        Console.WriteLine();
    }
    
    // Polymorphic method - works with any Animal type
    public static void ProcessAnimals(List<Animal> animals)
    {
        foreach (Animal animal in animals)
        {
            Console.WriteLine($"Processing {animal.GetType().Name}: {animal.Name}");
            animal.MakeSound();
            animal.Move();
            
            // Polymorphic feeding
            FeedAnimal(animal);
            Console.WriteLine();
        }
    }
    
    // Another polymorphic method
    public static void FeedAnimal(Animal animal)
    {
        switch (animal)
        {
            case Dog _:
                Console.WriteLine($"Giving {animal.Name} dog food and treats");
                break;
            case Cat _:
                Console.WriteLine($"Giving {animal.Name} cat food and milk");
                break;
            case Bird _:
                Console.WriteLine($"Giving {animal.Name} seeds and water");
                break;
            default:
                Console.WriteLine($"Giving {animal.Name} generic animal food");
                break;
        }
    }
}

// Additional polymorphism example - Shape hierarchy
public abstract class Shape
{
    public abstract double CalculateArea();
    public abstract double CalculatePerimeter();
    
    public virtual void DisplayInfo()
    {
        Console.WriteLine($"{GetType().Name}: Area = {CalculateArea():F2}, Perimeter = {CalculatePerimeter():F2}");
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
    
    public override double CalculateArea()
    {
        return Width * Height;
    }
    
    public override double CalculatePerimeter()
    {
        return 2 * (Width + Height);
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius)
    {
        Radius = radius;
    }
    
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
    
    public override double CalculatePerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}

public class Triangle : Shape
{
    public double Base { get; set; }
    public double Height { get; set; }
    public double Side1 { get; set; }
    public double Side2 { get; set; }
    
    public Triangle(double baseLength, double height, double side1, double side2)
    {
        Base = baseLength;
        Height = height;
        Side1 = side1;
        Side2 = side2;
    }
    
    public override double CalculateArea()
    {
        return 0.5 * Base * Height;
    }
    
    public override double CalculatePerimeter()
    {
        return Base + Side1 + Side2;
    }
}

// Demonstration of shape polymorphism
public class ShapeDemo
{
    public static void DemonstrateShapePolymorphism()
    {
        Console.WriteLine("5. SHAPE POLYMORPHISM EXAMPLE:");
        
        Shape[] shapes = {
            new Rectangle(5, 4),
            new Circle(3),
            new Triangle(6, 4, 5, 5)
        };
        
        Console.WriteLine("Calculating areas and perimeters polymorphically:");
        
        double totalArea = 0;
        foreach (Shape shape in shapes)
        {
            shape.DisplayInfo();
            totalArea += shape.CalculateArea();
        }
        
        Console.WriteLine($"Total area of all shapes: {totalArea:F2}");
    }
}
```

## Key Benefits of Polymorphism:

1. **Code Reusability**: Same interface works with different implementations
2. **Flexibility**: Easy to add new types without changing existing code  
3. **Maintainability**: Changes in implementation don't affect client code
4. **Abstraction**: Client code works with abstractions, not concrete types

## Polymorphism Summary:

| Type | Mechanism | Resolution Time | Example |
|------|-----------|----------------|---------|
| **Compile-time** | Method Overloading | Compile time | `Add(int, int)` vs `Add(double, double)` |
| **Runtime** | Method Overriding | Runtime | Virtual/Abstract method calls |
| **Interface** | Interface Implementation | Runtime | Different classes implementing same interface |

## Real-world Example:
```
Animal shelter = new Dog();  // Dog treated as Animal
shelter.MakeSound();         // Calls Dog's MakeSound(), not Animal's
// Output: "Buddy the Golden Retriever says: Woof! Woof!"
```

**This demonstrates polymorphism**: same method call (`MakeSound()`), different behavior based on the actual object type at runtime.
