namespace backend.models;

public class Bonus
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int PointsNeeded { get; set; }
}