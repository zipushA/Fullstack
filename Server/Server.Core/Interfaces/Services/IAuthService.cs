using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(User user);
        bool ValidateUser(string email, string password, out string[] roles, out User user);
        Result<LoginResponseDto?> Login(string email, string password);
        Task<Result<LoginResponseDto>> Register(UserDto userDto,string role);
    }
}
