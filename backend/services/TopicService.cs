using backend.data;
using backend.dto;
using backend.models;
using backend.queries;
using backend.repositories;
using Microsoft.EntityFrameworkCore;


namespace backend.services
{

    public class TopicService(IRepository<Topic> topicRepository) : ITopicService
    {
        //Get all topics
        public async Task<IEnumerable<TopicDto>> GetAllTopicsAsync()
        {
            var topics = await topicRepository.GetAllWithQueryAsync(new TopicWithDetailsQuery().Apply);
            
            return topics.Select(t => new TopicDto
            {
                Id = t.Id,
                Title = t.Title,
                SkillLevel = t.SkillLevel,
                Icon = t.Icon,
                UserId = t.UserId,
                TaskType = t.Task?.TaskType ?? "Unknown task type",
                TaskId = t.Task?.Id ?? 0,
                SubtopicId = t.Subtopic?.Id ?? 0,
                ReasonId = t.Reason?.Id ?? 0
            });   
        }
        
        
        //Get topic by id
        public async Task<TopicDto?> GetTopicByIdAsync(int id)
        {
            var topic = await topicRepository.GetByIdWithQueryAsync(id, new TopicWithDetailsQuery().Apply);
            
            if(topic == null)
            {
                throw new KeyNotFoundException($"Topic with id {id} not found");
            }
            
            return new TopicDto
            {
                Id = topic.Id,
                Title = topic.Title,
                SkillLevel = topic.SkillLevel,
                Icon = topic.Icon,
                UserId = topic.UserId,
                TaskType = topic.Task?.TaskType ?? "Unknown task type",
                TaskId = topic.Task?.Id ?? 0,
                SubtopicId = topic.Subtopic?.Id ?? 0,
                ReasonId = topic.Reason?.Id ?? 0
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
                Icon = topicDto.Icon,
                UserId = topicDto.UserId,
                Task = topicDto.TaskId > 0 ? new models.Task { Id = topicDto.TaskId } : null,
                Subtopic = topicDto.SubtopicId > 0 ? new Subtopic { Id = topicDto.SubtopicId } : null,
                Reason = topicDto.ReasonId > 0 ? new Reason { Id = topicDto.ReasonId } : null
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
         topic.Icon = topicDto.Icon;
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