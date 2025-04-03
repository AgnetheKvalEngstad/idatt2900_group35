using backend.dto;

namespace backend.services
{

    public interface IReasonService
    {
        Task<IEnumerable<ReasonDto>> GetAllReasonsAsync();
        Task<ReasonDto?> GetReasonByIdAsync(int id);
        Task<ReasonDto> CreateReasonAsync(ReasonDto reasonDto);
        Task UpdateReasonAsync(ReasonDto reasonDto);
        Task DeleteReasonAsync(int id);
        
    }
}