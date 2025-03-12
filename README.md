## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Running the app via docker

```bash
# development
$ docker compose up
```

## API Documentation

### CRUD Endpoints for Location

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/location`             | Get all locations          |
| GET    | `/location/:id`         | Get location by ID         |
| GET    | `/location/:id/descendants` | Get all descendants of a location |
| GET    | `/location/:id/parent`      | Get parent of a location |
| POST   | `/location`             | Create a new location      |
| PUT    | `/location/:id`         | Update an existing location |
| DELETE | `/location/:id`         | Delete a location and its descendants |

### Swagger Documentation

The API is documented using **Swagger**.
You can access it here:

🔗 [Swagger UI](http://localhost:3000/api-docs) (Run the app and open this link)
