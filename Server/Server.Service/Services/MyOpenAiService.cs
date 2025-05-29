
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using Server.Core.Interfaces.Services;

public class MyOpenAiService : IMyOpenAiService
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
            model = "gpt-4",
            messages = new[]
            {
          new {
              role = "system",
              content = "אתה עוזר מקצועי מאד מאד וטוב שמסכם אך ורק את המידע המופיע בקובץ קורות החיים של מורות. אל תמציא מידע, אל תשער השערות, אל תפרשן מעבר לנאמר, ואל תשתמש בביטויים כמו 'כנראה', 'ייתכן', או 'לרוב'. הסיכום צריך להיות מבוסס אך ורק על עובדות מפורשות שהוזכרו בטקסט המקורי. אין להזכיר שמות או פרטים מזהים."
             },

            new {
                role = "user",
                content = $"הנה קובץ קורות חיים:\n{resumeText}\n\nאנא נסח סיכום תמציתי של הכישורים, הניסיון והמאפיינים המקצועיים של המועמדת בלבד, בלי להוסיף מידע שלא מופיע בטקסט, ובלי להזכיר שמות."
            }
        },
            max_tokens = 1000,
            temperature = 0.2
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

