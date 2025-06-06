using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class Task
{
    /// <summary>
    /// Entity that represents a task that can be assigned to a topic
    /// </summary>
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
    
    [NotMapped]
    public int MaximumPoints => Questions.Sum(q => q.Points);

    public int AchievedPoints { get; set; } = 0;
    
    //Foreign Key to Topic
    public int TopicId { get; set; }
    public Topic Topic { get; set; } = null!;
    
}