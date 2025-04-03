using backend.dto;
using backend.models;
using backend.repositories;
using Task = System.Threading.Tasks.Task;

namespace backend.services
{

    public class ProgressService(IRepository<Progress> progressRepository) : IProgressService
    {
        //Get all progresses
        public async Task<IEnumerable<ProgressDto>> GetAllProgressesAsync()
        { 
            var progresses = await progressRepository.GetAllAsync();
            return progresses.Select(p => new ProgressDto
            {
                Id = p.Id,
                ProgressPercentage = p.ProgressPercentage
            });
        }

        //Get progress by id
        public async Task<ProgressDto?> GetProgressByIdAsync(int id)
        {
            var progress = await progressRepository.GetByIdAsync(id);
            if(progress == null)
            {
                throw new KeyNotFoundException($"Progress with id {id} not found");
            }
            return new ProgressDto() 
            {
                Id = progress.Id,
                ProgressPercentage = progress.ProgressPercentage
            };
        }

        //Create progress
        public async Task<ProgressDto> CreateProgressAsync(ProgressDto progressDto)
        {
            var progress = new Progress
            {
                ProgressPercentage = progressDto.ProgressPercentage
            };
            await progressRepository.AddAsync(progress);
            progressDto.Id = progress.Id;
            return progressDto;
        }

        //Update progress
        public async Task UpdateProgressAsync(ProgressDto progressDto)
        {
            var progress = await progressRepository.GetByIdAsync(progressDto.Id);
            if(progress == null)
            {
                throw new KeyNotFoundException($"Progress with id {progressDto.Id} not found");
            }
            progress.ProgressPercentage = progressDto.ProgressPercentage;
            await progressRepository.UpdateAsync(progress);
        }

        public async Task DeleteProgressAsync(int id)
        {
            var progress = await progressRepository.GetByIdAsync(id);
            if(progress == null)
            {
                throw new KeyNotFoundException($"Progress with id {id} not found");
            }
            progressRepository.Remove(progress);
        }
    }
}