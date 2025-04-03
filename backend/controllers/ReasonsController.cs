using Microsoft.AspNetCore.Mvc;
using backend.services;
using backend.dto;

namespace backend.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReasonsController(IReasonService reasonService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReasonDto>>> GetReasons()
        {
            var reasons = await reasonService.GetAllReasonsAsync();
            return Ok(reasons);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ReasonDto>> GetReason(int id)
        {
            var reason = await reasonService.GetReasonByIdAsync(id);
            if (reason == null)
            {
                return NotFound();
            }
            return Ok(reason);
        }
        
        [HttpPost]
        public async Task<ActionResult<ReasonDto>> CreateReason(ReasonDto reasonDto)
        {
            var createdReason = await reasonService.CreateReasonAsync(reasonDto);
            return CreatedAtAction(nameof(GetReason), new { id = createdReason.Id }, createdReason);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReason(int id, ReasonDto reasonDto)
        {
            if (id != reasonDto.Id)
            {
                return BadRequest();
            }
            await reasonService.UpdateReasonAsync(reasonDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReason(int id)
        {
            await reasonService.DeleteReasonAsync(id);
            return NoContent();
        }
    }
}