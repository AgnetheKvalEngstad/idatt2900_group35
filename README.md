# Trygg på nett - idatt2900_group35

## Introduksjon
Velkommen til trygg på nett! En nettside hvor du lære om nettsikkerhet på en morsom måte. Se instruksjonene under for hvordan man kjører applikasjonen, lykke til og ha det gøy!

Denne applikasjonen er en del av daget IDATT2900 - Bacheloroppgave ved NTNU våren 2025.

## Teknologier
### Frontend: React og Vite
Denne applikasjonen har blitt utviklet med React og Vite.
### Frontend: Andre teknologier
- CSS Rammeverk: Tailwind CSS (https://tailwindcss.com/)
- Komponenter: Material UI (https://mui.com/)
- Testing: Vitest (https://vitest.dev/)
- Git Commit Guidelines (https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/)

### Backend: .Net og Entity framework core
Dette prosjektet har blitt utviklet med .Net og Entity framework core

### Backend: Andre teknologier
- PostgreSQL (https://www.postgresql.org/)
- Testing: xUnit (https://xunit.net/)

## Kloning fra GitHub
Klone kildekoden fra GitHub repoet.

Via SSH: 
```
git clone git@github.com:AgnetheKvalEngstad/idatt2900_group35.git
```

Via HTTPS: 
```
git clone https://github.com/AgnetheKvalEngstad/idatt2900_group35.git
```
## Docker
For å kjøre applikasjonen i docker må man ha docker kjørende i f.eks. [Docker Desktop](https://www.docker.com/products/docker-desktop/), videre kjører man:

**Windows:**
```
cd idatt2900_group35
docker-compose up --build
```
**Mac:**
```
cd idatt2900_group35
docker compose up --build
```
Gå inn på http://localhost:5173
## Frontend: Kjøring og installering
### Installering
Gå til prosjektmappen og kjør:
```
cd idatt2900_group35
cd frontend
npm install
```
### Kjøring av applikasjon
Kjør i samme mappe i terminalen (etter `cd frontend`):
```
npm run dev
```
Trykk på lenken som vises, og deretter må man kjøre backend for å få tilgang til full funksjonalitet.

## Backend: Kjøring og installering
### Installering
Gå til prosjektmappen og kjør
```
cd idatt2900_group35
cd backend
dotnet restore
```

### Kjøring av backend
For å starte databasen gå til prosjektmappen og kjør
```
docker compose up
```
For å starte backend programmet gå til prosjektmappen og kjør
```
cd idatt2900_group35
cd backend
dotnet run --project backend --launch-profile "http"
```
