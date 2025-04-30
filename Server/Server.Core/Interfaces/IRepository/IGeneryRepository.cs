using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.IRepository
{
    public interface IGeneryRepository<T> where T : class
    {
        public Task<IEnumerable<T>> GetAsync();
        public Task<T?> GetByIdAsync(int id);
        public Task<T> AddAsync(T t);
        public Task<T> UpdateAsync(int id,T t);
        public Task<bool> DeleteAsync(int id);
    }
}
