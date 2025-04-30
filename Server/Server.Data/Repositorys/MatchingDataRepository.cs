using MatchingAPI.Core.Models;
using Microsoft.EntityFrameworkCore;
using Server.Core.Interfaces.IRepository;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositorys
{
    public class MatchingDataRepository: GeneryRepository<MatchingData>, IMatchingDataRepository
    {
      
        public MatchingDataRepository(DataContext context) : base(context)
        {
           
        }
    }
}
