using System.ComponentModel.DataAnnotations;

namespace backend.models;

public class Subtopic
{
    public int Id { get; set; }
    
    [MaxLength(500)]
    public string Title { get; set; } = null!;
    
    [MaxLength(2000)]
    public string SubtopicContent { get; set; } = null!;
    
    public bool IsRead { get; set; }
    
    //Foreign Key to Topic
    public int TopicId { get; set; }
    public Topic Topic { get; set; } = null!;
}