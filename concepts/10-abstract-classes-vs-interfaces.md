# Abstract Classes vs Interfaces

## Abstract Classes

### Definition
An abstract class is a class that cannot be instantiated and may contain both abstract and concrete members.

### Key Characteristics
- Cannot be instantiated directly
- Can contain both abstract and concrete methods
- Can have constructors
- Can have fields and properties
- Supports single inheritance only
- Can have access modifiers for members

```csharp
public abstract class Vehicle
{
    // Fields
    protected string brand;
    protected int year;
    
    // Constructor
    public Vehicle(string brand, int year)
    {
        this.brand = brand;
        this.year = year;
    }
    
    // Abstract method - must be implemented
    public abstract void Start();
    public abstract double CalculateFuelEfficiency();
    
    // Concrete method - inherited as-is
    public void DisplayInfo()
    {
        Console.WriteLine($"{brand} {year}");
    }
    
    // Virtual method - can be overridden
    public virtual void Stop()
    {
        Console.WriteLine("Vehicle stopped");
    }
    
    // Properties
    public string Brand => brand;
    public int Year => year;
}

public class Car : Vehicle
{
    private double engineSize;
    
    public Car(string brand, int year, double engineSize) 
        : base(brand, year)
    {
        this.engineSize = engineSize;
    }
    
    public override void Start()
    {
        Console.WriteLine($"Car {brand} started with {engineSize}L engine");
    }
    
    public override double CalculateFuelEfficiency()
    {
        return 25.0 - (engineSize * 2); // Simplified calculation
    }
    
    public override void Stop()
    {
        Console.WriteLine("Car stopped with brake pedal");
    }
}
```

## Interfaces

### Definition
An interface defines a contract that implementing classes must follow. It contains only declarations.

### Key Characteristics
- Cannot be instantiated
- Contains only method signatures, properties, events, indexers
- No implementation (except default interface methods in C# 8+)
- No fields or constructors
- Supports multiple inheritance
- All members are implicitly public

```csharp
public interface IVehicle
{
    // Properties
    string Brand { get; }
    int Year { get; }
    
    // Methods
    void Start();
    void Stop();
    double CalculateFuelEfficiency();
}

public interface IElectric
{
    int BatteryCapacity { get; }
    void Charge();
    double GetRemainingCharge();
}

public interface IGasoline
{
    double FuelTankCapacity { get; }
    void Refuel();
    double GetRemainingFuel();
}

// Class implementing multiple interfaces
public class HybridCar : IVehicle, IElectric, IGasoline
{
    public string Brand { get; private set; }
    public int Year { get; private set; }
    public int BatteryCapacity { get; private set; }
    public double FuelTankCapacity { get; private set; }
    
    private double currentCharge;
    private double currentFuel;
    
    public HybridCar(string brand, int year, int batteryCapacity, double fuelCapacity)
    {
        Brand = brand;
        Year = year;
        BatteryCapacity = batteryCapacity;
        FuelTankCapacity = fuelCapacity;
        currentCharge = batteryCapacity;
        currentFuel = fuelCapacity;
    }
    
    public void Start()
    {
        Console.WriteLine($"Hybrid {Brand} started (using battery first)");
    }
    
    public void Stop()
    {
        Console.WriteLine("Hybrid car stopped");
    }
    
    public double CalculateFuelEfficiency()
    {
        return 50.0; // High efficiency due to hybrid nature
    }
    
    public void Charge()
    {
        currentCharge = BatteryCapacity;
        Console.WriteLine("Battery fully charged");
    }
    
    public double GetRemainingCharge()
    {
        return currentCharge;
    }
    
    public void Refuel()
    {
        currentFuel = FuelTankCapacity;
        Console.WriteLine("Fuel tank refilled");
    }
    
    public double GetRemainingFuel()
    {
        return currentFuel;
    }
}
```

## Comparison Table

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| **Instantiation** | Cannot be instantiated | Cannot be instantiated |
| **Implementation** | Can have both abstract and concrete methods | Only method signatures (except default methods) |
| **Fields** | Can have fields | Cannot have fields |
| **Constructors** | Can have constructors | Cannot have constructors |
| **Access Modifiers** | Can use various access modifiers | Members are implicitly public |
| **Inheritance** | Single inheritance | Multiple inheritance |
| **When to Use** | When classes share common implementation | When classes share common behavior contract |

## When to Use Which?

### Use Abstract Class When:
- You want to share code among several closely related classes
- You expect classes that extend your abstract class to have many common methods or fields
- You want to declare non-public members
- You need to provide a common constructor

### Use Interface When:
- You expect unrelated classes to implement your interface
- You want to specify the behavior of a particular data type, but not concerned about who implements it
- You want to support multiple inheritance of type
- You want to provide a contract for classes to follow

```csharp
// Example: When to use both
public abstract class DatabaseConnection
{
    protected string connectionString;
    
    protected DatabaseConnection(string connectionString)
    {
        this.connectionString = connectionString;
    }
    
    public abstract void Connect();
    public abstract void Disconnect();
    
    // Common implementation
    public void LogOperation(string operation)
    {
        Console.WriteLine($"[{DateTime.Now}] {operation}");
    }
}

public interface IQueryable
{
    IEnumerable<T> Query<T>(string sql);
    void Execute(string sql);
}

public class SqlServerConnection : DatabaseConnection, IQueryable
{
    public SqlServerConnection(string connectionString) 
        : base(connectionString) { }
    
    public override void Connect()
    {
        LogOperation("Connecting to SQL Server");
    }
    
    public override void Disconnect()
    {
        LogOperation("Disconnecting from SQL Server");
    }
    
    public IEnumerable<T> Query<T>(string sql)
    {
        LogOperation($"Executing query: {sql}");
        // Implementation here
        return new List<T>();
    }
    
    public void Execute(string sql)
    {
        LogOperation($"Executing command: {sql}");
        // Implementation here
    }
}
```
