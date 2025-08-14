# Question 19: C# is Object Oriented Language. Give one reason supporting the given argument.

**C# is an Object-Oriented Programming (OOP) language because it supports all four fundamental principles of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction.**

## Primary Reason - Encapsulation:

**C# fully supports encapsulation by allowing data and methods to be bundled together within classes, while controlling access through access modifiers.**

```csharp
using System;

// Example demonstrating Encapsulation - the core OOP principle
public class BankAccount
{
    // Private fields - data is hidden from outside access
    private string accountNumber;
    private string accountHolder;
    private decimal balance;
    private DateTime createdDate;
    
    // Constructor to initialize object state
    public BankAccount(string accountNumber, string accountHolder, decimal initialBalance)
    {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance >= 0 ? initialBalance : 0;
        this.createdDate = DateTime.Now;
    }
    
    // Public properties provide controlled access to private data
    public string AccountNumber 
    { 
        get { return accountNumber; } 
        // No setter - account number cannot be changed after creation
    }
    
    public string AccountHolder 
    { 
        get { return accountHolder; }
        set 
        { 
            if (!string.IsNullOrEmpty(value))
                accountHolder = value; 
        }
    }
    
    // Read-only property for balance (can only be modified through methods)
    public decimal Balance 
    { 
        get { return balance; } 
    }
    
    public DateTime CreatedDate 
    { 
        get { return createdDate; } 
    }
    
    // Public methods provide controlled operations on private data
    public bool Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            Console.WriteLine($"Deposited: ${amount:F2}. New balance: ${balance:F2}");
            return true;
        }
        Console.WriteLine("Invalid deposit amount. Amount must be positive.");
        return false;
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            Console.WriteLine($"Withdrawn: ${amount:F2}. New balance: ${balance:F2}");
            return true;
        }
        Console.WriteLine("Invalid withdrawal. Check amount and balance.");
        return false;
    }
    
    // Method to display account information
    public void DisplayAccountInfo()
    {
        Console.WriteLine($"Account: {accountNumber}");
        Console.WriteLine($"Holder: {accountHolder}");
        Console.WriteLine($"Balance: ${balance:F2}");
        Console.WriteLine($"Created: {createdDate:yyyy-MM-dd}");
    }
}

// Additional example showing all OOP principles
public class OOPDemonstration
{
    public static void Main()
    {
        Console.WriteLine("=== C# OOP Demonstration ===\n");
        
        // 1. ENCAPSULATION - Data and methods bundled together with access control
        Console.WriteLine("1. ENCAPSULATION:");
        BankAccount account = new BankAccount("ACC001", "John Doe", 1000.00m);
        
        // Data is accessed through controlled methods/properties
        Console.WriteLine($"Account Number: {account.AccountNumber}"); // Accessible
        Console.WriteLine($"Balance: ${account.Balance:F2}"); // Read-only access
        
        // Direct access to private fields is not allowed:
        // account.balance = 5000; // ERROR: Cannot access private field
        
        // Operations through public methods
        account.Deposit(500);
        account.Withdraw(200);
        account.DisplayAccountInfo();
        
        Console.WriteLine();
        
        // 2. INHERITANCE - Creating specialized classes from base classes
        Console.WriteLine("2. INHERITANCE:");
        SavingsAccount savings = new SavingsAccount("SAV001", "Jane Smith", 2000, 0.05m);
        savings.Deposit(100);
        savings.ApplyInterest();
        savings.DisplayAccountInfo();
        
        Console.WriteLine();
        
        // 3. POLYMORPHISM - Same interface, different implementations
        Console.WriteLine("3. POLYMORPHISM:");
        BankAccount[] accounts = 
        {
            new BankAccount("ACC002", "Alice Brown", 1500),
            new SavingsAccount("SAV002", "Bob Wilson", 3000, 0.03m),
            new CheckingAccount("CHK001", "Carol Davis", 800, 500)
        };
        
        foreach (BankAccount acc in accounts)
        {
            Console.WriteLine($"Processing {acc.GetType().Name}:");
            acc.DisplayAccountInfo(); // Polymorphic behavior
            Console.WriteLine();
        }
        
        // 4. ABSTRACTION - Hiding complex implementation details
        Console.WriteLine("4. ABSTRACTION:");
        IPaymentProcessor processor = new CreditCardProcessor();
        processor.ProcessPayment(250.00m); // Abstract interface, concrete implementation
    }
}

// INHERITANCE example
public class SavingsAccount : BankAccount
{
    private decimal interestRate;
    
    public SavingsAccount(string accountNumber, string accountHolder, decimal initialBalance, decimal interestRate)
        : base(accountNumber, accountHolder, initialBalance)
    {
        this.interestRate = interestRate;
    }
    
    public decimal InterestRate 
    { 
        get { return interestRate; }
        set { interestRate = value >= 0 ? value : 0; }
    }
    
    public void ApplyInterest()
    {
        decimal interest = Balance * interestRate;
        Deposit(interest);
        Console.WriteLine($"Interest applied: ${interest:F2} at rate {interestRate:P2}");
    }
    
    public override void DisplayAccountInfo()
    {
        base.DisplayAccountInfo();
        Console.WriteLine($"Interest Rate: {interestRate:P2}");
    }
}

public class CheckingAccount : BankAccount
{
    private decimal overdraftLimit;
    
    public CheckingAccount(string accountNumber, string accountHolder, decimal initialBalance, decimal overdraftLimit)
        : base(accountNumber, accountHolder, initialBalance)
    {
        this.overdraftLimit = overdraftLimit;
    }
    
    public decimal OverdraftLimit 
    { 
        get { return overdraftLimit; }
        set { overdraftLimit = value >= 0 ? value : 0; }
    }
    
    // Override withdraw method to allow overdraft
    public new bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= (Balance + overdraftLimit))
        {
            // Use reflection or internal access to modify balance
            // For simplicity, using base withdrawal with validation
            if (amount <= Balance)
            {
                return base.Withdraw(amount);
            }
            else
            {
                decimal overdraftAmount = amount - Balance;
                Console.WriteLine($"Using overdraft: ${overdraftAmount:F2}");
                // In real implementation, would modify balance directly
                return true;
            }
        }
        Console.WriteLine("Withdrawal exceeds account balance plus overdraft limit.");
        return false;
    }
    
    public override void DisplayAccountInfo()
    {
        base.DisplayAccountInfo();
        Console.WriteLine($"Overdraft Limit: ${overdraftLimit:F2}");
    }
}

// ABSTRACTION example with interfaces
public interface IPaymentProcessor
{
    bool ProcessPayment(decimal amount);
    string GetTransactionId();
}

public class CreditCardProcessor : IPaymentProcessor
{
    private Random random = new Random();
    
    public bool ProcessPayment(decimal amount)
    {
        // Complex internal logic hidden from user
        Console.WriteLine($"Processing credit card payment of ${amount:F2}");
        
        // Simulate processing
        System.Threading.Thread.Sleep(1000);
        
        // Simulate success/failure
        bool success = random.Next(1, 10) > 2; // 80% success rate
        
        if (success)
        {
            Console.WriteLine($"Payment successful. Transaction ID: {GetTransactionId()}");
        }
        else
        {
            Console.WriteLine("Payment failed. Please try again.");
        }
        
        return success;
    }
    
    public string GetTransactionId()
    {
        return $"TXN{random.Next(100000, 999999)}";
    }
}
```

## Why This Proves C# is Object-Oriented:

1. **Classes and Objects**: C# allows creating custom data types (classes) and instances (objects)
2. **Encapsulation**: Private fields with public methods/properties control data access
3. **Data Hiding**: Implementation details are hidden from external code
4. **Method Binding**: Data and methods that operate on that data are bundled together
5. **Access Control**: Access modifiers (private, public, protected) enforce proper encapsulation

This example shows that **C# treats everything as objects** (except primitive types, which are also represented as objects through boxing), and **enforces proper data encapsulation through access modifiers**, which is the fundamental principle of Object-Oriented Programming.
