using backend.dto;
namespace backend.services
{

    public interface ISubtopicService
    {
        Task<IEnumerable<SubtopicDto>> GetAllSubtopicsAsync();
        Task<SubtopicDto?> GetSubtopicByIdAsync(int id);
        Task<SubtopicDto> CreateSubtopicAsync(SubtopicDto subtopicDto);
        Task UpdateSubtopicAsync(SubtopicDto subtopicDto);
        Task DeleteSubtopicAsync(int id);
    }
}