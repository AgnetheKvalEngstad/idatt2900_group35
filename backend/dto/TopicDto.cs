namespace backend.dto;

public class TopicDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string SkillLevel { get; set; } = null!;
    public int UserId { get; set; }
    public string User { get; set; } = null!;
    public string Subtopic { get; set; } = null!;
    public string Task { get; set; } = null!;
    public string Reason { get; set; } = null!;
    public string Progress { get; set; } = null!;
    
}