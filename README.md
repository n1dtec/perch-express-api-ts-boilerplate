# Perch Engineering Assignment

A simple RESTFUL API using ExpressJS in TypeScript connecting a Postgres Database.

## Setup

### Setup Postgres Database

* Install (Docker Desktop)[https://www.docker.com/products/docker-desktop]
* Start database using Docker depending on your CPU type
	* amd64 (Intel CPU):
		```
		docker run --name perch-assignment-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgis/postgis:14-3.3
		```
	* arm64 (Apple CPU):
		```
		docker run --name perch-assignment-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d ghcr.io/baosystems/postgis:14-3.3
		```

### Setup the API

```
npm install && npm db:setup:all
```

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Start the Development server

```
npm run dev
```