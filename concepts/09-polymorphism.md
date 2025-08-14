# Polymorphism

## Definition
Polymorphism allows objects of different types to be treated as objects of a common base type, while maintaining their specific behavior.

## Types of Polymorphism

### 1. Method Overloading (Compile-time Polymorphism)
```csharp
public class Calculator
{
    // Same method name, different parameters
    public int Add(int a, int b)
    {
        return a + b;
    }
    
    public double Add(double a, double b)
    {
        return a + b;
    }
    
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }
    
    public string Add(string a, string b)
    {
        return a + b;
    }
}

// Usage
Calculator calc = new Calculator();
int result1 = calc.Add(5, 3);           // Calls int version
double result2 = calc.Add(5.5, 3.2);    // Calls double version
int result3 = calc.Add(1, 2, 3);        // Calls three-parameter version
string result4 = calc.Add("Hello", " World"); // Calls string version
```

### 2. Method Overriding (Runtime Polymorphism)
```csharp
// Base class
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("The animal makes a sound");
    }
    
    public virtual void Move()
    {
        Console.WriteLine("The animal moves");
    }
}

// Derived classes
public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("The dog barks: Woof!");
    }
    
    public override void Move()
    {
        Console.WriteLine("The dog runs");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("The cat meows: Meow!");
    }
    
    public override void Move()
    {
        Console.WriteLine("The cat prowls");
    }
}

// Polymorphic usage
Animal[] animals = { new Dog(), new Cat(), new Animal() };
foreach (Animal animal in animals)
{
    animal.MakeSound(); // Calls appropriate overridden method
    animal.Move();      // Runtime determines which method to call
}
```

## Abstract Methods and Classes
```csharp
public abstract class Shape
{
    // Abstract method - must be implemented by derived classes
    public abstract double CalculateArea();
    
    // Virtual method - can be overridden
    public virtual void Display()
    {
        Console.WriteLine($"Area: {CalculateArea():F2}");
    }
    
    // Regular method - inherited as-is
    public void PrintInfo()
    {
        Console.WriteLine("This is a shape");
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
    
    public override void Display()
    {
        Console.WriteLine($"Rectangle - Width: {Width}, Height: {Height}, Area: {CalculateArea():F2}");
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
}
```

## Interface Polymorphism
```csharp
public interface IDrawable
{
    void Draw();
    void Resize(double factor);
}

public interface IColorable
{
    string Color { get; set; }
    void ChangeColor(string newColor);
}

public class Button : IDrawable, IColorable
{
    public string Color { get; set; } = "Gray";
    public string Text { get; set; }
    
    public void Draw()
    {
        Console.WriteLine($"Drawing {Color} button with text: {Text}");
    }
    
    public void Resize(double factor)
    {
        Console.WriteLine($"Resizing button by factor: {factor}");
    }
    
    public void ChangeColor(string newColor)
    {
        Color = newColor;
        Console.WriteLine($"Button color changed to: {newColor}");
    }
}

// Polymorphic usage with interfaces
IDrawable[] drawables = { new Button { Text = "OK" }, new Button { Text = "Cancel" } };
foreach (IDrawable drawable in drawables)
{
    drawable.Draw();
    drawable.Resize(1.5);
}
```
