namespace backend.data;
using Microsoft.EntityFrameworkCore;
using backend.models;

public class BackendDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    //Constructor
    public BackendDbContext(DbContextOptions<BackendDbContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }
    
    //Define the tables
    public DbSet<User> Users { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<Subtopic> Subtopics { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Reason> Reasons { get; set; }
    public DbSet<Progress> Progresses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //User has several topics
        modelBuilder.Entity<User>()
            .HasMany(u => u.Topics)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId);
        
        //Topic has one to one with subtopic, task, reason and progress
        modelBuilder.Entity<Topic>()
            .HasOne(t => t.Subtopic)
            .WithOne(s => s.Topic)
            .HasForeignKey<Subtopic>(s => s.TopicId);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Task)
            .WithOne(t => t.Topic)
            .HasForeignKey<Task>(t =>t.TopicId);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Reason)
            .WithOne(r => r.Topic)
            .HasForeignKey<Reason>(r => r.TopicId);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Progress)
            .WithOne(p => p.Topic)
            .HasForeignKey<Progress>(p => p.TopicId);
        
        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1 }
        );

        modelBuilder.Entity<Topic>().HasData(
            new Topic { Id = 1, Title = "Sample Topic", SkillLevel = "Beginner", UserId = 1 }
        );

        modelBuilder.Entity<Subtopic>().HasData(
            new Subtopic { Id = 1, Title = "Sample Subtopic", SubtopicContent = "Content", IsRead = false, TopicId = 1 }
        );

        modelBuilder.Entity<Task>().HasData(
            new Task { Id = 1, Title = "Sample Task", IsDone = false, TopicId = 1 }
        );

        modelBuilder.Entity<Reason>().HasData(
            new Reason { Id = 1, ReasonTitle = "Sample Reason", ReasonContent = "Content", IsRead = false, TopicId = 1 }
        );

        modelBuilder.Entity<Progress>().HasData(
            new Progress { Id = 1, UserId = 1, TopicId = 1, ProgressPercentage = 0.5}
        );
    }

    //Configure the connection string to the database
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }
    
    
}