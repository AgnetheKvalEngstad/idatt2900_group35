using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedBonusEndPoint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bonus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false),
                    PointsNeeded = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bonus", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Bonus",
                columns: new[] { "Id", "Description", "Icon", "PointsNeeded", "Title" },
                values: new object[,]
                {
                    { 1, "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis antivirusprogram", "Shield", 30, "Et år med gratis antivirusprogram" },
                    { 2, "Løs inn denne koden xyz på denne nettsiden for å få et år med gratis VPN", "VpnLock", 60, "Et år med gratis VPN" },
                    { 3, "Løs inn denne koden xyz på denne nettsiden for å få en profesjonell sikkerhetsruter", "Router", 90, "En profesjonell sikkerhetsruter" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bonus");
        }
    }
}
