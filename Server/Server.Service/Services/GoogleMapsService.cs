using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class GoogleMapsService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public GoogleMapsService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = Environment.GetEnvironmentVariable("MAPS_API_KEY");
    }

    public async Task<int?> GetTravelTimeInMinutesAsync(string origin, string destination)
    {
        var url = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={Uri.EscapeDataString(origin)}&destinations={Uri.EscapeDataString(destination)}&key={_apiKey}";


        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
            return null;

        var json = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var durationElement = root
            .GetProperty("rows")[0]
            .GetProperty("elements")[0]
            .GetProperty("duration")
            .GetProperty("value"); // seconds

        int seconds = durationElement.GetInt32();
        return seconds / 60;
    }
}
