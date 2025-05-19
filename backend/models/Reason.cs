using System.ComponentModel.DataAnnotations;

namespace backend.models;

public class Reason
{
    /// <summary>
    /// Entity that represents a reason for a topic
    /// </summary>
    public int Id { get; init; }
    
    [MaxLength(500)]
    public string ReasonTitle { get; set; } = null!;
    
    [MaxLength(2000)]
    public string ReasonContent { get; set; } = null!;
    
    public bool IsRead { get; set; }
    
    //Foreign Key to Topic
    public int TopicId { get; init; }
    public Topic Topic { get; init; } = null!;
    
}