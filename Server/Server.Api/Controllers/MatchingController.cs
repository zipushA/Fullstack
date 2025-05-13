using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.IRepository;
using Server.Core.Models;

[ApiController]
[Route("api/[controller]")]
public class MatchingController : ControllerBase
{
    private readonly MatchingService _matchingService;
    private readonly IUserRepository _userRepository;   

    public MatchingController(MatchingService matchingService,IUserRepository userRepository)
    {
        _matchingService = matchingService;
        _userRepository = userRepository;
    }

    [HttpGet("sorted-teachers")]
    public async Task<IActionResult> GetSortedTeachers([FromQuery] int principalId)
    {
        User principal=_userRepository.GetByIdDataAsync(principalId).Result;
        var schoolAddress = principal.Data.ResidentialArea;
        if (principalId <= 0 || string.IsNullOrWhiteSpace(schoolAddress))
            return BadRequest("PrincipalId and SchoolAddress are required.");

        try
        {
            var sortedTeachers = await _matchingService.GetSortedTeachersForPrincipalAsync(principalId, schoolAddress);
            return Ok(sortedTeachers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}
