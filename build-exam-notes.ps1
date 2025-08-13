param(
  [string]$RepoRoot = (Get-Location).Path
)

# Check if we can use the existing BookBuilder tool
$toolRoot = Join-Path -Path $RepoRoot -ChildPath 'tools'
$bookBuilderTool = Join-Path -Path $toolRoot -ChildPath 'BookBuilder'

$examNotesPath = Join-Path -Path $RepoRoot -ChildPath 'exam-prep-notes.md'
$htmlPath = Join-Path -Path $RepoRoot -ChildPath 'exam-prep-notes.html'
$pdfPath = Join-Path -Path $RepoRoot -ChildPath 'exam-prep-notes.pdf'

if (-not (Test-Path -Path $examNotesPath)) {
  Write-Error "exam-prep-notes.md not found at $examNotesPath"
  exit 1
}

Write-Host "Converting exam notes to HTML..."

# Check if we can use the existing BookBuilder tool for better markdown conversion
if (Test-Path -Path $bookBuilderTool) {
    Write-Host "Using BookBuilder for better markdown conversion..."
    
    # Create a temporary structure that mimics the book structure for the exam notes
    $tempDir = Join-Path -Path $RepoRoot -ChildPath 'temp-exam-build'
    $tempNotesDir = Join-Path -Path $tempDir -ChildPath 'notes'
    
    if (Test-Path -Path $tempDir) {
        Remove-Item -Path $tempDir -Recurse -Force
    }
    
    New-Item -ItemType Directory -Path $tempNotesDir -Force | Out-Null
    
    # Copy the exam notes to the temp structure
    Copy-Item -Path $examNotesPath -Destination (Join-Path -Path $tempNotesDir -ChildPath '00-exam-prep.md')
    
    # Create a simple index file for the BookBuilder
    $indexContent = @"
# Exam Preparation Notes

- [Complete Exam Guide](notes/00-exam-prep.md)
"@
    
    $indexContent | Out-File -FilePath (Join-Path -Path $tempDir -ChildPath 'index.md') -Encoding UTF8
    
    # Build the BookBuilder tool
    Push-Location $bookBuilderTool
    try {
        dotnet build -nologo | Out-Host
    }
    finally {
        Pop-Location
    }
    
    # Run the BookBuilder on our temp structure
    $exe = Join-Path -Path $bookBuilderTool -ChildPath (Join-Path -Path 'bin' -ChildPath (Join-Path -Path 'Debug' -ChildPath (Join-Path -Path 'net8.0' -ChildPath 'BookBuilder.dll')))
    dotnet $exe $tempDir | Out-Host
    
    # Copy the generated HTML to our desired location
    $tempBookDir = Join-Path -Path $tempDir -ChildPath 'book'
    $tempHtmlPath = Join-Path -Path $tempBookDir -ChildPath 'book.html'
    
    if (Test-Path -Path $tempHtmlPath) {
        # Read the generated HTML and modify it for exam notes
        $generatedHtml = Get-Content -Path $tempHtmlPath -Raw
        
        # Update the title and make exam-specific modifications
        $examHtml = $generatedHtml -replace '<title>.*?</title>', '<title>C#/.NET Exam Preparation Notes</title>'
        $examHtml = $examHtml -replace '<h1>.*?</h1>', '<h1>C#/.NET Exam Preparation Notes</h1>'
        
        # Write to our target location
        $examHtml | Out-File -FilePath $htmlPath -Encoding UTF8
        
        Write-Host "HTML created using BookBuilder: $htmlPath"
    }
    else {
        Write-Warning "BookBuilder did not generate HTML. Falling back to basic conversion."
        $useBasicConversion = $true
    }
    
    # Clean up temp directory
    Remove-Item -Path $tempDir -Recurse -Force
}
else {
    Write-Host "BookBuilder not found. Using basic markdown conversion..."
    $useBasicConversion = $true
}

# Fallback: Basic markdown conversion if BookBuilder is not available or failed
if ($useBasicConversion) {
    # Create HTML with embedded CSS for better PDF output
    $htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C#/.NET Exam Preparation Notes</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background: white;
        }
        
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
        }
        
        h1:first-child {
            page-break-before: auto;
        }
        
        h2 {
            color: #34495e;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 5px;
            margin-top: 30px;
            page-break-after: avoid;
        }
        
        h3 {
            color: #2980b9;
            margin-top: 25px;
            page-break-after: avoid;
        }
        
        h4 {
            color: #27ae60;
            margin-top: 20px;
            page-break-after: avoid;
        }
        
        code {
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        pre {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 15px;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.85em;
            line-height: 1.4;
            page-break-inside: avoid;
            margin: 15px 0;
        }
        
        pre code {
            background: none;
            padding: 0;
            border-radius: 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 0.9em;
            page-break-inside: avoid;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            vertical-align: top;
        }
        
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            color: #2c3e50;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        blockquote {
            border-left: 4px solid #3498db;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #f8f9fa;
            page-break-inside: avoid;
        }
        
        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 5px 0;
        }
        
        .toc {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
            page-break-after: always;
        }
        
        .toc ol {
            margin: 10px 0;
        }
        
        .toc a {
            text-decoration: none;
            color: #2980b9;
        }
        
        .toc a:hover {
            text-decoration: underline;
        }
        
        @media print {
            body {
                max-width: none;
                margin: 0;
                padding: 15mm;
            }
            
            h1 {
                page-break-before: always;
            }
            
            h1:first-child {
                page-break-before: auto;
            }
            
            h2, h3, h4 {
                page-break-after: avoid;
            }
            
            pre, table, blockquote {
                page-break-inside: avoid;
            }
            
            .toc {
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
"@

    # Read the markdown content
    $markdownContent = Get-Content -Path $examNotesPath -Raw
    
    # Enhanced markdown to HTML conversion
    function Convert-MarkdownToHtml {
        param([string]$markdown)
        
        # First handle code blocks (must be done before other replacements)
        $html = $markdown -replace '(?s)```(\w+)?\r?\n(.*?)\r?\n```', {
            $lang = $matches[1]
            $code = $matches[2] -replace '<', '&lt;' -replace '>', '&gt;'
            if ($lang) {
                "<pre><code class=`"language-$lang`">$code</code></pre>"
            } else {
                "<pre><code>$code</code></pre>"
            }
        }
        
        # Handle inline code
        $html = $html -replace '`([^`]+)`', '<code>$1</code>'
        
        # Handle headers
        $html = $html -replace '(?m)^#### (.+)$', '<h4>$1</h4>'
        $html = $html -replace '(?m)^### (.+)$', '<h3>$1</h3>'
        $html = $html -replace '(?m)^## (.+)$', '<h2>$1</h2>'
        $html = $html -replace '(?m)^# (.+)$', '<h1>$1</h1>'
        
        # Handle tables - more sophisticated approach
        $html = $html -replace '(?m)^\|(.+)\|\s*$', {
            $rowContent = $matches[1]
            $cells = $rowContent -split '\|' | ForEach-Object { $_.Trim() }
            $cellsHtml = $cells | ForEach-Object { 
                if ($_ -match '^\*\*(.+)\*\*$') {
                    "<th>$($matches[1])</th>"
                } else {
                    "<td>$_</td>"
                }
            }
            "<tr>$($cellsHtml -join '')</tr>"
        }
        
        # Wrap tables
        $html = $html -replace '(<tr>.*?</tr>(?:\s*<tr>.*?</tr>)*)', '<table>$1</table>'
        
        # Handle bold and italic
        $html = $html -replace '\*\*(.+?)\*\*', '<strong>$1</strong>'
        $html = $html -replace '\*(.+?)\*', '<em>$1</em>'
        
        # Handle lists
        $html = $html -replace '(?m)^- (.+)$', '<li>$1</li>'
        $html = $html -replace '(?m)^\d+\. (.+)$', '<li>$1</li>'
        
        # Group list items
        $html = $html -replace '(<li>.*?</li>(?:\s*<li>.*?</li>)*)', '<ul>$1</ul>'
        
        # Handle horizontal rules
        $html = $html -replace '(?m)^---\s*$', '<hr>'
        
        # Handle paragraphs - split on double newlines
        $html = $html -replace '\r?\n\r?\n', '</p><p>'
        $html = '<p>' + $html + '</p>'
        
        # Clean up empty paragraphs and fix formatting
        $html = $html -replace '<p>\s*</p>', ''
        $html = $html -replace '<p>(<h[1-6]>)', '$1'
        $html = $html -replace '(</h[1-6]>)</p>', '$1'
        $html = $html -replace '<p>(<table>)', '$1'
        $html = $html -replace '(</table>)</p>', '$1'
        $html = $html -replace '<p>(<ul>)', '$1'
        $html = $html -replace '(</ul>)</p>', '$1'
        $html = $html -replace '<p>(<pre>)', '$1'
        $html = $html -replace '(</pre>)</p>', '$1'
        $html = $html -replace '<p><hr></p>', '<hr>'
        
        # Handle line breaks within paragraphs
        $html = $html -replace '\r?\n', '<br>'
        
        return $html
    }
    
    $htmlBody = Convert-MarkdownToHtml -markdown $markdownContent
    
    $fullHtml = $htmlContent + $htmlBody + @"
</body>
</html>
"@

    # Write HTML file
    $fullHtml | Out-File -FilePath $htmlPath -Encoding UTF8
    
    Write-Host "HTML created with enhanced conversion: $htmlPath"
}

# Function to find browser for PDF generation
function Get-BrowserPath {
    $candidates = @(
        (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe'),
        (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe'),
        (Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'),
        (Join-Path ${env:ProgramFiles(x86)} 'Google\Chrome\Application\chrome.exe'),
        (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
    )
    foreach ($p in $candidates) { 
        if (Test-Path $p) { 
            return $p 
        } 
    }
    return $null
}

# Generate PDF
$browser = Get-BrowserPath
if ($null -eq $browser) {
    Write-Warning "Edge/Chrome not found for PDF generation."
    Write-Host "You can manually convert by:"
    Write-Host "1. Opening: $htmlPath"
    Write-Host "2. Press Ctrl+P"
    Write-Host "3. Choose 'Save as PDF'"
    Start-Process $htmlPath
} else {
    Write-Host "Generating PDF..."
    $uri = [System.Uri]::new($htmlPath).AbsoluteUri
    
    # Use Chrome/Edge headless mode to generate PDF
    $pdfArgs = @(
        '--headless',
        '--disable-gpu', 
        '--disable-software-rasterizer',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--print-to-pdf-no-header',
        "--print-to-pdf=`"$pdfPath`"",
        '--virtual-time-budget=10000',
        '--run-all-compositor-stages-before-draw',
        "`"$uri`""
    )
    
    Start-Process -FilePath $browser -ArgumentList $pdfArgs -Wait -NoNewWindow
    
    if (Test-Path -Path $pdfPath) {
        Write-Host "PDF created successfully: $pdfPath" -ForegroundColor Green
        Start-Process $pdfPath
    } else {
        Write-Warning "PDF generation failed. Opening HTML instead."
        Start-Process $htmlPath
    }
}
