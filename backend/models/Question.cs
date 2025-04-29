using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

    [NotMapped]
    public int Points => Task.TaskType switch
    {
        "TrueFalse" => 10,
        "MultipleChoice" => 20,
        "Input" => 30,
    };
    
    //Foreign Key to Task
    public int TaskId { get; set; }
    public Task Task { get; set; } = null!;
}