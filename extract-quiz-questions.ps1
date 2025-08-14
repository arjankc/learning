# Extract quiz questions from levels.json and create CSV
$jsonPath = "C:\Users\Arjan\learning\docs\data\levels.json"
$csvPath = "C:\Users\Arjan\learning\questions.csv"

Write-Host "Reading levels.json..."
$jsonContent = Get-Content -Path $jsonPath -Raw | ConvertFrom-Json

Write-Host "Extracting quiz questions..."
$csvData = @()

# Add CSV header
$csvData += "Question,Answer 1,Answer 2,Answer 3,Answer 4,Correct Answer"

foreach ($level in $jsonContent.levels) {
    if ($level.quiz -and $level.quiz.Count -gt 0) {
        foreach ($question in $level.quiz) {
            # Handle multi-answer questions (skip them for now as they're complex for CSV)
            if ($question.multi) {
                continue
            }
            
            # Get the question text
            $questionText = $question.q -replace '"', '""'  # Escape quotes for CSV
            
            # Get options (pad with empty strings if less than 4 options)
            $options = @($question.options)
            while ($options.Count -lt 4) {
                $options += ""
            }
            
            # Escape quotes in options
            $option1 = $options[0] -replace '"', '""'
            $option2 = $options[1] -replace '"', '""'
            $option3 = $options[2] -replace '"', '""'
            $option4 = $options[3] -replace '"', '""'
            
            # Get correct answer (add 1 to convert from 0-based to 1-based indexing)
            $correctAnswer = $question.answer + 1
            
            # Create CSV row
            $csvRow = "`"$questionText`",`"$option1`",`"$option2`",`"$option3`",`"$option4`",$correctAnswer"
            $csvData += $csvRow
        }
    }
}

Write-Host "Writing to CSV file..."
$csvData | Out-File -FilePath $csvPath -Encoding UTF8

Write-Host "CSV file created at: $csvPath"
Write-Host "Total questions extracted: $($csvData.Count - 1)"
