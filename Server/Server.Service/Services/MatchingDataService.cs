using AutoMapper;
using MatchingAPI.Core.Models;
using Server.Core.DTOs;
using Server.Core.Interfaces.IRepository;
using Server.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class MatchingDataService(IRepositoryManager repositoryManager,IMapper mapper) : IMatchingDataService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<MatchingDataDto>> GetMatchingDataAsync()
        {
            var data = await _repositoryManager.MatchingData.GetAsync();
            var dataDto = _mapper.Map<IEnumerable<MatchingDataDto>>(data);
            return dataDto;
        }
        public async Task<MatchingDataDto?> GetByIdAsync(int id)
        {
           var data= await _repositoryManager.MatchingData.GetByIdAsync(id);
            var dataDto = _mapper.Map<MatchingDataDto>(data);
            return dataDto;
        }
        //public async Task<MatchingDataDto> AddAsync(MatchingDataDto mDto)
        //{
        //    var m = _mapper.Map<MatchingData>(mDto);
        //    await _repositoryManager.MatchingData.AddAsync(m);
        //    await _repositoryManager.SaveAsync();
        //    return mDto;
        //}
        public async Task<MatchingDataDto> AddAsync(MatchingDataDto mDto)
        {
            var m = _mapper.Map<MatchingData>(mDto);
            await _repositoryManager.MatchingData.AddAsync(m);
            await _repositoryManager.SaveAsync();

            // אחרי השמירה, ל־m כבר יש Id מה־DB
            var resultDto = _mapper.Map<MatchingDataDto>(m);
            return resultDto;
        }

        public async Task<MatchingDataDto> UpdateAsync(int id, MatchingDataDto updatedEntity)
        {
            var m = _mapper.Map<MatchingData>(updatedEntity);
            await _repositoryManager.MatchingData.UpdateAsync(id, m);
            await _repositoryManager.SaveAsync();
            return updatedEntity;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _repositoryManager.MatchingData.GetByIdAsync(id); // חפש את הפריט
            if (item == null)
            {
                return false; // החזר false אם ה-ID לא קיים
            }

           await _repositoryManager.MatchingData.DeleteAsync(id); // מחק את הפריט
            await _repositoryManager.SaveAsync(); // שמור שינויים
            return true;
        }

    }
}
