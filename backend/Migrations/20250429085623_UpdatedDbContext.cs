using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Options",
                value: "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Options",
                value: "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Options",
                value: "Regjeringen.no, farliglenke.com, farlig.no, farlig.org");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Options",
                value: "Regjeringen.no, farliglenke.com, farlig.no, farlig.org");
        }
    }
}
