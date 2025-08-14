# Inheritance and Encapsulation

## Inheritance

### Definition
Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing an "is-a" relationship.

### Types of Inheritance in C#

```csharp
// Base class (Parent)
public class Person
{
    protected string name;
    protected int age;
    
    public Person(string name, int age)
    {
        this.name = name;
        this.age = age;
    }
    
    public virtual void Introduce()
    {
        Console.WriteLine($"Hi, I'm {name} and I'm {age} years old.");
    }
    
    public void Sleep()
    {
        Console.WriteLine($"{name} is sleeping.");
    }
}

// Derived class (Child)
public class Student : Person
{
    private string studentId;
    private List<string> courses;
    
    public Student(string name, int age, string studentId) 
        : base(name, age) // Call parent constructor
    {
        this.studentId = studentId;
        this.courses = new List<string>();
    }
    
    // Override parent method
    public override void Introduce()
    {
        Console.WriteLine($"Hi, I'm {name}, a student with ID {studentId}.");
    }
    
    // New method specific to Student
    public void EnrollInCourse(string course)
    {
        courses.Add(course);
        Console.WriteLine($"{name} enrolled in {course}");
    }
    
    public void Study()
    {
        Console.WriteLine($"{name} is studying.");
    }
}

// Further inheritance
public class GraduateStudent : Student
{
    private string researchTopic;
    
    public GraduateStudent(string name, int age, string studentId, string researchTopic) 
        : base(name, age, studentId)
    {
        this.researchTopic = researchTopic;
    }
    
    public override void Introduce()
    {
        Console.WriteLine($"Hi, I'm {name}, a graduate student researching {researchTopic}.");
    }
    
    public void Conduct_Research()
    {
        Console.WriteLine($"{name} is conducting research on {researchTopic}.");
    }
}
```

### Method Hiding vs Overriding
```csharp
public class BaseClass
{
    public virtual void VirtualMethod()
    {
        Console.WriteLine("Base virtual method");
    }
    
    public void RegularMethod()
    {
        Console.WriteLine("Base regular method");
    }
}

public class DerivedClass : BaseClass
{
    // Method overriding (runtime polymorphism)
    public override void VirtualMethod()
    {
        Console.WriteLine("Derived overridden method");
    }
    
    // Method hiding (compile-time)
    public new void RegularMethod()
    {
        Console.WriteLine("Derived hidden method");
    }
}

// Usage demonstration
BaseClass baseRef = new DerivedClass();
baseRef.VirtualMethod();  // "Derived overridden method" (polymorphism)
baseRef.RegularMethod();  // "Base regular method" (no polymorphism)

DerivedClass derivedRef = new DerivedClass();
derivedRef.VirtualMethod(); // "Derived overridden method"
derivedRef.RegularMethod(); // "Derived hidden method"
```

## Encapsulation

### Definition
Encapsulation is the bundling of data and methods that operate on that data within a single unit, while restricting access to some components.

### Access Modifiers

```csharp
public class BankAccount
{
    // Private fields (encapsulated data)
    private string accountNumber;
    private decimal balance;
    private string ownerName;
    
    // Public constructor
    public BankAccount(string accountNumber, string ownerName, decimal initialBalance = 0)
    {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance >= 0 ? initialBalance : 0;
    }
    
    // Public properties (controlled access)
    public string AccountNumber 
    { 
        get { return accountNumber; } 
        // No setter - read-only
    }
    
    public string OwnerName
    {
        get { return ownerName; }
        set 
        { 
            if (!string.IsNullOrWhiteSpace(value))
                ownerName = value; 
        }
    }
    
    public decimal Balance 
    { 
        get { return balance; } 
        // No public setter - controlled through methods
    }
    
    // Public methods (controlled operations)
    public bool Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            LogTransaction($"Deposited {amount:C}");
            return true;
        }
        return false;
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            LogTransaction($"Withdrew {amount:C}");
            return true;
        }
        return false;
    }
    
    // Private helper method (internal implementation)
    private void LogTransaction(string transaction)
    {
        Console.WriteLine($"[{DateTime.Now}] {AccountNumber}: {transaction}. Balance: {balance:C}");
    }
    
    // Protected method (accessible to derived classes)
    protected virtual bool ValidateTransaction(decimal amount)
    {
        return amount > 0 && amount <= balance;
    }
}

// Inheritance with encapsulation
public class SavingsAccount : BankAccount
{
    private decimal interestRate;
    private DateTime lastInterestDate;
    
    public SavingsAccount(string accountNumber, string ownerName, decimal interestRate, decimal initialBalance = 0)
        : base(accountNumber, ownerName, initialBalance)
    {
        this.interestRate = interestRate;
        this.lastInterestDate = DateTime.Now;
    }
    
    public decimal InterestRate
    {
        get { return interestRate; }
        set { interestRate = value > 0 ? value : interestRate; }
    }
    
    public void ApplyInterest()
    {
        if (DateTime.Now.Month != lastInterestDate.Month)
        {
            decimal interest = Balance * (interestRate / 100 / 12);
            Deposit(interest); // Using inherited method
            lastInterestDate = DateTime.Now;
        }
    }
    
    // Override inherited behavior
    protected override bool ValidateTransaction(decimal amount)
    {
        // Savings account might have different validation rules
        return base.ValidateTransaction(amount) && amount <= 1000; // Daily limit
    }
}
```

### Properties and Auto-Properties
```csharp
public class Product
{
    // Full property with backing field
    private decimal price;
    public decimal Price
    {
        get { return price; }
        set 
        { 
            if (value >= 0)
                price = value;
            else
                throw new ArgumentException("Price cannot be negative");
        }
    }
    
    // Auto-property (compiler generates backing field)
    public string Name { get; set; }
    
    // Auto-property with private setter
    public DateTime CreatedDate { get; private set; }
    
    // Auto-property with default value
    public bool IsActive { get; set; } = true;
    
    // Read-only auto-property
    public int Id { get; }
    
    // Constructor
    public Product(int id, string name, decimal price)
    {
        Id = id; // Can only be set in constructor
        Name = name;
        Price = price;
        CreatedDate = DateTime.Now;
    }
    
    // Computed property
    public string DisplayName => $"{Name} (${Price:F2})";
}
```
