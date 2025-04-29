using System.ComponentModel.DataAnnotations;

namespace backend.models;

public class Question
{
    public int Id { get; set; }
    
    [MaxLength(1000)]
    public string QuestionText { get; set; } = null!;
    
    [MaxLength(1000)]
    public string? CorrectAnswer { get; set; }
    
    [MaxLength(1000)]
    public string? Options { get; set; }
    
    [MaxLength(1000)]
    public string? CorrectOption { get; set; }
    
    //Foreign Key to Task
    public int TaskId { get; set; }
    public Task Task { get; set; } = null!;
}