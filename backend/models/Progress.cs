namespace backend.models;

public class Progress
{
    public int Id { get; init; }
    public double ProgressPercentage { get; set; }
    
    //Foreign Keys
    public int UserId { get; set; }
    public User User { get; init; } = null!;
    
    
    //Foreign Keys
    public int TopicId { get; init; }
    public Topic Topic { get; set; } = null!;
    
}