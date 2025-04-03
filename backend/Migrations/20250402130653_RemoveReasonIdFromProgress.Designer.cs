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
    [Migration("20250402130653_RemoveReasonIdFromProgress")]
    partial class RemoveReasonIdFromProgress
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.models.Progress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("ProgressPercentage")
                        .HasColumnType("double precision");

                    b.Property<int>("TopicId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TopicId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Progresses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ProgressPercentage = 0.5,
                            TopicId = 1,
                            UserId = 1
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
                            ReasonContent = "Content",
                            ReasonTitle = "Sample Reason",
                            TopicId = 1
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
                            SubtopicContent = "Content",
                            Title = "Sample Subtopic",
                            TopicId = 1
                        });
                });

            modelBuilder.Entity("backend.models.Task", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsDone")
                        .HasColumnType("boolean");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

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
                            IsDone = false,
                            Title = "Sample Task",
                            TopicId = 1
                        });
                });

            modelBuilder.Entity("backend.models.Topic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("SkillLevel")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Topics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            SkillLevel = "Beginner",
                            Title = "Sample Topic",
                            UserId = 1
                        });
                });

            modelBuilder.Entity("backend.models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1
                        });
                });

            modelBuilder.Entity("backend.models.Progress", b =>
                {
                    b.HasOne("backend.models.Topic", "Topic")
                        .WithOne("Progress")
                        .HasForeignKey("backend.models.Progress", "TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Topic");

                    b.Navigation("User");
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

            modelBuilder.Entity("backend.models.Topic", b =>
                {
                    b.Navigation("Progress")
                        .IsRequired();

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
