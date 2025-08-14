param(
    [string]$ExamNotesPath = "C:\Users\Arjan\learning\exam-prep-notes.md",
    [string]$QuestionsDir = "C:\Users\Arjan\learning\questions"
)

# Read the entire exam notes file
$content = Get-Content -Path $ExamNotesPath -Raw

# Define regex pattern to match questions
$questionPattern = '(?s)### (Question \d+: .+?)(?=### Question \d+:|$)'

# Find all question matches
$questionMatches = [regex]::Matches($content, $questionPattern)

Write-Host "Found $($questionMatches.Count) questions in the exam notes"

foreach ($match in $questionMatches) {
    $questionContent = $match.Groups[1].Value.Trim()
    
    # Extract question number
    if ($questionContent -match '^Question (\d+):') {
        $questionNumber = $matches[0].Groups[1].Value
        $paddedNumber = $questionNumber.PadLeft(2, '0')
        
        # Clean up the content - replace ### with # for proper markdown heading
        $cleanContent = $questionContent -replace '^Question (\d+):', '# Question $1:'
        $cleanContent = $cleanContent -replace '\n#### ', '\n## '
        $cleanContent = $cleanContent -replace '\n\*\*Step (\d+):', '\n### Step $1:'
        
        # Create filename
        $filename = "question-$paddedNumber.md"
        $filepath = Join-Path -Path $QuestionsDir -ChildPath $filename
        
        # Write to file
        $cleanContent | Out-File -FilePath $filepath -Encoding UTF8
        
        Write-Host "Created: $filename"
    }
}

Write-Host "Question extraction completed!"
Write-Host "All questions have been saved to: $QuestionsDir"
