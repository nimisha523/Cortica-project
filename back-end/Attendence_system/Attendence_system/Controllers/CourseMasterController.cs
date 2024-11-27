using Attendence_system.Context;
using Attendence_system.Model.Domain;
using Attendence_system.Model.dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendence_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseMasterController : ControllerBase
    {
        // private readonly Object dbContext;
        private readonly AttendenceSystem dbcontext;

        public CourseMasterController(AttendenceSystem dbcontext)
        {
            this.dbcontext = dbcontext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courseDomain = await dbcontext.Courses.ToListAsync();
            var courseDto = new List<CourseMasterDto>();

            foreach (var course in courseDomain)
            {
                courseDto.Add(new CourseMasterDto
                {
                    id = course.id,
                    name = course.name,
                    description = course.description,
                    fees = course.fees,
                });
            }
            return Ok(courseDto);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var courseDomain = dbcontext.Courses.Find(id);
            if (courseDomain == null)
            {
                return NotFound();
            }

            var courseDto = new CourseMasterDto()
            {
                id = courseDomain.id,
                name = courseDomain.name,
                description = courseDomain.description,
                fees = courseDomain.fees,

            };
            return Ok(courseDto);
        }

        [HttpPost]
        public async Task<IActionResult> creates([FromBody] AddCourseMasterDto addCourseMasterDto)
        {
            var courseDomain = new Course_Master()
            {
                name = addCourseMasterDto.name,
                description = addCourseMasterDto.description,
                fees = addCourseMasterDto.fees,
            };

            await dbcontext.Courses.AddAsync(courseDomain);
            await dbcontext.SaveChangesAsync();

            //Domain to dto
            var courseDto = new CourseMasterDto()
            {
                id = courseDomain.id,
                name = courseDomain.name,
                description = courseDomain.description,
                fees = courseDomain.fees,
            };
            return CreatedAtAction(nameof(GetAll), new { id = courseDto.id }, courseDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> update(Guid id, [FromBody] AddCourseMasterDto addCourseMasterDto)
        {
            var courseDomain = dbcontext.Courses.Find(id);
            if (courseDomain == null)
            {
                return NotFound();
            }
            courseDomain.name = addCourseMasterDto.name;
            courseDomain.description = addCourseMasterDto.description;
            courseDomain.fees = addCourseMasterDto.fees;

            dbcontext.SaveChanges();
            return Ok(courseDomain);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> deletes(Guid id)
        {
            var courseMaster = dbcontext.Courses.FirstOrDefault(x => x.id == id);

            if (courseMaster == null)
            {
                return NotFound();
            }
            dbcontext.Courses.Remove(courseMaster);
            dbcontext.SaveChanges();
            return Ok(courseMaster);
        }

    }
}