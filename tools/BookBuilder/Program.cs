using Markdig;
using System.Text;
using System.Text.RegularExpressions;

var repoRoot = args.Length > 0 ? args[0] : Directory.GetCurrentDirectory();
var notesRoot = Path.Combine(repoRoot, "notes");
var outDir = Path.Combine(repoRoot, "book");
Directory.CreateDirectory(outDir);
var outMd = Path.Combine(outDir, "book.md");
var outHtml = Path.Combine(outDir, "book.html");

if (!Directory.Exists(notesRoot))
{
    Console.Error.WriteLine($"Notes folder not found: {notesRoot}");
    return 1;
}

// Collect all markdown files under notes/, ordered deterministically by path.
var files = Directory
    .EnumerateFiles(notesRoot, "*.md", SearchOption.AllDirectories)
    .OrderBy(p => p, StringComparer.OrdinalIgnoreCase)
    .ToList();

if (files.Count == 0)
{
    Console.Error.WriteLine("No markdown files found under notes/.");
    return 1;
}

string GetTitle(string path)
{
    // Use first heading if present; else derive from filename
    foreach (var line in File.ReadLines(path))
    {
        var t = line.Trim();
        if (t.StartsWith("# ")) return t.Substring(2).Trim();
    }
    return Path.GetFileNameWithoutExtension(path).Replace('-', ' ');
}

var sbMd = new StringBuilder();

// Title page
sbMd.AppendLine("# C#/.NET Learning Notes");
sbMd.AppendLine();
sbMd.AppendLine("Compiled for offline study and printing. Start with the Study Guide.");

// Table of contents (level-2 entries from file titles)
foreach (var f in files)
{
    var rel = Path.GetRelativePath(notesRoot, f).Replace('\\', '/');
    sbMd.AppendLine($"- [{GetTitle(f)}]({rel})");
}

sbMd.AppendLine();

// Helpers to clean content
string StripReadMoreSections(string md)
{
    if (string.IsNullOrWhiteSpace(md)) return md;
    // Remove sections starting with headings like "## Read More" up to the next heading or end of file
    var sectionPattern = new Regex(
        pattern: @"^[ \t]{0,3}#{2,6}[ \t]+read[ \t]*more\b[^\r\n]*\r?\n.*?(?=^[ \t]{0,3}#|\z)",
        options: RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.Singleline);
    md = sectionPattern.Replace(md, string.Empty);

    // Remove single-line "Read more" bullets or paragraphs
    var linePattern = new Regex(
        pattern: @"^\s*(?:[-*]\s*)?(?:read\s*more\b.*)$",
        options: RegexOptions.IgnoreCase | RegexOptions.Multiline);
    md = linePattern.Replace(md, string.Empty);

    return md;
}

string CollapseBlankLines(string md)
{
    if (string.IsNullOrWhiteSpace(md)) return md;
    // Trim trailing whitespace on lines
    md = Regex.Replace(md, "[\t ]+\r?\n", "\n");
    // Collapse 3+ consecutive newlines to 2
    md = Regex.Replace(md, "(?:\r?\n){3,}", "\n\n");
    return md.TrimEnd() + "\n"; // ensure file ends with single newline
}

bool StartsWithH1(string md)
{
    foreach (var raw in md.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
    {
        var line = raw.Trim();
        if (line.Length == 0) continue;
        return line.StartsWith("# ");
    }
    return false;
}

// Content with page breaks between files (no trailing break at end)
for (int i = 0; i < files.Count; i++)
{
    var f = files[i];
    var title = GetTitle(f);
    var raw = File.ReadAllText(f);
    var cleaned = CollapseBlankLines(StripReadMoreSections(raw));

    // Separate files with a horizontal rule; avoid duplicate top-level heading
    if (i > 0)
    {
        sbMd.AppendLine("\n\n---\n");
    }

    if (!StartsWithH1(cleaned))
    {
        sbMd.AppendLine($"# {title}");
        sbMd.AppendLine();
    }

    sbMd.AppendLine(cleaned);

    if (i < files.Count - 1)
    {
        sbMd.AppendLine("\n<div class=\"page-break\"></div>");
    }
}

File.WriteAllText(outMd, sbMd.ToString());

// Convert to HTML with basic print styles
var pipeline = new MarkdownPipelineBuilder().UseAdvancedExtensions().Build();
var body = Markdig.Markdown.ToHtml(sbMd.ToString(), pipeline);
var template = """
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>C#/.NET Learning Notes (Compiled)</title>
    <style>
        :root { --ink: #111; --muted: #666; }
        body { color: var(--ink); font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.55; max-width: 900px; margin: 1rem auto; padding: 0 1rem; }
        code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        pre { background: #f6f8fa; padding: 12px; overflow: auto; border-radius: 6px; }
        h1 { font-size: 1.9rem; margin-top: 2.2rem; }
        h2 { font-size: 1.5rem; margin-top: 1.8rem; }
        h3 { font-size: 1.2rem; margin-top: 1.4rem; }
        hr { margin: 2rem 0; }
        .page-break { page-break-before: always; }
        .toc h1 { margin-top: 0; }
        @media print {
            @page { margin: 16mm 12mm; size: A4; }
            body { margin: 0; }
            header, footer { position: fixed; left: 0; right: 0; color: var(--muted); font-size: 10pt; }
            header { top: 0; }
            footer { bottom: 0; }
            footer .page:after { content: counter(page); }
            pre { white-space: pre-wrap; }
            /* Don't append URLs after links to save space */
            a[href]:after { content: ""; }
        }
    </style>
</head>
<body>
<header></header>
<footer><span class="page"></span></footer>
%%BODY%%
</body>
</html>
""";
var html = template.Replace("%%BODY%%", body);
File.WriteAllText(outHtml, html);

Console.WriteLine($"Compiled {files.Count} files to:\n - {outMd}\n - {outHtml}");
return 0;
