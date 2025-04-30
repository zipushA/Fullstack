using MatchingAPI.Core.Models;
using Server.Core.DTOs;
using Server.Core.Interfaces.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IMatchingDataService
    {
        Task<IEnumerable<MatchingDataDto>> GetMatchingDataAsync();
       
         Task<MatchingDataDto?> GetByIdAsync(int id);
      
        Task<MatchingDataDto> AddAsync(MatchingDataDto mdto);
       
        Task<MatchingDataDto> UpdateAsync(int id, MatchingDataDto updatedEntity);
       
         Task<bool> DeleteAsync(int id);
       
    }
}
