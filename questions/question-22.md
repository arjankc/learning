# Question 22: Define an interface with methods Area(), Volume(). Define a constant PI having value 3.14. Create class Cylinder which implements this interface. Create one object and calculate area and volume.

```csharp
using System;

// Interface definition with methods and constant
public interface IShape3D
{
    // Constant PI with value 3.14
    const double PI = 3.14;
    
    // Abstract methods that implementing classes must define
    double Area();
    double Volume();
    
    // Optional: Additional interface members
    string GetShapeInfo();
}

// Cylinder class implementing the interface
public class Cylinder : IShape3D
{
    // Private fields
    private double radius;
    private double height;
    
    // Constructor
    public Cylinder(double radius, double height)
    {
        if (radius <= 0 || height <= 0)
            throw new ArgumentException("Radius and height must be positive");
            
        this.radius = radius;
        this.height = height;
    }
    
    // Properties
    public double Radius
    {
        get { return radius; }
        set 
        { 
            if (value > 0) 
                radius = value; 
            else 
                throw new ArgumentException("Radius must be positive");
        }
    }
    
    public double Height
    {
        get { return height; }
        set 
        { 
            if (value > 0) 
                height = value; 
            else 
                throw new ArgumentException("Height must be positive");
        }
    }
    
    // Implementation of Area() method - Surface Area of Cylinder
    public double Area()
    {
        // Surface Area = 2πr² + 2πrh (top + bottom + lateral surface)
        double topAndBottom = 2 * IShape3D.PI * radius * radius;
        double lateralSurface = 2 * IShape3D.PI * radius * height;
        return topAndBottom + lateralSurface;
    }
    
    // Implementation of Volume() method
    public double Volume()
    {
        // Volume = πr²h
        return IShape3D.PI * radius * radius * height;
    }
    
    // Implementation of GetShapeInfo() method
    public string GetShapeInfo()
    {
        return $"Cylinder - Radius: {radius:F2}, Height: {height:F2}";
    }
    
    // Additional methods specific to Cylinder
    public double GetLateralArea()
    {
        // Lateral Area = 2πrh
        return 2 * IShape3D.PI * radius * height;
    }
    
    public double GetBaseArea()
    {
        // Base Area = πr²
        return IShape3D.PI * radius * radius;
    }
    
    public void DisplayDetails()
    {
        Console.WriteLine($"=== Cylinder Details ===");
        Console.WriteLine($"Radius: {radius:F2}");
        Console.WriteLine($"Height: {height:F2}");
        Console.WriteLine($"Base Area: {GetBaseArea():F2}");
        Console.WriteLine($"Lateral Area: {GetLateralArea():F2}");
        Console.WriteLine($"Total Surface Area: {Area():F2}");
        Console.WriteLine($"Volume: {Volume():F2}");
        Console.WriteLine($"========================");
    }
}

// Additional shape classes implementing the same interface
public class Sphere : IShape3D
{
    private double radius;
    
    public Sphere(double radius)
    {
        if (radius <= 0)
            throw new ArgumentException("Radius must be positive");
        this.radius = radius;
    }
    
    public double Radius
    {
        get { return radius; }
        set 
        { 
            if (value > 0) 
                radius = value; 
            else 
                throw new ArgumentException("Radius must be positive");
        }
    }
    
    public double Area()
    {
        // Surface Area of Sphere = 4πr²
        return 4 * IShape3D.PI * radius * radius;
    }
    
    public double Volume()
    {
        // Volume of Sphere = (4/3)πr³
        return (4.0 / 3.0) * IShape3D.PI * radius * radius * radius;
    }
    
    public string GetShapeInfo()
    {
        return $"Sphere - Radius: {radius:F2}";
    }
}

public class Cone : IShape3D
{
    private double radius;
    private double height;
    
    public Cone(double radius, double height)
    {
        if (radius <= 0 || height <= 0)
            throw new ArgumentException("Radius and height must be positive");
        this.radius = radius;
        this.height = height;
    }
    
    public double Radius => radius;
    public double Height => height;
    
    // Slant height calculation
    public double SlantHeight => Math.Sqrt(radius * radius + height * height);
    
    public double Area()
    {
        // Surface Area = πr² + πrl (base + lateral surface)
        double baseArea = IShape3D.PI * radius * radius;
        double lateralArea = IShape3D.PI * radius * SlantHeight;
        return baseArea + lateralArea;
    }
    
    public double Volume()
    {
        // Volume = (1/3)πr²h
        return (1.0 / 3.0) * IShape3D.PI * radius * radius * height;
    }
    
    public string GetShapeInfo()
    {
        return $"Cone - Radius: {radius:F2}, Height: {height:F2}, Slant Height: {SlantHeight:F2}";
    }
}

// Main program demonstrating interface implementation
public class InterfaceDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Interface Implementation Demonstration ===\n");
        
        try
        {
            // Create Cylinder object and calculate area and volume
            CreateAndTestCylinder();
            
            // Demonstrate polymorphism with interface
            DemonstratePolymorphism();
            
            // Interactive cylinder creation
            CreateInteractiveCylinder();
            
            // Compare different shapes
            CompareShapes();
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
        }
    }
    
    public static void CreateAndTestCylinder()
    {
        Console.WriteLine("1. Creating and Testing Cylinder:");
        
        // Create cylinder object
        Cylinder cylinder = new Cylinder(5.0, 10.0);
        
        // Calculate and display area and volume
        double area = cylinder.Area();
        double volume = cylinder.Volume();
        
        Console.WriteLine($"Cylinder: Radius = {cylinder.Radius}, Height = {cylinder.Height}");
        Console.WriteLine($"Surface Area = {area:F2}");
        Console.WriteLine($"Volume = {volume:F2}");
        Console.WriteLine($"Shape Info: {cylinder.GetShapeInfo()}");
        
        // Display detailed information
        cylinder.DisplayDetails();
        
        Console.WriteLine();
    }
    
    public static void DemonstratePolymorphism()
    {
        Console.WriteLine("2. Polymorphism with Interface:");
        
        // Array of interface references
        IShape3D[] shapes = {
            new Cylinder(3, 8),
            new Sphere(4),
            new Cone(5, 12),
            new Cylinder(2.5, 6)
        };
        
        Console.WriteLine($"{"Shape",-20} {"Area",-15} {"Volume",-15}");
        Console.WriteLine(new string('-', 50));
        
        foreach (IShape3D shape in shapes)
        {
            Console.WriteLine($"{shape.GetShapeInfo(),-20} {shape.Area(),-15:F2} {shape.Volume(),-15:F2}");
        }
        
        Console.WriteLine();
    }
    
    public static void CreateInteractiveCylinder()
    {
        Console.WriteLine("3. Interactive Cylinder Creation:");
        
        try
        {
            Console.Write("Enter cylinder radius: ");
            double radius = double.Parse(Console.ReadLine());
            
            Console.Write("Enter cylinder height: ");
            double height = double.Parse(Console.ReadLine());
            
            Cylinder userCylinder = new Cylinder(radius, height);
            
            Console.WriteLine("\nYour cylinder:");
            userCylinder.DisplayDetails();
            
            // Calculate some additional properties
            double baseArea = userCylinder.GetBaseArea();
            double lateralArea = userCylinder.GetLateralArea();
            
            Console.WriteLine($"Additional calculations:");
            Console.WriteLine($"Base Area: {baseArea:F2}");
            Console.WriteLine($"Lateral Area: {lateralArea:F2}");
            Console.WriteLine($"Total Surface Area: {userCylinder.Area():F2}");
            Console.WriteLine($"Volume: {userCylinder.Volume():F2}");
        }
        catch (FormatException)
        {
            Console.WriteLine("Invalid input. Please enter numeric values.");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Invalid values: {ex.Message}");
        }
        
        Console.WriteLine();
    }
    
    public static void CompareShapes()
    {
        Console.WriteLine("4. Shape Comparison:");
        
        // Create shapes with same dimensions where applicable
        double commonRadius = 3.0;
        double commonHeight = 6.0;
        
        IShape3D cylinder = new Cylinder(commonRadius, commonHeight);
        IShape3D sphere = new Sphere(commonRadius);
        IShape3D cone = new Cone(commonRadius, commonHeight);
        
        Console.WriteLine("Comparing shapes with radius = 3.0:");
        Console.WriteLine($"Cylinder (h=6.0): Area = {cylinder.Area():F2}, Volume = {cylinder.Volume():F2}");
        Console.WriteLine($"Sphere: Area = {sphere.Area():F2}, Volume = {sphere.Volume():F2}");
        Console.WriteLine($"Cone (h=6.0): Area = {cone.Area():F2}, Volume = {cone.Volume():F2}");
        
        // Find shape with maximum volume
        IShape3D[] compareShapes = { cylinder, sphere, cone };
        IShape3D maxVolumeShape = null;
        double maxVolume = 0;
        
        foreach (IShape3D shape in compareShapes)
        {
            if (shape.Volume() > maxVolume)
            {
                maxVolume = shape.Volume();
                maxVolumeShape = shape;
            }
        }
        
        Console.WriteLine($"\nShape with maximum volume: {maxVolumeShape?.GetShapeInfo()} (Volume: {maxVolume:F2})");
        
        Console.WriteLine();
    }
}

// Utility class for shape calculations
public static class ShapeUtilities
{
    // Extension methods for interface
    public static double GetDensity(this IShape3D shape, double mass)
    {
        return mass / shape.Volume();
    }
    
    public static double GetSurfaceToVolumeRatio(this IShape3D shape)
    {
        return shape.Area() / shape.Volume();
    }
    
    // Helper method to convert degrees to radians
    public static double DegreesToRadians(double degrees)
    {
        return degrees * IShape3D.PI / 180.0;
    }
    
    // Calculate volume using different PI precision
    public static void ComparePrecision(IShape3D shape)
    {
        // Using interface constant PI = 3.14
        double volumeInterfacePI = shape.Volume();
        
        // Using Math.PI for comparison
        double precisePIRatio = Math.PI / IShape3D.PI;
        double volumeMathPI = volumeInterfacePI * precisePIRatio;
        
        Console.WriteLine($"Volume with PI = 3.14: {volumeInterfacePI:F6}");
        Console.WriteLine($"Volume with Math.PI: {volumeMathPI:F6}");
        Console.WriteLine($"Difference: {Math.Abs(volumeMathPI - volumeInterfacePI):F6}");
    }
}

// Advanced interface example with generic constraints
public interface IComparable3DShape : IShape3D, IComparable<IComparable3DShape>
{
    double GetCharacteristicLength();
}

public class AdvancedCylinder : Cylinder, IComparable3DShape
{
    public AdvancedCylinder(double radius, double height) : base(radius, height)
    {
    }
    
    public double GetCharacteristicLength()
    {
        // Return the larger of diameter or height
        return Math.Max(2 * Radius, Height);
    }
    
    public int CompareTo(IComparable3DShape other)
    {
        if (other == null) return 1;
        return this.Volume().CompareTo(other.Volume());
    }
}
```

## Key Interface Concepts Demonstrated:

1. **Interface Definition**: `IShape3D` with methods `Area()`, `Volume()`, and constant `PI`
2. **Interface Implementation**: `Cylinder` class implements all interface members
3. **Constant Usage**: Interface constant `PI = 3.14` used in calculations
4. **Polymorphism**: Different shapes can be treated uniformly through interface
5. **Multiple Implementations**: Several classes implement the same interface

## Output Example:
```
Cylinder: Radius = 5, Height = 10
Surface Area = 471.00
Volume = 785.00
Shape Info: Cylinder - Radius: 5.00, Height: 10.00
```

This demonstrates how interfaces provide a contract that implementing classes must follow, enabling polymorphism and code reusability.

