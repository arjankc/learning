# Question 28: Explain following terms: Assembly, Namespace, Class, Property, Field, Methods.

## Fundamental C# Concepts Explained

Let me explain each of these important C# concepts with practical examples:

```csharp
// NAMESPACE - A logical grouping of types
namespace MyCompany.EmployeeManagement  // <- This is a NAMESPACE
{
    using System;
    using System.Collections.Generic;
    
    // CLASS - A blueprint for creating objects
    public class Employee  // <- This is a CLASS
    {
        // FIELDS - Private data storage (variables)
        private int employeeId;           // <- This is a FIELD
        private string firstName;         // <- This is a FIELD  
        private string lastName;          // <- This is a FIELD
        private decimal salary;           // <- This is a FIELD
        private DateTime hireDate;        // <- This is a FIELD
        private List<string> skills;      // <- This is a FIELD
        
        // PROPERTIES - Public interface to access private fields
        public int EmployeeId             // <- This is a PROPERTY
        {
            get { return employeeId; }
            private set 
            { 
                if (value > 0)
                    employeeId = value;
                else
                    throw new ArgumentException("Employee ID must be positive");
            }
        }
        
        public string FirstName           // <- This is a PROPERTY
        {
            get { return firstName; }
            set 
            { 
                if (!string.IsNullOrWhiteSpace(value))
                    firstName = value.Trim();
                else
                    throw new ArgumentException("First name cannot be empty");
            }
        }
        
        public string LastName            // <- This is a PROPERTY
        {
            get { return lastName; }
            set 
            { 
                if (!string.IsNullOrWhiteSpace(value))
                    lastName = value.Trim();
                else
                    throw new ArgumentException("Last name cannot be empty");
            }
        }
        
        public decimal Salary             // <- This is a PROPERTY
        {
            get { return salary; }
            set 
            { 
                if (value >= 0)
                    salary = value;
                else
                    throw new ArgumentException("Salary cannot be negative");
            }
        }
        
        public DateTime HireDate          // <- This is a PROPERTY
        {
            get { return hireDate; }
            set { hireDate = value; }
        }
        
        // Auto-implemented property (compiler creates backing field)
        public string Department { get; set; }  // <- This is a PROPERTY
        
        // Read-only property
        public string FullName            // <- This is a PROPERTY
        {
            get { return $"{firstName} {lastName}"; }
        }
        
        // Read-only property with calculation
        public int YearsOfService         // <- This is a PROPERTY
        {
            get { return DateTime.Now.Year - hireDate.Year; }
        }
        
        // METHODS - Functions that define behavior
        
        // Constructor METHOD
        public Employee(int id, string first, string last, decimal sal, DateTime hire)  // <- This is a METHOD
        {
            EmployeeId = id;
            FirstName = first;
            LastName = last;
            Salary = sal;
            HireDate = hire;
            skills = new List<string>();
        }
        
        // Instance METHOD
        public void AddSkill(string skill)   // <- This is a METHOD
        {
            if (!string.IsNullOrWhiteSpace(skill) && !skills.Contains(skill))
            {
                skills.Add(skill);
                Console.WriteLine($"Added skill '{skill}' to {FullName}");
            }
        }
        
        // Instance METHOD with return value
        public List<string> GetSkills()      // <- This is a METHOD
        {
            return new List<string>(skills); // Return copy to maintain encapsulation
        }
        
        // Instance METHOD with parameters
        public void GiveRaise(decimal percentage)  // <- This is a METHOD
        {
            if (percentage > 0 && percentage <= 50)
            {
                decimal oldSalary = salary;
                salary += salary * (percentage / 100);
                Console.WriteLine($"{FullName} received a {percentage}% raise");
                Console.WriteLine($"Salary increased from ${oldSalary:F2} to ${salary:F2}");
            }
            else
            {
                throw new ArgumentException("Raise percentage must be between 0 and 50");
            }
        }
        
        // Static METHOD (belongs to class, not instance)
        public static Employee CreateTemporaryEmployee(string first, string last)  // <- This is a METHOD
        {
            return new Employee(0, first, last, 0, DateTime.Now);
        }
        
        // Virtual METHOD (can be overridden)
        public virtual void DisplayInfo()    // <- This is a METHOD
        {
            Console.WriteLine($"=== Employee Information ===");
            Console.WriteLine($"ID: {EmployeeId}");
            Console.WriteLine($"Name: {FullName}");
            Console.WriteLine($"Department: {Department ?? "Not Assigned"}");
            Console.WriteLine($"Salary: ${Salary:F2}");
            Console.WriteLine($"Hire Date: {HireDate:yyyy-MM-dd}");
            Console.WriteLine($"Years of Service: {YearsOfService}");
            Console.WriteLine($"Skills: {(skills.Count > 0 ? string.Join(", ", skills) : "None")}");
            Console.WriteLine($"============================");
        }
        
        // Override Object.ToString() METHOD
        public override string ToString()    // <- This is a METHOD
        {
            return $"Employee {EmployeeId}: {FullName} ({Department})";
        }
    }
    
    // Another CLASS demonstrating inheritance
    public class Manager : Employee      // <- This is a CLASS inheriting from Employee
    {
        // Additional FIELDS for Manager
        private List<Employee> subordinates;  // <- This is a FIELD
        
        // Additional PROPERTIES for Manager
        public int TeamSize               // <- This is a PROPERTY
        {
            get { return subordinates.Count; }
        }
        
        public decimal BonusBudget { get; set; }  // <- This is a PROPERTY
        
        // Constructor METHOD
        public Manager(int id, string first, string last, decimal sal, DateTime hire, decimal bonus)
            : base(id, first, last, sal, hire)  // <- This is a METHOD (constructor)
        {
            subordinates = new List<Employee>();
            BonusBudget = bonus;
        }
        
        // Manager-specific METHODS
        public void AddSubordinate(Employee employee)  // <- This is a METHOD
        {
            if (employee != null && !subordinates.Contains(employee))
            {
                subordinates.Add(employee);
                Console.WriteLine($"{employee.FullName} added to {FullName}'s team");
            }
        }
        
        public void RemoveSubordinate(Employee employee)  // <- This is a METHOD
        {
            if (subordinates.Remove(employee))
            {
                Console.WriteLine($"{employee.FullName} removed from {FullName}'s team");
            }
        }
        
        public List<Employee> GetTeamMembers()  // <- This is a METHOD
        {
            return new List<Employee>(subordinates);
        }
        
        // Override parent METHOD
        public override void DisplayInfo()   // <- This is a METHOD (overridden)
        {
            base.DisplayInfo(); // Call parent method
            Console.WriteLine($"Team Size: {TeamSize}");
            Console.WriteLine($"Bonus Budget: ${BonusBudget:F2}");
            if (subordinates.Count > 0)
            {
                Console.WriteLine("Team Members:");
                foreach (var emp in subordinates)
                {
                    Console.WriteLine($"  - {emp.FullName}");
                }
            }
        }
    }
}

// Demonstration program
namespace MyCompany.Demo  // <- Another NAMESPACE
{
    using System;
    using MyCompany.EmployeeManagement;
    
    public class Program     // <- This is a CLASS
    {
        // Static METHOD - entry point
        public static void Main()  // <- This is a METHOD
        {
            Console.WriteLine("=== C# Concepts Demonstration ===\n");
            
            DemonstrateAssembly();
            DemonstrateNamespace();
            DemonstrateClassAndObjects();
            DemonstrateFieldsAndProperties();
            DemonstrateMethods();
        }
        
        public static void DemonstrateAssembly()  // <- This is a METHOD
        {
            Console.WriteLine("1. ASSEMBLY:");
            Console.WriteLine("   - This entire compiled program is an ASSEMBLY");
            Console.WriteLine("   - Assembly contains all compiled code (.exe or .dll)");
            Console.WriteLine("   - Provides security and versioning boundary");
            Console.WriteLine($"   - Current assembly: {System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}");
            Console.WriteLine();
        }
        
        public static void DemonstrateNamespace()  // <- This is a METHOD
        {
            Console.WriteLine("2. NAMESPACE:");
            Console.WriteLine("   - MyCompany.EmployeeManagement contains Employee and Manager classes");
            Console.WriteLine("   - MyCompany.Demo contains this Program class");
            Console.WriteLine("   - Namespaces prevent name conflicts");
            Console.WriteLine("   - Organize related classes logically");
            Console.WriteLine();
        }
        
        public static void DemonstrateClassAndObjects()  // <- This is a METHOD
        {
            Console.WriteLine("3. CLASSES AND OBJECTS:");
            
            // Create objects from classes
            Employee emp1 = new Employee(101, "John", "Doe", 50000, new DateTime(2020, 3, 15));
            Employee emp2 = new Employee(102, "Jane", "Smith", 55000, new DateTime(2019, 7, 22));
            Manager mgr1 = new Manager(201, "Bob", "Johnson", 75000, new DateTime(2018, 1, 10), 10000);
            
            Console.WriteLine("   ✓ Created Employee and Manager objects from classes");
            Console.WriteLine($"   - {emp1}");
            Console.WriteLine($"   - {emp2}");
            Console.WriteLine($"   - {mgr1}");
            Console.WriteLine();
        }
        
        public static void DemonstrateFieldsAndProperties()  // <- This is a METHOD
        {
            Console.WriteLine("4. FIELDS vs PROPERTIES:");
            
            Employee employee = new Employee(103, "Alice", "Brown", 60000, new DateTime(2021, 5, 1));
            
            Console.WriteLine("   FIELDS (private, internal storage):");
            Console.WriteLine("   - employeeId, firstName, lastName, salary, etc.");
            Console.WriteLine("   - Not directly accessible from outside the class");
            Console.WriteLine();
            
            Console.WriteLine("   PROPERTIES (public interface):");
            Console.WriteLine($"   - EmployeeId: {employee.EmployeeId}");
            Console.WriteLine($"   - FirstName: {employee.FirstName}");
            Console.WriteLine($"   - LastName: {employee.LastName}");
            Console.WriteLine($"   - FullName: {employee.FullName} (read-only)");
            Console.WriteLine($"   - YearsOfService: {employee.YearsOfService} (calculated)");
            
            // Demonstrate property validation
            try
            {
                employee.Salary = 65000;  // Valid
                Console.WriteLine($"   - Salary updated to: ${employee.Salary:F2}");
                
                // employee.Salary = -1000;  // Would throw exception
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"   - Property validation: {ex.Message}");
            }
            
            Console.WriteLine();
        }
        
        public static void DemonstrateMethods()  // <- This is a METHOD
        {
            Console.WriteLine("5. METHODS:");
            
            // Create objects
            Employee emp = new Employee(104, "Charlie", "Wilson", 58000, new DateTime(2020, 8, 12));
            Manager mgr = new Manager(202, "Diana", "Taylor", 80000, new DateTime(2017, 4, 3), 15000);
            
            Console.WriteLine("   Instance Methods:");
            
            // Call instance methods
            emp.AddSkill("C#");
            emp.AddSkill("SQL");
            emp.AddSkill("JavaScript");
            
            emp.GiveRaise(5);
            
            Console.WriteLine();
            Console.WriteLine("   Method with return value:");
            var skills = emp.GetSkills();
            Console.WriteLine($"   {emp.FullName} has {skills.Count} skills: {string.Join(", ", skills)}");
            
            Console.WriteLine();
            Console.WriteLine("   Static Method:");
            Employee tempEmp = Employee.CreateTemporaryEmployee("Temp", "Worker");
            Console.WriteLine($"   Created temporary employee: {tempEmp}");
            
            Console.WriteLine();
            Console.WriteLine("   Virtual Method Override:");
            mgr.AddSubordinate(emp);
            mgr.DisplayInfo();  // Calls overridden version
            
            Console.WriteLine();
        }
    }
}
```

## Summary of Concepts:

| Concept | Definition | Example | Purpose |
|---------|------------|---------|---------|
| **Assembly** | Compiled unit (.exe/.dll) | Entire application | Security, versioning, deployment |
| **Namespace** | Logical grouping of types | `MyCompany.EmployeeManagement` | Organization, prevent conflicts |
| **Class** | Blueprint for objects | `Employee`, `Manager` | Define structure and behavior |
| **Field** | Private data storage | `private string firstName` | Internal state storage |
| **Property** | Public interface to data | `public string FirstName { get; set; }` | Controlled access to data |
| **Method** | Function that defines behavior | `public void AddSkill(string skill)` | Define what objects can do |

## Key Relationships:

1. **Assembly** contains multiple **Namespaces**
2. **Namespace** contains multiple **Classes**
3. **Class** contains **Fields**, **Properties**, and **Methods**
4. **Properties** often provide access to **Fields**
5. **Methods** operate on **Fields** and **Properties**

## Hierarchy Example:
```
Assembly: MyApplication.exe
|-- Namespace: MyCompany.EmployeeManagement
|   |-- Class: Employee
|   |   |-- Fields: employeeId, firstName, lastName
|   |   |-- Properties: EmployeeId, FirstName, LastName
|   |   |-- Methods: AddSkill(), GiveRaise(), DisplayInfo()
|   |-- Class: Manager (inherits from Employee)
|-- Namespace: MyCompany.Demo
    |-- Class: Program
        |-- Methods: Main(), DemonstrateAssembly()
```

This structure provides organization, encapsulation, and reusability in C# applications.

### Exam Tips
1. **Practice Code Examples**: Type out the examples yourself
2. **Understand Patterns**: Know when to use abstract vs interface, DataReader vs DataSet
3. **Remember Architecture**: Know the layers and how they interact
4. **Security**: Understand authentication vs authorization
5. **Performance**: Know when to use async, parallel processing, proper data access

Your comprehensive exam preparation notes are now complete! This document covers all the topics your teacher specified with practical examples, comparisons, and detailed explanations. You can now compile this into a PDF for printing and study.
