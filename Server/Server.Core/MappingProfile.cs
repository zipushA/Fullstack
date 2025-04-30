using AutoMapper;
using MatchingAPI.Core.Models;
using Server.Core.DTOs;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<MatchingData, MatchingDataDto>().ReverseMap();
        }
    }
}
