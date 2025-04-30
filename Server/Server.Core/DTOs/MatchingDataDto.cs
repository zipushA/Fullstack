using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class MatchingDataDto
    {
        [Key]
        public int Id { get; set; }
        public int Seniority { get; set; }
        public bool IsBoys { get; set; }
        public bool IsKeruv { get; set; }
        public string ResidentialArea { get; set; }
    }
}
