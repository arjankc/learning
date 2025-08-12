# Setup: .NET SDK on Windows (VS Code)

Follow these steps to install and verify the .NET SDK so you can build and run the examples.

## 1) Install .NET SDK 8 (x64)
- Go to: https://dotnet.microsoft.com/download
- Download and install the latest .NET 8 SDK (x64). Close VS Code during install.

Alternative (winget):
- Open PowerShell as Administrator and run: winget install Microsoft.DotNet.SDK.8

## 2) Verify PATH contains the SDK
The installer typically adds `C:\Program Files\dotnet\` to PATH.

- New PowerShell window:
  - Check: `[Environment]::GetEnvironmentVariable('Path','Machine')`
  - You should see `C:\Program Files\dotnet\`

If missing (temporary for current session):
- `$env:Path = "C:\Program Files\dotnet;" + $env:Path`

If missing (persist for future sessions):
- `setx PATH "$env:PATH;C:\Program Files\dotnet"`

Then restart VS Code or log out/in.

## 3) Verify installation
- `dotnet --info` should print SDK and runtime details.

## 4) Troubleshooting
- If `dotnet` still isn’t found, the install may have failed or PATH didn’t refresh. Reinstall, then restart your machine.
- Per-user install (no admin):
  - Download `dotnet-install.ps1` from Microsoft and run: `./dotnet-install.ps1 -Channel 8.0`
  - Add `%USERPROFILE%\.dotnet` to PATH.
- Ensure there’s no conflicting `dotnet.exe` earlier in PATH.

Once `dotnet --info` works, proceed to examples in `examples/README.md`.
