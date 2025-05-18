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
    public interface IUserService
    {
        public Task<IEnumerable<UserDto>> GetUsersDataAsync(string role);
        public Task<IEnumerable<UserDto>> GetOrderDataAsync(int id);
        Task<IEnumerable<UserDto>> GetOrderDataAsyncT(int id);
        public Task<IEnumerable<UserDto>> GetAllAsync();
        public Task<UserDto?> GetByIdDataAsync(int id);
        public Task<Result<UserDto>> AddAsync(UserDto t,string role);
        public Task<UserDto> UpdateAsync(int id, UserDto t);
        public Task<bool> DeleteAsync(int id);
        public  Task<int> GetTeacherCountAsync();
        public Task<int> GetPrincipalCountAsync();


    }
}
