using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class Topic
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Title { get; set; } = null!;
   
    [MaxLength(100)]
    public string SkillLevel { get; set; } = null!;
    
    [MaxLength(100)]
    public string Icon { get; set; } = null!;
    
    //Relations
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public Subtopic Subtopic { get; set; } = null!;
    public Task Task { get; set; } = null!;
    public Reason Reason { get; set; } = null!;
}