using Attendence_system.Model.Domain;
using Attendence_system.Model.dto;
using AutoMapper;

namespace Attendence_system.Mapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile() 
        { 
          CreateMap<User_Master, UserMasterDto>().ReverseMap();
          CreateMap<User_Master, AddUserMasterDto>().ReverseMap();
        
        }
    }
}
