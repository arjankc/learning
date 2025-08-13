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

## Theory
- CI validates each change quickly; CD automates deployments with safety checks.
- Use separate environments (dev/test/stage/prod) with required reviewers for protected deployments.
- Store secrets in platform stores (GitHub Secrets, Azure Key Vault); never commit secrets.
- Cache package restores and toolchains to speed up builds; pin versions for reproducibility.
- Treat build outputs as artifacts for traceability; sign and checksum where appropriate.
