using backend.dto;
using backend.models;
using backend.repositories;

namespace backend.services
{
    public class SubtopicService(IRepository<Subtopic> subtopicRepository) : ISubtopicService
    {
        
        //Get all subtopics
        public async Task<IEnumerable<SubtopicDto>> GetAllSubtopicsAsync()
        {
            var subtopics = await subtopicRepository.GetAllAsync();
            return subtopics.Select(s => new SubtopicDto()
            {
                Id = s.Id,
                Title = s.Title,
                SubtopicContent = s.SubtopicContent,
                IsRead = s.IsRead,
                TopicId = s.TopicId
            });
        }
        
        //Get subtopic by id
        public async Task<SubtopicDto?> GetSubtopicByIdAsync(int id)
        {
            var subtopic = await subtopicRepository.GetByIdAsync(id);
            if (subtopic == null)
            {
                throw new KeyNotFoundException($"Subtopic with id {id} not found");
            }
            return new SubtopicDto()
            {
                Id = subtopic.Id,
                Title = subtopic.Title,
                SubtopicContent = subtopic.SubtopicContent,
                IsRead = subtopic.IsRead,
                TopicId = subtopic.TopicId
            };
        }
        
        //Create subtopic
        public async Task<SubtopicDto> CreateSubtopicAsync(SubtopicDto subtopicDto)
        {
            var subtopic = new Subtopic
            {
                Title = subtopicDto.Title,
                SubtopicContent = subtopicDto.SubtopicContent,
                IsRead = subtopicDto.IsRead,
                TopicId = subtopicDto.TopicId
            };
            await subtopicRepository.AddAsync(subtopic);
            subtopicDto.Id = subtopic.Id;
            return subtopicDto;
        }
        
        //Update subtopic
        public async System.Threading.Tasks.Task UpdateSubtopicAsync(SubtopicDto subtopicDto)
        {
            var subtopic = await subtopicRepository.GetByIdAsync(subtopicDto.Id);
            if (subtopic == null)
            {
                throw new KeyNotFoundException($"Subtopic with id {subtopicDto.Id} not found");
            }
            subtopic.Title = subtopicDto.Title;
            subtopic.SubtopicContent = subtopicDto.SubtopicContent;
            subtopic.IsRead = subtopicDto.IsRead;
            subtopic.TopicId = subtopicDto.TopicId;
            await subtopicRepository.UpdateAsync(subtopic);
        }
        
        //Delete subtopic
        public async System.Threading.Tasks.Task DeleteSubtopicAsync(int id)
        {
            var subtopic = await subtopicRepository.GetByIdAsync(id);
            if (subtopic == null)
            {
                throw new KeyNotFoundException($"Subtopic with id {id} not found");
            }
            subtopicRepository.Remove(subtopic);
        }
        
    }
}
