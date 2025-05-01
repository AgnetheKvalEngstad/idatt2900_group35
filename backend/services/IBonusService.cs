using backend.dto;

namespace backend.services;

public interface IBonusService
{
    Task<IEnumerable<BonusDto>> GetAllBonusesAsync();
    Task<BonusDto?> GetBonusByIdAsync(int id);
    Task<BonusDto> CreateBonusAsync(BonusDto bonusDto);
    Task UpdateBonusAsync(BonusDto bonusDto);
    Task DeleteBonusAsync(int id);
    
}