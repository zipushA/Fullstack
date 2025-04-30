
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;

public class MyOpenAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public MyOpenAiService(IConfiguration config)
    {
        _httpClient = new HttpClient();
        _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    }

    public async Task<string> GetSummaryAsync(string resumeText)
    {
        var requestBody = new
        {
            model = "gpt-4",  // עדכון המודל ל-gpt-4
            messages = new[]
            {
                new { role = "system", content = "אתה עוזר שמסכם קורות חיים של מורות." },
                new { role = "user", content = $"נתונים מקובץ קורות חיים:\n{resumeText}\n\nנתח את האישיות והמאפיינים המקצועיים של המורה בקצרה." }
            },
            max_tokens = 300,
            temperature = 0.7
        };

        var requestJson = JsonSerializer.Serialize(requestBody);
        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");
        request.Content = new StringContent(requestJson, Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var errorDetails = await response.Content.ReadAsStringAsync();
            return $"שגיאה: {response.StatusCode}\n{errorDetails}";
        }

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);

        var message = doc.RootElement
                         .GetProperty("choices")[0]
                         .GetProperty("message")
                         .GetProperty("content")
                         .GetString();

        return message?.Trim() ?? "לא התקבל סיכום.";
    }
}

