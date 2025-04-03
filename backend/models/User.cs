namespace backend.models;

public class User
{
    public int Id { get; set; }
    
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();

}