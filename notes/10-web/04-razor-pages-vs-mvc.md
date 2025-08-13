# Razor Pages vs MVC in ASP.NET Core

Understand when to choose Razor Pages or MVC:

- Razor Pages: Page-focused, minimal ceremony, great for simple CRUD and forms. Files live side-by-side (.cshtml + PageModel).
- MVC: Controller-centric, great for larger apps, strong separation of concerns, filters, and complex routing.

Key differences:
- Handler methods (OnGet/OnPost) in Pages vs Controller actions.
- Routing conventions: folder-based for Pages vs attribute/conventional for MVC.
- View models: both support, MVC often uses dedicated DTOs and services.

When to pick:
- Small to medium apps, internal tools → Razor Pages.
- Complex APIs, multiple controllers, rich filters → MVC.

Tip: You can mix both in one app.
