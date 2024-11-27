using Attendence_system.Context;
using Attendence_system.Model.Domain;
using Attendence_system.Model.dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendence_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDataController:ControllerBase
    {
        private readonly AttendenceSystem dbcontext;

        public StudentDataController(AttendenceSystem dbcontext)
        {
            this.dbcontext = dbcontext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var studentDomain = await dbcontext.Students.ToListAsync();
            var studentDto = new List<StudentdataDto>();

            foreach (var stud in studentDomain)
            {
                studentDto.Add(new StudentdataDto
                {
                    id = stud.id,
                    s_firstName = stud.s_firstName,
                    s_lastName = stud.s_lastName,
                    address = stud.address,
                    email = stud.email,
                    mobileNumber = stud.mobileNumber,
                    education = stud.education,
                    collage = stud.collage,
                    course = stud.course,
                    joinDate = stud.joinDate,
                    endDate = stud.endDate,
                    paidFees = stud.paidFees,
                    remainingFees = stud.remainingFees,
                });
            }
            return Ok(studentDto);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var studentDomain = dbcontext.Students.Find(id);
            if (studentDomain == null)
            {
                return NotFound();
            }

            var studentDto = new StudentdataDto()
            {
                id = studentDomain.id,
                s_firstName = studentDomain.s_firstName,
                s_lastName= studentDomain.s_lastName,
                address = studentDomain.address,
                email = studentDomain.email,
                mobileNumber = studentDomain.mobileNumber,
                education=studentDomain.education,
                collage=studentDomain.collage,
                course=studentDomain.course,
                joinDate = studentDomain.joinDate,
                endDate = studentDomain.endDate,
                paidFees=studentDomain.paidFees,
                remainingFees=studentDomain.remainingFees,
            };
            return Ok(studentDto);
        }

        [HttpPost]
        public async Task<IActionResult> create([FromBody] AddStudentdataDto addStudentdataDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var studentDomain = new StudentData()
            {
                s_firstName= addStudentdataDto.s_firstName,
                s_lastName= addStudentdataDto.s_lastName,
                address = addStudentdataDto.address,
                email = addStudentdataDto.email,
                mobileNumber= addStudentdataDto.mobileNumber,
                education = addStudentdataDto.education,
                collage = addStudentdataDto.collage,
                course = addStudentdataDto.course,
                joinDate=addStudentdataDto.joinDate,
                endDate = addStudentdataDto.endDate,
                paidFees=addStudentdataDto.paidFees,
                remainingFees=addStudentdataDto.remainingFees,
            };

            await dbcontext.Students.AddAsync(studentDomain);
            await dbcontext.SaveChangesAsync();

            //Domain to dto
            var studentDto = new StudentdataDto()
            {
                id = studentDomain.id,
                s_firstName = studentDomain.s_firstName,
                s_lastName = studentDomain.s_lastName,
                address = studentDomain.address,
                email = studentDomain.email,
                mobileNumber = studentDomain.mobileNumber,
                education = studentDomain.education,
                collage = studentDomain.collage,
                course = studentDomain.course,
                joinDate = studentDomain.joinDate,
                endDate = studentDomain.endDate,
                paidFees = studentDomain.paidFees,
                remainingFees = studentDomain.remainingFees,
            };
            return CreatedAtAction(nameof(GetAll), new { id = studentDto.id }, studentDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> update(Guid id, [FromBody] AddStudentdataDto addStudentdataDto)
        {
            var studentDomain = dbcontext.Students.Find(id);
            if (studentDomain == null)
            {
                return NotFound();
            }
            studentDomain.s_firstName = addStudentdataDto.s_firstName;
            studentDomain.s_lastName = addStudentdataDto.s_lastName;
            studentDomain.address = addStudentdataDto.address;
            studentDomain.email = addStudentdataDto.email;
            studentDomain.mobileNumber = addStudentdataDto.mobileNumber;
            studentDomain.education = addStudentdataDto.education;
            studentDomain.collage = addStudentdataDto.collage;
            studentDomain.course = addStudentdataDto.course;
            studentDomain.joinDate = addStudentdataDto.joinDate;
            studentDomain.endDate = addStudentdataDto.endDate;
            studentDomain.paidFees = addStudentdataDto.paidFees;
            studentDomain.remainingFees = addStudentdataDto.remainingFees;

            dbcontext.SaveChanges();
            return Ok(studentDomain);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> delete(Guid id)
        {
            var studentData = dbcontext.Students.FirstOrDefault(x => x.id == id);

            if (studentData == null)
            {
                return NotFound();
            }
            dbcontext.Students.Remove(studentData);
            dbcontext.SaveChanges();
            return Ok(studentData);
        }

    }
}

