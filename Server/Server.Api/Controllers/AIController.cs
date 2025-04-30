using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;
    private readonly MyOpenAiService _openAiService;

    public AIController(
        IHttpClientFactory httpClientFactory,
        IConfiguration config,
        MyOpenAiService openAiService)
    {
        _httpClientFactory = httpClientFactory;
        _config = config;
        _openAiService = openAiService;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary([FromQuery] string resumeUrl)
    {
        try
        {
            // 1. שליפת קובץ PDF מהקישור בענן
            using var client = _httpClientFactory.CreateClient();
            using var response = await client.GetAsync(resumeUrl);
            response.EnsureSuccessStatusCode();
            var pdfBytes = await response.Content.ReadAsByteArrayAsync();

            // 2. המרת PDF לטקסט
            var text = ResumeParser.ExtractTextFromPdf(pdfBytes);
            if (string.IsNullOrWhiteSpace(text))
                return BadRequest("לא ניתן לחלץ טקסט מהקובץ");

            // 3. שליחת טקסט ל-OpenAI
            var summary = await _openAiService.GetSummaryAsync(text);

            return Ok(new { summary });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"שגיאה בניתוח קובץ: {ex.Message}");
        }
    }
}
