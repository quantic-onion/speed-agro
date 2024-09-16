# speed-agro
Aplicación para SpeedAgro, para convertir sus archivos SQL a Excel

## FRONTEND
### Frontend Setup
- go to frontend folder
- run `bun install`

### Run Frontend for Development
- go to frontend folder
- run `bun run tauri dev`

### Deploy Frontend
- go to frontend folder
- run `bun run tauri build`
- copy executable from src-tauri/target/release directory to client server


## DATABASE
### Prerequisites
- Have "Microsoft SSMS" installed

### Restore database
- Open MSSMS
- Right click on "Databases"
- Click on "Restore database"
- Restore one by one all the databases from "database-production" directory

### Open database and database administrator
each time you want to play with it, just:
- open Docker Desktop
- press play button on speed-agro


## Build

### Prerequisites
- Follow Taure prerequisites: https://tauri.app/v1/guides/getting-started/prerequisites/