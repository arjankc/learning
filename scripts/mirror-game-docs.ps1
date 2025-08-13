# Mirrors game/csharp-gamified-learning/docs into top-level docs/
param(
    [switch]$Clean
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$src = Join-Path $repoRoot 'game/csharp-gamified-learning/docs'
$dest = Join-Path $repoRoot 'docs'

if (!(Test-Path $src)) {
    Write-Error "Source folder not found: $src"
}

if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
}

# Optionally clean destination to keep it in sync (except .git)
if ($Clean) {
    Get-ChildItem -Path $dest -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
}

# Copy updated files, preserving structure
robocopy $src $dest /MIR /COPY:DAT /R:1 /W:2 /NFL /NDL /NP | Out-Null

Write-Host "Mirrored $src -> $dest"
