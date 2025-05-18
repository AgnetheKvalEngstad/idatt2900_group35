using backend.dto;
using backend.models;
using backend.repositories;

namespace backend.services
{
    /// <summary>
    /// Service for managing reasons
    /// </summary>
    /// <param name="reasonRepository"></param>

    public class ReasonService(IRepository<Reason> reasonRepository) : IReasonService
    {

        //Get all reasons
        public async Task<IEnumerable<ReasonDto>> GetAllReasonsAsync()
        { 
            var reasons = await reasonRepository.GetAllAsync();
            return reasons.Select(r => new ReasonDto
            {
                Id = r.Id,
                ReasonTitle = r.ReasonTitle,
                ReasonContent = r.ReasonContent,
                IsRead = r.IsRead,
                TopicId = r.TopicId
            });
        }

        //Get reason by id
        public async Task<ReasonDto?> GetReasonByIdAsync(int id)
        {
            var reason = await reasonRepository.GetByIdAsync(id);
            if (reason == null)
            {
                throw new KeyNotFoundException($"Reason with id {id} not found");
            }
            return new ReasonDto() 
            {
                Id = reason.Id,
                ReasonTitle = reason.ReasonTitle,
                ReasonContent = reason.ReasonContent,
                IsRead = reason.IsRead,
                TopicId = reason.TopicId
            };
        }

        //Create reason
        public async Task<ReasonDto> CreateReasonAsync(ReasonDto reasonDto)
        {
            var reason = new Reason
            {
                Id = reasonDto.Id,
                ReasonTitle = reasonDto.ReasonTitle,
                ReasonContent = reasonDto.ReasonContent,
                IsRead = reasonDto.IsRead,
                TopicId = reasonDto.TopicId
            };
            await reasonRepository.AddAsync(reason);
            reasonDto.Id = reason.Id;
            return reasonDto;
        }
        
        //Update reason
        public async System.Threading.Tasks.Task UpdateReasonAsync(ReasonDto reasonDto)
        {
            var reason = await reasonRepository.GetByIdAsync(reasonDto.Id);
            if (reason == null)
            {
                throw new KeyNotFoundException($"Reason with ID {reasonDto.Id} not found.");
            }

            reason.ReasonTitle = reasonDto.ReasonTitle;
            reason.ReasonContent = reasonDto.ReasonContent;
            reason.IsRead = reasonDto.IsRead;
            await reasonRepository.UpdateAsync(reason);
        }
        
        //Delete reason
        public async System.Threading.Tasks.Task DeleteReasonAsync(int id)
        {
            var reason = await reasonRepository.GetByIdAsync(id);
            if (reason == null)
            {
                throw new KeyNotFoundException($"Reason with ID {id} not found.");
            }
            reasonRepository.Remove(reason);
        }
        
    }
}
