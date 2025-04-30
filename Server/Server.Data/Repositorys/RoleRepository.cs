using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositorys
{
    public class RoleRepository
    {

        private readonly DbSet<User> _dataSet;
        public RoleRepository(DataContext context) 
        {
            _dataSet = context.Set<User>();
        }
       
    }
}
