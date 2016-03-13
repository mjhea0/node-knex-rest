# Node, Postgres, and Knex

1. Project setup
1. Knex Setup
1. Migrations
1. Seeds
1. Routes
1. Deployment
1. Stretch

## Project setup

Create a new project and install the required dependencies:

  ```sh
  $ mkdir node-knex-rest
  $ cd mkdir node-knex-rest
  $ yo galvanize-express
  $ npm install
  ```

CRUD

|        URL     | HTTP Verb |         Action       |
|----------------|-----------|----------------------|
| /api/blobs     | GET       | Return ALL blobs     |
| /api/blobs/:id | GET       | Return a SINGLE blob |
| /api/blobs     | POST      | Add a blob           |
| /api/blobs/:id | PUT       | Update a blob        |
| /api/blobs/:id | DELETE    | Delete a blob        |

## Knex Setup

Install knex and pg:

  ```sh
  $ npm install knex pg --save
  ```

Add a config file called *knexfile.js* to the project root:

```javascript
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'node_knex_rest'
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds/dev'
    }
  }

};
```

Create a new folder called "db" in your "server" folder and add a new file called *knex.js*:

```javascript
var environment = process.env.NODE_ENV || 'development';
var config = require('../../../knexfile.js')[environment];

module.exports = require('knex')(config);
```

## Migrations

Create the database in psql and then with the command line tool, run:

```sh
$ knex migrate:make init
```

Then in the newly created migration file add:

```
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blobs', function(table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blobs');
};
```

Run the migration:

```sh
$ knex migrate:latest
```

## Seeds

Create a new seed file:

```sh
$ knex seed:make init
```

Update the file:

```javascript
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('blobs').del(),

    // Inserts seed entries
    knex('blobs').insert({
      firstName: 'Michael',
      lastName: 'Herman'
    })
  );
};
```

Run the seed:

```sh
$ knex seed:run
```



## Routes

### GET all blobs

```javascript
// return ALL blobs
router.get('/api/blobs', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/blobs](http://localhost:3000/api/blobs)

### GET Single blob

```javascript
// return single blob
router.get('/api/blob/:id', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/blobs/1](http://localhost:3000/api/blobs/1)

### POST

```javascript
// add blob
router.post('/api/blobs', function(req, res, next) {

});
```

Test:

```sh
curl --data "firstName=Super&lastName=Man" \
http://127.0.0.1:3000/api/blobs
```

### PUT

```javascript
// update blob
router.put('/api/blob/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X PUT --data "column=firstName&value=Bat" \
http://127.0.0.1:3000/api/blobs/2
```

### DELETE

```javascript
// delete blob
router.put('/api/blob/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X DELETE http://127.0.0.1:3000/api/blobs/1
```

## Deployment

Update knex config file, *knexfile.js*:

```javascript
production: {
  client: 'postgresql',
  connection: {
    database: process.env.DATABASE_URL
  },
  migrations: {
    directory: __dirname + '/src/server/db/migrations'
  },
  seeds: {
    directory: __dirname + '/src/server/db/seeds/production'
  }
}
```
