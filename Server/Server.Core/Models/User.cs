using MatchingAPI.Core.Models;
using Server.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Link { get; set; }
        public int MatchingDataId { get; set; }
        public MatchingData Data { get; set; }

        public List<Role> RoleList { get; set; }
        public User()
        {
            RoleList = new List<Role>();
        }

    }
}
