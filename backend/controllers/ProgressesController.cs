using Microsoft.AspNetCore.Mvc;
using backend.services;
using backend.dto;

namespace backend.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProgressesController(IProgressService progressService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressDto>>> GetProgresses()
        {
            var progresses = await progressService.GetAllProgressesAsync();
            return Ok(progresses);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgressDto>> GetProgress(int id)
        {
            var progress = await progressService.GetProgressByIdAsync(id);
            if (progress == null)
            {
                return NotFound();
            }
            return Ok(progress);
        }
        
        [HttpPost]
        public async Task<ActionResult<ProgressDto>> CreateProgress(ProgressDto progressDto)
        {
            var createdProgress = await progressService.CreateProgressAsync(progressDto);
            return CreatedAtAction(nameof(GetProgress), new { id = createdProgress.Id }, createdProgress);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProgressDto>> UpdateProgress(int id, ProgressDto progressDto)
        {
            if (id != progressDto.Id)
            {
                return BadRequest();
            }
            await progressService.UpdateProgressAsync(progressDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProgressDto>> DeleteProgress(int id)
        {
            await progressService.DeleteProgressAsync(id);
            return NoContent();
        }
        
    }
}