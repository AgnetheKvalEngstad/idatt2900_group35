using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

public class Topic
{
    /// <summary>
    /// Entity that represents a topic, which is a collection of subtopics, tasks, and reasons.
    /// Is also connected to a user.
    /// </summary>
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