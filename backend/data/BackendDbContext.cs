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
            new Topic { Id = 2, Title = "Nettfisking", SkillLevel = "Intermediate", Icon = "Link", UserId = 1},
            new Topic { Id = 3, Title = "Trygge nettsider", SkillLevel = "Expert", Icon = "WebAsset", UserId = 1}
        );

        modelBuilder.Entity<Subtopic>().HasData(
            new Subtopic { Id = 1, Title = "Hvordan lage et sikkert passord", 
                SubtopicContent = "Som fortalt i forrige seksjon er det noen enkle tiltak man kan gjøre " +
                                  "for å gjøre et passord betydelig mer sikkert. Nettvett har noen gode råd" +
                                  "for hvordan man kan lage et sikkert passord. De sier:\n\n" +
                                  "'Å lage et sterkt passord er en enkel jobb. Utfordringen er å huske flere " +
                                  "ulike sterke passord. Spesielt når man skal ha et unikt passord for hver " +
                                  "enkelt nettside. For å gjøre det enklere å huske, anbefaler vi å bruke fraser " +
                                  "eller hele setninger som passord. Setninger er mye enklere å huske enn vilkårlige" +
                                  " kombinasjoner av enkelte bokstaver og tall. Setninger inneholder naturlig " +
                                  "mellomrom og symboler, som gjør passordet sterkere. Lag deg en huskeregel for" +
                                  " passord som gjør at du kan lage variasjoner over en frase som sikrer unike" +
                                  " passord for hver enkelt tjeneste. Da blir det enklere å huske passordet for deg," +
                                  " men unngå å bruke referanser direkte til tjenesten som passordet benyttes til." +
                                  "\n\nPassordfrasen bør:" +
                                  "\nvære så langt som mulig, minst 5 ord eller 16 tegn" +
                                  "\nvære unikt for hver enkelt nettside/brukerkonto" +
                                  "\ninneholde både tall, symboler, mellomrom og store/små bokstaver" +
                                  "\nhelst ikke inkludere ord/tall som kan assosieres med deg eller tjenesten" +
                                  " passordet gjelder for.\nMen husk å benytte totrinnsbekreftelse der dette er" +
                                  " mulig!\n\nEnkelte tjenester tillater ikke bruk av mellomrom eller enkelte tegn," +
                                  " så det kan være nødvendig å variere. Man kan også inkludere bruk av æ, ø og å" +
                                  " for ekstra passordstyrke og sikkerhet, men dersom man kan bli nødt til å logge " +
                                  "inn på en maskin i utlandet kan dette være utfordrende.'" +
                                  "\n\n\n Dette sitatet er hentet fra nettvett sin side https://nettvett.no/passord/ " +
                                  "siden ble sist oppdatert 5.mai 2022 og ble hentet 11.05.2025"
                ,IsRead = false, TopicId = 1 },
            
            new Subtopic { Id = 2, Title = "Hvordan gjenkjenne utrygge eposter", 
                SubtopicContent = "Nettvett gir en god oversikt over ting man kan se etter for å vurdere" +
                                  "om det er et phising forsøk. De sier:\n" +
                                  "'I mange tilfeller finnes det noen indikatorer som kan benyttes for å avdekke" +
                                  " om e-mailen er ekte eller ikke:\n" +
                                  "- I mange tilfeller er navnet på avsenderen eller kontonavnet falsk. " +
                                  "Det er veldig enkelt for en svindler å sette et hvilket som helst visnings- " +
                                  "eller avsendernavn\n- En relativ enkel indikator er å sjekke om avsenderens " +
                                  "mailadresse stemmer overens med navnet på avsenderen. Vær oppmerksom på at " +
                                  "enkelte svindlere kan lage e-mailadresser som er veldige like adressen til den de " +
                                  "utgir seg for å være\n- Hvis e-mailen har en generell adressering som f eks " +
                                  "«kjære kunde» og ikke ditt eget navn, kan det en være en indikasjon på at det " +
                                  "er en mail som er sendt til mange, med svindel som målsetting.\n" +
                                  "- Hvis det følger med linker, kan du sjekke om adressen til linken stemmer overens" +
                                  " med den beskrivende teksten. Husk at verken Politiet eller andre offentlige" +
                                  " og seriøse aktører sender ut linker, knyttet til formelle prosesser.\n" +
                                  "- Selv om utforming og språkbruk i mange tilfeller har blitt forbedret og " +
                                  "profesjonalisert den siste tiden, kan det fortsatt være mulig å avdekke svindel " +
                                  "ved å sjekke både utforming og språkbruk i e-mail/brev som er mottatt'\n\n\n" +
                                  "Dette sitatet er hentet fra nettvett sin side https://nettvett.no/phishing/" +
                                  " . Siden ble sist oppdatert 18.november 2022. og sitatet ble hentet 11.05.2025"
                , IsRead = false, TopicId = 2 },
            new Subtopic { Id = 3, Title = "Hvordan velge trygge nettsider", 
                SubtopicContent = "Når du besøker en nettside, er det viktig å vite om den er trygg. En god start " +
                                  "er å se etter hengelås-symbolet i adressefeltet, og at nettadressen begynner med" +
                                  "'https', det betyr at informasjonen mellom deg og siden er trygg." +
                                  " Uvanlige domenenavn som inneholder ekstra tall, rare tegn eller feilstavelser," +
                                  " kan være et tegn på at det ikke er en trygg side." +
                                  " Mange pop-up vinduer med løfter om premier bør og " +
                                  "vekke mistanke. I tilleg er dårlig språk og skrivefeil typisk for utrygge sider. " +
                                  "Vær spesielt forsiktig hvis siden ber deg oppgi personlig informasjon. " +
                                  "I tilleg kan man holde musepekeren over lenker for å se hvor de faktisk fører," +
                                  " før du klikker.", IsRead = false, TopicId = 3 }
        );

        modelBuilder.Entity<Task>().HasData(
            new Task { Id = 1, Title = "Er dette trygge passord?", TaskContent = "Content",IsDone = false, 
                TopicId = 1, TaskType = TaskType.TrueFalse.ToString() },
            new Task { Id = 2, Title = "Spørsmål til nettfisking og usikre e-poster?", 
                TaskContent = "Content",IsDone = false, 
                TopicId = 2, TaskType = TaskType.MultipleChoice.ToString()},
            new Task { Id = 3, Title = "Spørsmål til utrygge nettsider", TaskContent = "Content",IsDone = false, 
                TopicId = 3, TaskType = TaskType.Input.ToString()}
        );

        modelBuilder.Entity<Question>().HasData(
            new Question { Id = 1, QuestionText = "Er 'passord123' et sikkert passord?", 
                CorrectAnswer = "false", TaskId = 1 },
    
            new Question { Id = 2, QuestionText = "Er 'snø+mann@Strand19' et sikkert passord?", 
                CorrectAnswer = "true", TaskId = 1 },
            
            new Question{ Id = 3, QuestionText = "Er 'JegErFødtI1999' et sikkert passord?", 
                CorrectAnswer = "false", TaskId = 1 },
            
            new Question { Id = 4, QuestionText = "Er 'gitar-RuterFrosk17Kald' et sikkert passord?", 
                CorrectAnswer = "true", TaskId = 1 },
    
            new Question { Id = 5, QuestionText = "Hvilken type hilsen kan være en indakasjon på svindel?", 
                Options = "[\"Hei Ola Nordmann\", \"vennlig hilsen\", \"Kjære kunde\", \"God ettermiddag\"]", 
                CorrectOption = "Kjære kunde", TaskId = 2 },
    
            new Question { Id = 6, QuestionText = "Hva bør du gjøre med lenker i mistenkelige eposter?", 
                Options = "[\"Klikke på den\", \"Sende linken til en venn\", \"Skrive lenken inn i google\"," +
                          " \"Sammenlikne lenken med den beskrivende teksten\"]", 
                CorrectOption = "Sammenlikne lenken med den beskrivende teksten", TaskId = 2 },
            
            new Question { Id = 7, QuestionText = "Hva kan svindlere etterlikne godt", 
                Options = "[\"Adresseboken\", \"E-postadresser\", \"IP-adresser\", \"Nettleseren din\"]", 
                CorrectOption = "E-postadresser", TaskId = 2 },
            
            new Question { Id = 8, QuestionText = "Hvordan skriver ofte seriøse aktører e-poster?", 
                Options = "[\"med formelt og klart språk\", \"med STORE BOKSTAVER\", \"med humor\", " +
                          "\"med mange lenker\"]", 
                CorrectOption = "med formelt og klart språk", TaskId = 2 },
            
            new Question { Id = 9, QuestionText = "Hva burde nettadressen starte med for å vise at den er trygg?",
                CorrectAnswer = "https", TaskId = 3 },
            new Question { Id = 10, QuestionText = "Hvilket symbol i adressefeltet kan vise at informasjonen din" +
                                                   " er sikker", CorrectAnswer = "hengelås", TaskId = 3 }
        );

        modelBuilder.Entity<Reason>().HasData(
            new Reason { Id = 1, ReasonTitle = "Hvorfor er det viktig med et godt passord?", 
                ReasonContent = "Mange sider krever at man må lage en bruker når man bruker sidene deres. " +
                                "I de tilfellene må man ofte i tillegg opprette et passord. Men hvorfor burde man " +
                                "lage gode passord? Ditt passord er viktig for å holde dine opplysninger skjult fra " +
                                "andre. Dersom du har et passord som er lett å gjette eller som er svakt, " +
                                "kan det gjøre det enklere for andre å få tak i informasjonen din.\n " +
                                "Dersom du bruker litt lengre tid på å sjekke om du har et godt passord kan du gjøre " +
                                "informasjonen din mye tryggere." +
                                "\n For å lese mer om hvordan man kan lage et sikkert passord gå til neste side."
                , IsRead = false, TopicId = 1 },
            
            new Reason { Id = 2, ReasonTitle = "Hvorfor er det viktig å gjenkjenne utrygge eposter og lenker?", 
                ReasonContent = "Lenker er en stor del av hvordan man navigerer seg på internett. " +
                                "Det er derfor viktig å lære seg å se forskjell på trygge og usikre lenker. " +
                                "Svindelforsøk via e-post, kjent som nettfisking eller phising, utnytter ofte " +
                                "lenker som ser trygge ut i første øyekast. Disse e-postene prøver å lokke deg " +
                                "til å trykke på en lenke, som kan se ekte ut, men som fører til en falsk nettside. " +
                                "Der kan de be deg oppgi personlig informasjon som passord, bankdetaljer eller " +
                                "fødelsnummer. Ofte utgir de seg for å være kjente nettsider som banken din, " +
                                "posten eller offentlige etater. Ved å lære å gjenkjenne mistenkelige lenker " +
                                "og eposter kan du beskytte deg selv og dine opplysninger. " +
                                "\n Gå til neste side for å lære om hvordan du kan gjenkjenne phising." 
                ,IsRead = false, TopicId = 2 },
            new Reason { Id = 3, ReasonTitle = "Hvorfor er det viktig å velge trygge nettsider?", 
                ReasonContent = "Mange nettsider ser ved første øyekast både ekte og profesjonelle ut," +
                                "men det betyr ikke nødvendigvis at de er trygge. Det finnes mange nettsier som er" +
                                "laget for å lure folk, enten ved å samle inn personlige opplysninger, installere " +
                                "skadevare på maskinen, eller å få de til å oppgi bankinformasjon." +
                                "Derfor er det viktig å kunne kjenne igjen tegn på at en nettside ikke er til å stole" +
                                " på. Ved å lære deg forskjellen på trygge og utrygge nettsider, kan man bekytte " +
                                "både informasjonen sin og mot andre digitale trusler.", IsRead = false, TopicId = 3 }
            
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