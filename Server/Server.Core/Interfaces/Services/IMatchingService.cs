using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IMatchingService
    {
        public Task<IEnumerable<User>> GetSortedTeachersForPrincipalAsync(int principalId, string schoolAddress);
    }
}
