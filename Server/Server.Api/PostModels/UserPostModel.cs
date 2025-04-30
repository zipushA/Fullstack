using MatchingAPI.Core.Models;

namespace Server.Api.PostModels
{
    public class UserPostModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Link { get; set; }
        public int MatchingDataId { get; set; }
        // public MatchingDataPostModel data { get; set; }
    }
}
