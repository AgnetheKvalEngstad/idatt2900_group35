using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MinorTextAdjustments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubtopicContent",
                value: "Som fortalt i forrige seksjon er det noen enkle tiltak man kan gjøre for å gjøre et passord betydelig mer sikkert. Nettvett har noen gode rådfor hvordan man kan lage et sikkert passord. De sier:\n\n'Å lage et sterkt passord er en enkel jobb. Utfordringen er å huske flere ulike sterke passord. Spesielt når man skal ha et unikt passord for hver enkelt nettside. For å gjøre det enklere å huske, anbefaler vi å bruke fraser eller hele setninger som passord. Setninger er mye enklere å huske enn vilkårlige kombinasjoner av enkelte bokstaver og tall. Setninger inneholder naturlig mellomrom og symboler, som gjør passordet sterkere. Lag deg en huskeregel for passord som gjør at du kan lage variasjoner over en frase som sikrer unike passord for hver enkelt tjeneste. Da blir det enklere å huske passordet for deg, men unngå å bruke referanser direkte til tjenesten som passordet benyttes til.Passordfrasen bør:\nvære så langt som mulig, minst 5 ord eller 16 tegn \nvære unikt for hver enkelt nettside/brukerkonto \ninneholde både tall, symboler, mellomrom og store/små bokstaver \nhelst ikke inkludere ord/tall som kan assosieres med deg eller tjenesten  passordet gjelder for.\nMen husk å benytte totrinnsbekreftelse der dette er mulig!\n\nEnkelte tjenester tillater ikke bruk av mellomrom eller enkelte tegn, så det kan være nødvendig å variere. Man kan også inkludere bruk av æ, ø og å for ekstra passordstyrke og sikkerhet, men dersom man kan bli nødt til å logge inn på en maskin i utlandet kan dette være utfordrende.'\n\n\n Dette sitatet er hentet fra nettvett sin side https://nettvett.no/passord/ siden ble sist oppdatert 5.mai 2022 og ble hentet 11.05.2025");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubtopicContent",
                value: "Som fortalt i forrige seksjon er det noen enkle tiltak man kan gjøre for å gjøre et passord betydelig mer sikkert. Nettvett har noen gode rådfor hvordan man kan lage et sikkert passord. De sier:\n\n'Å lage et sterkt passord er en enkel jobb. Utfordringen er å huske flere ulike sterke passord. Spesielt når man skal ha et unikt passord for hver enkelt nettside. For å gjøre det enklere å huske, anbefaler vi å bruke fraser eller hele setninger som passord. Setninger er mye enklere å huske enn vilkårlige kombinasjoner av enkelte bokstaver og tall. Setninger inneholder naturlig mellomrom og symboler, som gjør passordet sterkere. Lag deg en huskeregel for passord som gjør at du kan lage variasjoner over en frase som sikrer unike passord for hver enkelt tjeneste. Da blir det enklere å huske passordet for deg, men unngå å bruke referanser direkte til tjenesten som passordet benyttes til.<br />Passordfrasen bør:\nvære så langt som mulig, minst 5 ord eller 16 tegn\nvære unikt for hver enkelt nettside/brukerkonto\ninneholde både tall, symboler, mellomrom og store/små bokstaver\nhelst ikke inkludere ord/tall som kan assosieres med deg eller tjenesten passordet gjelder for.\nMen husk å benytte totrinnsbekreftelse der dette er mulig!\n\nEnkelte tjenester tillater ikke bruk av mellomrom eller enkelte tegn, så det kan være nødvendig å variere. Man kan også inkludere bruk av æ, ø og å for ekstra passordstyrke og sikkerhet, men dersom man kan bli nødt til å logge inn på en maskin i utlandet kan dette være utfordrende.'\n\n\n Dette sitatet er hentet fra nettvett sin side https://nettvett.no/passord/ siden ble sist oppdatert 5.mai 2022 og ble hentet 11.05.2025");
        }
    }
}
