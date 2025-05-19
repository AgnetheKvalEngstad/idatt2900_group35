namespace backend.dto;

public class SubtopicDto
{
    /// <summary>
    /// DTO class for Subtopic
    /// </summary>
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string SubtopicContent { get; set; } = null!;
    public bool IsRead { get; set; }
    public int TopicId { get; set; }
}