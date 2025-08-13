param(
  [string]$Root = (Join-Path $PSScriptRoot '..')
)

$notesPath = Join-Path $Root 'notes'
Get-ChildItem -Path $notesPath -Recurse -Filter *.md | ForEach-Object {
  $path = $_.FullName
  $raw = Get-Content -Raw -LiteralPath $path

  # 1) Remove entire "## Read More" sections (case-insensitive) until next heading or EOF
  $patternReadMore = "(?ims)^[ \t]{0,3}##[ \t]+read[ \t]*more\b[^\r\n]*\r?\n.*?(?=^[ \t]{0,3}#|\Z)"
  $text = [regex]::Replace($raw, $patternReadMore, '')

  # 2) Strip URLs while preserving code blocks and images
  $lines = $text -split "\r?\n"
  $inCode = $false
  $result = New-Object System.Collections.Generic.List[string]

  foreach ($line in $lines) {
    if ($line -match '^\s*```') { $inCode = -not $inCode; $result.Add($line); continue }
    if ($inCode) { $result.Add($line); continue }

    $l = $line

    # 2a) Replace inline Markdown links [text](http...) with just text (avoid images ![...](...))
    $l = [regex]::Replace($l, '(?<![!])\[([^\]]+)\]\((https?://[^)]+)\)', '$1')

    # 2b) Remove angle-bracket autolinks like <https://...>
    $l = [regex]::Replace($l, '<https?://[^>]+>', '')

    # 2c) Remove lines that are only/bullet URLs
    if ($l -match '^\s*[-*]?\s*https?://\S+\s*$') { continue }

    # 2d) Remove link reference definitions: [id]: https://...
    if ($l -match '^\s*\[[^\]]+\]:\s*https?://\S+.*$') { continue }

    # 2e) Tidy double spaces that may result from removals
    $l = $l -replace ' {2,}', ' '

    $result.Add($l)
  }

  $new = ($result -join "`n")
  # 3) Collapse trailing whitespace and excessive blank lines
  $new = $new -replace "[\t ]+\r?\n", "`n"
  $new = [regex]::Replace($new, "(?:\r?\n){3,}", "`n`n")
  $new = $new.TrimEnd() + "`n"

  if ($new -ne $raw) {
    Set-Content -LiteralPath $path -Value $new -NoNewline
    Write-Host "Updated: $path"
  }
}
