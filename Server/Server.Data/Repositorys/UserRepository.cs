using Microsoft.EntityFrameworkCore;
using Server.Core.DTOs;
using Server.Core.Interfaces.IRepository;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositorys
{
    public class UserRepository : GeneryRepository<User>, IUserRepository
    {
        private readonly DbSet<User> _dataSet;
        public UserRepository(DataContext context) : base(context)
        {
            _dataSet = context.Set<User>();
        }
        public async Task<IEnumerable<User>> GetUsersDataAsync(string role)
        {
            return await _dataSet.Where(u => u.RoleList.Any(r => r.RoleName == role)).Include(t => t.Data) .ToListAsync();
        }
        public async Task<User?> GetByIdDataAsync(int id)
        {
            return await _dataSet.Where(t => t.Id == id)
                 .Include(t => t.Data).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<User>> GetOrderDataAsync(int id)
        {
            User p = await GetByIdDataAsync(id);

            if (p == null)
            {
                // טיפול במקרה שבו המנהל לא נמצא
                throw new Exception("Principal not found");
            }

            return await _dataSet
                .Include(t => t.Data)
                .Where(t => t.Data != null && // בדוק אם t.data לא null
                            t.Data.Seniority >= p.Data.Seniority &&
                            t.Data.IsBoys == p.Data.IsBoys &&
                            t.Data.IsKeruv == p.Data.IsKeruv &&
                            t.RoleList.Any(r => r.RoleName == "Teacher"))
                .ToListAsync();
        }
        public User? GetUserWithRoles(string email)
        {
            return _dataSet.Where(u => u.Email == email)
                .Include(u => u.RoleList).Include(u => u.Data).FirstOrDefault();
        }
        public async Task<bool> ExistsAsync(string email)
        {
            return await _dataSet.AnyAsync(u => u.Email == email);
        }
    }
}
