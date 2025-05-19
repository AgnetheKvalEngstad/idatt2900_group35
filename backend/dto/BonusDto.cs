namespace backend.dto;

public class BonusDto
{
    /// <summary>
    /// DTO class for Bonus
    /// </summary>
    
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public int PointsNeeded { get; set; }
}