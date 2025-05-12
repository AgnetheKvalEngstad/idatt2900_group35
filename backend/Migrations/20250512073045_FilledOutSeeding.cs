using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FilledOutSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1,
                column: "QuestionText",
                value: "Er 'passord123' et sikkert passord?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "QuestionText",
                value: "Er 'snø+mann@Strand19' et sikkert passord?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { "false", null, null, "Er 'JegErFødtI1999' et sikkert passord?", 1 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { "true", null, null, "Er 'gitar-RuterFrosk17Kald' et sikkert passord?", 1 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { null, "Kjære kunde", "[\"Hei Ola Nordmann\", \"vennlig hilsen\", \"Kjære kunde\", \"God ettermiddag\"]", "Hvilken type hilsen kan være en indakasjon på svindel?", 2 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { null, "Sammenlikne lenken med den beskrivende teksten", "[\"Klikke på den\", \"Sende linken til en venn\", \"Skrive lenken inn i google\", \"Sammenlikne lenken med den beskrivende teksten\"]", "Hva bør du gjøre med lenker i mistenkelige eposter?", 2 });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[,]
                {
                    { 7, null, "E-postadresser", "[\"Adresseboken\", \"E-postadresser\", \"IP-adresser\", \"Nettleseren din\"]", "Hva kan svindlere etterlikne godt", 2 },
                    { 8, null, "E-postadresser", "[\"med formelt og klart språk\", \"med STORE BOKSTAVER\", \"med humor\", \"med mange lenker\"]", "Hvordan skriver ofte seriøse aktører e-poster?", 2 },
                    { 9, "https", null, null, "Hva burde nettadressen starte med for å vise at den er trygg?", 3 },
                    { 10, "hengelås", null, null, "Hvilket symbol i adressefeltet kan vise at informasjonen din er sikker", 3 }
                });

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 1,
                column: "ReasonContent",
                value: "Mange sider krever at man må lage en bruker når man bruker sidene deres. I de tilfellene må man ofte i tillegg opprette et passord. Men hvorfor burde man lage gode passord? Ditt passord er viktig for å holde dine opplysninger skjult fra andre. Dersom du har et passord som er lett å gjette eller som er svakt, kan det gjøre det enklere for andre å få tak i informasjonen din.\n Dersom du bruker litt lengre tid på å sjekke om du har et godt passord kan du gjøre informasjonen din mye tryggere.\n For å lese mer om hvordan man kan lage et sikkert passord gå til neste side.");

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ReasonContent", "ReasonTitle" },
                values: new object[] { "Lenker er en stor del av hvordan man navigerer seg på internett. Det er derfor viktig å lære seg å se forskjell på trygge og usikre lenker. Svindelforsøk via e-post, kjent som nettfisking eller phising, utnytter ofte lenker som ser trygge ut i første øyekast. Disse e-postene prøver å lokke deg til å trykke på en lenke, som kan se ekte ut, men som fører til en falsk nettside. Der kan de be deg oppgi personlig informasjon som passord, bankdetaljer eller fødelsnummer. Ofte utgir de seg for å være kjente nettsider som banken din, posten eller offentlige etater. Ved å lære å gjenkjenne mistenkelige lenker og eposter kan du beskytte deg selv og dine opplysninger. \n Gå til neste side for å lære om hvordan du kan gjenkjenne phising.", "Hvorfor er det viktig å gjenkjenne utrygge eposter og lenker?" });

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 3,
                column: "ReasonContent",
                value: "Mange nettsider ser ved første øyekast både ekte og profesjonelle ut,men det betyr ikke nødvendigvis at de er trygge. Det finnes mange nettsier som erlaget for å lure folk, enten ved å samle inn personlige opplysninger, installere skadevare på maskinen, eller å få de til å oppgi bankinformasjon.Derfor er det viktig å kunne kjenne igjen tegn på at en nettside ikke er til å stole på. Ved å lære deg forskjellen på trygge og utrygge nettsider, kan man bekytte både informasjonen sin og mot andre digitale trusler.");

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubtopicContent",
                value: "Som fortalt i forrige seksjon er det noen enkle tiltak man kan gjøre for å gjøre et passord betydelig mer sikkert. Nettvett har noen gode rådfor hvordan man kan lage et sikkert passord. De sier:\n\n'Å lage et sterkt passord er en enkel jobb. Utfordringen er å huske flere ulike sterke passord. Spesielt når man skal ha et unikt passord for hver enkelt nettside. For å gjøre det enklere å huske, anbefaler vi å bruke fraser eller hele setninger som passord. Setninger er mye enklere å huske enn vilkårlige kombinasjoner av enkelte bokstaver og tall. Setninger inneholder naturlig mellomrom og symboler, som gjør passordet sterkere. Lag deg en huskeregel for passord som gjør at du kan lage variasjoner over en frase som sikrer unike passord for hver enkelt tjeneste. Da blir det enklere å huske passordet for deg, men unngå å bruke referanser direkte til tjenesten som passordet benyttes til.\n\nPassordfrasen bør:\nvære så langt som mulig, minst 5 ord eller 16 tegn\nvære unikt for hver enkelt nettside/brukerkonto\ninneholde både tall, symboler, mellomrom og store/små bokstaver\nhelst ikke inkludere ord/tall som kan assosieres med deg eller tjenesten passordet gjelder for.\nMen husk å benytte totrinnsbekreftelse der dette er mulig!\n\nEnkelte tjenester tillater ikke bruk av mellomrom eller enkelte tegn, så det kan være nødvendig å variere. Man kan også inkludere bruk av æ, ø og å for ekstra passordstyrke og sikkerhet, men dersom man kan bli nødt til å logge inn på en maskin i utlandet kan dette være utfordrende.'\n\n\n Dette sitatet er hentet fra nettvett sin side https://nettvett.no/passord/ siden ble sist oppdatert 5.mai 2022 og ble hentet 11.05.2025");

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SubtopicContent", "Title" },
                values: new object[] { "Nettvett gir en god oversikt over ting man kan se etter for å vurdereom det er et phising forsøk. De sier:\n'I mange tilfeller finnes det noen indikatorer som kan benyttes for å avdekke om e-mailen er ekte eller ikke:\n- I mange tilfeller er navnet på avsenderen eller kontonavnet falsk. Det er veldig enkelt for en svindler å sette et hvilket som helst visnings- eller avsendernavn\n- En relativ enkel indikator er å sjekke om avsenderens mailadresse stemmer overens med navnet på avsenderen. Vær oppmerksom på at enkelte svindlere kan lage e-mailadresser som er veldige like adressen til den de utgir seg for å være\n- Hvis e-mailen har en generell adressering som f eks «kjære kunde» og ikke ditt eget navn, kan det en være en indikasjon på at det er en mail som er sendt til mange, med svindel som målsetting.\n- Hvis det følger med linker, kan du sjekke om adressen til linken stemmer overens med den beskrivende teksten. Husk at verken Politiet eller andre offentlige og seriøse aktører sender ut linker, knyttet til formelle prosesser.\n- Selv om utforming og språkbruk i mange tilfeller har blitt forbedret og profesjonalisert den siste tiden, kan det fortsatt være mulig å avdekke svindel ved å sjekke både utforming og språkbruk i e-mail/brev som er mottatt'\n\n\nDette sitatet er hentet fra nettvett sin side https://nettvett.no/phishing/ . Siden ble sist oppdatert 18.november 2022. og sitatet ble hentet 11.05.2025", "Hvordan gjenkjenne utrygge eposter" });

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 3,
                column: "SubtopicContent",
                value: "Når du besøker en nettside, er det viktig å vite om den er trygg. En god start er å se etter hengelås-symbolet i adressefeltet, og at nettadressen begynner med'https', det betyr at informasjonen mellom deg og siden er trygg. Uvanlige domenenavn som inneholder ekstra tall, rare tegn eller feilstavelser, kan være et tegn på at det ikke er en trygg side. Mange pop-up vinduer med løfter om premier bør og vekke mistanke. I tilleg er dårlig språk og skrivefeil typisk for utrygge sider. Vær spesielt forsiktig hvis siden ber deg oppgi personlig informasjon. I tilleg kan man holde musepekeren over lenker for å se hvor de faktisk fører, før du klikker.");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "Spørsmål til nettfisking og usikre e-poster?");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Spørsmål til utrygge nettsider");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "Nettfisking og lenker");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Trygge nettsider");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1,
                column: "QuestionText",
                value: "Er passord123 et bra passord?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 2,
                column: "QuestionText",
                value: "Er (JGAgh3)4^ecAvVC et bra passord?");

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { null, "Regjeringen.no", "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]", "Hvilke av lenkene er trygge?", 2 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { null, "Regjeringen.no", "[\"Regjeringen.no\", \"farliglenke.com\", \"farlig.no\", \"farlig.org\"]", "Hvilke av lenkene er trygge?", 2 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { "8", null, null, "Hva er 4+4", 3 });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CorrectAnswer", "CorrectOption", "Options", "QuestionText", "TaskId" },
                values: new object[] { "10", null, null, "Hva er 5+5", 3 });

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 1,
                column: "ReasonContent",
                value: "Et godt passord vil holde din informasjon trygg");

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ReasonContent", "ReasonTitle" },
                values: new object[] { "Ved å kunne gjenkjenne farlige lenker, kan du tryggere navigere nettet", "Hvorfor er det viktig å gjenkjenne farlige lenker?" });

            migrationBuilder.UpdateData(
                table: "Reasons",
                keyColumn: "Id",
                keyValue: 3,
                column: "ReasonContent",
                value: "Utrygge nettsider ");

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubtopicContent",
                value: "Passord er sikre når de er xyz");

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SubtopicContent", "Title" },
                values: new object[] { "Lenken har firmaets faktiske navn og ingen rare tegn", "Hvordan gjenkjenne farlige lenker" });

            migrationBuilder.UpdateData(
                table: "Subtopics",
                keyColumn: "Id",
                keyValue: 3,
                column: "SubtopicContent",
                value: "Velg nettsider med gode lenker, sjekk browser");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "Hvilke av lenkene er trygge?");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Hva med denne nettsiden er utrygt");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                column: "Title",
                value: "Farlige lenker");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Velg trygge nettsider");
        }
    }
}
