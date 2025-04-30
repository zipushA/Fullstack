using Server.Core.Interfaces.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositorys
{
   public class RepositoryManager(DataContext context, IUserRepository UserRepository, IMatchingDataRepository matchingDataRepository) : IRepositoryManager
    {
        private readonly DataContext _context = context;
        public IUserRepository Users { get; } = UserRepository;
        public IMatchingDataRepository MatchingData { get; } = matchingDataRepository;

        //public RepositoryManager(DataContext context, IUserRepository UserRepository,IMatchingDataRepository matchingDataRepository)
        //{
        //    _context = context;
        //    Teachers = teacherRepository;
        //    Principals = principals;
        //    MatchingData=matchingDataRepository;
        //}

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
