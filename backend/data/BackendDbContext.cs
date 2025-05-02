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
    public DbSet<Question> Questions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //User has several topics
        modelBuilder.Entity<User>()
            .HasMany(u => u.Topics)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        //Topic has one to one with subtopic, task, reason and progress
        modelBuilder.Entity<Topic>()
            .HasOne(t => t.Subtopic)
            .WithOne(s => s.Topic)
            .HasForeignKey<Subtopic>(s => s.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Task)
            .WithOne(t => t.Topic)
            .HasForeignKey<Task>(t =>t.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Reason)
            .WithOne(r => r.Topic)
            .HasForeignKey<Reason>(r => r.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Topic>()
            .HasOne(t =>t.Progress)
            .WithOne(p => p.Topic)
            .HasForeignKey<Progress>(p => p.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
        
        //Tasks can have several questions
        modelBuilder.Entity<Task>()
            .HasMany(t => t.Questions)
            .WithOne(q => q.Task)
            .HasForeignKey(q => q.TaskId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Question>()
            .HasOne(q => q.Task)
            .WithMany(t => t.Questions)
            .HasForeignKey(q => q.TaskId)
            .OnDelete(DeleteBehavior.Cascade);
        
        
        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1 }
        );

        modelBuilder.Entity<Topic>().HasData(
            new Topic { Id = 1, Title = "Lag et sikkert passord", SkillLevel = "Beginner", Icon = "Lock",UserId = 1},
            new Topic { Id = 2, Title = "Farlige lenker", SkillLevel = "Intermediate", Icon = "Link", UserId = 1},
            new Topic { Id = 3, Title = "Velg trygge nettsider", SkillLevel = "Expert", Icon = "WebAsset", UserId = 1}
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
                TopicId = 1, TaskType = TaskType.TrueFalse.ToString() },
            new Task { Id = 2, Title = "Hvilke av lenkene er trygge?", TaskContent = "Content",IsDone = false, 
                TopicId = 2, TaskType = TaskType.MultipleChoice.ToString()},
            new Task { Id = 3, Title = "Hva med denne nettsiden er utrygt", TaskContent = "Content",IsDone = false, 
                TopicId = 3, TaskType = TaskType.Input.ToString()}
        );

        modelBuilder.Entity<Question>().HasData(
            new Question { Id = 1, QuestionText = "Er passord123 et bra passord?", 
                CorrectAnswer = "false", TaskId = 1 },
    
            new Question { Id = 2, QuestionText = "Er (JGAgh3)4^ecAvVC et bra passord?", 
                CorrectAnswer = "true", TaskId = 1 },
    
            new Question { Id = 3, QuestionText = "Hvilke av lenkene er trygge?", 
                Options = "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]", 
                CorrectOption = "Regjeringen.no", TaskId = 2 },
    
            new Question { Id = 4, QuestionText = "Hvilke av lenkene er trygge?", 
                Options = "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]", 
                CorrectOption = "Regjeringen.no", TaskId = 2 },
    
            new Question { Id = 5, QuestionText = "Hva er 4+4", CorrectAnswer = "8", TaskId = 3 },
            new Question { Id = 6, QuestionText = "Hva er 5+5", CorrectAnswer = "10", TaskId = 3 }
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

        modelBuilder.Entity<Bonus>().HasData(
            new Bonus
            {
                Id = 1, Title = "Et år med gratis antivirusprogram",
                Description = "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis antivirusprogram",
                Icon ="Shield", PointsNeeded = 30 },
            new Bonus
            {
                Id = 2, Title = "Et år med gratis VPN",
                Description = "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis VPN",
                Icon = "VpnLock", PointsNeeded = 60 
            },
            new Bonus
            {
                Id = 3, Title = "En profesjonell sikkerhetsruter",
                Description = "Løs inn denne koden xyz på denne nettsiden for å få en profesjonell sikkerhetsruter",
                Icon = "Router", PointsNeeded = 90 
            });
    }

    //Connection string to the database
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }
    
    
}