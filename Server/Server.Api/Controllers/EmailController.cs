using Microsoft.AspNetCore.Mvc;
using Server.Core.Interfaces.Services;
using Server.Core.Models;
using System.Threading.Tasks;

namespace Server.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.To) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
            {
                return BadRequest("פרטי ההודעה אינם תקינים.");
            }

            var result = await _emailService.SendEmailAsync(request);
            if (result)
                return Ok("הודעה נשלחה בהצלחה.");
            else
                return StatusCode(500, "שליחת המייל נכשלה.");
        }
    }
}
