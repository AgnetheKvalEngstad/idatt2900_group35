using backend.dto;

namespace backend.services
{

    public interface IProgressService
    {
        Task<IEnumerable<ProgressDto>> GetAllProgressesAsync();
        Task<ProgressDto?> GetProgressByIdAsync(int id);
        Task<ProgressDto> CreateProgressAsync(ProgressDto progressDto);
        Task UpdateProgressAsync(ProgressDto progressDto);
        Task DeleteProgressAsync(int id);

    }
}