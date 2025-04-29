namespace backend.dto;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string TaskContent { get; set; } = null!;
    public bool IsDone { get; set; } = false;
    public int TopicId { get; set; }
    public string TaskType { get; set; } = null!;
    public List<QuestionDto>? Questions { get; set; } = new List<QuestionDto>();
    public int MaximumPoints { get; set; }
    public int AchievedPoints { get; set; }
}