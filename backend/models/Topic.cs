namespace backend.models;

public class Topic
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string SkillLevel { get; set; } = null!;
    
    //Relations
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public Subtopic Subtopic { get; set; } = null!;
    public Task Task { get; set; } = null!;
    public Reason Reason { get; set; } = null!;
    public Progress Progress { get; set; } = null!;
    


}