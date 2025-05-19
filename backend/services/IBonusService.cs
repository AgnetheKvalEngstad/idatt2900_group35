using backend.dto;

namespace backend.services;

/// <summary>
/// Interface for managing bonuses
/// </summary>
public interface IBonusService
{
    Task<IEnumerable<BonusDto>> GetAllBonusesAsync();
    Task<BonusDto?> GetBonusByIdAsync(int id);
    Task<BonusDto> CreateBonusAsync(BonusDto bonusDto);
    Task UpdateBonusAsync(BonusDto bonusDto);
    Task DeleteBonusAsync(int id);
    
}