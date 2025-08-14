# Question 14: Write C# code for downloading web page from a web server e.g. http://myblog.com.np/

```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class WebPageDownloader
{
    public static async Task Main()
    {
        Console.WriteLine("=== Web Page Downloader ===");
        
        // Method 1: Using HttpClient (Recommended - Modern approach)
        await DownloadWithHttpClient();
        
        // Method 2: Using WebClient (Legacy approach)
        DownloadWithWebClient();
        
        // Method 3: Download and save to file
        await DownloadAndSaveToFile();
        
        // Method 4: Download with custom headers
        await DownloadWithCustomHeaders();
    }
    
    // Method 1: Modern approach using HttpClient
    public static async Task DownloadWithHttpClient()
    {
        Console.WriteLine("\n1. Downloading with HttpClient:");
        
        string url = "http://myblog.com.np/";
        
        try
        {
            using (HttpClient client = new HttpClient())
            {
                // Set timeout
                client.Timeout = TimeSpan.FromSeconds(30);
                
                // Download the web page
                string content = await client.GetStringAsync(url);
                
                Console.WriteLine($"Successfully downloaded {content.Length} characters");
                Console.WriteLine("First 200 characters:");
                Console.WriteLine(content.Substring(0, Math.Min(200, content.Length)));
                Console.WriteLine("...");
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"HTTP Error: {ex.Message}");
        }
        catch (TaskCanceledException ex)
        {
            Console.WriteLine($"Timeout Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General Error: {ex.Message}");
        }
    }
    
    // Method 2: Legacy approach using WebClient
    public static void DownloadWithWebClient()
    {
        Console.WriteLine("\n2. Downloading with WebClient:");
        
        string url = "http://myblog.com.np/";
        
        try
        {
            using (System.Net.WebClient client = new System.Net.WebClient())
            {
                // Set encoding
                client.Encoding = Encoding.UTF8;
                
                // Add user agent to avoid blocking
                client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                
                // Download the web page
                string content = client.DownloadString(url);
                
                Console.WriteLine($"Successfully downloaded {content.Length} characters");
                Console.WriteLine("First 200 characters:");
                Console.WriteLine(content.Substring(0, Math.Min(200, content.Length)));
                Console.WriteLine("...");
            }
        }
        catch (System.Net.WebException ex)
        {
            Console.WriteLine($"Web Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General Error: {ex.Message}");
        }
    }
    
    // Method 3: Download and save to file
    public static async Task DownloadAndSaveToFile()
    {
        Console.WriteLine("\n3. Downloading and saving to file:");
        
        string url = "http://myblog.com.np/";
        string fileName = "downloaded_webpage.html";
        
        try
        {
            using (HttpClient client = new HttpClient())
            {
                // Download content
                string content = await client.GetStringAsync(url);
                
                // Save to file
                await File.WriteAllTextAsync(fileName, content, Encoding.UTF8);
                
                Console.WriteLine($"Web page saved to: {fileName}");
                Console.WriteLine($"File size: {new FileInfo(fileName).Length} bytes");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    // Method 4: Download with custom headers and detailed response info
    public static async Task DownloadWithCustomHeaders()
    {
        Console.WriteLine("\n4. Downloading with custom headers:");
        
        string url = "http://myblog.com.np/";
        
        try
        {
            using (HttpClient client = new HttpClient())
            {
                // Add custom headers
                client.DefaultRequestHeaders.Add("User-Agent", "C# Web Downloader v1.0");
                client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml");
                
                // Get full response (not just content)
                HttpResponseMessage response = await client.GetAsync(url);
                
                Console.WriteLine($"Status Code: {response.StatusCode}");
                Console.WriteLine($"Content Type: {response.Content.Headers.ContentType}");
                Console.WriteLine($"Content Length: {response.Content.Headers.ContentLength}");
                
                // Check if successful
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Successfully downloaded {content.Length} characters");
                    
                    // Display response headers
                    Console.WriteLine("\nResponse Headers:");
                    foreach (var header in response.Headers)
                    {
                        Console.WriteLine($"{header.Key}: {string.Join(", ", header.Value)}");
                    }
                }
                else
                {
                    Console.WriteLine($"Failed to download: {response.ReasonPhrase}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    // Bonus: Download multiple pages concurrently
    public static async Task DownloadMultiplePages()
    {
        Console.WriteLine("\n5. Downloading multiple pages concurrently:");
        
        string[] urls = {
            "http://myblog.com.np/",
            "http://google.com/",
            "http://github.com/"
        };
        
        using (HttpClient client = new HttpClient())
        {
            // Create tasks for all downloads
            Task<string>[] downloadTasks = new Task<string>[urls.Length];
            
            for (int i = 0; i < urls.Length; i++)
            {
                string url = urls[i];
                downloadTasks[i] = client.GetStringAsync(url);
            }
            
            try
            {
                // Wait for all downloads to complete
                string[] results = await Task.WhenAll(downloadTasks);
                
                for (int i = 0; i < urls.Length; i++)
                {
                    Console.WriteLine($"{urls[i]}: {results[i].Length} characters downloaded");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in concurrent downloads: {ex.Message}");
            }
        }
    }
}

// Alternative implementation with more error handling
public class RobustWebDownloader
{
    private static readonly HttpClient httpClient = new HttpClient();
    
    static RobustWebDownloader()
    {
        // Configure HttpClient
        httpClient.Timeout = TimeSpan.FromSeconds(30);
        httpClient.DefaultRequestHeaders.Add("User-Agent", 
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
    }
    
    public static async Task<string> DownloadWebPageAsync(string url)
    {
        try
        {
            Console.WriteLine($"Downloading: {url}");
            
            using (HttpResponseMessage response = await httpClient.GetAsync(url))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                
                Console.WriteLine($"Download completed: {content.Length} characters");
                return content;
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"HTTP request failed: {ex.Message}");
            return null;
        }
        catch (TaskCanceledException ex)
        {
            Console.WriteLine($"Request timed out: {ex.Message}");
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
            return null;
        }
    }
    
    public static async Task<bool> DownloadToFileAsync(string url, string fileName)
    {
        try
        {
            string content = await DownloadWebPageAsync(url);
            if (content != null)
            {
                await File.WriteAllTextAsync(fileName, content, Encoding.UTF8);
                Console.WriteLine($"Content saved to: {fileName}");
                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving to file: {ex.Message}");
            return false;
        }
    }
}
```

