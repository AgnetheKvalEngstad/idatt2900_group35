using backend.dto;
using backend.models;
using backend.repositories;

namespace backend.services;

public class BonusService(IRepository<Bonus> bonusRepository) : IBonusService
{
    //Get all bonuses
    public async Task<IEnumerable<BonusDto>> GetAllBonusesAsync()
    {
        var bonuses = await bonusRepository.GetAllAsync();
        return bonuses.Select(b => new BonusDto
        {
            Id = b.Id,
            Title = b.Title,
            Description = b.Description,
            Icon = b.Icon,
            PointsNeeded = b.PointsNeeded
        });
    }
    
    //Get bonus by id
    public async Task<BonusDto?> GetBonusByIdAsync(int id)
    {
        var bonus = await bonusRepository.GetByIdAsync(id);
        if (bonus == null)
        {
            throw new KeyNotFoundException($"Bonus with id {id} not found");
        }

        return new BonusDto()
        {
            Id = bonus.Id,
            Title = bonus.Title,
            Description = bonus.Description,
            Icon = bonus.Icon,
            PointsNeeded = bonus.PointsNeeded
        };
    }
    
    //Create bonus
    public async Task<BonusDto> CreateBonusAsync(BonusDto bonusDto)
    {
        var bonus = new Bonus
        {
            Title = bonusDto.Title,
            Description = bonusDto.Description,
            Icon = bonusDto.Icon,
            PointsNeeded = bonusDto.PointsNeeded
        };
        await bonusRepository.AddAsync(bonus);
        bonusDto.Id = bonus.Id;
        return bonusDto;
    }
    
    //Update bonus
    public async System.Threading.Tasks.Task UpdateBonusAsync(BonusDto bonusDto)
    {
        var bonus = await bonusRepository.GetByIdAsync(bonusDto.Id);
        
        if (bonus == null)
        {
            throw new KeyNotFoundException($"Bonus with id {bonusDto.Id} not found");
        }
        
        bonus.Title = bonusDto.Title;
        bonus.Description = bonusDto.Description;
        bonus.Icon = bonusDto.Icon;
        bonus.PointsNeeded = bonusDto.PointsNeeded;
        
        await bonusRepository.UpdateAsync(bonus);
    }
    
    //Delete bonus
    public async System.Threading.Tasks.Task DeleteBonusAsync(int id)
    {
        var bonus = await bonusRepository.GetByIdAsync(id);
        
        if (bonus == null)
        {
            throw new KeyNotFoundException($"Bonus with id {id} not found");
        }
        
        bonusRepository.Remove(bonus);
    }
}