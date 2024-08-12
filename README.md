# speed-agro
Aplicación para SpeedAgro, para convertir sus archivos SQL a Excel

## FRONTEND
### Frontend Setup
- go to frontend folder
- run `bun install`

### Run Frontend for Development
- go to frontend folder
- run `bun dev`

### Deploy Frontend
- go to frontend folder
- run `bun run build`
- copy dist directory in client server


## DATABASE
This database is just for testing purposes
### Prerequisites
- Have "Docker Desktop" installed

### Install database and database administrator
- go to root folder
- run `docker-compose -p speed-agro -f up -d`
- go to localhost:8081 in the browser
- log in using user: "root" & password: "root"
- create a new database named "speed_agro" using utf8mb4_general_ci as collation
- import speed_agro.sql file

### Open database and database administrator
each time you want to play with it, just:
- open Docker Desktop
- press play button on speed-agro
