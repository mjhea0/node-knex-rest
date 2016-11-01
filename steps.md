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
  $ mkdir node-knex-todo
  $ cd mkdir node-knex-todo
  $ yo galvanize-express
  $ npm install
  ```

### CRUD

Users

|        URL     | HTTP Verb |         Action       |
|----------------|-----------|----------------------|
| /api/users     | GET       | Return ALL users     |
| /api/users/:id | GET       | Return a SINGLE user |
| /api/users     | POST      | Add a user           |
| /api/users/:id | PUT       | Update a user        |
| /api/users/:id | DELETE    | Delete a user        |

Todos

|        URL     | HTTP Verb |         Action       |
|----------------|-----------|----------------------|
| /api/todos     | GET       | Return ALL todos     |
| /api/todos/:id | GET       | Return a SINGLE todo |
| /api/todos     | POST      | Add a todo           |
| /api/todos/:id | PUT       | Update a todo        |
| /api/todos/:id | DELETE    | Delete a todo        |

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
    connection: 'localhost:5432/node_knex_rest'
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

```javascript
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('uid').primary();
      table.string('email').notNullable().unique();
      table.string('firstName');
      table.string('lastName');
    }),

    knex.schema.createTable('posts', function(table){
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.integer('author_id')
         .references('uid')
         .inTable('users');
      table.dateTime('postDate');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
  return knex.schema.dropTable('posts');
};
```

Run the migration:

```sh
$ knex migrate:latest
```

## Seeds

### Users

Create a new seed file:

```sh
$ knex seed:make users
```

Update the file:

```javascript
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      email: 'michael@mherman.org'
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

### Todos

ADD SOMETHING HERE

## Routes

### GET all users

```javascript
// return ALL users
router.get('/api/users', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/users](http://localhost:3000/api/users)

### GET Single user

```javascript
// return single user
router.get('/api/users/:id', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/users/1](http://localhost:3000/api/users/1)

### POST

```javascript
// add user
router.post('/api/users', function(req, res, next) {

});
```

Test:

```sh
curl --data "firstName=Super&lastName=Man" \
http://127.0.0.1:3000/api/users
```

### PUT

```javascript
// update user
router.put('/api/users/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X PUT --data "column=firstName&value=Bat" \
http://127.0.0.1:3000/api/users/2
```

### DELETE

```javascript
// delete user
router.put('/api/users/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X DELETE http://127.0.0.1:3000/api/users/1
```

### GET all todos

```javascript
// return ALL todos
router.get('/api/todos', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/todos](http://localhost:3000/api/todos)

### GET Single todo

```javascript
// return single todo
router.get('/api/todos/:id', function(req, res, next) {

});
```

Test: [http://localhost:3000/api/todos/1](http://localhost:3000/api/todos/1)

### POST

```javascript
// add todo
router.post('/api/todos', function(req, res, next) {

});
```

Test:

```sh
curl --data "firstName=Super&lastName=Man" \
http://127.0.0.1:3000/api/todos
```

### PUT

```javascript
// update todo
router.put('/api/todos/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X PUT --data "column=firstName&value=Bat" \
http://127.0.0.1:3000/api/todos/2
```

### DELETE

```javascript
// delete todo
router.put('/api/todos/:id', function(req, res, next) {

});
```

Test:

```sh
$ curl -X DELETE http://127.0.0.1:3000/api/todos/1
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