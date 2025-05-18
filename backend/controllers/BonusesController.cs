using backend.dto;
using backend.services;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers;

/// <summary>
/// Controller for managing bonuses
/// </summary>
/// <param name="bonusService"></param>

[ApiController]
[Route("[controller]")]
public class BonusesController(IBonusService bonusService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BonusDto>>> GetBonuses()
    {
        var bonuses = await bonusService.GetAllBonusesAsync();
        return Ok(bonuses);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<BonusDto>> GetBonus(int id)
    {
        var bonus = await bonusService.GetBonusByIdAsync(id);
        if (bonus == null)
        {
            return NotFound();
        }
        return Ok(bonus);
    }
    
    [HttpPost]
    public async Task<ActionResult<BonusDto>> CreateBonus(BonusDto bonusDto)
    {
        var createdBonus = await bonusService.CreateBonusAsync(bonusDto);
        return CreatedAtAction(nameof(GetBonus), new { id = createdBonus.Id }, createdBonus);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<BonusDto>> UpdateBonus(int id, BonusDto bonusDto)
    {
        if (id != bonusDto.Id)
        {
            return BadRequest();
        }
        await bonusService.UpdateBonusAsync(bonusDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<BonusDto>> DeleteBonus(int id)
    {
        await bonusService.DeleteBonusAsync(id);
        return NoContent();
    }

}
    