using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string PermissionName { get; set; }
        public List<Role> PermissionList { get; set; }
        public Permission()
        {
            PermissionList = new List<Role>();
        }
    }
}
