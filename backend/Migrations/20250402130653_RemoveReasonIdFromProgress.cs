using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveReasonIdFromProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progresses_Reasons_ReasonId",
                table: "Progresses");

            migrationBuilder.DropIndex(
                name: "IX_Progresses_ReasonId",
                table: "Progresses");

            migrationBuilder.DropColumn(
                name: "ReasonId",
                table: "Progresses");

            migrationBuilder.RenameColumn(
                name: "SubTopicContent",
                table: "Subtopics",
                newName: "SubtopicContent");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Subtopics",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "SubtopicContent",
                table: "Subtopics",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "ReasonTitle",
                table: "Reasons",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "ReasonContent",
                table: "Reasons",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<double>(
                name: "ProgressPercentage",
                table: "Progresses",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Progresses",
                keyColumn: "Id",
                keyValue: 1,
                column: "ProgressPercentage",
                value: 0.5);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgressPercentage",
                table: "Progresses");

            migrationBuilder.RenameColumn(
                name: "SubtopicContent",
                table: "Subtopics",
                newName: "SubTopicContent");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Subtopics",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "SubTopicContent",
                table: "Subtopics",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(2000)",
                oldMaxLength: 2000);

            migrationBuilder.AlterColumn<string>(
                name: "ReasonTitle",
                table: "Reasons",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "ReasonContent",
                table: "Reasons",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(2000)",
                oldMaxLength: 2000);

            migrationBuilder.AddColumn<int>(
                name: "ReasonId",
                table: "Progresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Progresses",
                keyColumn: "Id",
                keyValue: 1,
                column: "ReasonId",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Progresses_ReasonId",
                table: "Progresses",
                column: "ReasonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progresses_Reasons_ReasonId",
                table: "Progresses",
                column: "ReasonId",
                principalTable: "Reasons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
