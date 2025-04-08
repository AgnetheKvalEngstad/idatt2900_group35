namespace backend.dto;

public class ProgressDto
{
    public int Id { get; set; }
    public double ProgressPercentage { get; set; }
    public int TopicId { get; set; }
    public int UserId { get; set; }
}