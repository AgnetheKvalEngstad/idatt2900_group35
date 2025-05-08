using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class User
{
    public int Id { get; set; }
    
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
    public ICollection<int> TopicIds { get; set; } = new List<int>();

    [NotMapped]
    public int AllUserPoints => Topics.Sum(t => t.Task?.AchievedPoints ?? 0);

}