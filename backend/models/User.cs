namespace backend.models;

public class User
{
    public int Id { get; set; }
    
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
    
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
    
    public int AllUserPoints => Tasks.Sum(t => t.AchievedPoints);
}