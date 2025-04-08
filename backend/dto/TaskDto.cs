namespace backend.dto;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public bool IsDone { get; set; } = false;
    public int TopicId { get; set; }
}