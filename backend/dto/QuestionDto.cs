namespace backend.dto;

public class QuestionDto
{
    /// <summary>
    /// DTO class for Question
    /// </summary>
    
    public int Id { get; set; }
    public string QuestionText { get; set; } = null!;
    public string? CorrectAnswer { get; set; }
    public List<string>? Options { get; set; }
    public string? CorrectOption { get; set; }
}