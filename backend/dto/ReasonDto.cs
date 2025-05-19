namespace backend.dto;

public class ReasonDto
{
    /// <summary>
    /// DTO class for Reason
    /// </summary>
    public int Id { get; set; }
    public string ReasonTitle { get; init; } = null!;
    public string ReasonContent { get; set; } = null!;
    public bool IsRead { get; set; }
    public int TopicId { get; init; }
}