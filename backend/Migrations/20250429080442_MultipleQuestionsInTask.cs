using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MultipleQuestionsInTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionText = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CorrectAnswer = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Options = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CorrectOption = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    TaskId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[,]
                {
                    { 1, "false", null, null, "Er passord123 et bra passord?", 1 },
                    { 2, "true", null, null, "Er (JGAgh3)4^ecAvVC et bra passord?", 1 },
                    { 3, null, "Regjeringen.no", "Regjeringen.no, farliglenke.com, farlig.no, farlig.org", "Hvilke av lenkene er trygge?", 2 },
                    { 4, null, "Regjeringen.no", "Regjeringen.no, farliglenke.com, farlig.no, farlig.org", "Hvilke av lenkene er trygge?", 2 },
                    { 5, "8", null, null, "Hva er 4+4", 3 },
                    { 6, "10", null, null, "Hva er 5+5", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_TaskId",
                table: "Questions",
                column: "TaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
