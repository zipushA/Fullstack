using AutoMapper;
using MatchingAPI.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.PostModels;
using Server.Core.DTOs;
using Server.Core.Interfaces.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MatchingDataController(IMatchingDataService matchingDataService,IMapper mapper) : ControllerBase
    {
        private readonly IMatchingDataService _matchingDataService = matchingDataService;
        private readonly IMapper _mapper = mapper;
        // GET: api/<MatchingDataController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchingDataDto>>> Get()
        {
            var result = await _matchingDataService.GetMatchingDataAsync();
            if (result == null || !result.Any())
            {
                return NotFound(); // אם אין נתונים, החזר 404
            }
            return Ok(result); // החזר 200 עם הנתונים
        }
        // GET api/<MatchingDataController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MatchingDataDto>> Get(int id)
        {
            var result = await _matchingDataService.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound(); // החזר 404 אם לא נמצא
            }
            return Ok(result); // החזר 200 עם הנתון
        }
        // POST api/<MatchingDataController>
        [HttpPost]
        public async Task<ActionResult<MatchingDataDto>> Post([FromBody] MatchingDataPostModel matchingData)
        {
            if (matchingData == null)
            {
                return BadRequest("נתונים לא תקינים"); // החזר 400 אם המודל לא תקין
            }

            var matchingDataDto = _mapper.Map<MatchingDataDto>(matchingData);
            var createdEntity = await _matchingDataService.AddAsync(matchingDataDto);
            return CreatedAtAction(nameof(Get), new { id = createdEntity.Id }, createdEntity); // החזר 201
        }
        // PUT api/<MatchingDataController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<MatchingDataDto>> Put(int id, [FromBody] MatchingDataPostModel matchingData)
        {
            if (matchingData == null)
            {
                return BadRequest("נתונים לא תקינים"); // החזר 400 אם המודל לא תקין
            }

            var matchingDataDto = _mapper.Map<MatchingDataDto>(matchingData);
            var updatedEntity = await _matchingDataService.UpdateAsync(id, matchingDataDto);
            if (updatedEntity == null)
            {
                return NotFound(); // החזר 404 אם ה-ID לא קיים
            }
            return Ok(updatedEntity); // החזר 200
        }

        // DELETE api/<MatchingDataController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _matchingDataService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound(); // החזר 404 אם ה-ID לא קיים
            }
            return NoContent(); // החזר 204 אם המחיקה הצליחה
        }
    }
}
