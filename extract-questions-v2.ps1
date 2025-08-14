param(
    [string]$ExamNotesPath = "C:\Users\Arjan\learning\exam-prep-notes.md",
    [string]$QuestionsDir = "C:\Users\Arjan\learning\questions"
)

Write-Host "Reading exam notes from: $ExamNotesPath"

# Read the entire file content
$lines = Get-Content -Path $ExamNotesPath

Write-Host "Processing $($lines.Count) lines..."

$currentQuestion = $null
$currentContent = @()
$questionCount = 0

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    
    # Check if this line starts a new question
    if ($line -match '^### Question (\d+):') {
        # Save previous question if exists
        if ($currentQuestion -ne $null -and $currentContent.Count -gt 0) {
            $paddedNumber = $currentQuestion.PadLeft(2, '0')
            $filename = "question-$paddedNumber.md"
            $filepath = Join-Path -Path $QuestionsDir -ChildPath $filename
            
            # Convert ### to # for the main heading and fix sub-headings
            $output = @()
            $output += "# " + ($currentContent[0] -replace '^### ', '')
            
            for ($j = 1; $j -lt $currentContent.Count; $j++) {
                $contentLine = $currentContent[$j]
                if ($contentLine -match '^####') {
                    $output += $contentLine -replace '^####', '##'
                } else {
                    $output += $contentLine
                }
            }
            
            $output | Out-File -FilePath $filepath -Encoding UTF8
            Write-Host "Created: $filename"
            $questionCount++
        }
        
        # Start new question
        $currentQuestion = $Matches[1]
        $currentContent = @($line)
    }
    elseif ($currentQuestion -ne $null) {
        # Check if we've reached the next major section or end
        if ($line -match '^## ' -and $line -notmatch '^### ') {
            # This is the end of questions section
            break
        }
        elseif ($line -match '^### Question \d+:') {
            # This should not happen in this branch, but just in case
            continue
        }
        else {
            # Add line to current question content
            $currentContent += $line
        }
    }
}

# Save the last question
if ($currentQuestion -ne $null -and $currentContent.Count -gt 0) {
    $paddedNumber = $currentQuestion.PadLeft(2, '0')
    $filename = "question-$paddedNumber.md"
    $filepath = Join-Path -Path $QuestionsDir -ChildPath $filename
    
    # Convert ### to # for the main heading and fix sub-headings
    $output = @()
    $output += "# " + ($currentContent[0] -replace '^### ', '')
    
    for ($j = 1; $j -lt $currentContent.Count; $j++) {
        $contentLine = $currentContent[$j]
        if ($contentLine -match '^####') {
            $output += $contentLine -replace '^####', '##'
        } else {
            $output += $contentLine
        }
    }
    
    $output | Out-File -FilePath $filepath -Encoding UTF8
    Write-Host "Created: $filename"
    $questionCount++
}

Write-Host "Extraction completed! Created $questionCount question files in: $QuestionsDir"
