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
  },
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

};