param(
  [string]$RepoRoot = (Get-Location).Path,
  [switch]$Pdf
)

$toolRoot = Join-Path -Path $RepoRoot -ChildPath 'tools'
$tool = Join-Path -Path $toolRoot -ChildPath 'BookBuilder'

if (-not (Test-Path -Path $tool)) {
  Write-Error "BookBuilder not found at $tool"
  exit 1
}

# Restore/build the tool only
Push-Location $tool
try {
  dotnet build -nologo | Out-Host
}
finally {
  Pop-Location
}

# Run the tool
$exe = Join-Path -Path $tool -ChildPath (Join-Path -Path 'bin' -ChildPath (Join-Path -Path 'Debug' -ChildPath (Join-Path -Path 'net8.0' -ChildPath 'BookBuilder.dll')))
dotnet $exe $RepoRoot | Out-Host

# Open the HTML in default browser
$bookDir = Join-Path -Path $RepoRoot -ChildPath 'book'
$bookHtml = Join-Path -Path $bookDir -ChildPath 'book.html'
if (-not (Test-Path -Path $bookHtml)) {
  Write-Warning "book.html not found."
  exit 1
}

Write-Host "Opening: $bookHtml"
Start-Process $bookHtml | Out-Null

if ($Pdf.IsPresent) {
  function Get-BrowserPath {
    $candidates = @(
      (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe'),
      (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe'),
      (Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'),
      (Join-Path ${env:ProgramFiles(x86)} 'Google\Chrome\Application\chrome.exe'),
      (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
    )
    foreach ($p in $candidates) { if (Test-Path $p) { return $p } }
    return $null
  }

  $browser = Get-BrowserPath
  if ($null -eq $browser) {
    Write-Warning "Edge/Chrome not found for headless PDF export. Use browser Print → Save as PDF instead."
    exit 0
  }

  $bookPdf = Join-Path -Path $bookDir -ChildPath 'book.pdf'
  $uri = [System.Uri]::new($bookHtml).AbsoluteUri
  Write-Host "Exporting PDF to: $bookPdf"
  & $browser --headless --disable-gpu --print-to-pdf="$bookPdf" "$uri" | Out-Null
  if (Test-Path -Path $bookPdf) {
    Write-Host "PDF created: $bookPdf"
    Start-Process $bookPdf | Out-Null
  } else {
    Write-Warning "Headless export failed. You can still print from the opened HTML."
  }
}
