param(
    [int[]]$QuestionNumbers = @(13, 17, 19, 21, 23, 25, 27)
)

$examNotesPath = "C:\Users\Arjan\learning\exam-prep-notes.md"
$questionsDir = "C:\Users\Arjan\learning\questions"

# Read all lines
$lines = Get-Content -Path $examNotesPath

Write-Host "Extracting specific questions: $($QuestionNumbers -join ', ')"

foreach ($questionNum in $QuestionNumbers) {
    Write-Host "Processing Question $questionNum..."
    
    # Find start line for this question
    $startLineIndex = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "^### Question $questionNum" + ":") {
            $startLineIndex = $i
            break
        }
    }
    
    if ($startLineIndex -eq -1) {
        Write-Host "Question $questionNum not found!"
        continue
    }
    
    # Find end line (next question or major section)
    $endLineIndex = $lines.Count - 1
    for ($i = $startLineIndex + 1; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "^### Question \d+:" -or $lines[$i] -match "^## [^#]") {
            $endLineIndex = $i - 1
            break
        }
    }
    
    # Extract content
    $content = @()
    for ($i = $startLineIndex; $i -le $endLineIndex; $i++) {
        $line = $lines[$i]
        if ($i -eq $startLineIndex) {
            # Convert main heading
            $content += "# " + ($line -replace '^### ', '')
        } elseif ($line -match '^####') {
            # Convert sub-headings
            $content += $line -replace '^####', '##'
        } else {
            $content += $line
        }
    }
    
    # Remove trailing empty lines
    while ($content.Count -gt 0 -and [string]::IsNullOrWhiteSpace($content[-1])) {
        $content = $content[0..($content.Count - 2)]
    }
    
    # Save to file
    $paddedNumber = $questionNum.ToString().PadLeft(2, '0')
    $filename = "question-$paddedNumber.md"
    $filepath = Join-Path -Path $questionsDir -ChildPath $filename
    
    $content | Out-File -FilePath $filepath -Encoding UTF8
    Write-Host "Created: $filename"
}

Write-Host "Extraction completed!"
