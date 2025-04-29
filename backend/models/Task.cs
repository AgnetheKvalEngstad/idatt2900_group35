using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class Task
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Title { get; set; } = null!;
    
    [MaxLength(2000)]
    public string TaskContent { get; set; } = null!;
    
    public bool IsDone { get; set; } = false;
    
    [MaxLength(100)]
    [Required]
    public string TaskType { get; set; } = null!;
    
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    
    //Foreign Key to Topic
    public int TopicId { get; set; }
    public Topic Topic { get; set; } = null!;
    
}