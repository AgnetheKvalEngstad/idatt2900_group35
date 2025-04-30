using backend.data;
using backend.dto;
using backend.models;
using backend.repositories;
using Microsoft.EntityFrameworkCore;


namespace backend.services
{

    public class TopicService : ITopicService
    {
        private readonly IRepository<Topic> _topicRepository;
        private readonly BackendDbContext _context;

        public TopicService(IRepository<Topic> topicRepository, BackendDbContext context)
        {
            _topicRepository = topicRepository;
            _context = context;
        }
        
        //Get all topics
        public async Task<IEnumerable<TopicDto>> GetAllTopicsAsync()
        {
            var topics = await _context.Topics
                .Include(t => t.Task)
                .Include(t => t.Subtopic)
                .Include(t => t.Reason)
                .ToListAsync();
            
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
            var topic = await _context.Topics.Include(t => t.Task)
                .Include(t => t.Subtopic)
                .Include(t => t.Reason)
                .FirstOrDefaultAsync(t => t.Id == id);
            
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
            var task = topicDto.TaskId > 0? await _context.Tasks.FindAsync(topicDto.TaskId) : null;
            var subtopic = topicDto.SubtopicId > 0? await _context.Subtopics.FindAsync(topicDto.SubtopicId) : null;
            var reason = topicDto.ReasonId > 0? await _context.Reasons.FindAsync(topicDto.ReasonId) : null;
            
            //TODO: Fix null handling
            var topic = new Topic
            {
                Id = topicDto.Id,
                Title = topicDto.Title,
                SkillLevel = topicDto.SkillLevel,
                Icon = topicDto.Icon,
                UserId = topicDto.UserId,
                Task = task,
                Subtopic = subtopic,
                Reason = reason
            };
            await _topicRepository.AddAsync(topic);
            topicDto.Id = topic.Id;
            return topicDto;
        }
        
        //Update topic
        public async System.Threading.Tasks.Task UpdateTopicAsync(TopicDto topicDto)
        {
         var topic = await _topicRepository.GetByIdAsync(topicDto.Id);
         if(topic == null)
         {
             throw new KeyNotFoundException($"Topic with id {topicDto.Id} not found");
         }
         
         topic.Title = topicDto.Title;
         topic.SkillLevel = topicDto.SkillLevel;
         topic.Icon = topicDto.Icon;
         topic.UserId = topicDto.UserId;
         await _topicRepository.UpdateAsync(topic);
        }
        
        //Delete topic
        public async System.Threading.Tasks.Task DeleteTopicAsync(int id)
        {
            var topic = await _topicRepository.GetByIdAsync(id);
            if (topic == null)
            {
                throw new KeyNotFoundException($"Topic with id {id} not found");
            }
            _topicRepository.Remove(topic);
        }
        
        
    }
}