using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class MapsController : ControllerBase
{
    private readonly GoogleMapsService _mapsService;

    public MapsController(GoogleMapsService mapsService)
    {
        _mapsService = mapsService;
    }

    [HttpGet("travel-time")]
    public async Task<IActionResult> GetTravelTime([FromQuery] string origin, [FromQuery] string destination)
    {
        if (string.IsNullOrWhiteSpace(origin) || string.IsNullOrWhiteSpace(destination))
            return BadRequest("Both origin and destination are required.");

        var minutes = await _mapsService.GetTravelTimeInMinutesAsync(origin, destination);

        if (minutes == null)
            return StatusCode(500, "Failed to get travel time from Google Maps API.");

        return Ok(new { origin, destination, travelTimeMinutes = minutes });
    }
}
