using Attendence_system.Context;
using Attendence_system.Model.Domain;
using Attendence_system.Model.dto;
using Attendence_system.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Text.Json;

namespace Attendence_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMasterController:ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        private readonly ILogger<UserMasterController> logger;

        //Injection
        public UserMasterController(IMapper mapper, IUserRepository userRepository,ILogger<UserMasterController> logger)
        {
            this.mapper = mapper;
            this.userRepository = userRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            /* var userDomain = await dbcontext.Users.ToListAsync();
             var userDto = new List<UserMasterDto>();

             foreach (var user in userDomain)
             {
                 userDto.Add(new UserMasterDto()
                 {
                     id = user.id,
                     firstName = user.firstName,
                     lastName = user.lastName,
                     address = user.address,
                     phoneNo = user.phoneNo,
                     email   = user.email,
                     subject = user.subject,
                 });
             }
             return Ok(userDto);*/

            logger.LogInformation("GetAllUsers action methods was invoked");
            var userDomain = await userRepository.GetAllAsync();
            var userDto = mapper.Map<List<UserMasterDto>>(userDomain);

            logger.LogInformation($"Finished GetAllUsers request with data{JsonSerializer.Serialize(userDto)}");             
            return Ok(userDto);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            logger.LogInformation("GetAllUsers action methods was invoked");
            var userDomain = await userRepository.GetIdAsync(id);

            if(userDomain == null)
            {
                return BadRequest();
            }

            /*var userDto = new UserMasterDto()
            {
                id = userDomain.id,
                firstName = userDomain.firstName,
                lastName = userDomain.lastName,
                address = userDomain.address,
                phoneNo = userDomain.phoneNo,
                email = userDomain.email,
                subject = userDomain.subject,
            };*/
            var userDto = mapper.Map<UserMasterDto>(userDomain);
            logger.LogInformation($"Finished GetAllUsers request with data{JsonSerializer.Serialize(userDto)}");
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<IActionResult> creates([FromBody] AddUserMasterDto addUserMasterDto)
        {
            logger.LogInformation("GetAllUsers action methods was invoked");

            /*var userDomain = new User_Master()
            {
                firstName = addUserMasterDto.firstName,
                lastName = addUserMasterDto.lastName,
                address = addUserMasterDto.address,
                phoneNo =addUserMasterDto.phoneNo,
                email = addUserMasterDto.email,
                subject = addUserMasterDto.subject,
            };*/

            var userDomain = mapper.Map<User_Master>(addUserMasterDto);
            userDomain = await userRepository.CreateAsync(userDomain);

            //Domain to dto
            /*var userDto = new UserMasterDto()
            {
                id = userDomain.id,
                firstName = userDomain.firstName,
                lastName = userDomain.lastName,
                address = userDomain.address,
                phoneNo = userDomain.phoneNo,
                email = userDomain.email,
                subject = userDomain.subject,
            };*/
            var userDto = mapper.Map<UserMasterDto>(userDomain);
            logger.LogInformation($"Finished GetAllUsers request with data{JsonSerializer.Serialize(userDto)}");

            return CreatedAtAction(nameof(GetAll),new {id = userDto.id},userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> update(Guid id, [FromBody] User_Master user_master)
        {
            logger.LogInformation("GetAllUsers action methods was invoked");                               
            var userDomain = await userRepository.UpdateAsync(id, user_master);                             
            if(userDomain == null)
            {
                return NotFound();
            }
            /* userDomain.firstName = addUserMasterDto.firstName;
             userDomain.lastName = addUserMasterDto.lastName;
             userDomain.address = addUserMasterDto.address;
             userDomain.phoneNo = addUserMasterDto.phoneNo;
             userDomain.email = addUserMasterDto.email;
             userDomain.subject = addUserMasterDto.subject;
             dbcontext.SaveChanges();*/

            var userDto = mapper.Map<UserMasterDto>(userDomain);
            logger.LogInformation($"Finished GetAllUsers request with data{JsonSerializer.Serialize(userDto)}");

            return CreatedAtAction(nameof(GetAll), new { id = userDomain.id }, user_master);         
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> deletes(Guid id)
        {
            logger.LogInformation("GetAllUsers action methods was invoked");

            var userDomain = await userRepository.DeleteAsync(id);
            if (userDomain == null)
            {
                return NotFound();
            } 
           
            var userDto = mapper.Map<UserMasterDto> (userDomain);
            logger.LogInformation($"Finished GetAllUsers request with data{JsonSerializer.Serialize(userDto)}");

            return Ok(userDomain);
        }
    }
}
