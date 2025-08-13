# CI/CD Pipelines

Automate build, test, and deploy on every change.

## GitHub Actions (example)
```yaml
name: build
on: [push, pull_request]
jobs:
	build:
		runs-on: windows-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-dotnet@v4
				with: { dotnet-version: '8.0.x' }
			- run: dotnet restore
			- run: dotnet build --no-restore -c Release
			- run: dotnet test --no-build -c Release
```

## Practices
- Build/test on every push and PR; enforce quality gates.
- Cache dependencies where possible for speed.
- Version artifacts and publish build outputs (e.g., to GitHub Releases).
- Use environments and approvals for production.

## Read More
- https://learn.microsoft.com/azure/devops/pipelines/
- https://docs.github.com/actions
