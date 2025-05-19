using Microsoft.AspNetCore.Mvc;
using backend.services;
using backend.dto;

namespace backend.controllers
{
    /// <summary>
    /// Controller for managing subtopics
    /// </summary>
    /// <param name="subtopicService"></param>
    
    [ApiController]
    [Route("[controller]")]
    public class SubtopicsController(ISubtopicService subtopicService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubtopicDto>>> GetSubtopics()
        {
            var subtopics = await subtopicService.GetAllSubtopicsAsync();
            return Ok(subtopics);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<SubtopicDto>> GetSubtopic(int id)
        {
            var subtopic = await subtopicService.GetSubtopicByIdAsync(id);
            if (subtopic == null)
            {
                return NotFound();
            }
            return Ok(subtopic);
        }
        
        [HttpPost]
        public async Task<ActionResult<SubtopicDto>> CreateSubtopic(SubtopicDto subtopicDto)
        {
            var createdSubtopic = await subtopicService.CreateSubtopicAsync(subtopicDto);
            return CreatedAtAction(nameof(GetSubtopic), new { id = createdSubtopic.Id }, createdSubtopic);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSubtopic(int id, SubtopicDto subtopicDto)
        {
            if (id != subtopicDto.Id)
            {
                return BadRequest();
            }
            
            await subtopicService.UpdateSubtopicAsync(subtopicDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSubtopic(int id)
        {
            await subtopicService.DeleteSubtopicAsync(id);
            return NoContent();
        }
    }
}
