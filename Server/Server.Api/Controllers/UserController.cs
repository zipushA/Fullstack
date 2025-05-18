using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.PostModels;
using Server.Core.DTOs;
using Server.Core.Interfaces.Services;
using Server.Core.Models;
using Server.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class UserController(IUserService userService,IMapper mapper,IS3Service s3Service) : ControllerBase
    {

        private readonly IUserService _userService= userService;
        private readonly IMapper _mapper = mapper;
        private readonly IS3Service _s3Service = s3Service;


        // GET: api/<TeacherController>
        [HttpGet]
        //[Authorize(Policy = "admin")]

        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var result = await _userService.GetAllAsync();
            if (result == null || !result.Any())
            {
                return NotFound();
            }
            return Ok(result); 
        }

        [HttpGet("Full")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFull([FromQuery] string role)
        {
          
            var result = await _userService.GetUsersDataAsync(role);
            if (result == null || !result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("OrderData")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetOrderData(int id)
        {
            var result = await _userService.GetOrderDataAsync(id);
            if (result == null || !result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("OrderDataT")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetOrderDataT(int id)
        {
            var result = await _userService.GetOrderDataAsyncT(id);
            if (result == null || !result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }
        // GET  api/<TeacherController>/5
        [HttpGet("Full/{id}")]
        public async Task<ActionResult<UserDto?>> GetByIdFull(int id)
        {
            var result = await _userService.GetByIdDataAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result); 
        }

        // POST api/<TeacherController>
        [HttpPost("{role}")]
        public async Task<ActionResult<UserDto>>Post(string role,[FromBody]UserPostModel teacherPostModel)
        {
            if (teacherPostModel == null)
            {
                return BadRequest("נתונים לא תקינים");
            }

            var teacherDto = _mapper.Map<UserDto>(teacherPostModel);
            var result = await _userService.AddAsync(teacherDto,role);
            return CreatedAtAction(nameof(GetByIdFull), new { id = result.Data.Id }, result.Data);
        }

        // PUT api/<TeacherController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Put(int id, [FromBody] UserPostModel teacherPostModel)
        {
            if (teacherPostModel == null)
            {
                return BadRequest("נתונים לא תקינים"); // החזר 400 אם המודל לא תקין
            }

            var teacherDto = _mapper.Map<UserDto>(teacherPostModel);
            var updatedEntity = await _userService.UpdateAsync(id, teacherDto);
            if (updatedEntity == null)
            {
                return NotFound(); // החזר 404 אם ה-ID לא קיים
            }
            return Ok(updatedEntity); // החזר 200
        }

        // DELETE api/<TeacherController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _userService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound(); // החזר 404 אם ה-ID לא קיים
            }
            return NoContent(); // החזר 204 אם המחיקה הצליחה
        }
        // ⬆️ שלב 1: קבלת URL להעלאת קובץ ל-S3
        [HttpGet("Upload-url")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUploadUrl([FromQuery] string fileName, [FromQuery] string contentType)
        {
            //if(contentType!=".pdf"&& contentType != ".docx")
            //{
            //    return BadRequest("Invalid file type");
            //}
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("Missing file name");
            var url = await _s3Service.GeneratePresignedUrlAsync("resume/" + fileName, contentType);
            return Ok(new { url });
        }

        // ⬇️ שלב 2: קבלת URL להורדת קובץ מה-S3
        [HttpGet("Download-url/{fileName}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDownloadUrl(string fileName)
        {
            var url = await _s3Service.GetDownloadUrlAsync(fileName);
            return Ok(new { downloadUrl = url });
        }
        [HttpGet("Count/Teachers")]
        public async Task<ActionResult<int>> GetTeacherCount()
        {
            var count = await _userService.GetTeacherCountAsync();
            return Ok(count);
        }

        [HttpGet("Count/Principals")]
        public async Task<ActionResult<int>> GetPrincipalCount()
        {
            var count = await _userService.GetPrincipalCountAsync();
            return Ok(count);
        }

    }
}
