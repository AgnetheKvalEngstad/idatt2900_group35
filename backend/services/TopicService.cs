using backend.dto;
using backend.models;
using backend.repositories;

namespace backend.services
{

    public class TopicService(IRepository<Topic> topicRepository) : ITopicService
    {
        
        //Get all topics
        public async Task<IEnumerable<TopicDto>> GetAllTopicsAsync()
        {
            var topics = await topicRepository.GetAllAsync();
            return topics.Select(t => new TopicDto
            {
                Id = t.Id,
                Title = t.Title,
                SkillLevel = t.SkillLevel,
                UserId = t.UserId
            });   
        }
        
        
        //Get topic by id
        public async Task<TopicDto?> GetTopicByIdAsync(int id)
        {
            var topic = await topicRepository.GetByIdAsync(id);
            if(topic == null)
            {
                throw new KeyNotFoundException($"Topic with id {id} not found");
            }

            return new TopicDto
            {
                Id = topic.Id,
                Title = topic.Title,
                SkillLevel = topic.SkillLevel,
                UserId = topic.UserId
            };
        }
        
        //Create topics
        public async Task<TopicDto> CreateTopicAsync(TopicDto topicDto)
        {
            var topic = new Topic
            {
                Id = topicDto.Id,
                Title = topicDto.Title,
                SkillLevel = topicDto.SkillLevel,
                UserId = topicDto.UserId
            };
            await topicRepository.AddAsync(topic);
            topicDto.Id = topic.Id;
            return topicDto;
        }
        
        //Update topic
        public async System.Threading.Tasks.Task UpdateTopicAsync(TopicDto topicDto)
        {
         var topic = await topicRepository.GetByIdAsync(topicDto.Id);
         if(topic == null)
         {
             throw new KeyNotFoundException($"Topic with id {topicDto.Id} not found");
         }
         
         topic.Title = topicDto.Title;
         topic.SkillLevel = topicDto.SkillLevel;
         topic.UserId = topicDto.UserId;
         await topicRepository.UpdateAsync(topic);
        }
        
        //Delete topic
        public async System.Threading.Tasks.Task DeleteTopicAsync(int id)
        {
            var topic = await topicRepository.GetByIdAsync(id);
            if (topic == null)
            {
                throw new KeyNotFoundException($"Topic with id {id} not found");
            }
            topicRepository.Remove(topic);
        }
        
        
    }
}