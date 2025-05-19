using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedToSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ReasonContent", "ReasonTitle" },
                values: new object[] { "Et godt passord vil holde din informasjon trygg", "Hvorfor er det viktig med et godt passord?" });

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "SubtopicContent", "Title" },
                values: new object[] { "Passord er sikre når de er xyz", "Hvordan lage et sikkert passord" });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "TaskType", "Title" },
                values: new object[] { "TrueFalse", "Er dette trygge passord?" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "Lag et sikkert passord");

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "SkillLevel", "Title", "UserId" },
                values: new object[,]
                {
                    { 2, "Intermediate", "Farlige lenker", 1 },
                    { 3, "Expert", "Velg trygge nettsider", 1 }
                });

            migrationBuilder.InsertData(
                table: "Reasons",
                columns: new[] { "Id", "IsRead", "ReasonContent", "ReasonTitle", "TopicId" },
                values: new object[,]
                {
                    { 2, false, "Ved å kunne gjenkjenne farlige lenker, kan du tryggere navigere nettet", "Hvorfor er det viktig å gjenkjenne farlige lenker?", 2 },
                    { 3, false, "Utrygge nettsider ", "Hvorfor er det viktig å velge trygge nettsider?", 3 }
                });

            migrationBuilder.InsertData(
                table: "Subtopics",
                columns: new[] { "Id", "IsRead", "SubtopicContent", "Title", "TopicId" },
                values: new object[,]
                {
                    { 2, false, "Lenken har firmaets faktiske navn og ingen rare tegn", "Hvordan gjenkjenne farlige lenker", 2 },
                    { 3, false, "Velg nettsider med gode lenker, sjekk browser", "Hvordan velge trygge nettsider", 3 }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "IsDone", "TaskContent", "TaskType", "Title", "TopicId" },
                values: new object[,]
                {
                    { 2, false, "Content", "MultipleChoice", "Hvilke av lenkene er trygge?", 2 },
                    { 3, false, "Content", "Input", "Hva med denne nettsiden er utrygt", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ReasonContent", "ReasonTitle" },
                values: new object[] { "Content", "Sample Reason" });

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "SubtopicContent", "Title" },
                values: new object[] { "Content", "Sample Subtopic" });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "TaskType", "Title" },
                values: new object[] { "Input", "Sample Task" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "Sample Topic");
        }
    }
}
