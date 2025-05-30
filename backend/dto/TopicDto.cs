using backend.models;

namespace backend.dto;

public class TopicDto
{
    /// <summary>
    /// DTO class for Topic
    /// </summary>
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string SkillLevel { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int UserId { get; set; }
    public string TaskType { get; set; } = null!;
    public int TaskId { get; set; }
    public int SubtopicId { get; set; }
    public int ReasonId { get; set; }
    
}