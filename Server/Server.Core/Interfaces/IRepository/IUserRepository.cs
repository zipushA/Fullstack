using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.IRepository
{
    public interface IUserRepository: IGeneryRepository<User>
    {
         Task<IEnumerable<User>> GetUsersDataAsync(string role);

         Task<IEnumerable<User>> GetOrderDataAsync(int id);

        Task<User?> GetByIdDataAsync(int id);
        Task<bool> ExistsAsync(string email);
        User? GetUserWithRoles(string email);

    }
}
