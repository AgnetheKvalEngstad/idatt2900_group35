namespace backend.models;

public class Bonus
{
    /// <summary>
    /// Entity that represents a bonus that can be earned by achieving a certain amount of points.
    /// </summary>
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int PointsNeeded { get; set; }
}