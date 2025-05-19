using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class User
{
    /// <summary>
    /// Entity that represents a user in the system
    /// </summary>
    public int Id { get; set; }
    
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
    public ICollection<int> TopicIds { get; set; } = new List<int>();

    [NotMapped]
    public int AllUserPoints => Topics.Sum(t => t.Task?.AchievedPoints ?? 0);

}