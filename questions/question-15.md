# Question 15: Write a C# program to inherit a class BOX with properties Length, Breadth and Height. Class Box should have a read-only property named volume. Also add a method to display the properties in the console.

```csharp
using System;

// Base class Box
public class Box
{
    // Protected fields - accessible to derived classes
    protected double length;
    protected double breadth;
    protected double height;
    
    // Default constructor
    public Box()
    {
        length = 0;
        breadth = 0;
        height = 0;
    }
    
    // Parameterized constructor
    public Box(double length, double breadth, double height)
    {
        this.length = length;
        this.breadth = breadth;
        this.height = height;
    }
    
    // Properties with validation
    public double Length
    {
        get { return length; }
        set 
        { 
            if (value >= 0)
                length = value;
            else
                throw new ArgumentException("Length cannot be negative");
        }
    }
    
    public double Breadth
    {
        get { return breadth; }
        set 
        { 
            if (value >= 0)
                breadth = value;
            else
                throw new ArgumentException("Breadth cannot be negative");
        }
    }
    
    public double Height
    {
        get { return height; }
        set 
        { 
            if (value >= 0)
                height = value;
            else
                throw new ArgumentException("Height cannot be negative");
        }
    }
    
    // Read-only property for Volume
    public virtual double Volume
    {
        get { return length * breadth * height; }
    }
    
    // Virtual method to display properties (can be overridden)
    public virtual void DisplayProperties()
    {
        Console.WriteLine("=== Box Properties ===");
        Console.WriteLine($"Length: {length:F2}");
        Console.WriteLine($"Breadth: {breadth:F2}");
        Console.WriteLine($"Height: {height:F2}");
        Console.WriteLine($"Volume: {Volume:F2}");
        Console.WriteLine("=====================");
    }
    
    // Method to calculate surface area
    public virtual double GetSurfaceArea()
    {
        return 2 * (length * breadth + breadth * height + height * length);
    }
}

// Derived class - Cube (inherits from Box)
public class Cube : Box
{
    // Constructor for cube (all sides equal)
    public Cube(double side) : base(side, side, side)
    {
    }
    
    // Property for side (all dimensions are equal in a cube)
    public double Side
    {
        get { return length; }
        set 
        { 
            if (value >= 0)
            {
                length = breadth = height = value;
            }
            else
            {
                throw new ArgumentException("Side cannot be negative");
            }
        }
    }
    
    // Override display method for cube-specific output
    public override void DisplayProperties()
    {
        Console.WriteLine("=== Cube Properties ===");
        Console.WriteLine($"Side: {length:F2}");
        Console.WriteLine($"Volume: {Volume:F2}");
        Console.WriteLine($"Surface Area: {GetSurfaceArea():F2}");
        Console.WriteLine("======================");
    }
}

// Derived class - Rectangular Box with additional features
public class RectangularBox : Box
{
    private string material;
    private double weight;
    
    public RectangularBox(double length, double breadth, double height, string material = "Cardboard")
        : base(length, breadth, height)
    {
        this.material = material;
        this.weight = 0;
    }
    
    public string Material
    {
        get { return material; }
        set { material = value ?? "Unknown"; }
    }
    
    public double Weight
    {
        get { return weight; }
        set 
        { 
            if (value >= 0)
                weight = value;
            else
                throw new ArgumentException("Weight cannot be negative");
        }
    }
    
    // Calculate density (weight per unit volume)
    public double Density
    {
        get 
        { 
            return Volume > 0 ? weight / Volume : 0; 
        }
    }
    
    // Override display method
    public override void DisplayProperties()
    {
        Console.WriteLine("=== Rectangular Box Properties ===");
        Console.WriteLine($"Length: {length:F2}");
        Console.WriteLine($"Breadth: {breadth:F2}");
        Console.WriteLine($"Height: {height:F2}");
        Console.WriteLine($"Volume: {Volume:F2}");
        Console.WriteLine($"Surface Area: {GetSurfaceArea():F2}");
        Console.WriteLine($"Material: {material}");
        Console.WriteLine($"Weight: {weight:F2}");
        Console.WriteLine($"Density: {Density:F4}");
        Console.WriteLine("=================================");
    }
}

// Another derived class - Gift Box
public class GiftBox : Box
{
    private string color;
    private bool hasRibbon;
    private string giftMessage;
    
    public GiftBox(double length, double breadth, double height, string color = "Red")
        : base(length, breadth, height)
    {
        this.color = color;
        this.hasRibbon = false;
        this.giftMessage = "";
    }
    
    public string Color
    {
        get { return color; }
        set { color = value ?? "Unknown"; }
    }
    
    public bool HasRibbon
    {
        get { return hasRibbon; }
        set { hasRibbon = value; }
    }
    
    public string GiftMessage
    {
        get { return giftMessage; }
        set { giftMessage = value ?? ""; }
    }
    
    // Calculate wrapping paper needed (with some extra)
    public double WrappingPaperNeeded
    {
        get { return GetSurfaceArea() * 1.2; } // 20% extra for overlap
    }
    
    public override void DisplayProperties()
    {
        Console.WriteLine("=== Gift Box Properties ===");
        Console.WriteLine($"Dimensions: {length:F2} x {breadth:F2} x {height:F2}");
        Console.WriteLine($"Volume: {Volume:F2}");
        Console.WriteLine($"Color: {color}");
        Console.WriteLine($"Has Ribbon: {(hasRibbon ? "Yes" : "No")}");
        Console.WriteLine($"Gift Message: {(string.IsNullOrEmpty(giftMessage) ? "None" : giftMessage)}");
        Console.WriteLine($"Wrapping Paper Needed: {WrappingPaperNeeded:F2}");
        Console.WriteLine("===========================");
    }
}

// Main program to demonstrate inheritance
public class BoxInheritanceDemo
{
    public static void Main()
    {
        Console.WriteLine("=== Box Inheritance Demonstration ===\n");
        
        try
        {
            // Create base Box object
            Console.WriteLine("1. Basic Box:");
            Box basicBox = new Box(10, 8, 6);
            basicBox.DisplayProperties();
            
            // Create Cube object
            Console.WriteLine("\n2. Cube:");
            Cube cube = new Cube(5);
            cube.DisplayProperties();
            
            // Create Rectangular Box
            Console.WriteLine("\n3. Rectangular Box:");
            RectangularBox rectBox = new RectangularBox(12, 8, 4, "Wood");
            rectBox.Weight = 2.5;
            rectBox.DisplayProperties();
            
            // Create Gift Box
            Console.WriteLine("\n4. Gift Box:");
            GiftBox giftBox = new GiftBox(15, 10, 8, "Blue");
            giftBox.HasRibbon = true;
            giftBox.GiftMessage = "Happy Birthday!";
            giftBox.DisplayProperties();
            
            // Demonstrate polymorphism
            Console.WriteLine("\n5. Polymorphism Demo:");
            DemonstratePolymorphism();
            
            // Interactive box creation
            Console.WriteLine("\n6. Create Your Own Box:");
            CreateInteractiveBox();
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Validation Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    public static void DemonstratePolymorphism()
    {
        // Array of Box references pointing to different derived objects
        Box[] boxes = {
            new Box(5, 4, 3),
            new Cube(4),
            new RectangularBox(6, 5, 4, "Plastic"),
            new GiftBox(8, 6, 5, "Green")
        };
        
        Console.WriteLine("Processing different box types polymorphically:");
        foreach (Box box in boxes)
        {
            Console.WriteLine($"Box type: {box.GetType().Name}");
            Console.WriteLine($"Volume: {box.Volume:F2}");
            Console.WriteLine($"Surface Area: {box.GetSurfaceArea():F2}");
            Console.WriteLine("---");
        }
    }
    
    public static void CreateInteractiveBox()
    {
        try
        {
            Console.Write("Enter length: ");
            double length = double.Parse(Console.ReadLine());
            
            Console.Write("Enter breadth: ");
            double breadth = double.Parse(Console.ReadLine());
            
            Console.Write("Enter height: ");
            double height = double.Parse(Console.ReadLine());
            
            Box userBox = new Box(length, breadth, height);
            
            Console.WriteLine("\nYour custom box:");
            userBox.DisplayProperties();
            
            // Modify properties
            Console.Write("Want to modify length? (y/n): ");
            if (Console.ReadLine().ToLower() == "y")
            {
                Console.Write("Enter new length: ");
                userBox.Length = double.Parse(Console.ReadLine());
                
                Console.WriteLine("\nUpdated box:");
                userBox.DisplayProperties();
            }
        }
        catch (FormatException)
        {
            Console.WriteLine("Invalid input format. Please enter numeric values.");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Invalid value: {ex.Message}");
        }
    }
}
```

