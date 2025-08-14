# Question 8: What are benefit of Ajax? How do you implement Ajax in MVC? Explain.

## Benefits of AJAX:

1. **Improved User Experience** - No full page reloads
2. **Faster Response Time** - Only necessary data is transferred
3. **Reduced Server Load** - Less bandwidth usage
4. **Asynchronous Operations** - Non-blocking user interface
5. **Dynamic Content Updates** - Real-time data updates
6. **Better Interactivity** - More responsive applications

## AJAX Implementation in MVC:

```csharp
// 1. Controller Actions for AJAX
public class EmployeeController : Controller
{
    private List<Employee> employees = new List<Employee>
    {
        new Employee { Id = 1, Name = "Alice Johnson", Department = "IT", Salary = 75000 },
        new Employee { Id = 2, Name = "Bob Smith", Department = "HR", Salary = 65000 },
        new Employee { Id = 3, Name = "Charlie Brown", Department = "Finance", Salary = 80000 }
    };
    
    public IActionResult Index()
    {
        return View();
    }
    
    // AJAX method to get all employees
    [HttpGet]
    public JsonResult GetEmployees()
    {
        return Json(employees);
    }
    
    // AJAX method to get employee by ID
    [HttpGet]
    public JsonResult GetEmployee(int id)
    {
        var employee = employees.FirstOrDefault(e => e.Id == id);
        if (employee != null)
        {
            return Json(new { success = true, data = employee });
        }
        return Json(new { success = false, message = "Employee not found" });
    }
    
    // AJAX method to add employee
    [HttpPost]
    public JsonResult AddEmployee(Employee employee)
    {
        try
        {
            employee.Id = employees.Max(e => e.Id) + 1;
            employees.Add(employee);
            return Json(new { success = true, message = "Employee added successfully", data = employee });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
    
    // AJAX method to update employee
    [HttpPost]
    public JsonResult UpdateEmployee(Employee employee)
    {
        try
        {
            var existingEmployee = employees.FirstOrDefault(e => e.Id == employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Department = employee.Department;
                existingEmployee.Salary = employee.Salary;
                return Json(new { success = true, message = "Employee updated successfully" });
            }
            return Json(new { success = false, message = "Employee not found" });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
    
    // AJAX method to delete employee
    [HttpPost]
    public JsonResult DeleteEmployee(int id)
    {
        try
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee != null)
            {
                employees.Remove(employee);
                return Json(new { success = true, message = "Employee deleted successfully" });
            }
            return Json(new { success = false, message = "Employee not found" });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = ex.Message });
        }
    }
}

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
}
```

## Razor View with AJAX:

```html
@{
    ViewData["Title"] = "Employee Management";
}

<h2>Employee Management System</h2>

<div class="container">
    <!-- Add Employee Form -->
    <div class="card mb-4">
        <div class="card-header">
            <h4>Add New Employee</h4>
        </div>
        <div class="card-body">
            <form id="employeeForm">
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" id="employeeName" class="form-control" placeholder="Employee Name" required>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="employeeDepartment" class="form-control" placeholder="Department" required>
                    </div>
                    <div class="col-md-2">
                        <input type="number" id="employeeSalary" class="form-control" placeholder="Salary" required>
                    </div>
                    <div class="col-md-2">
                        <button type="button" id="addEmployee" class="btn btn-primary">Add Employee</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Employee List -->
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4>Employee List</h4>
            <button type="button" id="refreshList" class="btn btn-secondary">Refresh</button>
        </div>
        <div class="card-body">
            <div id="loadingSpinner" class="text-center" style="display: none;">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <table class="table table-striped" id="employeeTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="employeeTableBody">
                    <!-- Employee data will be loaded here via AJAX -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Edit Employee Modal -->
<div class="modal fade" id="editEmployeeModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Employee</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="editEmployeeForm">
                    <input type="hidden" id="editEmployeeId">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" id="editEmployeeName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Department:</label>
                        <input type="text" id="editEmployeeDepartment" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Salary:</label>
                        <input type="number" id="editEmployeeSalary" class="form-control" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" id="saveEmployee" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>
</div>

@section Scripts {
<script>
$(document).ready(function() {
    // Load employees on page load
    loadEmployees();
    
    // Add employee
    $('#addEmployee').click(function() {
        addEmployee();
    });
    
    // Refresh employee list
    $('#refreshList').click(function() {
        loadEmployees();
    });
    
    // Save edited employee
    $('#saveEmployee').click(function() {
        updateEmployee();
    });
});

function loadEmployees() {
    $('#loadingSpinner').show();
    $('#employeeTableBody').empty();
    
    $.ajax({
        url: '@Url.Action("GetEmployees", "Employee")',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#loadingSpinner').hide();
            var tbody = $('#employeeTableBody');
            
            if (data && data.length > 0) {
                $.each(data, function(index, employee) {
                    var row = `
                        <tr>
                            <td>${employee.id}</td>
                            <td>${employee.name}</td>
                            <td>${employee.department}</td>
                            <td>$${employee.salary.toLocaleString()}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick="editEmployee(${employee.id})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="5" class="text-center">No employees found</td></tr>');
            }
        },
        error: function() {
            $('#loadingSpinner').hide();
            alert('Failed to load employees');
        }
    });
}

function addEmployee() {
    var name = $('#employeeName').val();
    var department = $('#employeeDepartment').val();
    var salary = $('#employeeSalary').val();
    
    if (!name || !department || !salary) {
        alert('Please fill all fields');
        return;
    }
    
    $.ajax({
        url: '@Url.Action("AddEmployee", "Employee")',
        type: 'POST',
        data: {
            Name: name,
            Department: department,
            Salary: salary
        },
        success: function(response) {
            if (response.success) {
                alert(response.message);
                loadEmployees();
                $('#employeeName').val('');
                $('#employeeDepartment').val('');
                $('#employeeSalary').val('');
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function() {
            alert('Failed to add employee');
        }
    });
}

function editEmployee(id) {
    $.ajax({
        url: '@Url.Action("GetEmployee", "Employee")',
        type: 'GET',
        data: { id: id },
        success: function(response) {
            if (response.success) {
                var employee = response.data;
                $('#editEmployeeId').val(employee.id);
                $('#editEmployeeName').val(employee.name);
                $('#editEmployeeDepartment').val(employee.department);
                $('#editEmployeeSalary').val(employee.salary);
                $('#editEmployeeModal').modal('show');
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function() {
            alert('Failed to get employee details');
        }
    });
}

function updateEmployee() {
    var id = $('#editEmployeeId').val();
    var name = $('#editEmployeeName').val();
    var department = $('#editEmployeeDepartment').val();
    var salary = $('#editEmployeeSalary').val();
    
    $.ajax({
        url: '@Url.Action("UpdateEmployee", "Employee")',
        type: 'POST',
        data: {
            Id: id,
            Name: name,
            Department: department,
            Salary: salary
        },
        success: function(response) {
            if (response.success) {
                alert(response.message);
                $('#editEmployeeModal').modal('hide');
                loadEmployees();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function() {
            alert('Failed to update employee');
        }
    });
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        $.ajax({
            url: '@Url.Action("DeleteEmployee", "Employee")',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                if (response.success) {
                    alert(response.message);
                    loadEmployees();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function() {
                alert('Failed to delete employee');
            }
        });
    }
}
</script>
}
```

