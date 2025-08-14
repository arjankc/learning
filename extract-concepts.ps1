# Concept extraction script for teacher-specified topics
param(
    [string]$ExamNotesPath = "C:\Users\Arjan\learning\exam-prep-notes.md",
    [string]$ConceptsDir = "C:\Users\Arjan\learning\concepts"
)

# Define the concept mappings (what to search for and what to name the files)
$concepts = @(
    @{ SearchTerm = "Visual Programming"; FileName = "01-visual-programming.md" },
    @{ SearchTerm = "Event-Driven Programming"; FileName = "02-event-driven-programming.md" },
    @{ SearchTerm = "\.NET Framework Architecture"; FileName = "03-dotnet-framework-architecture.md" },
    @{ SearchTerm = "RAD Tools"; FileName = "04-rad-tools.md" },
    @{ SearchTerm = "Type Conversion"; FileName = "05-type-conversion.md" },
    @{ SearchTerm = "Structures vs Enumerations"; FileName = "06-structures-vs-enumerations.md" },
    @{ SearchTerm = "Collections"; FileName = "07-collections.md" },
    @{ SearchTerm = "Regular Expressions"; FileName = "08-regular-expressions.md" },
    @{ SearchTerm = "Polymorphism"; FileName = "09-polymorphism.md" },
    @{ SearchTerm = "Abstract Classes vs Interfaces"; FileName = "10-abstract-classes-vs-interfaces.md" },
    @{ SearchTerm = "Inheritance and Encapsulation"; FileName = "11-inheritance-encapsulation.md" },
    @{ SearchTerm = "Exception Handling"; FileName = "12-exception-handling.md" },
    @{ SearchTerm = "Parallel Programming"; FileName = "13-parallel-programming.md" },
    @{ SearchTerm = "ADO\.NET"; FileName = "14-adonet.md" },
    @{ SearchTerm = "WPF"; FileName = "15-wpf.md" },
    @{ SearchTerm = "ASP\.NET & ASP\.NET Core"; FileName = "16-aspnet-core.md" },
    @{ SearchTerm = "Blazor"; FileName = "17-blazor.md" },
    @{ SearchTerm = "Xamarin"; FileName = "18-xamarin.md" }
)

Write-Host "Reading exam notes from: $ExamNotesPath"
$lines = Get-Content -Path $ExamNotesPath

Write-Host "Extracting $($concepts.Count) concept sections..."

foreach ($concept in $concepts) {
    Write-Host "Processing: $($concept.SearchTerm)..."
    
    # Find start line for this concept
    $startLineIndex = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "^## $($concept.SearchTerm)$") {
            $startLineIndex = $i
            break
        }
    }
    
    if ($startLineIndex -eq -1) {
        Write-Host "  Warning: Section '$($concept.SearchTerm)' not found!"
        continue
    }
    
    # Find end line (next ## section or start of questions)
    $endLineIndex = $lines.Count - 1
    for ($i = $startLineIndex + 1; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "^## " -and $lines[$i] -notmatch "^### ") {
            $endLineIndex = $i - 1
            break
        }
    }
    
    # Extract content
    $content = @()
    for ($i = $startLineIndex; $i -le $endLineIndex; $i++) {
        $line = $lines[$i]
        if ($i -eq $startLineIndex) {
            # Convert main heading from ## to #
            $content += "# " + ($line -replace '^## ', '')
        } elseif ($line -match '^###') {
            # Convert sub-headings from ### to ##
            $content += $line -replace '^###', '##'
        } elseif ($line -match '^####') {
            # Convert sub-sub-headings from #### to ###
            $content += $line -replace '^####', '###'
        } else {
            $content += $line
        }
    }
    
    # Remove trailing empty lines
    while ($content.Count -gt 0 -and [string]::IsNullOrWhiteSpace($content[-1])) {
        $content = $content[0..($content.Count - 2)]
    }
    
    # Save to file
    $filepath = Join-Path -Path $ConceptsDir -ChildPath $concept.FileName
    $content | Out-File -FilePath $filepath -Encoding UTF8
    Write-Host "  Created: $($concept.FileName)"
}

Write-Host "`nConcept extraction completed!"
Write-Host "All concept files saved to: $ConceptsDir"
