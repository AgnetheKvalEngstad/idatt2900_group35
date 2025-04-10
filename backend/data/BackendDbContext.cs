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
            new Topic { Id = 1, Title = "Lag et sikkert passord", SkillLevel = "Beginner", UserId = 1},
            new Topic { Id = 2, Title = "Farlige lenker", SkillLevel = "Intermediate", UserId = 1},
            new Topic { Id = 3, Title = "Velg trygge nettsider", SkillLevel = "Expert", UserId = 1}
        );

        modelBuilder.Entity<Subtopic>().HasData(
            new Subtopic { Id = 1, Title = "Hvordan lage et sikkert passord", 
                SubtopicContent = "Passord er sikre når de er xyz", IsRead = false, TopicId = 1 },
            new Subtopic { Id = 2, Title = "Hvordan gjenkjenne farlige lenker", 
                SubtopicContent = "Lenken har firmaets faktiske navn og ingen rare tegn", IsRead = false, TopicId = 2 },
            new Subtopic { Id = 3, Title = "Hvordan velge trygge nettsider", 
                SubtopicContent = "Velg nettsider med gode lenker, sjekk browser", IsRead = false, TopicId = 3 }
        );

        modelBuilder.Entity<Task>().HasData(
            new Task { Id = 1, Title = "Er dette trygge passord?", TaskContent = "Content",IsDone = false, 
                TopicId = 1, TaskType = TaskType.TrueFalse.ToString()},
            new Task { Id = 2, Title = "Hvilke av lenkene er trygge?", TaskContent = "Content",IsDone = false, 
                TopicId = 2, TaskType = TaskType.MultipleChoice.ToString()},
            new Task { Id = 3, Title = "Hva med denne nettsiden er utrygt", TaskContent = "Content",IsDone = false, 
                TopicId = 3, TaskType = TaskType.Input.ToString()}
        );

        modelBuilder.Entity<Reason>().HasData(
            new Reason { Id = 1, ReasonTitle = "Hvorfor er det viktig med et godt passord?", 
                ReasonContent = "Et godt passord vil holde din informasjon trygg", IsRead = false, TopicId = 1 },
            new Reason { Id = 2, ReasonTitle = "Hvorfor er det viktig å gjenkjenne farlige lenker?", 
                ReasonContent = "Ved å kunne gjenkjenne farlige lenker, kan du tryggere navigere nettet",
                IsRead = false, TopicId = 2 },
            new Reason { Id = 3, ReasonTitle = "Hvorfor er det viktig å velge trygge nettsider?", 
                ReasonContent = "Utrygge nettsider ", IsRead = false, TopicId = 3 }
            
        );

        modelBuilder.Entity<Progress>().HasData(
            new Progress { Id = 1, ProgressPercentage = 0.5, TopicId = 1, UserId = 1 }
        );
    }

    //Connection string to the database
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }
    
    
}