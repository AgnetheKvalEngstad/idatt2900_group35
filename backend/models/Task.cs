namespace backend.models;

public class Task
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    
    public bool IsDone { get; set; } = false;
    
    //Foreign Key to Topic
    public int TopicId { get; set; }
    public Topic Topic { get; set; } = null!;
    
}