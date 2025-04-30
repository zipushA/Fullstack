using System.ComponentModel.DataAnnotations;

namespace MatchingAPI.Core.Models
{
    public class MatchingData
    {
        [Key]
        public int Id { get; set; }
        public int Seniority { get; set; }
        public bool IsBoys { get; set; }
        public bool IsKeruv { get; set; }
        public string ResidentialArea { get; set; }
       

        public MatchingData() { }

        public MatchingData(MatchingData m)
        {
            Seniority = m.Seniority;
            IsBoys = m.IsBoys;
            IsKeruv = m.IsKeruv;
            ResidentialArea = m.ResidentialArea;
           
        }
    }
}
