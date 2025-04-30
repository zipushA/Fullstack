using MatchingAPI.Core.Models;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;

namespace Server.Data
{
    public class DataContext : DbContext
    {
     
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<MatchingData> MatchingData { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Mathing_db");
        }
    }
}

