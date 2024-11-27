using Attendence_system.Context;
using Attendence_system.Model.Domain;
using Attendence_system.Model.dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendence_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BatchMasterController:ControllerBase
    {
        private readonly Object dbContext;
        private readonly AttendenceSystem dbcontext;

        public BatchMasterController(AttendenceSystem dbcontext)
        {
            this.dbcontext = dbcontext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var batchDomain = await dbcontext.Batch.ToListAsync();
            var batchDto = new List<BatchMasterDto>();

            foreach (var batch in batchDomain)
            {
                batchDto.Add(new BatchMasterDto
                {
                   id = batch.id,
                   name = batch.name,
                    trainer = batch.trainer,
                   startDate = batch.startDate,
                   endDate = batch.endDate,
                    course = batch.course,


                });
            }
            return Ok(batchDto);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var batchDomain = dbcontext.Batch.Find(id);
            if (batchDomain == null)
            {
                return NotFound();
            }

            var batchDto = new BatchMasterDto()
            {
               id = batchDomain.id,
               name = batchDomain.name,
                trainer = batchDomain.trainer,
               startDate = batchDomain.startDate,
               endDate = batchDomain.endDate,
                course = batchDomain.course,
               

            };
            return Ok(batchDto);
        }

        [HttpPost]
        public async Task<IActionResult> creates([FromBody] AddBatchMasterDto addBatchMasterDto)
        {
            var batchDomain = new Batch_Master()
            {
                name = addBatchMasterDto.name,
                trainer = addBatchMasterDto.trainer,
                startDate = addBatchMasterDto.startDate,
                endDate = addBatchMasterDto.endDate,
                course = addBatchMasterDto.course,
            };

            await dbcontext.Batch.AddAsync(batchDomain);
            await dbcontext.SaveChangesAsync();

            //Domain to dto
            var batchDto = new BatchMasterDto()
            {
                id = batchDomain.id,
                name = batchDomain.name,
                trainer = batchDomain.trainer,
                startDate = batchDomain.startDate,
                endDate = batchDomain.endDate,
                course = batchDomain.course,
            };
            return CreatedAtAction(nameof(GetAll), new { id = batchDto.id }, batchDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> update(Guid id, [FromBody] AddBatchMasterDto addBatchMasterDto)
        {
            var batchDomain = dbcontext.Batch.Find(id);
            if (batchDomain == null)
            {
                return NotFound();
            }
           batchDomain.name = addBatchMasterDto.name;
           batchDomain.trainer = addBatchMasterDto.trainer;
           batchDomain.startDate = addBatchMasterDto.startDate;
           batchDomain.endDate = addBatchMasterDto.endDate;
           batchDomain.course = addBatchMasterDto.course;

            dbcontext.SaveChanges();
            return Ok(batchDomain);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> deletes(Guid id)
        {
            var batchMaster = dbcontext.Batch.FirstOrDefault(x => x.id == id);

            if (batchMaster == null)
            {
                return NotFound();
            }
            dbcontext.Batch.Remove(batchMaster);
            dbcontext.SaveChanges();
            return Ok(batchMaster);
        }

    }

}
