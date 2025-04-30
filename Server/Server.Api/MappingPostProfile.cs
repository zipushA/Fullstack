using AutoMapper;
using Server.Api.PostModels;
using Server.Core.DTOs;

namespace Server.Api
{
    public class MappingPostProfile: Profile
    {
        public MappingPostProfile() 
        { 
            CreateMap<UserPostModel,UserDto>();
            CreateMap<MatchingDataPostModel, MatchingDataDto>();
        }
    }
}
