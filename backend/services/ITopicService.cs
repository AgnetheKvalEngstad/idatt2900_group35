using backend.dto;

namespace backend.services;

public interface ITopicService
{
    Task<IEnumerable<TopicDto>> GetAllTopicsAsync();
    Task<TopicDto?> GetTopicByIdAsync(int id);
    Task<TopicDto> CreateTopicAsync(TopicDto topicDto);
    Task UpdateTopicAsync(TopicDto topicDto);
    Task DeleteTopicAsync(int id);
}