using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Api.PostModels;
using Server.Core.DTOs;
using Server.Core.Interfaces.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // GET: api/<AuthController>
    public class AuthController(IAuthService authService, IMapper mapper) : ControllerBase
    {
        private readonly IAuthService _authService = authService;
        private readonly IMapper _mapper = mapper;

        [HttpPost("login")]
        public ActionResult<LoginResponseDto> Login([FromBody] LoginModel model)
        {
            var result = _authService.Login(model.Email, model.Password);
            if (!result.IsSuccess)
                return StatusCode(result.StatusCode, result.ErrorMessage);
            return Ok(result.Data);
        }

        [HttpPost("register/{role}")]
        public async Task<ActionResult<LoginResponseDto>> Register(string role,[FromBody] UserPostModel user)
        {
            if (user == null || role==null)
                return BadRequest("User data is required.");

            var userDto = _mapper.Map<UserDto>(user);
            var result = await _authService.Register(userDto,role);
            if (!result.IsSuccess)
                return StatusCode(result.StatusCode, result.ErrorMessage);
            return Ok(result.Data);
        }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
