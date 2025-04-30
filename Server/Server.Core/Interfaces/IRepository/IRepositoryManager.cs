using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.IRepository
{
    public interface IRepositoryManager
    {
        public IUserRepository Users { get; }
        public IMatchingDataRepository MatchingData { get; }
        public Task SaveAsync();
    }
}
