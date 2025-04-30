using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        [JsonIgnore]
        public List<User> UserList { get; set; }
        public List<Permission> PermissionList { get; set; }
        public Role()
        {
            UserList = new List<User>();
            PermissionList = new List<Permission>();
        }
    }
}
