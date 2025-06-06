﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(BackendDbContext))]
    [Migration("20250512081008_MinorTextAdjustments3")]
    partial class MinorTextAdjustments3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.models.Bonus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PointsNeeded")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Bonus");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis antivirusprogram",
                            Icon = "Shield",
                            PointsNeeded = 30,
                            Title = "Et år med gratis antivirusprogram"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis VPN",
                            Icon = "VpnLock",
                            PointsNeeded = 60,
                            Title = "Et år med gratis VPN"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Løs inn denne koden xyz på denne nettsiden for å få en profesjonell sikkerhetsruter",
                            Icon = "Router",
                            PointsNeeded = 90,
                            Title = "En profesjonell sikkerhetsruter"
                        });
                });

            modelBuilder.Entity("backend.models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CorrectAnswer")
                        .HasMaxLength(1000)
                        .HasColumnType("character varying(1000)");

                    b.Property<string>("CorrectOption")
                        .HasMaxLength(1000)
                        .HasColumnType("character varying(1000)");

                    b.Property<string>("Options")
                        .HasMaxLength(1000)
                        .HasColumnType("character varying(1000)");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("character varying(1000)");

                    b.Property<int>("TaskId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CorrectAnswer = "false",
                            QuestionText = "Er 'passord123' et sikkert passord?",
                            TaskId = 1
                        },
                        new
                        {
                            Id = 2,
                            CorrectAnswer = "true",
                            QuestionText = "Er 'snø+mann@Strand19' et sikkert passord?",
                            TaskId = 1
                        },
                        new
                        {
                            Id = 3,
                            CorrectAnswer = "false",
                            QuestionText = "Er 'JegErFødtI1999' et sikkert passord?",
                            TaskId = 1
                        },
                        new
                        {
                            Id = 4,
                            CorrectAnswer = "true",
                            QuestionText = "Er 'gitar-RuterFrosk17Kald' et sikkert passord?",
                            TaskId = 1
                        },
                        new
                        {
                            Id = 5,
                            CorrectOption = "Kjære kunde",
                            Options = "[\"Hei Ola Nordmann\", \"vennlig hilsen\", \"Kjære kunde\", \"God ettermiddag\"]",
                            QuestionText = "Hvilken type hilsen kan være en indakasjon på svindel?",
                            TaskId = 2
                        },
                        new
                        {
                            Id = 6,
                            CorrectOption = "Sammenlikne lenken med den beskrivende teksten",
                            Options = "[\"Klikke på den\", \"Sende linken til en venn\", \"Skrive lenken inn i google\", \"Sammenlikne lenken med den beskrivende teksten\"]",
                            QuestionText = "Hva bør du gjøre med lenker i mistenkelige eposter?",
                            TaskId = 2
                        },
                        new
                        {
                            Id = 7,
                            CorrectOption = "E-postadresser",
                            Options = "[\"Adresseboken\", \"E-postadresser\", \"IP-adresser\", \"Nettleseren din\"]",
                            QuestionText = "Hva kan svindlere etterlikne godt",
                            TaskId = 2
                        },
                        new
                        {
                            Id = 8,
                            CorrectOption = "med formelt og klart språk",
                            Options = "[\"med formelt og klart språk\", \"med STORE BOKSTAVER\", \"med humor\", \"med mange lenker\"]",
                            QuestionText = "Hvordan skriver ofte seriøse aktører e-poster?",
                            TaskId = 2
                        },
                        new
                        {
                            Id = 9,
                            CorrectAnswer = "https",
                            QuestionText = "Hva burde nettadressen starte med for å vise at den er trygg?",
                            TaskId = 3
                        },
                        new
                        {
                            Id = 10,
                            CorrectAnswer = "hengelås",
                            QuestionText = "Hvilket symbol i adressefeltet kan vise at informasjonen din er sikker",
                            TaskId = 3
                        });
                });

            modelBuilder.Entity("backend.models.Reason", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("ReasonContent")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("character varying(2000)");

                    b.Property<string>("ReasonTitle")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.Property<int>("TopicId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TopicId")
                        .IsUnique();

                    b.ToTable("Reasons");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsRead = false,
                            ReasonContent = "Mange sider krever at man må lage en bruker når man bruker sidene deres. I de tilfellene må man ofte i tillegg opprette et passord. Men hvorfor burde man lage gode passord? Ditt passord er viktig for å holde dine opplysninger skjult fra andre. Dersom du har et passord som er lett å gjette eller som er svakt, kan det gjøre det enklere for andre å få tak i informasjonen din.\n Dersom du bruker litt lengre tid på å sjekke om du har et godt passord kan du gjøre informasjonen din mye tryggere.\n For å lese mer om hvordan man kan lage et sikkert passord gå til neste side.",
                            ReasonTitle = "Hvorfor er det viktig med et godt passord?",
                            TopicId = 1
                        },
                        new
                        {
                            Id = 2,
                            IsRead = false,
                            ReasonContent = "Lenker er en stor del av hvordan man navigerer seg på internett. Det er derfor viktig å lære seg å se forskjell på trygge og usikre lenker. Svindelforsøk via e-post, kjent som nettfisking eller phising, utnytter ofte lenker som ser trygge ut i første øyekast. Disse e-postene prøver å lokke deg til å trykke på en lenke, som kan se ekte ut, men som fører til en falsk nettside. Der kan de be deg oppgi personlig informasjon som passord, bankdetaljer eller fødelsnummer. Ofte utgir de seg for å være kjente nettsider som banken din, posten eller offentlige etater. Ved å lære å gjenkjenne mistenkelige lenker og eposter kan du beskytte deg selv og dine opplysninger. \n Gå til neste side for å lære om hvordan du kan gjenkjenne phising.",
                            ReasonTitle = "Hvorfor er det viktig å gjenkjenne utrygge eposter og lenker?",
                            TopicId = 2
                        },
                        new
                        {
                            Id = 3,
                            IsRead = false,
                            ReasonContent = "Mange nettsider ser ved første øyekast både ekte og profesjonelle ut,men det betyr ikke nødvendigvis at de er trygge. Det finnes mange nettsier som erlaget for å lure folk, enten ved å samle inn personlige opplysninger, installere skadevare på maskinen, eller å få de til å oppgi bankinformasjon.Derfor er det viktig å kunne kjenne igjen tegn på at en nettside ikke er til å stole på. Ved å lære deg forskjellen på trygge og utrygge nettsider, kan man bekytte både informasjonen sin og mot andre digitale trusler.",
                            ReasonTitle = "Hvorfor er det viktig å velge trygge nettsider?",
                            TopicId = 3
                        });
                });

            modelBuilder.Entity("backend.models.Subtopic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("SubtopicContent")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("character varying(2000)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.Property<int>("TopicId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TopicId")
                        .IsUnique();

                    b.ToTable("Subtopics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsRead = false,
                            SubtopicContent = "Som fortalt i forrige seksjon er det noen enkle tiltak man kan gjøre for å gjøre et passord betydelig mer sikkert. Nettvett har noen gode rådfor hvordan man kan lage et sikkert passord. De sier:\n\n'Å lage et sterkt passord er en enkel jobb. Utfordringen er å huske flere ulike sterke passord. Spesielt når man skal ha et unikt passord for hver enkelt nettside. For å gjøre det enklere å huske, anbefaler vi å bruke fraser eller hele setninger som passord. Setninger er mye enklere å huske enn vilkårlige kombinasjoner av enkelte bokstaver og tall. Setninger inneholder naturlig mellomrom og symboler, som gjør passordet sterkere. Lag deg en huskeregel for passord som gjør at du kan lage variasjoner over en frase som sikrer unike passord for hver enkelt tjeneste. Da blir det enklere å huske passordet for deg, men unngå å bruke referanser direkte til tjenesten som passordet benyttes til.\n\nPassordfrasen bør:\nvære så langt som mulig, minst 5 ord eller 16 tegn\nvære unikt for hver enkelt nettside/brukerkonto\ninneholde både tall, symboler, mellomrom og store/små bokstaver\nhelst ikke inkludere ord/tall som kan assosieres med deg eller tjenesten passordet gjelder for.\nMen husk å benytte totrinnsbekreftelse der dette er mulig!\n\nEnkelte tjenester tillater ikke bruk av mellomrom eller enkelte tegn, så det kan være nødvendig å variere. Man kan også inkludere bruk av æ, ø og å for ekstra passordstyrke og sikkerhet, men dersom man kan bli nødt til å logge inn på en maskin i utlandet kan dette være utfordrende.'\n\n\n Dette sitatet er hentet fra nettvett sin side https://nettvett.no/passord/ siden ble sist oppdatert 5.mai 2022 og ble hentet 11.05.2025",
                            Title = "Hvordan lage et sikkert passord",
                            TopicId = 1
                        },
                        new
                        {
                            Id = 2,
                            IsRead = false,
                            SubtopicContent = "Nettvett gir en god oversikt over ting man kan se etter for å vurdereom det er et phising forsøk. De sier:\n'I mange tilfeller finnes det noen indikatorer som kan benyttes for å avdekke om e-mailen er ekte eller ikke:\n- I mange tilfeller er navnet på avsenderen eller kontonavnet falsk. Det er veldig enkelt for en svindler å sette et hvilket som helst visnings- eller avsendernavn\n- En relativ enkel indikator er å sjekke om avsenderens mailadresse stemmer overens med navnet på avsenderen. Vær oppmerksom på at enkelte svindlere kan lage e-mailadresser som er veldige like adressen til den de utgir seg for å være\n- Hvis e-mailen har en generell adressering som f eks «kjære kunde» og ikke ditt eget navn, kan det en være en indikasjon på at det er en mail som er sendt til mange, med svindel som målsetting.\n- Hvis det følger med linker, kan du sjekke om adressen til linken stemmer overens med den beskrivende teksten. Husk at verken Politiet eller andre offentlige og seriøse aktører sender ut linker, knyttet til formelle prosesser.\n- Selv om utforming og språkbruk i mange tilfeller har blitt forbedret og profesjonalisert den siste tiden, kan det fortsatt være mulig å avdekke svindel ved å sjekke både utforming og språkbruk i e-mail/brev som er mottatt'\n\n\nDette sitatet er hentet fra nettvett sin side https://nettvett.no/phishing/ . Siden ble sist oppdatert 18.november 2022. og sitatet ble hentet 11.05.2025",
                            Title = "Hvordan gjenkjenne utrygge eposter",
                            TopicId = 2
                        },
                        new
                        {
                            Id = 3,
                            IsRead = false,
                            SubtopicContent = "Når du besøker en nettside, er det viktig å vite om den er trygg. En god start er å se etter hengelås-symbolet i adressefeltet, og at nettadressen begynner med'https', det betyr at informasjonen mellom deg og siden er trygg. Uvanlige domenenavn som inneholder ekstra tall, rare tegn eller feilstavelser, kan være et tegn på at det ikke er en trygg side. Mange pop-up vinduer med løfter om premier bør og vekke mistanke. I tilleg er dårlig språk og skrivefeil typisk for utrygge sider. Vær spesielt forsiktig hvis siden ber deg oppgi personlig informasjon. I tilleg kan man holde musepekeren over lenker for å se hvor de faktisk fører, før du klikker.",
                            Title = "Hvordan velge trygge nettsider",
                            TopicId = 3
                        });
                });

            modelBuilder.Entity("backend.models.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AchievedPoints")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDone")
                        .HasColumnType("boolean");

                    b.Property<string>("TaskContent")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("character varying(2000)");

                    b.Property<string>("TaskType")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("TopicId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TopicId")
                        .IsUnique();

                    b.ToTable("Tasks");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AchievedPoints = 0,
                            IsDone = false,
                            TaskContent = "Content",
                            TaskType = "TrueFalse",
                            Title = "Er dette trygge passord?",
                            TopicId = 1
                        },
                        new
                        {
                            Id = 2,
                            AchievedPoints = 0,
                            IsDone = false,
                            TaskContent = "Content",
                            TaskType = "MultipleChoice",
                            Title = "Spørsmål til nettfisking og usikre e-poster?",
                            TopicId = 2
                        },
                        new
                        {
                            Id = 3,
                            AchievedPoints = 0,
                            IsDone = false,
                            TaskContent = "Content",
                            TaskType = "Input",
                            Title = "Spørsmål til utrygge nettsider",
                            TopicId = 3
                        });
                });

            modelBuilder.Entity("backend.models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("SkillLevel")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Topics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Icon = "Lock",
                            SkillLevel = "Beginner",
                            Title = "Lag et sikkert passord",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Icon = "Link",
                            SkillLevel = "Intermediate",
                            Title = "Nettfisking",
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            Icon = "WebAsset",
                            SkillLevel = "Expert",
                            Title = "Trygge nettsider",
                            UserId = 1
                        });
                });

            modelBuilder.Entity("backend.models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.PrimitiveCollection<int[]>("TopicIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            TopicIds = new int[0]
                        });
                });

            modelBuilder.Entity("backend.models.Question", b =>
                {
                    b.HasOne("backend.models.Task", "Task")
                        .WithMany("Questions")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("backend.models.Reason", b =>
                {
                    b.HasOne("backend.models.Topic", "Topic")
                        .WithOne("Reason")
                        .HasForeignKey("backend.models.Reason", "TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("backend.models.Subtopic", b =>
                {
                    b.HasOne("backend.models.Topic", "Topic")
                        .WithOne("Subtopic")
                        .HasForeignKey("backend.models.Subtopic", "TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("backend.models.Task", b =>
                {
                    b.HasOne("backend.models.Topic", "Topic")
                        .WithOne("Task")
                        .HasForeignKey("backend.models.Task", "TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("backend.models.Topic", b =>
                {
                    b.HasOne("backend.models.User", "User")
                        .WithMany("Topics")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.models.Task", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("backend.models.Topic", b =>
                {
                    b.Navigation("Reason")
                        .IsRequired();

                    b.Navigation("Subtopic")
                        .IsRequired();

                    b.Navigation("Task")
                        .IsRequired();
                });

            modelBuilder.Entity("backend.models.User", b =>
                {
                    b.Navigation("Topics");
                });
#pragma warning restore 612, 618
        }
    }
}
