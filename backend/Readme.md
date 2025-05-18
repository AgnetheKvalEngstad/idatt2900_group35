# Trygg på nett - backend
## Introduksjon
Velkommen til backend siden av trygg på nett! Denne delen håndterer API-er og databasesamhandlinger som støtter frontend applikasjonen. Se instrukser nedenfor for hvordan man kjører backend.

Denne koden er utviklet i sammenheng med Bacheloroppgave ved NTNU i emnet IDATT2900 våren 2025.

## Teknologier
### .Net og Entity framework core
Dette prosjektet har blitt utviklet med .Net og Entity framework core

### Andre teknologier
- PostgreSQL (https://www.postgresql.org/)
- Testing: xUnit (https://xunit.net/)

## Backend: Kjøring og installering
### Installering
Klone kildekoden fra GitHub repoet

Via SSH: 
```
git clone git@github.com:AgnetheKvalEngstad/idatt2900_group35.git
```

Via HTTPS: 
```
git clone https://github.com/AgnetheKvalEngstad/idatt2900_group35.git
```

Gå til prosjektmappen og kjør
```
cd idatt2900_group35
cd backend
dotnet restore
```

### Kjøring av backend
For å starte databasen gå til prosjektmappen og kjør
````
docker compose up
```
For å starte backend programmet gå til prosjektmappen og kjør
```
cd idatt2900_group35
cd backend
dotnet run --project backend --launch-profile "https"
```
